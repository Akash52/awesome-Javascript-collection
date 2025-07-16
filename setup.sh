#!/bin/bash

echo "🚀 Setting up Awesome JavaScript Collection - Internal Solution"
echo "================================================================="

# Check if Node.js is installed
if command -v node &> /dev/null; then
    echo "✅ Node.js found: $(node --version)"
    NODE_AVAILABLE=true
else
    echo "❌ Node.js not found"
    NODE_AVAILABLE=false
fi

# Check if Python is installed
if command -v python3 &> /dev/null; then
    echo "✅ Python3 found: $(python3 --version)"
    PYTHON_AVAILABLE=true
else
    echo "❌ Python3 not found"
    PYTHON_AVAILABLE=false
fi

# Generate project data automatically
if [ "$NODE_AVAILABLE" = true ]; then
    echo ""
    echo "🔍 Auto-generating project data..."
    node auto-generate-data.js
    
    if [ -f "data-internal.json" ]; then
        echo "✅ Project data generated successfully"
    else
        echo "❌ Failed to generate project data"
    fi
fi
    PYTHON_AVAILABLE=false
fi

echo ""
echo "📦 Installing dependencies..."

if [ "$NODE_AVAILABLE" = true ]; then
    echo "Installing Node.js dependencies..."
    npm install
    
    if [ $? -eq 0 ]; then
        echo "✅ Node.js dependencies installed successfully!"
        
        echo ""
        echo "🎯 Starting the server..."
        echo "Choose your preferred method:"
        echo "1. Node.js server (recommended)"
        echo "2. Python server"
        echo "3. Exit setup"
        
        read -p "Enter your choice (1-3): " choice
        
        case $choice in
            1)
                echo "🚀 Starting Node.js server..."
                npm start
                ;;
            2)
                if [ "$PYTHON_AVAILABLE" = true ]; then
                    echo "🐍 Starting Python server..."
                    python3 start-server.py
                else
                    echo "❌ Python3 not available. Please install Python3 or choose Node.js option."
                fi
                ;;
            3)
                echo "👋 Setup complete! You can start the server later with:"
                echo "   npm start          (Node.js)"
                echo "   python3 start-server.py  (Python)"
                ;;
            *)
                echo "❌ Invalid choice. Exiting..."
                ;;
        esac
    else
        echo "❌ Failed to install Node.js dependencies"
    fi
elif [ "$PYTHON_AVAILABLE" = true ]; then
    echo "🐍 Using Python server (Node.js not available)..."
    python3 start-server.py
else
    echo "❌ Neither Node.js nor Python3 found!"
    echo "Please install Node.js (recommended) or Python3 to run the server."
    echo ""
    echo "Installation instructions:"
    echo "Node.js: https://nodejs.org/"
    echo "Python3: https://python.org/"
fi

echo ""
echo "📚 For more information, check README-INTERNAL.md"
echo "🎉 Happy coding!"
