const fs = require('fs');
const path = require('path');

class ProjectAutoGenerator {
    constructor() {
        this.projectsPath = './Awesome-JavaScript-Example';
        this.outputFile = './data-internal.json';
        this.excludedFolders = ['Images', '.git', 'node_modules', '.vscode'];
        this.imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.PNG', '.JPG', '.JPEG', '.GIF', '.WEBP', '.SVG'];
        this.screenshotNames = ['ss', 'screenshot', 'preview', 'demo', 'image', 'thumb', 'thumbnail'];
    }

    /**
     * Scan project folders and generate data-internal.json automatically
     */
    async generateProjectData() {
        try {
            console.log('🔍 Scanning projects...');
            
            if (!fs.existsSync(this.projectsPath)) {
                throw new Error(`Project path ${this.projectsPath} does not exist`);
            }

            const projects = await this.scanProjects();
            const dataStructure = {
                comment: "Internal project showcase - automatically generated",
                last_updated: new Date().toISOString(),
                template: {
                    image_link: "<relative-path-to-screenshot>",
                    handle: "<project-name>",
                    project_path: "<relative-path-to-project-folder>",
                    description: "<project-description>",
                    technologies: ["<tech1>", "<tech2>"],
                    github_path: "<relative-github-path>"
                },
                profiles: projects
            };

            // Write to file
            fs.writeFileSync(this.outputFile, JSON.stringify(dataStructure, null, 4));
            
            console.log(`✅ Generated data-internal.json with ${projects.length} projects`);
            console.log(`📄 File saved to: ${this.outputFile}`);
            
            return projects;
        } catch (error) {
            console.error('❌ Error generating project data:', error.message);
            throw error;
        }
    }

