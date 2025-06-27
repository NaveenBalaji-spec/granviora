// GRANVIORA EVENT MANAGEMENT - UPGRADED VERSION
// Fixed AI Assistant and Suggestions System

// Application data
const appData = {
  "events": [
    {
      "type": "Royal & Destination Weddings",
      "description": "Luxury wedding ceremonies in exotic locations with premium vendors and bespoke planning",
      "features": ["Destination Planning", "Premium Vendors", "Custom Themes", "Full Coordination"]
    },
    {
      "type": "Traditional South Indian Weddings", 
      "description": "Authentic ceremonies honoring cultural traditions with expert coordination",
      "features": ["Cultural Expertise", "Traditional Vendors", "Ritual Coordination", "Authentic Decor"]
    },
    {
      "type": "Corporate Events",
      "description": "Professional conferences, launches, and business gatherings",
      "features": ["AV Setup", "Professional Catering", "Branding", "Technical Support"]
    },
    {
      "type": "Political Events",
      "description": "Large-scale rallies, campaigns, and governmental functions",
      "features": ["Crowd Management", "Security Coordination", "Media Relations", "Stage Setup"]
    },
    {
      "type": "Cinema Events",
      "description": "Movie premieres, award ceremonies, and entertainment galas",
      "features": ["Red Carpet Setup", "Celebrity Management", "Media Coverage", "VIP Services"]
    }
  ],
  "vendors": {
    "mandapams": [
      {"id": 1, "name": "Royal Palace Mandapam", "capacity": 500, "price": 150000, "location": "Madurai Central", "amenities": ["AC", "Parking", "Catering Hall"]},
      {"id": 2, "name": "Grand Heritage Mahal", "capacity": 800, "price": 250000, "location": "Anna Nagar", "amenities": ["AC", "Parking", "Stage", "Green Rooms"]},
      {"id": 3, "name": "Elegant Event Center", "capacity": 300, "price": 100000, "location": "Sellur", "amenities": ["AC", "Parking", "Sound System"]},
      {"id": 4, "name": "Maharaja Convention", "capacity": 1000, "price": 400000, "location": "Bypass Road", "amenities": ["AC", "Parking", "Multiple Halls", "Catering"]},
      {"id": 5, "name": "Crown Plaza Mandapam", "capacity": 600, "price": 200000, "location": "KK Nagar", "amenities": ["AC", "Parking", "Decoration", "Lighting"]}
    ],
    "catering": [
      {"id": 1, "name": "Royal Feast Catering", "pricePerPlate": 400, "minOrder": 100, "specialty": "South Indian", "contact": "9876543210"},
      {"id": 2, "name": "Spice Garden Caterers", "pricePerPlate": 350, "minOrder": 50, "specialty": "Multi-cuisine", "contact": "9876543211"},
      {"id": 3, "name": "Heritage Kitchen", "pricePerPlate": 500, "minOrder": 200, "specialty": "Traditional", "contact": "9876543212"},
      {"id": 4, "name": "Modern Meals", "pricePerPlate": 300, "minOrder": 75, "specialty": "Continental", "contact": "9876543213"}
    ],
    "photography": [
      {"id": 1, "name": "Lens Magic Studios", "packagePrice": 80000, "services": ["Photography", "Videography", "Drone"], "experience": "10 years"},
      {"id": 2, "name": "Pixel Perfect", "packagePrice": 60000, "services": ["Photography", "Editing"], "experience": "7 years"},
      {"id": 3, "name": "Royal Captures", "packagePrice": 120000, "services": ["Photography", "Videography", "Album"], "experience": "15 years"}
    ],
    "music": [
      {"id": 1, "name": "Melody Makers Band", "price": 25000, "type": "Live Band", "genres": ["Classical", "Folk", "Fusion"]},
      {"id": 2, "name": "DJ Beats", "price": 15000, "type": "DJ Service", "genres": ["Bollywood", "Western", "Electronic"]},
      {"id": 3, "name": "Cultural Orchestra", "price": 35000, "type": "Traditional", "genres": ["Carnatic", "Folk", "Devotional"]}
    ],
    "makeup": [
      {"id": 1, "name": "Glamour Studio", "price": 15000, "services": ["Bridal Makeup", "Hair Styling"], "experience": "8 years"},
      {"id": 2, "name": "Beauty Bliss", "price": 12000, "services": ["Makeup", "Mehendi"], "experience": "5 years"},
      {"id": 3, "name": "Royal Beauty", "price": 20000, "services": ["Bridal Package", "Family Makeup"], "experience": "12 years"}
    ]
  },
  "loginCredentials": {
    "granvioraowner": "sang",
    "granvioravendor": "sing",
    "granvioraworker": "sing",
    "granvioramember": "sing"
  }
};

// Global state
let currentUser = null;
let isEditMode = false;
let contentData = {};
let chatHistory = [];
let pendingApprovals = [];
let aiChatActive = false;
let messageCounter = 0;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing GRANVIORA EVENT MANAGEMENT - UPGRADED VERSION...');
    initializeApp();
    setupEventListeners();
    populateEvents();
    loadStoredContent();
    loadChatHistory();
    loadPendingApprovals();
});

// Initialize application
function initializeApp() {
    // Load saved user session
    const savedUser = localStorage.getItem('granvioraUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            showOwnerControls();
        } catch (e) {
            console.error('Error loading saved user:', e);
            localStorage.removeItem('granvioraUser');
        }
    }

    // Initialize smooth scrolling for navigation
    setupSmoothScrolling();
    
    // Initialize mobile navigation
    setupMobileNavigation();
    
    // Load saved logo
    const savedLogo = localStorage.getItem('granvioraLogo');
    if (savedLogo) {
        updateLogo(savedLogo);
    }

    // Load saved video
    const savedVideo = localStorage.getItem('granvioraVideo');
    if (savedVideo) {
        updateHeroVideo(savedVideo);
    }

    console.log('✅ Application initialized successfully');
}

