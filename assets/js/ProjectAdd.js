const loading = document.getElementById('loading')

// Project Manager Class
class InternalProjectManager {
  constructor() {
    this.dataUrl = './data-internal.json' // Use internal data file
    this.projectViewer = window.projectViewer
    this.currentFilter = 'all'
    this.allProjects = []
  }

  async loadProjects() {
    try {
      $('#loading').fadeIn(300)
      
      const response = await fetch(this.dataUrl)
      const data = await response.json()
      
      let profileKeys = ['handle', 'image_link', 'project_path', 'description', 'technologies', 'github_path']
      
      let isProfileValid = (profile) => profileKeys.slice(0, 3).every((k) => k in profile)
      let getUniqueProfiles = (profiles) =>
        Array.from(new Set(profiles.map((p) => p.handle))).map((id) => {
          return profiles.find((p) => p.handle === id)
        })
      
      // get only unique and valid profiles
      let profiles = getUniqueProfiles(data.profiles.filter(isProfileValid))
      this.allProjects = profiles
      
      this.renderProjects(profiles)
      
    } catch (error) {
      console.error('Error loading projects:', error)
      this.showErrorMessage()
    } finally {
      setTimeout(() => {
        $('#loading').fadeOut(300)
        // Initialize filters after projects are loaded
        if (typeof initializeFilters === 'function') {
          initializeFilters();
        }
      }, 1000)
    }
  }