    /**
     * Scan the Awesome-JavaScript-Example folder for projects
     */
    async scanProjects() {
        const projects = [];
        const folders = fs.readdirSync(this.projectsPath, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .filter(dirent => !this.excludedFolders.includes(dirent.name))
            .map(dirent => dirent.name);

        for (const folder of folders) {
            const projectPath = path.join(this.projectsPath, folder);
            const project = await this.analyzeProject(folder, projectPath);
            if (project) {
                projects.push(project);
            }
        }

        return projects;
    }

    /**
     * Analyze individual project folder
     */
    async analyzeProject(folderName, projectPath) {
        try {
            // Check if index.html exists
            const indexPath = path.join(projectPath, 'index.html');
            if (!fs.existsSync(indexPath)) {
                console.log(`⚠️  Skipping ${folderName} - no index.html found`);
                return null;
            }

            // Try to find project image
            const imageLink = this.findProjectImage(folderName);
            
            // Analyze project files to detect technologies
            const technologies = this.detectTechnologies(projectPath);
            
            // Generate description based on folder name and content
            const description = this.generateDescription(folderName, projectPath);

            const project = {
                image_link: imageLink,
                handle: this.formatProjectName(folderName),
                project_path: folderName,
                description: description,
                technologies: technologies,
                github_path: `./Awesome-JavaScript-Example/${folderName}`
            };

            console.log(`✓ Added: ${project.handle}`);
            return project;

        } catch (error) {
            console.error(`❌ Error analyzing ${folderName}:`, error.message);
            return null;
        }
    }

    /**
     * Find project screenshot/image with enhanced search
     */
    findProjectImage(folderName) {
        console.log(`🔍 Searching for image for ${folderName}...`);
        
        // 1. Try fuzzy matching in Images folder first
        const imagesPath = './Awesome-JavaScript-Example/Images';
        if (fs.existsSync(imagesPath)) {
            const fuzzyMatch = this.findImageInImagesFolder(folderName, imagesPath);
            if (fuzzyMatch) {
                console.log(`   ✅ Found in Images folder: ${fuzzyMatch}`);
                return fuzzyMatch;
            }
        }

        // 2. Search in project folder comprehensively
        const projectImage = this.findImageInProjectFolder(folderName);
        if (projectImage) {
            console.log(`   ✅ Found in project folder: ${projectImage}`);
            return projectImage;
        }

        console.log(`   ⚠️  No image found, generating placeholder for ${folderName}`);
        
        // 3. Generate fallback placeholder
        return this.generatePlaceholderImage(folderName);
    }

    /**
     * Comprehensive search in project folder
     */
    findImageInProjectFolder(folderName) {
        const projectPath = path.join(this.projectsPath, folderName);
        if (!fs.existsSync(projectPath)) return null;

        try {
            // Get all files in project folder
            const files = fs.readdirSync(projectPath);
            
            // Priority search patterns
            const searchPatterns = [
                // High priority screenshot names
                ...this.screenshotNames,
                // Project name variations
                folderName.toLowerCase(),
                folderName.toLowerCase().replace(/[-_\s]/g, ''),
                folderName.toLowerCase().replace(/[-_\s]/g, '-'),
                folderName.toLowerCase().replace(/[-_\s]/g, '_'),
                // Generic names
                'main', 'cover', 'hero', 'banner'
            ];

            // Search for exact matches first
            for (const pattern of searchPatterns) {
                for (const ext of this.imageExtensions) {
                    const fileName = pattern + ext;
                    if (files.includes(fileName)) {
                        return path.join(projectPath, fileName);
                    }
                }
            }

            // Search for partial matches
            for (const file of files) {
                const ext = path.extname(file);
                if (this.imageExtensions.includes(ext)) {
                    const nameWithoutExt = path.basename(file, ext).toLowerCase();
                    
                    // Check if file name contains any search pattern
                    for (const pattern of searchPatterns) {
                        if (nameWithoutExt.includes(pattern) || pattern.includes(nameWithoutExt)) {
                            return path.join(projectPath, file);
                        }
                    }
                }
            }

            // Last resort: return any image file
            for (const file of files) {
                const ext = path.extname(file);
                if (this.imageExtensions.includes(ext)) {
                    return path.join(projectPath, file);
                }
            }

        } catch (error) {
            console.log(`   ⚠️  Error reading project folder: ${error.message}`);
        }

        return null;
    }

    /**
     * Find images in a specific folder with improved search
     */
    findImagesInFolder(folderPath) {
        const images = [];
        
        if (!fs.existsSync(folderPath)) return images;
        
        try {
            const files = fs.readdirSync(folderPath);
            for (const file of files) {
                const ext = path.extname(file);
                if (this.imageExtensions.includes(ext)) {
                    images.push(path.join(folderPath, file));
                }
            }
        } catch (error) {
            console.log(`   ⚠️  Could not read folder: ${folderPath}`);
        }
        
        return images;
    }

    /**
     * Try to find image in Images folder with enhanced fuzzy matching
     */
    findImageInImagesFolder(projectName, imagesPath) {
        if (!fs.existsSync(imagesPath)) return null;

        try {
            const files = fs.readdirSync(imagesPath);
            
            // Normalize project name for comparison
            const normalizedProjectName = projectName.toLowerCase()
                .replace(/[-_\s]/g, '')
                .replace(/[^a-z0-9]/g, '');

            console.log(`   🔍 Looking for images matching: ${projectName} (normalized: ${normalizedProjectName})`);

            // Priority matches
            const matches = [];

            for (const file of files) {
                const ext = path.extname(file);
                if (this.imageExtensions.includes(ext)) {
                    const fileName = path.basename(file, ext).toLowerCase()
                        .replace(/[-_\s]/g, '')
                        .replace(/[^a-z0-9]/g, '');
                    
                    // Exact match (highest priority)
                    if (fileName === normalizedProjectName) {
                        matches.unshift({ file, priority: 1 });
                        continue;
                    }
                    
                    // Contains project name
                    if (fileName.includes(normalizedProjectName)) {
                        matches.push({ file, priority: 2 });
                        continue;
                    }
                    
                    // Project name contains file name
                    if (normalizedProjectName.includes(fileName) && fileName.length > 2) {
                        matches.push({ file, priority: 3 });
                        continue;
                    }
                    
                    // Partial similarity (basic)
                    const similarity = this.calculateStringSimilarity(fileName, normalizedProjectName);
                    if (similarity > 0.6) {
                        matches.push({ file, priority: 4, similarity });
                    }
                }
            }

            // Sort by priority and return best match
            if (matches.length > 0) {
                matches.sort((a, b) => {
                    if (a.priority !== b.priority) return a.priority - b.priority;
                    return (b.similarity || 0) - (a.similarity || 0);
                });
                
                const bestMatch = matches[0];
                const imagePath = path.join(imagesPath, bestMatch.file);
                console.log(`   ✅ Best match found: ${imagePath} (priority: ${bestMatch.priority})`);
                return imagePath;
            }

        } catch (error) {
            console.log(`   ⚠️  Error reading Images folder: ${error.message}`);
        }

        return null;
    }

    /**
     * Calculate string similarity (basic implementation)
     */
    calculateStringSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const editDistance = this.levenshteinDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    }