// FIXED: Setup event listeners with proper error handling
function setupEventListeners() {
    console.log('🔧 Setting up event listeners...');

    try {
        // Navigation
        setupNavigationListeners();
        
        // Hero buttons
        setupHeroButtons();
        
        // Login system
        setupLoginSystem();
        
        // Owner controls
        setupOwnerControls();
        
        // Modal handlers
        setupModalHandlers();
        
        // FIXED: Suggestions system with proper form handling
        setupSuggestionsSystem();
        
        // Gallery
        setupGalleryHandlers();
        
        // Contact form
        setupContactForm();
        
        // FIXED: AI Assistant with persistent chat
        setupAIAssistant();
        
        // Editable content
        setupEditableContent();

        console.log('✅ Event listeners setup complete');
    } catch (error) {
        console.error('❌ Error setting up event listeners:', error);
    }
}

function setupNavigationListeners() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#suggestions') {
                e.preventDefault();
                openSuggestionsPage();
            } else {
                closeMobileMenu();
            }
        });
    });
}

function setupHeroButtons() {
    const exploreEventsBtn = document.getElementById('exploreEventsBtn');
    const getQuoteBtn = document.getElementById('getQuoteBtn');

    if (exploreEventsBtn) {
        exploreEventsBtn.addEventListener('click', () => {
            const eventsSection = document.getElementById('events');
            if (eventsSection) {
                eventsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (getQuoteBtn) {
        getQuoteBtn.addEventListener('click', () => {
            openSuggestionsPage();
        });
    }
}

function setupLoginSystem() {
    const loginBtn = document.getElementById('loginBtn');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const roleButtons = document.querySelectorAll('.role-btn');
    const loginForm = document.getElementById('loginForm');
    const backToRoles = document.getElementById('backToRoles');

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentUser?.role === 'owner') {
                openAnalyticsModal();
            } else {
                openLoginModal();
            }
        });
    }

    if (closeLoginModal) {
        closeLoginModal.addEventListener('click', closeLoginModalHandler);
    }

    roleButtons.forEach(btn => {
        btn.addEventListener('click', selectRole);
    });

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (backToRoles) {
        backToRoles.addEventListener('click', showRoleSelection);
    }
}

function setupOwnerControls() {
    const toggleEditMode = document.getElementById('toggleEditMode');
    const uploadLogoBtn = document.getElementById('uploadLogoBtn');
    const logoFileInput = document.getElementById('logoFileInput');
    const uploadVideoBtn = document.getElementById('uploadVideoBtn');
    const videoFileInput = document.getElementById('videoFileInput');
    const manageVendorsBtn = document.getElementById('manageVendorsBtn');
    const manageClientsBtn = document.getElementById('manageClientsBtn');
    const viewAnalytics = document.getElementById('viewAnalytics');
    const logoutBtn = document.getElementById('logoutBtn');
    const logoContainer = document.getElementById('logoContainer');

    if (toggleEditMode) {
        toggleEditMode.addEventListener('click', toggleEditModeHandler);
    }

    if (uploadLogoBtn) {
        uploadLogoBtn.addEventListener('click', () => {
            if (logoFileInput) logoFileInput.click();
        });
    }

    if (logoFileInput) {
        logoFileInput.addEventListener('change', handleLogoUpload);
    }

    if (uploadVideoBtn) {
        uploadVideoBtn.addEventListener('click', () => {
            if (videoFileInput) videoFileInput.click();
        });
    }

    if (videoFileInput) {
        videoFileInput.addEventListener('change', handleVideoUpload);
    }

    if (manageVendorsBtn) {
        manageVendorsBtn.addEventListener('click', openVendorModal);
    }

    if (manageClientsBtn) {
        manageClientsBtn.addEventListener('click', openClientModal);
    }

    if (viewAnalytics) {
        viewAnalytics.addEventListener('click', openAnalyticsModal);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    if (logoContainer) {
        logoContainer.addEventListener('click', handleLogoClick);
    }
}

function setupModalHandlers() {
    const closeButtons = [
        'closeAnalyticsModal',
        'closeVendorModal',
        'closeClientModal'
    ];

    closeButtons.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal-overlay');
                if (modal) modal.style.display = 'none';
            });
        }
    });

    // Close modals on overlay click
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.style.display = 'none';
        }
    });
}

// FIXED: Suggestions system with proper form handling
function setupSuggestionsSystem() {
    const closeSuggestions = document.getElementById('closeSuggestions');
    const budgetForm = document.getElementById('budgetForm');

    if (closeSuggestions) {
        closeSuggestions.addEventListener('click', closeSuggestionsPage);
    }

    // FIXED: Use form submit event instead of button click
    if (budgetForm) {
        budgetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            generateRecommendations();
        });
    }
}

function setupGalleryHandlers() {
    const uploadGalleryBtn = document.getElementById('uploadGalleryBtn');
    const galleryFileInput = document.getElementById('galleryFileInput');

    if (uploadGalleryBtn && galleryFileInput) {
        uploadGalleryBtn.addEventListener('click', () => galleryFileInput.click());
        galleryFileInput.addEventListener('change', handleGalleryUpload);
    }
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
}

// FIXED: AI Assistant with persistent chat and proper event handling
function setupAIAssistant() {
    const aiToggle = document.getElementById('aiToggle');
    const aiClose = document.getElementById('aiClose');
    const aiSend = document.getElementById('aiSend');
    const aiInput = document.getElementById('aiInput');

    if (aiToggle) {
        aiToggle.addEventListener('click', toggleAIChat);
    }

    if (aiClose) {
        aiClose.addEventListener('click', closeAIChat);
    }

    if (aiSend) {
        aiSend.addEventListener('click', function(e) {
            e.preventDefault();
            sendAIMessage();
        });
    }

    if (aiInput) {
        // FIXED: Prevent event listener duplication
        aiInput.removeEventListener('keypress', handleAIInputKeypress);
        aiInput.addEventListener('keypress', handleAIInputKeypress);
        
        // FIXED: Prevent form submission issues
        aiInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendAIMessage();
            }
        });
    }

    console.log('✅ AI Assistant setup complete');
}

// FIXED: Separate keypress handler to prevent duplicates
function handleAIInputKeypress(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendAIMessage();
    }
}

// Navigation functions
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#suggestions') {
                return; // Handle suggestions separately
            }
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu) navMenu.classList.toggle('active');
    if (navToggle) navToggle.classList.toggle('active');
}

function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu) navMenu.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
}

// Authentication functions
function openLoginModal() {
    console.log('Opening login modal...');
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'flex';
        showRoleSelection();
    }
}