  renderProjects(profiles) {
    let cardParent = document.getElementById('profile-cards')
    cardParent.innerHTML = '' // Clear existing content
    
    for (let index = 0; index < profiles.length; index += 1) {
      let card = document.createElement('div')
      let profile = profiles[index]
      
      // Handle image error with fallback
      const imageUrl = this.getImageUrl(profile.image_link, profile.handle)
      const technologies = profile.technologies ? profile.technologies.join(', ') : 'HTML, CSS, JavaScript'
      const category = this.getCategoryFromTechnologies(profile.technologies)
      
      card.className = 'project-card-wrapper'
      card.setAttribute('data-category', category)
      card.innerHTML = `
        <div class="group bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-700/50 hover:border-blue-500/50 overflow-hidden">
          <!-- Project Image -->
          <div class="relative overflow-hidden rounded-t-2xl">
            <img 
              alt="${profile.handle}" 
              src="${imageUrl}" 
              class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
              onerror="this.src='data:image/svg+xml;base64,${btoa(`<svg width="320" height="192" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" /><stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" /></linearGradient></defs><rect width="320" height="192" fill="url(#grad)"/><text x="160" y="96" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white">${profile.handle}</text></svg>`)}'">
            
            <!-- Category Badge -->
            <div class="absolute top-3 left-3">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/90 text-white backdrop-blur-sm">
                <i class="fas ${this.getCategoryIcon(category)} mr-1"></i>
                ${category}
              </span>
            </div>
            
            <!-- Quick Action Overlay -->
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div class="flex space-x-3">
                <button 
                  onclick="projectManager.openProject('${profile.project_path}')" 
                  class="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transform hover:scale-110 transition-all duration-200 shadow-lg">
                  <i class="fas fa-play text-lg"></i>
                </button>
                <button 
                  onclick="projectManager.openInNewTab('${profile.project_path}')" 
                  class="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transform hover:scale-110 transition-all duration-200 shadow-lg">
                  <i class="fas fa-external-link-alt text-lg"></i>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Project Content -->
          <div class="p-6">
            <!-- Project Title -->
            <h3 class="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
              ${profile.handle}
            </h3>
            
            <!-- Project Description -->
            ${profile.description ? `
              <p class="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                ${profile.description}
              </p>
            ` : ''}
            
            <!-- Technology Tags -->
            <div class="flex flex-wrap gap-2 mb-6">
              ${this.renderTechnologyTags(profile.technologies)}
            </div>
            
            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-3">
              <button 
                onclick="projectManager.openProject('${profile.project_path}')" 
                class="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                <i class="fas fa-play mr-2"></i> 
                Live Demo
              </button>
              
              <div class="flex gap-2">
                <button 
                  onclick="projectManager.openInNewTab('${profile.project_path}')" 
                  class="flex items-center justify-center px-4 py-3 bg-gray-700 hover:bg-green-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md">
                  <i class="fas fa-external-link-alt"></i>
                </button>
                
                <button 
                  onclick="projectManager.viewSource('${profile.github_path}')" 
                  class="flex items-center justify-center px-4 py-3 bg-gray-700 hover:bg-purple-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md">
                  <i class="fab fa-github"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `
      cardParent.appendChild(card)
    }
    
    // Add stagger animation
    this.addStaggerAnimation()
  }

  renderTechnologyTags(technologies) {
    if (!technologies || !Array.isArray(technologies)) return ''
    
    return technologies.slice(0, 4).map(tech => {
      const color = this.getTechColor(tech)
      return `
        <span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${color} border border-opacity-30">
          ${tech}
        </span>
      `
    }).join('')
  }

  getTechColor(tech) {
    const techColors = {
      'HTML': 'bg-orange-500/20 text-orange-300 border-orange-500',
      'CSS': 'bg-blue-500/20 text-blue-300 border-blue-500',
      'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500',
      'React': 'bg-cyan-500/20 text-cyan-300 border-cyan-500',
      'Vue': 'bg-green-500/20 text-green-300 border-green-500',
      'Node.js': 'bg-green-600/20 text-green-300 border-green-600',
      'API': 'bg-purple-500/20 text-purple-300 border-purple-500',
      'Audio': 'bg-pink-500/20 text-pink-300 border-pink-500'
    }
    
    return techColors[tech] || 'bg-gray-500/20 text-gray-300 border-gray-500'
  }

  getCategoryFromTechnologies(technologies) {
    if (!technologies || !Array.isArray(technologies)) return 'utility'
    
    const techString = technologies.join(' ').toLowerCase()
    
    if (techString.includes('animation') || techString.includes('3d') || techString.includes('scroll')) {
      return 'animation'
    } else if (techString.includes('interactive') || techString.includes('game') || techString.includes('drag')) {
      return 'interactive'
    } else {
      return 'utility'
    }
  }

  getCategoryIcon(category) {
    const icons = {
      'animation': 'fa-magic',
      'interactive': 'fa-mouse-pointer',
      'utility': 'fa-tools'
    }
    return icons[category] || 'fa-code'
  }

  addStaggerAnimation() {
    const cards = document.querySelectorAll('.project-card-wrapper')
    cards.forEach((card, index) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(20px)'
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease-out'
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
      }, index * 100)
    })
  }

  filterProjects(category) {
    this.currentFilter = category
    const cards = document.querySelectorAll('.project-card-wrapper')
    
    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category')
      const shouldShow = category === 'all' || cardCategory === category
      
      if (shouldShow) {
        card.style.display = 'block'
        setTimeout(() => {
          card.style.opacity = '1'
          card.style.transform = 'scale(1)'
        }, 50)
      } else {
        card.style.opacity = '0'
        card.style.transform = 'scale(0.8)'
        setTimeout(() => {
          card.style.display = 'none'
        }, 300)
      }
    })
  }

  getImageUrl(imagePath, projectName) {
    // Check if it's already a full path or data URL
    if (imagePath.startsWith('http') || imagePath.startsWith('data:') || imagePath.startsWith('./')) {
      return imagePath
    }
    
    // Create enhanced fallback image with gradient
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="320" height="192" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="320" height="192" fill="url(#grad)"/>
        <circle cx="270" cy="50" r="20" fill="#6366f1" opacity="0.3"/>
        <circle cx="50" cy="142" r="25" fill="#6366f1" opacity="0.2"/>
        <text x="160" y="96" dominant-baseline="middle" text-anchor="middle" 
              font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="white">
          ${projectName}
        </text>
        <text x="160" y="120" dominant-baseline="middle" text-anchor="middle" 
              font-family="Arial, sans-serif" font-size="12" fill="white" opacity="0.8">
          JavaScript Project
        </text>
        <rect x="120" y="130" width="80" height="2" fill="white" opacity="0.5" rx="1"/>
      </svg>
    `)}`
  }

  openProject(projectPath) {
    if (this.projectViewer) {
      this.projectViewer.openProject(projectPath)
    } else {
      this.openInNewTab(projectPath)
    }
  }

  openInNewTab(projectPath) {
    const fullPath = `./Awesome-JavaScript-Example/${projectPath}/index.html`
    window.open(fullPath, '_blank')
  }

  viewSource(githubPath) {
    // Open local folder in new tab for source viewing
    if (githubPath.startsWith('./')) {
      window.open(githubPath, '_blank')
    } else {
      // Fallback to GitHub if external link
      window.open(githubPath, '_blank')
    }
  }

  showErrorMessage() {
    const cardParent = document.getElementById('profile-cards')
    cardParent.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <div class="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl p-12 border border-red-500/30 backdrop-blur-sm">
          <i class="fas fa-exclamation-triangle text-6xl text-red-400 mb-6 animate-pulse"></i>
          <h3 class="text-2xl font-bold text-white mb-4">Oops! Something went wrong</h3>
          <p class="text-gray-300 mb-6 max-w-md">
            We couldn't load the projects. Please make sure the data-internal.json file exists and is accessible.
          </p>
          <button 
            onclick="projectManager.loadProjects()" 
            class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105">
            <i class="fas fa-redo mr-2"></i>
            Try Again
          </button>
        </div>
      </div>
    `
  }

  // Search functionality
  searchProjects(query) {
    const cards = document.querySelectorAll('.project-card-wrapper')
    const searchTerm = query.toLowerCase()
    
    cards.forEach(card => {
      const title = card.querySelector('h3').textContent.toLowerCase()
      const description = card.querySelector('p')?.textContent.toLowerCase() || ''
      const technologies = Array.from(card.querySelectorAll('span')).map(span => span.textContent.toLowerCase()).join(' ')
      
      const matches = title.includes(searchTerm) || 
                     description.includes(searchTerm) || 
                     technologies.includes(searchTerm)
      
      if (matches) {
        card.style.display = 'block'
        card.style.opacity = '1'
        card.style.transform = 'scale(1)'
      } else {
        card.style.opacity = '0'
        card.style.transform = 'scale(0.8)'
        setTimeout(() => {
          card.style.display = 'none'
        }, 300)
      }
    })
  }
}

// Initialize project manager
const projectManager = new InternalProjectManager()

// Load projects when page loads
jQuery(function ($) {
  projectManager.loadProjects()
  
  // Initialize filters after a short delay to ensure DOM is ready
  setTimeout(() => {
    if (typeof initializeFilters === 'function') {
      initializeFilters();
    }
  }, 500);
  
  // Add search functionality if search input exists
  const searchInput = document.getElementById('project-search')
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value
      const clearBtn = document.getElementById('clear-search')
      
      // Show/hide clear button
      if (clearBtn) {
        clearBtn.style.opacity = query.length > 0 ? '1' : '0'
      }
      
      if (query.length === 0) {
        projectManager.filterProjects(projectManager.currentFilter)
      } else {
        projectManager.searchProjects(query)
      }
    })
  }
})