    /**
     * Calculate Levenshtein distance
     */
    levenshteinDistance(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        return matrix[str2.length][str1.length];
    }

    /**
     * Generate project screenshot (returns null - no screenshot generation)
     */
    generateProjectScreenshot(folderName) {
        // Screenshot generation is disabled, return null to fall through to placeholder
        return null;
    }

    /**
     * Generate enhanced placeholder image
     */
    generatePlaceholderImage(projectName) {
        const projectNameFormatted = this.formatProjectName(projectName);
        const colors = [
            '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#43e97b',
            '#fa709a', '#fee140', '#a8edea', '#d299c2', '#89f7fe', '#66a6ff'
        ];
        
        // Use project name to consistently pick a color
        const colorIndex = projectName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        const bgColor = colors[colorIndex];
        
        // Create a more visually appealing SVG
        const svg = `
            <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
                        <stop offset="100%" style="stop-color:${this.adjustColor(bgColor, -20)};stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="400" height="300" fill="url(#grad)" rx="8"/>
                <circle cx="350" cy="50" r="30" fill="${this.adjustColor(bgColor, 30)}" opacity="0.3"/>
                <circle cx="50" cy="250" r="40" fill="${this.adjustColor(bgColor, 30)}" opacity="0.2"/>
                <text x="200" y="130" dominant-baseline="middle" text-anchor="middle" 
                      font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white">
                    ${projectNameFormatted}
                </text>
                <text x="200" y="160" dominant-baseline="middle" text-anchor="middle" 
                      font-family="Arial, sans-serif" font-size="12" fill="white" opacity="0.8">
                    JavaScript Project
                </text>
                <rect x="150" y="180" width="100" height="3" fill="white" opacity="0.5" rx="2"/>
            </svg>
        `;
        
        return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
    }

    /**
     * Adjust color brightness
     */
    adjustColor(color, amount) {
        const colorValue = parseInt(color.slice(1), 16);
        const r = Math.max(0, Math.min(255, (colorValue >> 16) + amount));
        const g = Math.max(0, Math.min(255, ((colorValue >> 8) & 0x00FF) + amount));
        const b = Math.max(0, Math.min(255, (colorValue & 0x0000FF) + amount));
        return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
    }