function closeLoginModalHandler() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function selectRole(e) {
    const role = e.currentTarget.dataset.role;
    console.log('Selected role:', role);
    
    const roleSelection = document.getElementById('roleSelection');
    const loginForm = document.getElementById('loginForm');
    
    if (roleSelection) roleSelection.style.display = 'none';
    if (loginForm) loginForm.style.display = 'block';
    
    // Clear form and disable autofill
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    
    if (username) {
        username.value = '';
        username.setAttribute('autocomplete', 'off');
    }
    if (password) {
        password.value = '';
        password.setAttribute('autocomplete', 'off');
    }
    
    // Focus username field
    if (username) username.focus();
}

function showRoleSelection() {
    const roleSelection = document.getElementById('roleSelection');
    const loginForm = document.getElementById('loginForm');
    
    if (roleSelection) roleSelection.style.display = 'block';
    if (loginForm) loginForm.style.display = 'none';
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    console.log('Login attempt:', username);
    
    if (appData.loginCredentials[username] && appData.loginCredentials[username] === password) {
        let role = 'member';
        if (username === 'granvioraowner') role = 'owner';
        else if (username === 'granvioravendor') role = 'vendor';
        else if (username === 'granvioraworker') role = 'worker';
        
        currentUser = { role, username };
        localStorage.setItem('granvioraUser', JSON.stringify(currentUser));
        
        if (role === 'owner') {
            showOwnerControls();
        }
        
        closeLoginModalHandler();
        showSuccessMessage(`Welcome back, ${role.charAt(0).toUpperCase() + role.slice(1)}!`);
    } else {
        showErrorMessage('Invalid credentials. Please try again.');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('granvioraUser');
    hideOwnerControls();
    if (isEditMode) {
        toggleEditModeHandler();
    }
    showSuccessMessage('Logged out successfully.');
}

// Owner functionality
function showOwnerControls() {
    if (currentUser?.role === 'owner') {
        const editControls = document.getElementById('editControls');
        const galleryUpload = document.getElementById('galleryUpload');
        const loginBtn = document.getElementById('loginBtn');
        
        if (editControls) editControls.style.display = 'flex';
        if (galleryUpload) galleryUpload.style.display = 'block';
        if (loginBtn) {
            loginBtn.textContent = 'Owner Panel';
        }
    }
}

function hideOwnerControls() {
    const editControls = document.getElementById('editControls');
    const galleryUpload = document.getElementById('galleryUpload');
    const loginBtn = document.getElementById('loginBtn');
    
    if (editControls) editControls.style.display = 'none';
    if (galleryUpload) galleryUpload.style.display = 'none';
    if (loginBtn) {
        loginBtn.textContent = 'Login';
    }
    
    document.body.classList.remove('edit-mode');
}

function toggleEditModeHandler() {
    isEditMode = !isEditMode;
    const toggleBtn = document.getElementById('toggleEditMode');
    
    if (isEditMode) {
        document.body.classList.add('edit-mode');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
            toggleBtn.classList.remove('btn--secondary');
            toggleBtn.classList.add('btn--primary');
        }
    } else {
        document.body.classList.remove('edit-mode');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Mode';
            toggleBtn.classList.remove('btn--primary');
            toggleBtn.classList.add('btn--secondary');
        }
        saveContent();
    }
}

function handleLogoClick() {
    if (currentUser?.role === 'owner') {
        const logoFileInput = document.getElementById('logoFileInput');
        if (logoFileInput) logoFileInput.click();
    }
}

function handleLogoUpload(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const logoData = e.target.result;
            updateLogo(logoData);
            localStorage.setItem('granvioraLogo', logoData);
            showSuccessMessage('Logo updated successfully!');
        };
        reader.readAsDataURL(file);
    }
}

function updateLogo(logoData) {
    const logoContainer = document.getElementById('logoContainer');
    if (logoContainer) {
        logoContainer.innerHTML = `<img src="${logoData}" alt="GRANVIORA Logo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">`;
    }
}

function handleVideoUpload(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const videoData = e.target.result;
            updateHeroVideo(videoData);
            localStorage.setItem('granvioraVideo', videoData);
            showSuccessMessage('Video uploaded successfully!');
        };
        reader.readAsDataURL(file);
    }
}

function updateHeroVideo(videoData) {
    const heroVideoContainer = document.getElementById('heroVideoContainer');
    if (heroVideoContainer) {
        heroVideoContainer.innerHTML = `
            <video autoplay muted loop style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1;">
                <source src="${videoData}" type="video/mp4">
            </video>
        `;
    }
}

function openAnalyticsModal() {
    const modal = document.getElementById('analyticsModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Vendor and Client Management
function openVendorModal() {
    const modal = document.getElementById('vendorModal');
    if (modal) {
        modal.style.display = 'flex';
        loadVendorList();
    }
}

function openClientModal() {
    const modal = document.getElementById('clientModal');
    if (modal) {
        modal.style.display = 'flex';
        loadClientList();
    }
}

function loadVendorList() {
    const vendorList = document.getElementById('vendorList');
    if (!vendorList) return;

    vendorList.innerHTML = '';
    
    Object.entries(appData.vendors).forEach(([category, vendors]) => {
        vendors.forEach(vendor => {
            const vendorCard = document.createElement('div');
            vendorCard.className = 'vendor-card';
            vendorCard.innerHTML = `
                <h4>${vendor.name}</h4>
                <p>Category: ${category}</p>
                <p>Price: ₹${(vendor.price || vendor.pricePerPlate || vendor.packagePrice || 'N/A').toLocaleString()}</p>
                <button class="btn btn--outline btn--sm" onclick="removeVendor('${category}', ${vendor.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            `;
            vendorList.appendChild(vendorCard);
        });
    });
}

function loadClientList() {
    const clientList = document.getElementById('clientList');
    if (!clientList) return;

    const clients = [
        {id: 1, name: "Raj & Priya", event: "Wedding", feedback: "Absolutely amazing service! Perfect execution.", rating: 5},
        {id: 2, name: "TechCorp Industries", event: "Corporate", feedback: "Professional and seamless event management.", rating: 5},
        {id: 3, name: "Sharma Family", event: "Anniversary", feedback: "Beautiful arrangements and excellent coordination.", rating: 4}
    ];

    clientList.innerHTML = '';
    
    clients.forEach(client => {
        const clientCard = document.createElement('div');
        clientCard.className = 'client-card';
        clientCard.innerHTML = `
            <h4>${client.name}</h4>
            <p>Event: ${client.event}</p>
            <p>Rating: ${'★'.repeat(client.rating)}</p>
            <p>Feedback: ${client.feedback}</p>
            <button class="btn btn--outline btn--sm" onclick="removeClient(${client.id})">
                <i class="fas fa-trash"></i> Remove
            </button>
        `;
        clientList.appendChild(clientCard);
    });
}

// Content management
function setupEditableContent() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', handleEditableClick);
    });
}

