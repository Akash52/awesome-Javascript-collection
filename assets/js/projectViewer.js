class ProjectViewer {
  constructor() {
    this.projectsBasePath = './Awesome-JavaScript-Example/';
    this.screenshotsBasePath = './Awesome-JavaScript-Example/Images/';
    this.currentProject = null;
  }

  // Open project in modal/iframe
  openProject(projectPath) {
    this.currentProject = projectPath;
    this.createProjectModal(projectPath);
  }

  // Open project in new tab
  openProjectInNewTab(projectPath) {
    const fullPath = this.projectsBasePath + projectPath + '/index.html';
    window.open(fullPath, '_blank');
  }

  // Create modal to display project
  createProjectModal(projectPath) {
    const modal = document.createElement('div');
    modal.id = 'project-modal';
    modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn';
    
    modal.innerHTML = `
      <div class="bg-gray-900 rounded-2xl w-full max-w-7xl h-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-700 animate-scaleIn">
        <!-- Modal Header -->
        <div class="flex justify-between items-center p-6 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900 rounded-t-2xl">
          <div class="flex items-center space-x-3">
            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
            <h3 class="text-xl font-bold text-white ml-4">
              <i class="fas fa-code text-blue-400 mr-2"></i>
              ${projectPath}
            </h3>
          </div>
          <div class="flex items-center space-x-3">
            <!-- Control Buttons -->
            <button id="refresh-project" class="group p-2 rounded-lg bg-gray-700 hover:bg-blue-600 text-gray-300 hover:text-white transition-all duration-200 tooltip" data-tooltip="Refresh">
              <i class="fas fa-redo text-sm group-hover:animate-spin"></i>
            </button>
            <button id="fullscreen-toggle" class="group p-2 rounded-lg bg-gray-700 hover:bg-purple-600 text-gray-300 hover:text-white transition-all duration-200 tooltip" data-tooltip="Toggle Fullscreen">
              <i class="fas fa-expand text-sm"></i>
            </button>
            <button id="open-new-tab" class="group px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md">
              <i class="fas fa-external-link-alt mr-2"></i> 
              Open in New Tab
            </button>
            <button id="close-modal" class="group p-2 rounded-lg bg-gray-700 hover:bg-red-600 text-gray-300 hover:text-white transition-all duration-200">
              <i class="fas fa-times text-sm"></i>
            </button>
          </div>
        </div>
        
        <!-- Modal Content -->
        <div class="flex-1 p-6 bg-gray-900">
          <!-- Loading State -->
          <div id="iframe-loading" class="flex items-center justify-center h-full">
            <div class="text-center">
              <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p class="text-gray-400">Loading project...</p>
            </div>
          </div>
          
          <!-- Project Frame -->
          <iframe 
            id="project-iframe"
            src="${this.projectsBasePath + projectPath}/index.html" 
            class="w-full h-full border-0 rounded-xl bg-white shadow-lg opacity-0 transition-opacity duration-500"
            title="${projectPath}"
            onload="this.style.opacity='1'; document.getElementById('iframe-loading').style.display='none'">
          </iframe>
        </div>
        
        <!-- Modal Footer -->
        <div class="p-4 border-t border-gray-700 bg-gray-800 rounded-b-2xl">
          <div class="flex items-center justify-between text-sm text-gray-400">
            <div class="flex items-center space-x-4">
              <span class="flex items-center">
                <i class="fas fa-folder text-blue-400 mr-1"></i>
                Path: ${projectPath}
              </span>
              <span class="flex items-center">
                <i class="fas fa-clock text-green-400 mr-1"></i>
                Loaded: <span id="load-time">--</span>
              </span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-xs bg-gray-700 px-2 py-1 rounded">ESC to close</span>
              <span class="text-xs bg-gray-700 px-2 py-1 rounded">F11 for fullscreen</span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Set load time
    document.getElementById('load-time').textContent = new Date().toLocaleTimeString();

    // Add event listeners
    modal.querySelector('#close-modal').addEventListener('click', () => {
      this.closeModal();
    });

    modal.querySelector('#open-new-tab').addEventListener('click', () => {
      this.openProjectInNewTab(projectPath);
    });

    modal.querySelector('#refresh-project').addEventListener('click', () => {
      const iframe = document.getElementById('project-iframe');
      const loading = document.getElementById('iframe-loading');
      loading.style.display = 'flex';
      iframe.style.opacity = '0';
      iframe.src = iframe.src;
      document.getElementById('load-time').textContent = new Date().toLocaleTimeString();
    });

    modal.querySelector('#fullscreen-toggle').addEventListener('click', () => {
      this.toggleFullscreen();
    });

    // Click outside to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  // Enhanced keyboard handling
  handleKeydown(e) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    switch(e.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'F11':
        e.preventDefault();
        this.toggleFullscreen();
        break;
      case 'r':
      case 'R':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const refreshBtn = document.getElementById('refresh-project');
          if (refreshBtn) refreshBtn.click();
        }
        break;
    }
  }

  // Toggle fullscreen mode
  toggleFullscreen() {
    const modal = document.getElementById('project-modal');
    const iframe = document.getElementById('project-iframe');
    const icon = document.querySelector('#fullscreen-toggle i');
    
    if (modal.classList.contains('fullscreen-mode')) {
      // Exit fullscreen
      modal.classList.remove('fullscreen-mode');
      modal.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4';
      icon.className = 'fas fa-expand text-sm';
    } else {
      // Enter fullscreen
      modal.classList.add('fullscreen-mode');
      modal.className = 'fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50';
      icon.className = 'fas fa-compress text-sm';
    }
  }

  closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
      // Add fade out animation
      modal.classList.add('animate-fadeOut');
      setTimeout(() => {
        modal.remove();
      }, 200);
    }
    
    // Remove keyboard listener
    document.removeEventListener('keydown', this.handleKeydown);
  }

  // Get local screenshot path
  getScreenshotPath(projectName) {
    // Map project names to screenshot files
    const screenshotMap = {
      'Library': 'Smit-s-Library.png',
      'Calculator': 'calculator.png',
      'Movie-Seat-Booking': 'movie-seat.png',
      'Form-Validation': 'form-validation.png',
      'Quote-Generator-API': 'Quote.png',
      'Analog-Clock': 'analog-clock.png',
      'JS-drum': 'drum.png',
      'Text-Notes': 'Text-Notes.png',
      'Expanding Cards': 'Expanding Card.jpg',
      'Vanila_Todo': 'TODO-LIST.jpg',
      'Progress-bar': 'Progress Bar.png',
      'Jokes App': 'Crack-Jokes.jpg',
      'Git-User-Profile-Find': 'Git-User-profile-Find.jpg',
      'Catch-The-Insect': 'insect.jpg',
      'Search Animation': 'Hiiden-Search.png',
      'PlaySong': 'play-song.png',
      'DrumPad': 'drum.png',
      'Daily-Technical-News': 'Welcome-to-Indian-News.png',
      '3D Boxes': '3D Boxes.jpg',
      'Color-Selector': 'ColorFlipper.png',
      'TaskListApp': 'TaskList.png',
      'Github-Finder-master': 'Github-Finder.png',
      'Weight Converter': 'Weight-Converter.jpg',
      'Scroll Animation': 'Scroll-animation.png',
      'Drag-Drop': 'Dragn-Drop.jpg',
      'JS-Loan-Calculator': 'loan-calc.png',
      'Awesome-3D': 'Gun.JPG',
      'Video_Animation': 'Animation.jpg',
      'writing-effect': 'writing.jpg',
      'Text-Effect': 'Text.png',
      'Menu On Image': 'MenuImage.PNG',
      'Animal Sounds': 'Sound Board.png',
      'Dragable List': 'dragable.png',
      'Exchange Rate': 'Exchange.png',
      'OOP Book List': 'Book.png',
      'Food Recipe App': 'FindMeals.png',
      'DOM Array Methods': 'DomArrayMethos.png',
      'Rotating Navigation': 'Rotating.png',
      'Blur Loading': 'Blurry-Loading.png',
      'Beautiful_Animation': 'animation.png',
      'Scientific_Calculator': 'Scientific-Calc.png'
    };

    const fileName = screenshotMap[projectName];
    return fileName ? this.screenshotsBasePath + fileName : this.generateDefaultScreenshot(projectName);
  }

  // Generate default screenshot if none exists
  generateDefaultScreenshot(projectName) {
    // Return a placeholder or generate one
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#f3f4f6"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
              font-family="Arial, sans-serif" font-size="16" fill="#6b7280">
          ${projectName}
        </text>
      </svg>
    `)}`;
  }

  // Check if project exists locally
  async checkProjectExists(projectPath) {
    try {
      const response = await fetch(this.projectsBasePath + projectPath + '/index.html', { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

// Initialize global project viewer
window.projectViewer = new ProjectViewer();