    /**
     * Detect technologies used in project
     */
    detectTechnologies(projectPath) {
        const technologies = new Set(['HTML', 'CSS', 'JavaScript']); // Default technologies
        
        try {
            const files = fs.readdirSync(projectPath);
            
            // Check for specific files and technologies
            files.forEach(file => {
                const ext = path.extname(file).toLowerCase();
                const fileName = file.toLowerCase();
                
                // Framework/Library detection
                if (fileName.includes('react') || fileName.includes('jsx')) {
                    technologies.add('React');
                }
                if (fileName.includes('vue')) {
                    technologies.add('Vue.js');
                }
                if (fileName.includes('angular')) {
                    technologies.add('Angular');
                }
                if (fileName.includes('bootstrap')) {
                    technologies.add('Bootstrap');
                }
                if (fileName.includes('jquery')) {
                    technologies.add('jQuery');
                }
                
                // Technology detection by file extension
                switch (ext) {
                    case '.ts':
                        technologies.add('TypeScript');
                        break;
                    case '.scss':
                    case '.sass':
                        technologies.add('SASS');
                        break;
                    case '.less':
                        technologies.add('LESS');
                        break;
                    case '.php':
                        technologies.add('PHP');
                        break;
                    case '.py':
                        technologies.add('Python');
                        break;
                }
            });

            // Check HTML content for specific technologies
            const indexPath = path.join(projectPath, 'index.html');
            if (fs.existsSync(indexPath)) {
                const htmlContent = fs.readFileSync(indexPath, 'utf8').toLowerCase();
                
                if (htmlContent.includes('bootstrap')) technologies.add('Bootstrap');
                if (htmlContent.includes('jquery')) technologies.add('jQuery');
                if (htmlContent.includes('chart.js')) technologies.add('Chart.js');
                if (htmlContent.includes('api') || htmlContent.includes('fetch') || htmlContent.includes('axios')) {
                    technologies.add('API');
                }
                if (htmlContent.includes('audio') || htmlContent.includes('sound')) {
                    technologies.add('Audio');
                }
                if (htmlContent.includes('video')) {
                    technologies.add('Video');
                }
                if (htmlContent.includes('canvas')) {
                    technologies.add('Canvas');
                }
                if (htmlContent.includes('websocket')) {
                    technologies.add('WebSocket');
                }
                if (htmlContent.includes('geolocation')) {
                    technologies.add('Geolocation');
                }
                if (htmlContent.includes('localstorage') || htmlContent.includes('sessionstorage')) {
                    technologies.add('LocalStorage');
                }
            }

            // Check JavaScript content for specific patterns
            const jsFiles = files.filter(file => file.endsWith('.js'));
            jsFiles.forEach(jsFile => {
                try {
                    const jsContent = fs.readFileSync(path.join(projectPath, jsFile), 'utf8').toLowerCase();
                    
                    if (jsContent.includes('class ') && jsContent.includes('constructor')) {
                        technologies.add('OOP');
                    }
                    if (jsContent.includes('async') || jsContent.includes('await') || jsContent.includes('promise')) {
                        technologies.add('Async/Await');
                    }
                    if (jsContent.includes('three.js') || jsContent.includes('webgl')) {
                        technologies.add('3D');
                    }
                    if (jsContent.includes('drag') && jsContent.includes('drop')) {
                        technologies.add('Drag & Drop');
                    }
                } catch (error) {
                    // Ignore file read errors
                }
            });

        } catch (error) {
            console.warn(`Warning: Could not detect technologies for ${projectPath}`);
        }

        return Array.from(technologies);
    }

    /**
     * Generate project description
     */
    generateDescription(folderName, projectPath) {
        // Check for README file first
        const readmeFiles = ['README.md', 'readme.md', 'Readme.md', 'README.txt'];
        for (const readmeFile of readmeFiles) {
            const readmePath = path.join(projectPath, readmeFile);
            if (fs.existsSync(readmePath)) {
                try {
                    const content = fs.readFileSync(readmePath, 'utf8');
                    // Extract first meaningful line as description
                    const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
                    if (lines.length > 0) {
                        return lines[0].trim().substring(0, 100);
                    }
                } catch (error) {
                    // Continue to fallback
                }
            }
        }

        // Generate description based on folder name
        const descriptions = {
            'movie-seat-booking': 'Interactive movie seat booking system with seat selection and pricing',
            'form-validation': 'Client-side form validation with real-time feedback',
            'quote-generator-api': 'Random quote generator using external API',
            'calculator': 'Functional calculator with basic arithmetic operations',
            'analog-clock': 'Beautiful analog clock with real-time updates',
            'js-drum': 'Interactive drum kit with keyboard controls',
            'text-notes': 'Simple note-taking application with local storage',
            'expanding cards': 'Animated expanding cards with smooth transitions',
            'vanila_todo': 'Todo list application built with vanilla JavaScript',
            'progress-bar': 'Animated progress bar with step indicators',
            'jokes app': 'Random joke generator with API integration',
            'git-user-profile-find': 'Search and display GitHub user profiles',
            'catch-the-insect': 'Fun insect catching game with scoring',
            'search animation': 'Animated search bar with smooth transitions',
            'library': 'Book library management system with CRUD operations',
            'playsong': 'Music player with playlist functionality',
            'drumpad': 'Virtual drum pad with multiple sound effects',
            'daily-technical-news': 'Latest technical news aggregator',
            '3d boxes': 'Interactive 3D box animation with CSS transforms',
            'color-selector': 'Random color generator with hex and RGB values',
            'tasklistapp': 'Task management application with filtering',
            'github-finder-master': 'Advanced GitHub repository finder',
            'weight converter': 'Convert between different weight units',
            'scroll animation': 'Scroll-triggered animations and effects',
            'drag-drop': 'Drag and drop interface with sortable elements',
            'js-loan-calculator': 'Calculate loan payments and interest rates',
            'awesome-3d': '3D graphics and animations showcase',
            'video_animation': 'Video player with custom animations',
            'writing-effect': 'Typewriter text animation effect',
            'text-effect': 'Various text animation and styling effects',
            'menu on image': 'Interactive menu overlay on images',
            'animal sounds': 'Interactive animal sound board',
            'dragable list': 'Sortable list with drag and drop functionality',
            'exchange rate': 'Real-time currency exchange rate calculator',
            'oop book list': 'Object-oriented book management system',
            'food recipe app': 'Food recipe finder and viewer with search functionality',
            'dom array methods': 'Demonstration of various JavaScript array methods',
            'rotating navigation': 'Circular rotating navigation menu',
            'blur loading': 'Blurred background loading animation',
            'beautiful_animation': 'Collection of beautiful CSS animations',
            'scientific_calculator': 'Advanced scientific calculator with complex functions'
        };

        const key = folderName.toLowerCase().replace(/[-_]/g, ' ');
        return descriptions[key] || `${this.formatProjectName(folderName)} - JavaScript project with interactive features`;
    }