function handleEditableClick(e) {
    if (!isEditMode) return;
    
    const element = e.currentTarget;
    const currentText = element.textContent;
    const field = element.dataset.field;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'form-control';
    input.style.margin = '0';
    input.style.background = 'rgba(212, 175, 55, 0.1)';
    
    element.replaceWith(input);
    input.focus();
    input.select();
    
    input.addEventListener('blur', () => finishEditing(input, element, field));
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            input.blur();
        }
    });
}

function finishEditing(input, originalElement, field) {
    const newValue = input.value;
    originalElement.textContent = newValue;
    input.replaceWith(originalElement);
    
    // Store the change
    contentData[field] = newValue;
}

function saveContent() {
    localStorage.setItem('granvioraContent', JSON.stringify(contentData));
    showSuccessMessage('Content saved successfully!');
}

function loadStoredContent() {
    const stored = localStorage.getItem('granvioraContent');
    if (stored) {
        try {
            contentData = JSON.parse(stored);
            
            Object.entries(contentData).forEach(([field, value]) => {
                const element = document.querySelector(`[data-field="${field}"]`);
                if (element) {
                    element.textContent = value;
                }
            });
        } catch (e) {
            console.error('Error loading stored content:', e);
        }
    }
}

// Events functionality
function populateEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;
    
    eventsGrid.innerHTML = '';
    
    appData.events.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    card.innerHTML = `
        <div class="event-image">
            <div class="event-placeholder">
                <i class="fas fa-calendar-alt"></i>
                <p>${event.type}</p>
            </div>
        </div>
        <div class="event-content">
            <h3 class="event-title">${event.type}</h3>
            <p class="event-description">${event.description}</p>
            <div class="event-features">
                ${event.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// FIXED: Suggestions system with proper form validation and display
function openSuggestionsPage() {
    console.log('🎯 Opening suggestions page...');
    const suggestionsPage = document.getElementById('suggestionsPage');
    if (suggestionsPage) {
        suggestionsPage.style.display = 'block';
        
        // Reset form
        const budgetForm = document.getElementById('budgetForm');
        if (budgetForm) {
            budgetForm.reset();
        }
        
        // Hide recommendations initially
        const recommendations = document.getElementById('recommendations');
        if (recommendations) {
            recommendations.style.display = 'none';
        }
        
        // Show owner approval panel if owner is logged in
        const ownerApproval = document.getElementById('ownerApproval');
        if (ownerApproval && currentUser?.role === 'owner') {
            ownerApproval.style.display = 'block';
            loadPendingApprovals();
        }
    }
}

function closeSuggestionsPage() {
    const suggestionsPage = document.getElementById('suggestionsPage');
    if (suggestionsPage) {
        suggestionsPage.style.display = 'none';
    }
}

// FIXED: Generate recommendations with proper validation and display
function generateRecommendations() {
    console.log('🎯 Generating recommendations...');
    
    const eventTypeSelect = document.getElementById('eventTypeSelect');
    const budgetInput = document.getElementById('budgetInput');
    const guestsInput = document.getElementById('guestsInput');
    
    if (!eventTypeSelect || !budgetInput || !guestsInput) {
        console.error('❌ Form elements not found');
        return;
    }
    
    const eventType = eventTypeSelect.value;
    const budget = parseInt(budgetInput.value);
    const guests = parseInt(guestsInput.value);
    
    console.log('📊 Form data:', { eventType, budget, guests });
    
    // FIXED: Proper form validation
    if (!eventType || !budget || !guests || budget < 50000 || guests < 50) {
        showErrorMessage('Please fill in all fields correctly. Minimum budget: ₹50,000, Minimum guests: 50');
        return;
    }
    
    try {
        const recommendations = getVendorRecommendations(budget, guests, eventType);
        displayRecommendations(recommendations, budget, guests, eventType);
        
        // Add to pending approvals for owner
        const approvalData = {
            id: Date.now(),
            budget,
            guests,
            eventType,
            recommendations,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
        
        pendingApprovals.push(approvalData);
        savePendingApprovals();
        
        showSuccessMessage('Recommendations generated successfully!');
    } catch (error) {
        console.error('❌ Error generating recommendations:', error);
        showErrorMessage('Error generating recommendations. Please try again.');
    }
}

function getVendorRecommendations(budget, guests, eventType) {
    console.log('🔍 Getting vendor recommendations for:', { budget, guests, eventType });
    
    const recommendations = {};
    
    // Calculate budget allocation percentages
    const allocations = {
        mandapams: 0.35, // 35% for venue
        catering: 0.30,  // 30% for catering
        photography: 0.15, // 15% for photography
        music: 0.10,     // 10% for entertainment
        makeup: 0.10     // 10% for makeup/decoration
    };
    
    Object.entries(allocations).forEach(([category, percentage]) => {
        const categoryBudget = budget * percentage;
        const vendors = appData.vendors[category] || [];
        
        console.log(`💰 ${category} budget: ₹${categoryBudget.toLocaleString()}`);
        
        recommendations[category] = vendors.filter(vendor => {
            switch(category) {
                case 'mandapams':
                    return vendor.capacity >= guests && vendor.price <= categoryBudget;
                case 'catering':
                    return (vendor.pricePerPlate * guests) <= categoryBudget && guests >= (vendor.minOrder || 0);
                case 'photography':
                    return vendor.packagePrice <= categoryBudget;
                case 'music':
                case 'makeup':
                    return vendor.price <= categoryBudget;
                default:
                    return false;
            }
        }).slice(0, 3); // Limit to top 3 recommendations per category
    });
    
    console.log('📋 Generated recommendations:', recommendations);
    return recommendations;
}

// FIXED: Display recommendations with proper styling and information
function displayRecommendations(recommendations, budget, guests, eventType) {
    console.log('🎨 Displaying recommendations...');
    
    const recommendationsDiv = document.getElementById('recommendations');
    const recommendationsGrid = document.getElementById('recommendationsGrid');
    const budgetSummary = document.getElementById('budgetSummary');
    
    if (!recommendationsDiv || !recommendationsGrid) {
        console.error('❌ Recommendations elements not found');
        return;
    }
    
    // Show recommendations section
    recommendationsDiv.style.display = 'block';
    
    // Clear previous content
    recommendationsGrid.innerHTML = '';
    
    // Display budget summary
    if (budgetSummary) {
        budgetSummary.innerHTML = `
            <p><strong>Event Type:</strong> ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}</p>
            <p><strong>Total Budget:</strong> ₹${budget.toLocaleString()}</p>
            <p><strong>Guests:</strong> ${guests}</p>
        `;
    }
    
    // Calculate total estimated cost
    let totalCost = 0;
    const profitMargin = 0.25; // 25% profit margin
    
    const categories = [
        { key: 'mandapams', title: 'Venues', icon: 'fas fa-building' },
        { key: 'catering', title: 'Catering', icon: 'fas fa-utensils' },
        { key: 'photography', title: 'Photography', icon: 'fas fa-camera' },
        { key: 'music', title: 'Music & Entertainment', icon: 'fas fa-music' },
        { key: 'makeup', title: 'Makeup & Styling', icon: 'fas fa-palette' }
    ];
    
    let hasRecommendations = false;
    
    categories.forEach(category => {
        if (recommendations[category.key] && recommendations[category.key].length > 0) {
            hasRecommendations = true;
            
            // Create category section
            const categorySection = document.createElement('div');
            categorySection.className = 'recommendation-category';
            categorySection.innerHTML = `
                <h3><i class="${category.icon}"></i> ${category.title}</h3>
                <div class="vendor-grid" id="${category.key}Grid"></div>
            `;
            
            const vendorGrid = categorySection.querySelector('.vendor-grid');
            
            // Add vendor cards
            recommendations[category.key].forEach(vendor => {
                const vendorCard = createVendorRecommendationCard(vendor, category.key, guests);
                vendorGrid.appendChild(vendorCard);
                
                // Calculate cost for first vendor as example
                if (vendorGrid.children.length === 1) {
                    switch(category.key) {
                        case 'catering':
                            totalCost += vendor.pricePerPlate * guests;
                            break;
                        case 'photography':
                            totalCost += vendor.packagePrice;
                            break;
                        default:
                            totalCost += vendor.price || 0;
                    }
                }
            });
            
            recommendationsGrid.appendChild(categorySection);
        }
    });
    
    if (!hasRecommendations) {
        recommendationsGrid.innerHTML = `
            <div class="recommendation-card" style="grid-column: 1 / -1;">
                <h3>No Suitable Vendors Found</h3>
                <p>We couldn't find vendors that match your budget and requirements. Please try:</p>
                <ul>
                    <li>Increasing your budget</li>
                    <li>Reducing the number of guests</li>
                    <li>Contacting us directly for custom packages</li>
                </ul>
                <button class="btn btn--primary" onclick="contactDirectly()">Contact Us Directly</button>
            </div>
        `;
    } else {
        // Show cost analysis for owner
        if (currentUser?.role === 'owner') {
            const costAnalysis = document.createElement('div');
            costAnalysis.className = 'cost-analysis';
            costAnalysis.innerHTML = `
                <h3>💰 Cost Analysis (Owner View)</h3>
                <div class="cost-breakdown">
                    <p><strong>Estimated Vendor Cost:</strong> ₹${totalCost.toLocaleString()}</p>
                    <p><strong>Suggested Profit (${(profitMargin * 100)}%):</strong> ₹${(totalCost * profitMargin).toLocaleString()}</p>
                    <p><strong>Total Quote to Client:</strong> ₹${(totalCost * (1 + profitMargin)).toLocaleString()}</p>
                    <p><strong>Budget vs Quote:</strong> <span style="color: ${budget >= (totalCost * (1 + profitMargin)) ? 'var(--color-success)' : 'var(--color-error)'}">${budget >= (totalCost * (1 + profitMargin)) ? '✅ Within Budget' : '❌ Over Budget'}</span></p>
                    <p><strong>Risk Assessment:</strong> <span style="color: ${budget >= (totalCost * (1 + profitMargin)) ? 'var(--color-success)' : 'var(--color-warning)'}">${budget >= (totalCost * (1 + profitMargin)) ? '🟢 Low Risk' : '🟡 High Risk'}</span></p>
                </div>
            `;
            recommendationsGrid.appendChild(costAnalysis);
        }
    }
    
    console.log('✅ Recommendations displayed successfully');
}

function createVendorRecommendationCard(vendor, category, guests) {
    const card = document.createElement('div');
    card.className = 'recommendation-card';
    
    let details = '';
    let pricing = '';
    
    // Show pricing only to owner
    if (currentUser?.role === 'owner') {
        switch(category) {
            case 'mandapams':
                pricing = `<p><strong>💰 Price:</strong> ₹${vendor.price.toLocaleString()}</p>`;
                details = `
                    <p><strong>👥 Capacity:</strong> ${vendor.capacity} guests</p>
                    <p><strong>📍 Location:</strong> ${vendor.location}</p>
                    <p><strong>🎯 Amenities:</strong> ${vendor.amenities.join(', ')}</p>
                `;
                break;
            case 'catering':
                pricing = `<p><strong>💰 Price per plate:</strong> ₹${vendor.pricePerPlate}</p>
                           <p><strong>💰 Total for ${guests} guests:</strong> ₹${(vendor.pricePerPlate * guests).toLocaleString()}</p>`;
                details = `
                    <p><strong>🍽️ Specialty:</strong> ${vendor.specialty}</p>
                    <p><strong>📦 Minimum Order:</strong> ${vendor.minOrder} plates</p>
                `;
                break;
            case 'photography':
                pricing = `<p><strong>💰 Package Price:</strong> ₹${vendor.packagePrice.toLocaleString()}</p>`;
                details = `
                    <p><strong>📷 Services:</strong> ${vendor.services.join(', ')}</p>
                    <p><strong>⭐ Experience:</strong> ${vendor.experience}</p>
                `;
                break;
            case 'music':
                pricing = `<p><strong>💰 Price:</strong> ₹${vendor.price.toLocaleString()}</p>`;
                details = `
                    <p><strong>🎵 Type:</strong> ${vendor.type}</p>
                    <p><strong>🎶 Genres:</strong> ${vendor.genres.join(', ')}</p>
                `;
                break;
            case 'makeup':
                pricing = `<p><strong>💰 Price:</strong> ₹${vendor.price.toLocaleString()}</p>`;
                details = `
                    <p><strong>💄 Services:</strong> ${vendor.services.join(', ')}</p>
                    <p><strong>⭐ Experience:</strong> ${vendor.experience}</p>
                `;
                break;
        }
    } else {
        // Hide pricing for regular users, show only services
        switch(category) {
            case 'mandapams':
                details = `
                    <p><strong>👥 Capacity:</strong> ${vendor.capacity} guests</p>
                    <p><strong>📍 Location:</strong> ${vendor.location}</p>
                    <p><strong>🎯 Amenities:</strong> ${vendor.amenities.join(', ')}</p>
                `;
                break;
            case 'catering':
                details = `
                    <p><strong>🍽️ Specialty:</strong> ${vendor.specialty}</p>
                    <p><strong>📦 Minimum Order:</strong> ${vendor.minOrder} plates</p>
                `;
                break;
            case 'photography':
                details = `
                    <p><strong>📷 Services:</strong> ${vendor.services.join(', ')}</p>
                    <p><strong>⭐ Experience:</strong> ${vendor.experience}</p>
                `;
                break;
            case 'music':
                details = `
                    <p><strong>🎵 Type:</strong> ${vendor.type}</p>
                    <p><strong>🎶 Genres:</strong> ${vendor.genres.join(', ')}</p>
                `;
                break;
            case 'makeup':
                details = `
                    <p><strong>💄 Services:</strong> ${vendor.services.join(', ')}</p>
                    <p><strong>⭐ Experience:</strong> ${vendor.experience}</p>
                `;
                break;
        }
    }
    
    card.innerHTML = `
        <h4>${vendor.name}</h4>
        ${details}
        ${pricing}
        <button class="btn btn--primary btn--sm" onclick="contactVendor('${vendor.name}')">
            📞 Contact Vendor
        </button>
    `;
    
    return card;
}

function contactVendor(vendorName) {
    showSuccessMessage(`📞 Contact request sent to ${vendorName}. They will reach out to you soon!`);
}

function contactDirectly() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        closeSuggestionsPage();
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Pending approvals management
function loadPendingApprovals() {
    const stored = localStorage.getItem('granvioraPendingApprovals');
    if (stored) {
        try {
            pendingApprovals = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading pending approvals:', e);
            pendingApprovals = [];
        }
    }
    
    const approvalCards = document.getElementById('approvalCards');
    if (!approvalCards) return;
    
    approvalCards.innerHTML = '';
    
    pendingApprovals.filter(approval => approval.status === 'pending').forEach(approval => {
        const card = document.createElement('div');
        card.className = 'approval-card';
        card.innerHTML = `
            <h4>💰 Budget Request: ₹${approval.budget.toLocaleString()}</h4>
            <p>🎉 Event: ${approval.eventType} | 👥 Guests: ${approval.guests}</p>
            <p>📅 Date: ${new Date(approval.timestamp).toLocaleDateString()}</p>
            <div class="approval-actions">
                <button class="btn btn--primary btn--sm" onclick="approveRequest(${approval.id})">✅ Approve</button>
                <button class="btn btn--outline btn--sm" onclick="rejectRequest(${approval.id})">❌ Reject</button>
            </div>
        `;
        approvalCards.appendChild(card);
    });
}

function savePendingApprovals() {
    localStorage.setItem('granvioraPendingApprovals', JSON.stringify(pendingApprovals));
}

function approveRequest(approvalId) {
    const approvalIndex = pendingApprovals.findIndex(a => a.id === approvalId);
    if (approvalIndex !== -1) {
        pendingApprovals[approvalIndex].status = 'approved';
        savePendingApprovals();
        loadPendingApprovals();
        showSuccessMessage('✅ Request approved successfully!');
    }
}

function rejectRequest(approvalId) {
    const approvalIndex = pendingApprovals.findIndex(a => a.id === approvalId);
    if (approvalIndex !== -1) {
        pendingApprovals[approvalIndex].status = 'rejected';
        savePendingApprovals();
        loadPendingApprovals();
        showSuccessMessage('❌ Request rejected.');
    }
}

// Gallery functionality
function handleGalleryUpload(e) {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                addGalleryItem(e.target.result, file.type);
            };
            reader.readAsDataURL(file);
        }
    });
}

function addGalleryItem(src, type) {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    const item = document.createElement('div');
    item.className = 'gallery-item';
    
    if (type.startsWith('image/')) {
        item.innerHTML = `<img src="${src}" alt="Gallery Image" style="width: 100%; height: 100%; object-fit: cover;">`;
    } else {
        item.innerHTML = `<video src="${src}" style="width: 100%; height: 100%; object-fit: cover;" controls></video>`;
    }
    
    galleryGrid.appendChild(item);
    showSuccessMessage('📸 Media added to gallery successfully!');
}

// Contact form with email functionality
function handleContactForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Store contact data
    const contacts = JSON.parse(localStorage.getItem('granvioraContacts') || '[]');
    contacts.push(contactData);
    localStorage.setItem('granvioraContacts', JSON.stringify(contacts));
    
    showSuccessMessage('📧 Thank you for your inquiry! We have received your message and will contact you soon. An automatic email has been sent to granvioraevents@gmail.com.');
    e.target.reset();
}

// FIXED: AI Assistant with persistent chat functionality
function toggleAIChat() {
    const aiChat = document.getElementById('aiChat');
    if (aiChat) {
        const isVisible = aiChat.style.display === 'block';
        aiChat.style.display = isVisible ? 'none' : 'block';
        
        if (!isVisible) {
            aiChatActive = true;
            loadChatHistory();
            
            // Focus on input when opening
            const aiInput = document.getElementById('aiInput');
            if (aiInput) {
                setTimeout(() => aiInput.focus(), 100);
            }
        } else {
            aiChatActive = false;
        }
    }
}

function closeAIChat() {
    const aiChat = document.getElementById('aiChat');
    if (aiChat) {
        aiChat.style.display = 'none';
        aiChatActive = false;
    }
}

// FIXED: Send AI message with proper error handling and persistence
function sendAIMessage() {
    const input = document.getElementById('aiInput');
    const sendBtn = document.getElementById('aiSend');
    
    if (!input || !aiChatActive) return;
    
    const message = input.value.trim();
    
    if (!message) {
        console.log('Empty message, not sending');
        return;
    }
    
    console.log('🤖 Sending AI message:', message);
    
    // Disable input temporarily
    input.disabled = true;
    if (sendBtn) sendBtn.disabled = true;
    
    try {
        // Add user message
        addAIMessage(message, 'user');
        input.value = '';
        
        // Add to chat history
        messageCounter++;
        const userMessageData = { 
            id: messageCounter,
            message, 
            sender: 'user', 
            timestamp: Date.now() 
        };
        chatHistory.push(userMessageData);
        
        // Show typing indicator
        const typingMessage = addAIMessage('⏳ Thinking...', 'bot', true);
        
        // Generate AI response with delay
        setTimeout(() => {
            try {
                // Remove typing indicator
                if (typingMessage) {
                    typingMessage.remove();
                }
                
                const response = generateAIResponse(message);
                addAIMessage(response, 'bot');
                
                // Add bot response to history
                messageCounter++;
                const botMessageData = { 
                    id: messageCounter,
                    message: response, 
                    sender: 'bot', 
                    timestamp: Date.now() 
                };
                chatHistory.push(botMessageData);
                
                // Save chat history
                saveChatHistory();
                
                console.log('✅ AI response sent successfully');
            } catch (error) {
                console.error('❌ Error generating AI response:', error);
                addAIMessage('Sorry, I encountered an error. Please try again.', 'bot');
            }
            
            // Re-enable input
            input.disabled = false;
            if (sendBtn) sendBtn.disabled = false;
            input.focus();
        }, 1000 + Math.random() * 1000); // Random delay 1-2 seconds
        
    } catch (error) {
        console.error('❌ Error sending AI message:', error);
        input.disabled = false;
        if (sendBtn) sendBtn.disabled = false;
        showErrorMessage('Error sending message. Please try again.');
    }
}

// FIXED: Add AI message with proper DOM handling
function addAIMessage(message, sender, isTemporary = false) {
    const messagesContainer = document.getElementById('aiMessages');
    if (!messagesContainer) {
        console.error('❌ AI messages container not found');
        return null;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `ai-message ai-message--${sender}`;
    if (isTemporary) {
        messageDiv.classList.add('ai-message--temporary');
    }
    
    const messageP = document.createElement('p');
    messageP.textContent = message;
    messageDiv.appendChild(messageP);
    
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    console.log(`💬 Added ${sender} message:`, message);
    return messageDiv;
}

function loadChatHistory() {
    const stored = localStorage.getItem('granvioraChatHistory');
    if (stored) {
        try {
            chatHistory = JSON.parse(stored);
            
            const messagesContainer = document.getElementById('aiMessages');
            if (messagesContainer) {
                // Keep welcome message and clear the rest
                const welcomeMessage = messagesContainer.querySelector('.ai-message--bot');
                const welcomeText = welcomeMessage ? welcomeMessage.textContent : '';
                
                messagesContainer.innerHTML = '';
                
                // Re-add welcome message if it existed
                if (welcomeText) {
                    addAIMessage(welcomeText, 'bot');
                }
                
                // Load chat history
                chatHistory.forEach(chat => {
                    addAIMessage(chat.message, chat.sender);
                });
                
                console.log(`📚 Loaded ${chatHistory.length} chat messages`);
            }
        } catch (e) {
            console.error('❌ Error loading chat history:', e);
            chatHistory = [];
        }
    }
}

function saveChatHistory() {
    try {
        localStorage.setItem('granvioraChatHistory', JSON.stringify(chatHistory));
        console.log(`💾 Saved ${chatHistory.length} chat messages`);
    } catch (e) {
        console.error('❌ Error saving chat history:', e);
    }
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Owner-specific responses
    if (currentUser?.role === 'owner') {
        if (lowerMessage.includes('revenue') || lowerMessage.includes('profit') || lowerMessage.includes('money')) {
            return "💰 Your current revenue is ₹45,67,890 with a 23% profit margin. Consider optimizing vendor costs for better margins. You can view detailed analytics in the Owner Panel.";
        }
        if (lowerMessage.includes('analytics') || lowerMessage.includes('data') || lowerMessage.includes('stats')) {
            return "📊 Analytics Overview: 127 total events, 89 active clients, 156 partner vendors. Monthly growth: 15%. Check the Analytics Dashboard for detailed insights.";
        }
        if (lowerMessage.includes('vendor') || lowerMessage.includes('manage') || lowerMessage.includes('business')) {
            return "🏪 Vendor Management: Use the Owner Panel to add/remove vendors, set pricing, and approve client requests. Current vendor satisfaction: 94%.";
        }
        return "👑 As the owner, you have full control over content editing, vendor management, client relations, and business analytics. How can I help you optimize GRANVIORA today?";
    }
    
    // General responses
    if (lowerMessage.includes('wedding') || lowerMessage.includes('marriage') || lowerMessage.includes('bride')) {
        return "💒 I can help you plan the perfect wedding! GRANVIORA specializes in royal destination weddings and traditional South Indian ceremonies. Our packages include venue selection, catering, photography, and decoration. What's your budget range and guest count?";
    }
    if (lowerMessage.includes('corporate') || lowerMessage.includes('business') || lowerMessage.includes('conference')) {
        return "🏢 For corporate events, we provide professional setups with AV equipment, catering, branding, and technical support. Our team has experience with product launches, conferences, and business galas. How many attendees are you expecting?";
    }
    if (lowerMessage.includes('budget') || lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('money')) {
        return "💰 Budget planning is crucial! Use our Budget Planner in the Suggestions section to get personalized recommendations. We work with budgets from ₹50,000 to ₹10,00,000+. What's your estimated budget?";
    }
    if (lowerMessage.includes('venue') || lowerMessage.includes('mandapam') || lowerMessage.includes('hall') || lowerMessage.includes('location')) {
        return "🏛️ We have premium venues like Royal Palace Mandapam, Grand Heritage Mahal, and Maharaja Convention. Capacity ranges from 300-1000 guests with features like AC, parking, and catering facilities. Would you like specific recommendations based on your guest count?";
    }
    if (lowerMessage.includes('catering') || lowerMessage.includes('food') || lowerMessage.includes('dining')) {
        return "🍽️ Our catering partners offer South Indian, Multi-cuisine, and Traditional options. Prices range from ₹300-500 per plate with experienced chefs. We can accommodate 50-2000 guests. What type of cuisine are you looking for?";
    }
    if (lowerMessage.includes('photography') || lowerMessage.includes('video') || lowerMessage.includes('camera')) {
        return "📸 We work with professional photographers offering wedding, corporate, and event coverage. Services include 4K video, drone footage, and candid photography starting from ₹60,000. What type of coverage do you need?";
    }
    if (lowerMessage.includes('decoration') || lowerMessage.includes('decor') || lowerMessage.includes('flowers')) {
        return "🌸 Our decoration partners specialize in traditional, modern, and theme-based setups. Services include floral arrangements, lighting, and stage decoration. Packages start from ₹50,000. What's your preferred style?";
    }
    if (lowerMessage.includes('music') || lowerMessage.includes('band') || lowerMessage.includes('dj') || lowerMessage.includes('entertainment')) {
        return "🎵 Entertainment options include live bands, DJ services, and traditional orchestras. Genres: Classical, Folk, Bollywood, Western. Prices range from ₹15,000-35,000. What type of music do you prefer?";
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
        return "📞 Contact GRANVIORA: Email: granvioraevents@gmail.com | Phone: +91 98765 43210 | Address: 123 Anna Nagar, Madurai. You can also use the contact form on our website for detailed inquiries.";
    }
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        return "🙏 You're welcome! GRANVIORA is committed to making your events unforgettable. Is there anything else you'd like to know about our services?";
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "👋 Hello! Welcome to GRANVIORA EVENT MANAGEMENT. I'm here to help you plan the perfect event. What kind of celebration are you organizing?";
    }
    
    // Default response
    return "✨ I'm here to help with all your event planning needs! You can ask me about:\n\n🎉 Event types (weddings, corporate, parties)\n💰 Budget planning and recommendations\n🏛️ Venues and catering\n📸 Photography and decoration\n🎵 Music and entertainment\n📞 Contact information\n\nHow can I make your event extraordinary?";
}

// Utility functions
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: ${type === 'success' ? 'var(--color-success)' : 'var(--color-error)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: var(--shadow-glass);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        font-family: var(--font-family-base);
        max-width: 400px;
        word-wrap: break-word;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .ai-message--temporary {
        opacity: 0.7;
        font-style: italic;
    }
`;
document.head.appendChild(style);

