#!/bin/bash

# Add New Project Helper Script
# This script helps users add new projects to the collection

PROJECT_NAME="$1"
TEMPLATE_TYPE="${2:-basic}"

if [ -z "$PROJECT_NAME" ]; then
    echo "❌ Please provide a project name"
    echo "Usage: ./add-project.sh 'My New Project' [template]"
    echo ""
    echo "Templates available:"
    echo "  basic     - Basic HTML/CSS/JS template (default)"
    echo "  api       - Template with API integration"
    echo "  game      - Game template with canvas"
    echo "  form      - Form-based application template"
    exit 1
fi

# Convert project name to folder name (lowercase, replace spaces with hyphens)
FOLDER_NAME=$(echo "$PROJECT_NAME" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g')
PROJECT_PATH="./Awesome-JavaScript-Example/$FOLDER_NAME"

if [ -d "$PROJECT_PATH" ]; then
    echo "❌ Project folder '$FOLDER_NAME' already exists!"
    exit 1
fi

echo "🚀 Creating new project: $PROJECT_NAME"
echo "📁 Folder: $FOLDER_NAME"

# Create project directory
mkdir -p "$PROJECT_PATH"

# Create basic HTML template
cat > "$PROJECT_PATH/index.html" << EOL
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$PROJECT_NAME</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>$PROJECT_NAME</h1>
        <p>Welcome to your new JavaScript project!</p>
        
        <!-- Add your content here -->
        <div class="content">
            <button id="demo-btn" class="btn">Click Me!</button>
            <div id="output"></div>
        </div>
    </div>
    
    <script src="script.js"></script>
</body>
</html>
EOL

# Create basic CSS template
cat > "$PROJECT_PATH/style.css" << EOL
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 500px;
    width: 90%;
}

h1 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 2rem;
}

p {
    color: #666;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.content {
    margin-top: 2rem;
}

.btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

#output {
    margin-top: 1rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 6px;
    min-height: 50px;
    display: none;
}

#output.show {
    display: block;
}
EOL

# Create JavaScript template based on type
case $TEMPLATE_TYPE in
    "api")
        cat > "$PROJECT_PATH/script.js" << 'EOL'
// API Integration Template
const demoBtn = document.getElementById('demo-btn');
const output = document.getElementById('output');

demoBtn.addEventListener('click', fetchData);

async function fetchData() {
    try {
        output.innerHTML = '<p>Loading...</p>';
        output.classList.add('show');
        
        // Example API call - replace with your API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        
        output.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.body}</p>
        `;
    } catch (error) {
        output.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

// Add your custom functionality here
console.log('API template loaded!');
EOL
        ;;
    "game")
        cat > "$PROJECT_PATH/script.js" << 'EOL'
// Game Template with Canvas
const demoBtn = document.getElementById('demo-btn');
const output = document.getElementById('output');

// Create canvas
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 300;
canvas.style.border = '1px solid #ccc';
canvas.style.borderRadius = '6px';

const ctx = canvas.getContext('2d');

demoBtn.addEventListener('click', startGame);

function startGame() {
    output.innerHTML = '';
    output.appendChild(canvas);
    output.classList.add('show');
    
    // Simple animation
    let x = 0;
    let y = 150;
    let dx = 2;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw moving circle
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI * 2);
        ctx.fillStyle = '#667eea';
        ctx.fill();
        
        x += dx;
        if (x > canvas.width - 20 || x < 20) {
            dx = -dx;
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Add your game logic here
console.log('Game template loaded!');
EOL
        ;;
    "form")
        cat > "$PROJECT_PATH/script.js" << 'EOL'
// Form Template
const demoBtn = document.getElementById('demo-btn');
const output = document.getElementById('output');

demoBtn.addEventListener('click', showForm);

function showForm() {
    output.innerHTML = `
        <form id="demo-form">
            <div style="margin-bottom: 1rem;">
                <label for="name" style="display: block; margin-bottom: 0.5rem;">Name:</label>
                <input type="text" id="name" required style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <div style="margin-bottom: 1rem;">
                <label for="email" style="display: block; margin-bottom: 0.5rem;">Email:</label>
                <input type="email" id="email" required style="width: 100%; padding: 0.5rem; border: 1px solid #ddd; border-radius: 4px;">
            </div>
            <button type="submit" class="btn">Submit</button>
        </form>
        <div id="form-result"></div>
    `;
    output.classList.add('show');
    
    const form = document.getElementById('demo-form');
    const result = document.getElementById('form-result');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        result.innerHTML = `
            <div style="margin-top: 1rem; padding: 1rem; background: #d4edda; border-radius: 4px; color: #155724;">
                <strong>Success!</strong><br>
                Name: ${name}<br>
                Email: ${email}
            </div>
        `;
    });
}

// Add your form logic here
console.log('Form template loaded!');
EOL
        ;;
    *)
        cat > "$PROJECT_PATH/script.js" << 'EOL'
// Basic JavaScript Template
const demoBtn = document.getElementById('demo-btn');
const output = document.getElementById('output');

demoBtn.addEventListener('click', () => {
    output.innerHTML = `
        <h3>Hello from JavaScript!</h3>
        <p>Current time: ${new Date().toLocaleTimeString()}</p>
        <p>Random number: ${Math.floor(Math.random() * 100)}</p>
    `;
    output.classList.add('show');
});

// Add your custom functionality here
console.log('Project loaded successfully!');

// Example: Add more interactive features
function addInteractivity() {
    // Your code here
}

// Initialize your project
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, ready to go!');
});
EOL
        ;;
esac

# Create README file
cat > "$PROJECT_PATH/README.md" << EOL
# $PROJECT_NAME

## Description
$PROJECT_NAME is a JavaScript project showcasing interactive web development.

## Features
- Responsive design
- Interactive elements
- Modern JavaScript (ES6+)
- Clean and maintainable code

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6+)

## How to Run
1. Open \`index.html\` in your web browser
2. Or serve it through a local server for best experience

## Project Structure
\`\`\`
$FOLDER_NAME/
├── index.html    # Main HTML file
├── style.css     # Styles
├── script.js     # JavaScript logic
└── README.md     # This file
\`\`\`

## Customization
Feel free to modify the code to add your own features and styling!

## License
Open source - feel free to use and modify!
EOL

echo "✅ Project created successfully!"
echo ""
echo "📁 Project location: $PROJECT_PATH"
echo "📝 Files created:"
echo "   • index.html"
echo "   • style.css"
echo "   • script.js"
echo "   • README.md"
echo ""
echo "🔄 Regenerating project data..."

# Check if auto-generate-data.js exists and run it
if [ -f "auto-generate-data.js" ]; then
    node auto-generate-data.js
    echo "✅ Project data updated!"
else
    echo "⚠️  Run 'npm run generate-data' to update the project showcase"
fi

echo ""
echo "🎉 Your project is ready!"
echo "📝 Edit the files in: $PROJECT_PATH"
echo "🌐 Test it by running: npm start"
echo ""