    /**
     * Format project name for display
     */
    formatProjectName(folderName) {
        return folderName
            .replace(/[-_]/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase())
            .replace(/\bApi\b/g, 'API')
            .replace(/\bUi\b/g, 'UI')
            .replace(/\bHtml\b/g, 'HTML')
            .replace(/\bCss\b/g, 'CSS')
            .replace(/\bJs\b/g, 'JS')
            .replace(/\b3d\b/gi, '3D')
            .replace(/\bOop\b/g, 'OOP')
            .replace(/\bDom\b/g, 'DOM');
    }

    /**
     * Watch for changes and auto-regenerate
     */
    watchForChanges() {
        console.log('👀 Watching for changes in project folders...');
        
        fs.watch(this.projectsPath, { recursive: true }, (eventType, filename) => {
            if (filename && (filename.includes('index.html') || eventType === 'rename')) {
                console.log(`📝 Change detected: ${filename}`);
                setTimeout(() => {
                    this.generateProjectData().catch(console.error);
                }, 1000); // Debounce
            }
        });
    }

    /**
     * Get appropriate icon for project type
     */
    getProjectIcon(projectName) {
        const name = projectName.toLowerCase();
        
        if (name.includes('calculator')) return '🧮';
        if (name.includes('clock')) return '🕐';
        if (name.includes('game') || name.includes('insect') || name.includes('catch')) return '🎮';
        if (name.includes('music') || name.includes('audio') || name.includes('sound') || name.includes('drum')) return '🎵';
        if (name.includes('weather')) return '🌤️';
        if (name.includes('todo') || name.includes('task')) return '📝';
        if (name.includes('chat') || name.includes('form')) return '💬';
        if (name.includes('animation') || name.includes('effect')) return '✨';
        if (name.includes('3d') || name.includes('box')) return '📦';
        if (name.includes('video') || name.includes('player')) return '🎬';
        if (name.includes('library') || name.includes('book')) return '📚';
        if (name.includes('expense') || name.includes('money')) return '💰';
        if (name.includes('color')) return '🎨';
        if (name.includes('login') || name.includes('auth')) return '🔐';
        if (name.includes('search')) return '🔍';
        if (name.includes('scroll')) return '📜';
        if (name.includes('drag')) return '↔️';
        if (name.includes('progress')) return '📊';
        if (name.includes('quote')) return '💭';
        if (name.includes('joke')) return '😄';
        if (name.includes('github') || name.includes('git')) return '🐙';
        if (name.includes('recipe') || name.includes('food')) return '🍳';
        if (name.includes('text') || name.includes('reader')) return '📖';
        if (name.includes('navigation') || name.includes('menu')) return '🧭';
        if (name.includes('landing') || name.includes('page')) return '🌐';
        
        return '⚡'; // Default icon
    }
}

module.exports = ProjectAutoGenerator;