// Global functions for onclick handlers
window.contactVendor = contactVendor;
window.contactDirectly = contactDirectly;
window.approveRequest = approveRequest;
window.rejectRequest = rejectRequest;
window.removeVendor = function(category, vendorId) {
    console.log('Removing vendor:', category, vendorId);
    showSuccessMessage('Vendor removal functionality would be implemented here.');
};
window.removeClient = function(clientId) {
    console.log('Removing client:', clientId);
    showSuccessMessage('Client removal functionality would be implemented here.');
};

// Prevent form auto-fill and handle autofill issues
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.setAttribute('autocomplete', 'off');
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.setAttribute('autocomplete', 'off');
        });
    });
});

console.log('🎉 GRANVIORA EVENT MANAGEMENT - UPGRADED VERSION loaded successfully!');
// ✅ Setup AI Assistant Send Button
function setupAIAssistant() {
    const aiInput = document.getElementById("aiInput");
    const aiSend = document.getElementById("aiSend");
    const aiChatBody = document.getElementById("aiChatBody");

    function sendMessage() {
        const message = aiInput.value.trim();
        if (!message) return;
        const userMsg = document.createElement("div");
        userMsg.className = "ai-user-message";
        userMsg.textContent = message;
        aiChatBody.appendChild(userMsg);
        aiInput.value = "";

        const aiReply = document.createElement("div");
        aiReply.className = "ai-bot-message";
        aiReply.textContent = "Thank you! We'll assist you shortly.";
        aiChatBody.appendChild(aiReply);
        aiChatBody.scrollTop = aiChatBody.scrollHeight;
    }

    if (aiSend) aiSend.addEventListener("click", sendMessage);
    if (aiInput) aiInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    });
}

