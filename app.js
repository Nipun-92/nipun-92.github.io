// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navMenu.classList.remove('active');
        
        const targetId = link.getAttribute('href');
        scrollToSection(targetId);
    });
});

// Smooth scrolling function
function scrollToSection(targetId) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Active navigation highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// CTA Button Actions - Handle all CTA buttons
function handleCTAClick(e) {
    e.preventDefault();
    scrollToSection('#contact');
    
    // Focus on the contact form after scrolling
    setTimeout(() => {
        const nameInput = document.querySelector('#name');
        if (nameInput) {
            nameInput.focus();
        }
    }, 800);
}

// Wait for DOM to load before setting up event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Handle all CTA buttons
    const allButtons = document.querySelectorAll('button, .btn');
    allButtons.forEach(button => {
        const buttonText = button.textContent.trim();
        if (buttonText.includes('Request Demo') || 
            buttonText.includes('Get Started') ||
            button.classList.contains('nav__cta') ||
            button.classList.contains('hero__cta')) {
            
            button.addEventListener('click', handleCTAClick);
        }
    });

    // Learn More button action
    const learnMoreButtons = document.querySelectorAll('.btn--outline');
    learnMoreButtons.forEach(button => {
        if (button.textContent.includes('Learn More')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSection('#features');
            });
        }
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name')?.trim() || '';
    const email = formData.get('email')?.trim() || '';
    const message = formData.get('message')?.trim() || '';
    
    // Remove any existing messages
    removeFormMessages();
    
    // Basic validation
    if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        e.target.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Form message helpers
function showFormMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-${type}`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('contactForm');
    if (form) {
        form.insertBefore(messageDiv, form.firstChild);
        
        // Scroll message into view
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            removeFormMessages();
        }, 5000);
    }
}

function removeFormMessages() {
    const messages = document.querySelectorAll('.form-success, .form-error');
    messages.forEach(message => message.remove());
}

// Header scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        header.classList.remove('scroll-down');
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll) {
        // Scrolling up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.card, .solution__item, .benefit__item, .capability__item, .achievement__item, .infographic-container, .diagram-item, .process-step, .impact-item, .timeline-item'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
});

// Add dynamic styles for animations and enhanced interactivity
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-ready {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav__link.active {
            color: var(--color-primary) !important;
            font-weight: var(--font-weight-semibold);
        }
        
        .header.scroll-down {
            transform: translateY(-100%);
            transition: transform 0.3s ease-in-out;
        }
        
        .header.scroll-up {
            transform: translateY(0);
            transition: transform 0.3s ease-in-out;
            box-shadow: var(--shadow-lg);
        }
        
        .btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
            position: relative;
        }
        
        .btn:disabled::after {
            content: '';
            position: absolute;
            right: 12px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            border: 2px solid transparent;
            border-top-color: currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: translateY(-50%) rotate(0deg); }
            100% { transform: translateY(-50%) rotate(360deg); }
        }
        
        .form-group.focused .form-label {
            color: var(--color-primary);
            font-weight: var(--font-weight-medium);
        }
        
        .diagram-item.animate-ready {
            opacity: 0;
            transform: translateY(15px);
        }
        
        .process-step.animate-ready {
            opacity: 0;
            transform: translateX(-20px);
        }
        
        .impact-item.animate-ready {
            opacity: 0;
            transform: scale(0.9);
        }
        
        .timeline-item.animate-ready {
            opacity: 0;
            transform: translateX(-30px);
        }
        
        .diagram-item.animate-in,
        .process-step.animate-in,
        .impact-item.animate-in,
        .timeline-item.animate-in {
            opacity: 1;
            transform: none;
        }
        
        /* Enhanced hover effects for diagram elements */
        .diagram-item:hover,
        .process-step:hover,
        .impact-item:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow: var(--shadow-lg);
        }
        
        .timeline-item:hover .timeline-content {
            background-color: var(--color-bg-3);
        }
    `;
    document.head.appendChild(style);
}

// Enhanced diagram interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers for diagram items to show more info
    const diagramItems = document.querySelectorAll('.diagram-item, .process-step, .impact-item');
    
    diagramItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add a subtle feedback animation
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 150);
        });
        
        // Add keyboard accessibility
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.click();
            }
        });
    });
});

// Keyboard navigation accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on escape
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        
        // Remove focus from any form messages
        removeFormMessages();
    }
});

// Form field enhancements
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check initial state
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Initialize dynamic styles
    addDynamicStyles();
});

// Staggered animations for groups of elements
function staggeredAnimation() {
    const groups = [
        '.diagram-grid .diagram-item',
        '.process-steps .process-step',
        '.impact-grid .impact-item',
        '.timeline .timeline-item'
    ];
    
    groups.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.transitionDelay = `${index * 100}ms`;
        });
    });
}

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    // Update active navigation on load
    updateActiveNav();
    
    // Set up staggered animations
    staggeredAnimation();
    
    // Add click handlers for any missed navigation elements
    const allClickableElements = document.querySelectorAll('button, .btn, a[href^="#"]');
    allClickableElements.forEach(element => {
        if (element.getAttribute('href')?.startsWith('#')) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = element.getAttribute('href');
                scrollToSection(targetId);
            });
        }
    });
    
    // Enhanced section mapping for navigation
    const sectionMappings = {
        'about': 'about',
        'features': 'features', 
        'technology': 'technology',
        'team': 'team',
        'contact': 'contact',
        'home': 'home'
    };
    
    // Ensure all navigation links work
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const sectionId = href.substring(1);
            const targetSection = document.getElementById(sectionId);
            if (!targetSection) {
                // Try alternative mapping
                const alternativeId = sectionMappings[sectionId];
                if (alternativeId && document.getElementById(alternativeId)) {
                    link.setAttribute('href', `#${alternativeId}`);
                }
            }
        }
    });
    
    console.log('Legal M1ND website with enhanced infographics initialized successfully');
}