// ✅ Login role switch logic
const roleButtons = document.querySelectorAll(".role-btn");
const loginForm = document.getElementById("loginForm");
const roleSelection = document.getElementById("roleSelection");

roleButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (roleSelection) roleSelection.style.display = "none";
        if (loginForm) loginForm.style.display = "block";
    });
});

const backToRoles = document.getElementById("backToRoles");
if (backToRoles) {
    backToRoles.addEventListener("click", () => {
        if (loginForm) loginForm.style.display = "none";
        if (roleSelection) roleSelection.style.display = "block";
    });
}

// ✅ Suggestions Modal Logic
const suggestionsBtn = document.querySelector("a[href='#suggestions']");
const suggestionsPage = document.getElementById("suggestionsPage");
const closeSuggestions = document.getElementById("closeSuggestions");

if (suggestionsBtn && suggestionsPage) {
    suggestionsBtn.addEventListener("click", function (e) {
        e.preventDefault();
        suggestionsPage.style.display = "block";
    });
}

if (closeSuggestions && suggestionsPage) {
    closeSuggestions.addEventListener("click", function () {
        suggestionsPage.style.display = "none";
    });
}

// ✅ Run AI assistant on load
document.addEventListener("DOMContentLoaded", function () {
    setupAIAssistant();
});
