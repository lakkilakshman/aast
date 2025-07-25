// ==========================================
// SHREE ASTROTALKS - MAIN JAVASCRIPT FILE
// ==========================================

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeSmoothScrolling();
    initializeContactForm();
    initializeBackToTop();
    initializeScrollReveal();
    initializeOfferButtons();
    initializeServiceButtons();
    initializeLanguageToggle();

    // Log initialization
    console.log('Shree Astrotalks website initialized successfully!');
});

// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================

function initializeNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.getElementById('header');

    // Mobile menu toggle
    navToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
}

// ==========================================
// SMOOTH SCROLLING
// ==========================================

function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// SCROLL EFFECTS
// ==========================================

function initializeScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;

            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Floating animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.service-card, .offer-card, .contact-item');

    // Add reveal class to elements
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

function initializeContactForm() {
    const form = document.getElementById('consultation-form');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Validate form
            if (validateForm(data)) {
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;

                submitButton.innerHTML = '<span class="loading"></span> Sending...';
                submitButton.disabled = true;

                // Simulate form submission (replace with actual submission logic)
                setTimeout(() => {
                    // Generate WhatsApp message
                    const whatsappMessage = generateWhatsAppMessage(data);

                    // Open WhatsApp
                    window.open(`https://wa.me/917738961658?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

                    // Reset form
                    form.reset();

                    // Reset button
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;

                    // Show success message
                    showNotification('Request sent successfully! We will contact you soon.', 'success');
                }, 2000);
            }
        });
    }
}

// Form validation function
function validateForm(data) {
    const errors = [];

    // Required fields validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }

    if (!data.phone || data.phone.trim().length < 10) {
        errors.push('Please enter a valid phone number');
    }

    if (!data['birth-date']) {
        errors.push('Birth date is required');
    }

    if (!data.service) {
        errors.push('Please select a service');
    }

    // Show errors if any
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }

    return true;
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Generate WhatsApp message
function generateWhatsAppMessage(data) {
    const serviceNames = {
        'lucky-number': 'Lucky Mobile Number',
        'name-correction': 'Name Correction',
        'career': 'Career Guidance',
        'marriage': 'Marriage Match Making',
        'business': 'Business Consultation',
        'face-reading': 'Face Reading',
        'numerology': 'Pythagoras Numerology',
        'tarot': 'Tarot Reading',
        'rudraksha': 'Rudraksha Remedies'
    };

    return `🌟 *New Consultation Request - Shree Astrotalks* 🌟

📝 *Personal Details:*
• Name: ${data.name}
• Email: ${data.email}
• Phone: ${data.phone}
• Birth Date: ${data['birth-date']}

🔮 *Service Requested:* ${serviceNames[data.service] || data.service}

💬 *Message:* ${data.message || 'No specific message provided'}

🙏 Thank you for choosing Shree Astrotalks for your spiritual guidance!`;
}

// ==========================================
// OFFER BUTTONS FUNCTIONALITY
// ==========================================

function initializeOfferButtons() {
    const offerButtons = document.querySelectorAll('.btn-offer');

    offerButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.offer-card');
            const title = card.querySelector('.offer-title').textContent;
            const price = card.querySelector('.discounted-price').textContent;

            // Generate offer-specific WhatsApp message
            const message = `🎯 *Special Offer Request - Shree Astrotalks* 🎯

🎁 *Offer:* ${title}
💰 *Price:* ${price}

👋 Hi! I'm interested in this special offer. Please provide me with more details and booking information.

🙏 Thank you!`;

            // Open WhatsApp
            window.open(`https://wa.me/917738961658?text=${encodeURIComponent(message)}`, '_blank');
        });
    });
}

// ==========================================
// SERVICE BOOKING FUNCTIONALITY
// ==========================================

function initializeServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-book-btn');

    // Service booking links
    const serviceLinks = {
        '1': 'https://superprofile.bio/vp/670c18d9d993b30013555b0d',
        '2': 'https://superprofile.bio/vp/66cfa4430b9337001372b30b',
        '3': 'https://superprofile.bio/vp/x1_sSJXT',
        '4': 'whatsapp' // WhatsApp direct link
    };

    serviceButtons.forEach(button => {
        button.addEventListener('click', function () {
            const serviceId = this.getAttribute('data-service');

            if (serviceId === '4') {
                // WhatsApp redirect for one-to-one consultation
                const message = `🙏 *One-to-One Consultation Request - Shree Astrotalks* 🙏

Hi! I would like to book a personal consultation session with your expert astrologer.

Please let me know:
• Available time slots
• Consultation charges
• How we can proceed

Thank you for your guidance! 🌟`;

                window.open(`https://wa.me/917738961658?text=${encodeURIComponent(message)}`, '_blank');
            } else if (serviceLinks[serviceId]) {
                // Redirect to service booking page
                window.open(serviceLinks[serviceId], '_blank');
            }
        });
    });
}

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');

    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            // Corrected typo here: backTo topButton -> backToTopButton
            backToTopButton.classList.remove('show');
        }
    });

    // Scroll to top functionality
    backToTopButton.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        animation: slideIn 0.3s ease-out;
        max-width: 400px;
    `;

    // Add animation styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            
            .notification-message {
                flex: 1;
                line-height: 1.4;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                margin-left: 0.5rem;
            }
        `;
        document.head.appendChild(style);
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format date function
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ==========================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================

// Optimize scroll events with throttling
const optimizedScrollHandler = throttle(function () {
    // Handle scroll events here
}, 16); // ~60fps

// Optimize resize events with debouncing
const optimizedResizeHandler = debounce(function () {
    // Handle resize events here
}, 250);

// Add event listeners with optimizations
window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('resize', optimizedResizeHandler);

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

// Keyboard navigation support
document.addEventListener('keydown', function (e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');

        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Focus management for mobile menu
function manageFocus() {
    const navMenu = document.getElementById('nav-menu');
    const navLinks = navMenu.querySelectorAll('a');

    if (navMenu.classList.contains('active')) {
        navLinks[0].focus();
    }
}

// ==========================================
// INITIALIZATION COMPLETE
// ==========================================

// ==========================================
// LANGUAGE TOGGLE FUNCTIONALITY
// ==========================================

// Translation data
const translations = {
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-services': 'Services',
        'nav-offers': 'Offers',
        'nav-contact': 'Contact',

        // Hero Section
        'hero-title-1': 'Unlock Your Destiny with',
        'hero-title-2': 'Ancient Wisdom',
        'hero-subtitle': 'Discover your true potential through expert astrology, numerology, and spiritual guidance. Let the stars illuminate your path to success and happiness.',
        'hero-btn-1': 'Explore Services',
        'hero-btn-2': 'Consult Now',

        // About Section
        'about-title': 'About Shree Astrotalks',
        'about-description': ` At ShreeAstroTalks, we believe that every person carries a distinct energy and life journey, influenced by the powerful vibrations of numbers, celestial bodies, and cosmic patterns. 
Our mission is to help you uncover your destiny and make empowered choices through the timeless wisdom of Astrology, Numerology, Tarot, and ancient Vedic remedies. We don't just forecast your future we guide you to shape it. Your karma is in your hands, and we’re here to help you navigate it with clarity and confidence.
                    <br></br>With 4+ years of experience, we’ve helped hundreds of clients gain clarity in love, career, business, relationships, health, marriage and overall life direction. Whether you're feeling stuck, unsure about a name or number, or simply seeking positive change — our personalized consultations are designed to guide you with accuracy, intuition, and powerful remedies
                      .`,

        'about-feature-1': '2.5K+ Consultations Done',
        'about-feature-2': 'Expert Astrologers',
        'about-feature-3': 'Worldwide Service',

        // Services Section Header
        "services-title": "Our Sacred Services",
        "services-subtitle": "Transform your life with our comprehensive spiritual and astrological guidance",
        
        // New translations for demo.html content
        'services-page-title': '✨Our Services',
        'service-1-heading': 'GET MOBILE NUMBER SCAN <span class="price">₹ 79/- ONLY</span>',
        'service-1-p1': 'Do you know what your mobile number reveals about your life?',
        'service-1-p2': 'As per numerology, the total of your mobile number can influence your success, relationships, and overall energy.',
        'service-1-p3': 'Get a detailed analysis of your mobile number for just ₹79.',
        'service-1-strong': 'Effects of an Unlucky or Incompatible Mobile Number',
        'service-1-p4': 'An unlucky mobile number may create negative energy and lead to:',
        'service-1-li1': 'Mental stress and lack of focus',
        'service-1-li2': 'Poor communication and misunderstandings',
        'service-1-li3': 'Career or business struggles',
        'service-1-li4': 'Financial instability',
        'service-1-li5': 'Health or emotional issues',
        'service-1-li6': 'Relationship conflicts',
        'service-1-li7': 'Feeling stuck or facing repeated setbacks',
        'service-1-p5': 'Choosing a number that aligns with your numerology is believed to enhance balance, attract success, and bring more positivity into your life.',
        'buy-now-btn': 'Buy Now',
        'service-2-heading': 'Lucky Mobile Number Suggestion <span class="price">₹ 666/- ONLY</span>',
        'service-2-p1': 'Get your suggested pairs and the best total for your mobile number.',
        'service-2-p2': 'A lucky mobile number can bring positive energy, confidence, and success. Many people believe that certain numbers attract good fortune based on numerology or cultural beliefs. It can:',
        'service-2-li1': 'Boost self-confidence and positivity',
        'service-2-li2': 'Improve career and business opportunities',
        'service-2-li3': 'Enhance relationships and communication',
        'service-2-li4': 'Make your number easy to remember and unique',
        'service-2-li5': 'Reflect personal or spiritual meaning',
        'service-2-p3': 'While not scientifically proven, a lucky number can positively influence your mindset and actions, helping you feel more empowered in life.',
        'service-3-heading': 'NUMEROSCOPE <span class="price">₹ 399/- ONLY</span>',
        'service-3-p1': 'The Numeroscope is handmade and a tailored calculations of your details:',
        'service-3-li1': 'Date of birth analysis',
        'service-3-li2': 'Chaldean method',
        'service-3-li3': 'Lo Shu grid of your birth date',
        'service-3-li4': 'Pythagorean method',
        'service-3-li5': 'Missing numbers',
        'service-3-li6': 'Name analysis',
        'service-3-li7': 'Lucky numbers',
        'service-3-li8': 'Lucky color',
        'service-3-li9': 'Auspicious place',
        'service-3-li10': 'Auspicious time',
        'service-3-li11': 'Career',
        'service-3-li12': 'Your current mobile number analysing',
        'service-3-li13': 'Recommendation of mobile number total as per your name and dob',
        'service-3-p2': '📞 Book your personalized 1-on-1 call consultation today and discover what your Numeroscope says about your future!',
        'service-4-heading': 'Business Solution All in One <span class="price">Rs 6999/- ONLY</span>',
        'service-4-p1': 'This all-in-one package is designed to set your business up for success with simple, effective solutions.',
        'service-4-p2': 'We start with a one-on-one discussion to understand your goals and offer practical business advice. Then, we review your business name and logo, suggesting improvements to help your brand connect better with customers.',
        'service-4-p3': 'We also guide you in setting up your workspace in a way that brings positive energy, peace, and growth. To support smooth communication and attract more opportunities, we help you choose a business mobile number that suits your business.',
        'service-4-strong': 'In short, here’s what our turnkey business solutions include:',
        'service-4-li1': 'Business Solutions and Discussion',
        'service-4-li2': 'Business Logo Scanning and Suggestion',
        'service-4-li3': 'Business Name Scanning and Suggestion',
        'service-4-li4': 'Business Vaastu',
        'service-4-li5': 'Business Mobile Number Selection',
        'service-4-p4': 'This package covers everything—from planning and branding to creating a supportive work environment—so your business can grow with confidence, stability, and long-term success.',
        'service-5-heading': 'One to One Consultation <span class="price">₹ 199/- ONLY</span>',
        'service-5-p1': 'A one-on-one call gives us the chance to really understand your business.',
        'service-5-p2': 'We talk about what’s working, what’s not, and any challenges you\'re facing. You can ask questions, share your thoughts, and get honest, helpful advice that’s made just for you.',
        'service-5-p3': 'Think of it like having a trusted guide by your side—someone who can help you avoid common mistakes and show you the best steps to take next. This makes things less confusing and helps your business move forward faster and with more confidence.',
        'service-6-heading': 'Personalized Crystal Remedy',
        'service-6-p1': 'Discover the natural power of crystals to bring balance, healing, and positive energy into your life. Whether you need emotional support, stress relief, or spiritual growth, our customized crystal remedies are designed just for you.',
        'service-6-strong': 'What You’ll Get:',
        'service-6-li1': 'Expert guidance on choosing the right crystals for your needs',
        'service-6-li2': 'Personalized crystal recommendations in different forms (tumbled stones, jewelry, pyramids, and more)',
        'service-6-li3': 'Tips on how to use and care for your crystals to maximize their benefits',
        'service-6-strong2': 'Why book a session?',
        'service-6-p2': 'Crystals work best when they match your energy and goals. In your session, we’ll help you connect with the right ones, so you can feel better, more balanced, and supported—naturally and gently.',

        // Core Services Section
        'core-services-heading': '✨ Our Core Services at ShreeAstroTalks',
        'core-services-p': 'We offer a holistic blend of ancient sciences to help you gain clarity, balance, and direction in all aspects of life — from personal relationships to business success.',
        'core-service-1-title': '💼 Business & Career Guidance',
        'core-service-1-li1': '<b>Business Name Suggestions</b><br>Crafted as per Numerology & Astrology to attract prosperity and recognition.<br><br>',
        'core-service-1-li2': '<b>Business Logo Design Consultation</b><br>Logo design guidance aligned with Vastu principles and vibrational energy for success.<br><br>',
        'core-service-1-li3': '<b>Profession & Career Direction</b><br>Personalized suggestions based on your date of birth and numerological profile.<br><br>',
        'core-service-1-li4': '<b>Lucky Colors, Numbers & Dates</b><br>For business launches, important deals, and personal success timing.<br><br>',
        'core-service-1-li5': '<b>Signature Correction</b><br>Improve energy flow and personal magnetism through signature alignment.',
        'core-service-2-title': '🏠 Vastu Consultation',
        'core-service-2-li1': '<b>Residential & Commercial Vastu Analysis</b><br>Evaluate and correct space energy using proven Vastu principles.<br><br>',
        'core-service-2-li2': '<b>Space Balancing Without Demolition</b><br>Practical remedies and realignment solutions — no structural changes required.<br><br>',
        'core-service-2-li3': '<b>Health, Wealth & Harmony Enhancements</b><br>Correct energy imbalances that impact your emotional, financial, or physical well-being.<br><br>',
        'core-service-2-li4': '<b>Directional Adjustments</b><br>Align key areas like entrance, kitchen, and workspaces to improve results.',
        'core-service-3-title': '❤️ Love, Marriage & Relationship Compatibility',
        'core-service-3-li1': '<b>Matchmaking & Compatibility Analysis</b><br>Using Astrology and Numerology to assess relationship alignment.<br><br>',
        'core-service-3-li2': '<b>Life Partner & Business Partner Suitability</b><br>Discover the strengths and challenges in any personal or professional bond.<br><br>',
        'core-service-3-li3': '<b>Emotional Healing Remedies</b><br>Resolve conflicts, restore love, and enhance mutual understanding.<br><br>',
        'core-service-3-li4': '<b>Relationship Insights</b><br>Understand the energy patterns that affect trust, love, and communication.',
        'core-service-4-title': '👶 Baby Name & Family Guidance',
        'core-service-4-li1': '<b>Baby Name Suggestions</b><br>Meaningful and lucky names selected using Lo-Shu Grid and planetary alignment.<br><br>',
        'core-service-4-li2': '<b>Family Vibration Matching</b><br>Improve harmony and bonding within your family using numerological balancing.<br><br>',
        'core-service-4-li3': '<b>Child Potential Analysis</b><br>Lo-Shu, Astrology and Numerology based evaluation of your child’s strengths, traits, and future path.',
        'core-service-5-title': '🃏 Tarot Reading with Remedies',
        'core-service-5-li1': '<b>Intuitive Tarot Guidance</b><br>For love, career, finance, and life decisions.<br><br>',
        'core-service-5-li2': '<b>Action-Based Readings</b><br>Clear answers along with practical, spiritual remedies.<br><br>',
        'core-service-5-li3': '<b>Insightful & Accurate</b><br>Readings blended with deep intuitive connection and experience.',
        'core-service-6-title': '👁️‍🗨️ Face Reading',
        'core-service-6-p1': 'Your Face Tells Your Story<br>Your face reflects your inner self — personality traits, emotional energy, and future potential. We analyze:<br><br>' +
                              '• Natural strengths and areas for growth<br>' +
                              '• Relationship compatibility based on facial features<br>' +
                              '• How facial structure influences your career and confidence<br>' +
                              '• Personalized insights for self-awareness and development',
        'core-service-7-title': '✍️ Handwriting & Signature Analysis (Graphology)',
        'core-service-7-p1': 'Change Your Writing, Change Your Life<br>Your handwriting is a mirror of your subconscious. Through Graphology, we decode:<br><br>' +
                              '• Emotional patterns and personality traits<br>' +
                              '• Subtle blockages affecting your growth and mindset<br>' +
                              '• Signature corrections for success and energy alignment<br>' +
                              '• Recommendations to build confidence and leadership qualities',
        'core-service-8-title': '📿 Healing & Energetic Remedies',
        'core-service-8-li1': '<b>Crystal Therapy</b><br>Personalized healing using crystals for love, finance, health, and spiritual protection.<br><br>',
        'core-service-8-li2': '<b>Lucky Numbers & Object Vibration Matching</b><br>Mobile, house, and vehicle number suggestions to boost personal luck.<br><br>',
        'core-service-8-li3': '<b>Numerology Forecasts</b><br>Monthly and yearly guidance to plan and prepare with clarity.<br><br>',
        'core-service-8-li4': '<b>Color Therapy & Rituals</b><br>Energy-enhancing solutions through the use of colors and simple remedies.',
        'contact-now-btn': 'Contact Now',


        // Contact Section
        'contact-title': 'Connect with Us',
        'contact-subtitle': 'Ready to transform your life? Get in touch with our expert astrologers',
        'contact-form-name': 'Full Name',
        'contact-form-email': 'Email Address',
        'contact-form-phone': 'Phone Number',
        'contact-form-service': 'Service of Interest',
        'contact-form-message': 'Your Message',
        'contact-form-btn': 'Send Message',
        'contact-info-title': 'Get in Touch',
        'contact-whatsapp': 'WhatsApp',
        'contact-email': 'Email',
        'contact-usa': 'USA Office',
        'contact-website': 'Website'
    },


    hi: {
        // Navigation
        'nav-home': 'होम',
        'nav-about': 'हमारे बारे में',
        'nav-services': 'सेवाएं',
        'nav-offers': 'ऑफर',
        'nav-contact': 'संपर्क',

        // Hero Section
        'hero-title-1': 'प्राचीन ज्ञान से',
        'hero-title-2': 'अपना भाग्य खोलें',
        'hero-subtitle': 'विशेषज्ञ ज्योतिष, अंक ज्योतिष, और आध्यात्मिक मार्गदर्शन के माध्यम से अपनी सच्ची क्षमता खोजें। सितारों को सफलता और खुशी का रास्ता रोशन करने दें।',
        'hero-btn-1': 'सेवाएं देखें',
        'hero-btn-2': 'अभी सलाह लें',

        // About Section
        'about-title': 'श्री एस्ट्रोटॉक्स के बारे में',
        'about-description': `
श्रीएस्ट्रोटॉक्स में, हमारा मानना है कि प्रत्येक व्यक्ति एक विशिष्ट ऊर्जा और जीवन यात्रा से गुज़रता है, जो संख्याओं, खगोलीय पिंडों और ब्रह्मांडीय पैटर्न के शक्तिशाली कंपनों से प्रभावित होती है।
हमारा मिशन ज्योतिष, अंक ज्योतिष, टैरो और प्राचीन वैदिक उपायों के कालातीत ज्ञान के माध्यम से आपको अपने भाग्य को उजागर करने और सशक्त विकल्प बनाने में मदद करना है। हम न केवल आपके भविष्य की भविष्यवाणी करते हैं, बल्कि उसे आकार देने के लिए आपका मार्गदर्शन भी करते हैं। आपका कर्म आपके हाथों में है, और हम स्पष्टता और आत्मविश्वास के साथ उसमें आपकी मदद करने के लिए यहाँ हैं।
4+ वर्षों के अनुभव के साथ, हमने सैकड़ों ग्राहकों को प्रेम, करियर, व्यवसाय, रिश्तों, स्वास्थ्य, विवाह और समग्र जीवन दिशा में स्पष्टता प्राप्त करने में मदद की है। चाहे आप अटके हुए महसूस कर रहे हों, किसी नाम या संख्या के बारे में अनिश्चित हों, या बस सकारात्मक बदलाव चाहते हों - हमारे व्यक्तिगत परामर्श आपको सटीकता, अंतर्ज्ञान और शक्तिशाली उपायों के साथ मार्गदर्शन करने के लिए डिज़ाइन किए गए हैं।`,
        'about-feature-1': '2.5K+ परामर्श पूर्ण',
        'about-feature-2': 'विशेषज्ञ ज्योतिषी',
        'about-feature-3': 'विश्वव्यापी सेवा',

        // Services Section Header
        "services-title": "हमारी पवित्र सेवाएं",
        "services-subtitle": "प्राचीन विज्ञानों का एक समग्र मिश्रण जो आपके जीवन और सफलता का मार्गदर्शन करता है",

        // New translations for demo.html content
        'services-page-title': '✨हमारी सेवाएं',
        'service-1-heading': 'मोबाइल नंबर स्कैन करवाएं <span class="price">केवल ₹79/-</span>',
        'service-1-p1': 'क्या आप जानते हैं कि आपका मोबाइल नंबर आपके जीवन के बारे में क्या बताता है?',
        'service-1-p2': 'अंक ज्योतिष के अनुसार, आपके मोबाइल नंबर का कुल योग आपकी सफलता, रिश्तों और समग्र ऊर्जा को प्रभावित कर सकता है।',
        'service-1-p3': 'केवल ₹79 में अपने मोबाइल नंबर का विस्तृत विश्लेषण प्राप्त करें।',
        'service-1-strong': 'एक अशुभ या असंगत मोबाइल नंबर के प्रभाव',
        'service-1-p4': 'एक अशुभ मोबाइल नंबर नकारात्मक ऊर्जा पैदा कर सकता है और इससे हो सकता है:',
        'service-1-li1': 'मानसिक तनाव और एकाग्रता की कमी',
        'service-1-li2': 'खराब संचार और गलतफहमी',
        'service-1-li3': 'करियर या व्यवसाय में संघर्ष',
        'service-1-li4': 'वित्तीय अस्थिरता',
        'service-1-li5': 'स्वास्थ्य या भावनात्मक समस्याएं',
        'service-1-li6': 'रिश्तों में टकराव',
        'service-1-li7': 'अटके हुए महसूस करना या बार-बार असफलताओं का सामना करना',
        'service-1-p5': 'एक ऐसा नंबर चुनना जो आपके अंक ज्योतिष के साथ संरेखित हो, संतुलन बढ़ाने, सफलता को आकर्षित करने और आपके जीवन में अधिक सकारात्मकता लाने वाला माना जाता है।',
        'buy-now-btn': 'अभी खरीदें',
        'service-2-heading': 'लकी मोबाइल नंबर सुझाव <span class="price">केवल ₹666/-</span>',
        'service-2-p1': 'अपने मोबाइल नंबर के लिए अपने सुझाए गए जोड़े और सबसे अच्छा कुल योग प्राप्त करें।',
        'service-2-p2': 'एक भाग्यशाली मोबाइल नंबर सकारात्मक ऊर्जा, आत्मविश्वास और सफलता ला सकता है। बहुत से लोग मानते हैं कि कुछ संख्याएं अंक ज्योतिष या सांस्कृतिक मान्यताओं के आधार पर सौभाग्य को आकर्षित करती हैं। यह कर सकता है:',
        'service-2-li1': 'आत्मविश्वास और सकारात्मकता बढ़ाएँ',
        'service-2-li2': 'करियर और व्यावसायिक अवसरों में सुधार करें',
        'service-2-li3': 'रिश्तों और संचार को बढ़ाएँ',
        'service-2-li4': 'अपने नंबर को याद रखने में आसान और अद्वितीय बनाएँ',
        'service-2-li5': 'व्यक्तिगत या आध्यात्मिक अर्थ को दर्शाएँ',
        'service-2-p3': 'हालांकि वैज्ञानिक रूप से सिद्ध नहीं है, एक भाग्यशाली नंबर आपके मानसिकता और कार्यों को सकारात्मक रूप से प्रभावित कर सकता है, जिससे आपको जीवन में अधिक सशक्त महसूस करने में मदद मिलती है।',
        'service-3-heading': 'न्यूमेरोस्कोप <span class="price">केवल ₹399/-</span>',
        'service-3-p1': 'न्यूमेरोस्कोप हस्तनिर्मित है और आपके विवरणों की एक अनुकूलित गणना है:',
        'service-3-li1': 'जन्म तिथि विश्लेषण',
        'service-3-li2': 'काल्डियन विधि',
        'service-3-li3': 'आपकी जन्म तिथि का लो शू ग्रिड',
        'service-3-li4': 'पाइथागोरस विधि',
        'service-3-li5': 'लुप्त संख्याएँ',
        'service-3-li6': 'नाम विश्लेषण',
        'service-3-li7': 'भाग्यशाली संख्याएँ',
        'service-3-li8': 'भाग्यशाली रंग',
        'service-3-li9': 'शुभ स्थान',
        'service-3-li10': 'शुभ समय',
        'service-3-li11': 'करियर',
        'service-3-li12': 'आपके वर्तमान मोबाइल नंबर का विश्लेषण',
        'service-3-li13': 'आपके नाम और जन्मतिथि के अनुसार मोबाइल नंबर के कुल योग की सिफारिश',
        'service-3-p2': '📞 आज ही अपनी व्यक्तिगत 1-ऑन-1 कॉल परामर्श बुक करें और जानें कि आपका न्यूमेरोस्कोप आपके भविष्य के बारे में क्या कहता है!',
        'service-4-heading': 'बिजनेस सॉल्यूशन ऑल इन वन <span class="price">केवल ₹6999/-</span>',
        'service-4-p1': 'यह ऑल-इन-वन पैकेज आपके व्यवसाय को सरल, प्रभावी समाधानों के साथ सफलता के लिए तैयार करने के लिए डिज़ाइन किया गया है।',
        'service-4-p2': 'हम आपके लक्ष्यों को समझने और व्यावहारिक व्यावसायिक सलाह देने के लिए एक-पर-एक चर्चा से शुरू करते हैं। फिर, हम आपके व्यवसाय के नाम और लोगो की समीक्षा करते हैं, आपके ब्रांड को ग्राहकों के साथ बेहतर ढंग से जोड़ने में मदद करने के लिए सुधार का सुझाव देते हैं।',
        'service-4-p3': 'हम आपको अपने कार्यक्षेत्र को इस तरह से स्थापित करने में भी मार्गदर्शन करते हैं जिससे सकारात्मक ऊर्जा, शांति और विकास हो। सुचारू संचार का समर्थन करने और अधिक अवसरों को आकर्षित करने के लिए, हम आपको एक व्यावसायिक मोबाइल नंबर चुनने में मदद करते हैं जो आपके व्यवसाय के अनुकूल हो।',
        'service-4-strong': 'संक्षेप में, यहाँ हमारे टर्नकी व्यावसायिक समाधानों में क्या शामिल है:',
        'service-4-li1': 'व्यावसायिक समाधान और चर्चा',
        'service-4-li2': 'व्यावसायिक लोगो स्कैनिंग और सुझाव',
        'service-4-li3': 'व्यावसायिक नाम स्कैनिंग और सुझाव',
        'service-4-li4': 'व्यावसायिक वास्तु',
        'service-4-li5': 'व्यावसायिक मोबाइल नंबर चयन',
        'service-4-p4': 'यह पैकेज योजना और ब्रांडिंग से लेकर एक सहायक कार्य वातावरण बनाने तक सब कुछ कवर करता है—ताकि आपका व्यवसाय आत्मविश्वास, स्थिरता और दीर्घकालिक सफलता के साथ बढ़ सके।',
        'service-5-heading': 'वन-टू-वन परामर्श <span class="price">केवल ₹199/-</span>',
        'service-5-p1': 'एक-पर-एक कॉल हमें आपके व्यवसाय को वास्तव में समझने का मौका देती है।',
        'service-5-p2': 'हम इस बारे में बात करते हैं कि क्या काम कर रहा है, क्या नहीं, और आपको किन चुनौतियों का सामना करना पड़ रहा है। आप प्रश्न पूछ सकते हैं, अपने विचार साझा कर सकते हैं, और ईमानदार, सहायक सलाह प्राप्त कर सकते हैं जो विशेष रूप से आपके लिए बनाई गई है।',
        'service-5-p3': 'इसे अपने साथ एक विश्वसनीय मार्गदर्शक होने जैसा समझें—कोई ऐसा व्यक्ति जो आपको सामान्य गलतियों से बचने और अगले सर्वोत्तम कदम उठाने का तरीका दिखाने में मदद कर सकता है। यह चीजों को कम भ्रमित करता है और आपके व्यवसाय को तेजी से और अधिक आत्मविश्वास के साथ आगे बढ़ने में मदद करता है।',
        'service-6-heading': 'व्यक्तिगत क्रिस्टल उपचार',
        'service-6-p1': 'क्रिस्टल की प्राकृतिक शक्ति की खोज करें जो आपके जीवन में संतुलन, उपचार और सकारात्मक ऊर्जा लाती है। चाहे आपको भावनात्मक समर्थन, तनाव से राहत, या आध्यात्मिक विकास की आवश्यकता हो, हमारे अनुकूलित क्रिस्टल उपचार विशेष रूप से आपके लिए डिज़ाइन किए गए हैं।',
        'service-6-strong': 'आपको क्या मिलेगा:',
        'service-6-li1': 'आपकी आवश्यकताओं के लिए सही क्रिस्टल चुनने पर विशेषज्ञ मार्गदर्शन',
        'service-6-li2': 'विभिन्न रूपों में व्यक्तिगत क्रिस्टल सिफारिशें (टंबल्ड स्टोन, गहने, पिरामिड, और बहुत कुछ)',
        'service-6-li3': 'उनका उपयोग और देखभाल कैसे करें, इस पर सुझाव',
        'service-6-strong2': 'एक सत्र क्यों बुक करें?',
        'service-6-p2': 'क्रिस्टल तब सबसे अच्छा काम करते हैं जब वे आपकी ऊर्जा और लक्ष्यों से मेल खाते हैं। आपके सत्र में, हम आपको सही लोगों से जुड़ने में मदद करेंगे, ताकि आप बेहतर, अधिक संतुलित और समर्थित महसूस कर सकें—स्वाभाविक रूप से और धीरे से।',

        // Core Services Section
        'core-services-heading': '✨ श्री एस्ट्रोटॉक्स में हमारी प्रमुख सेवाएं',
        'core-services-p': 'हम आपको जीवन के सभी पहलुओं — व्यक्तिगत संबंधों से लेकर व्यावसायिक सफलता तक — में स्पष्टता, संतुलन और दिशा प्राप्त करने में मदद करने के लिए प्राचीन विज्ञानों का एक समग्र मिश्रण प्रदान करते हैं।',
        'core-service-1-title': '💼 व्यवसाय और करियर मार्गदर्शन',
        'core-service-1-li1': '<b>व्यवसाय के नाम के सुझाव</b><br>समृद्धि और पहचान को आकर्षित करने के लिए अंक ज्योतिष और ज्योतिष के अनुसार तैयार किए गए।<br><br>',
        'core-service-1-li2': '<b>व्यवसाय लोगो डिज़ाइन परामर्श</b><br>सफलता के लिए वास्तु सिद्धांतों और कंपन ऊर्जा के साथ संरेखित लोगो डिज़ाइन मार्गदर्शन।<br><br>',
        'core-service-1-li3': '<b>पेशा और करियर दिशा</b><br>आपकी जन्म तिथि और अंक ज्योतिषीय प्रोफ़ाइल के आधार पर व्यक्तिगत सुझाव।<br><br>',
        'core-service-1-li4': '<b>भाग्यशाली रंग, संख्याएँ और तिथियाँ</b><br>व्यवसाय लॉन्च, महत्वपूर्ण सौदों और व्यक्तिगत सफलता के समय के लिए।<br><br>',
        'core-service-1-li5': '<b>हस्ताक्षर सुधार</b><br>हस्ताक्षर संरेखण के माध्यम से ऊर्जा प्रवाह और व्यक्तिगत आकर्षण में सुधार करें।',
        'core-service-2-title': '🏠 वास्तु परामर्श',
        'core-service-2-li1': '<b>आवासीय और वाणिज्यिक वास्तु विश्लेषण</b><br>सिद्ध वास्तु सिद्धांतों का उपयोग करके अंतरिक्ष ऊर्जा का मूल्यांकन और सुधार करें।<br><br>',
        'core-service-2-li2': '<b>बिना तोड़फोड़ के अंतरिक्ष संतुलन</b><br>व्यावहारिक उपाय और पुनर्संरेखण समाधान — किसी संरचनात्मक परिवर्तन की आवश्यकता नहीं है।<br><br>',
        'core-service-2-li3': '<b>स्वास्थ्य, धन और सद्भाव संवर्धन</b><br>ऊर्जा असंतुलन को ठीक करें जो आपकी भावनात्मक, वित्तीय या शारीरिक भलाई को प्रभावित करते हैं।<br><br>',
        'core-service-2-li4': '<b>दिशात्मक समायोजन</b><br>परिणामों में सुधार के लिए प्रवेश द्वार, रसोई और कार्यक्षेत्र जैसे प्रमुख क्षेत्रों को संरेखित करें।',
        'core-service-3-title': '❤️ प्रेम, विवाह और संबंध संगतता',
        'core-service-3-li1': '<b>कुंडली मिलान और संगतता विश्लेषण</b><br>रिश्ते के संरेखण का आकलन करने के लिए ज्योतिष और अंक ज्योतिष का उपयोग करना।<br><br>',
        'core-service-3-li2': '<b>जीवन साथी और व्यावसायिक साथी की उपयुक्तता</b><br>किसी भी व्यक्तिगत या व्यावसायिक बंधन में ताकत और चुनौतियों की खोज करें।<br><br>',
        'core-service-3-li3': '<b>भावनात्मक उपचार उपाय</b><br>संघर्षों को हल करें, प्यार बहाल करें, और आपसी समझ बढ़ाएँ।<br><br>',
        'core-service-3-li4': '<b>संबंध अंतर्दृष्टि</b><br>विश्वास, प्यार और संचार को प्रभावित करने वाले ऊर्जा पैटर्न को समझें।',
        'core-service-4-title': '👶 बच्चे का नाम और पारिवारिक मार्गदर्शन',
        'core-service-4-li1': '<b>बच्चे के नाम के सुझाव</b><br>लो-शू ग्रिड और ग्रहों के संरेखण का उपयोग करके चुने गए सार्थक और भाग्यशाली नाम।<br><br>',
        'core-service-4-li2': '<b>पारिवारिक कंपन मिलान</b><br>अंक ज्योतिषीय संतुलन का उपयोग करके अपने परिवार के भीतर सद्भाव और बंधन में सुधार करें।<br><br>',
        'core-service-4-li3': '<b>बच्चे की क्षमता का विश्लेषण</b><br>आपके बच्चे की ताकत, लक्षणों और भविष्य के मार्ग का लो-शू, ज्योतिष और अंक ज्योतिष आधारित मूल्यांकन।',
        'core-service-5-title': '🃏 टैरो रीडिंग और उपाय',
        'core-service-5-li1': '<b>सहज टैरो मार्गदर्शन</b><br>प्रेम, करियर, वित्त और जीवन के निर्णयों के लिए।<br><br>',
        'core-service-5-li2': '<b>कार्य-आधारित रीडिंग</b><br>व्यावहारिक, आध्यात्मिक उपायों के साथ स्पष्ट उत्तर।<br><br>',
        'core-service-5-li3': '<b>अंतर्दृष्टिपूर्ण और सटीक</b><br>गहरे सहज संबंध और अनुभव के साथ मिश्रित रीडिंग।',
        'core-service-6-title': '👁️‍🗨️ चेहरा पढ़ना',
        'core-service-6-p1': 'आपका चेहरा आपकी कहानी बताता है<br>आपका चेहरा आपके आंतरिक स्व — व्यक्तित्व लक्षणों, भावनात्मक ऊर्जा और भविष्य की क्षमता को दर्शाता है। हम विश्लेषण करते हैं:<br><br>' +
                              '• प्राकृतिक ताकत और विकास के क्षेत्र<br>' +
                              '• चेहरे की विशेषताओं के आधार पर संबंध संगतता<br>' +
                              '• चेहरे की संरचना आपके करियर और आत्मविश्वास को कैसे प्रभावित करती है<br>' +
                              '• आत्म-जागरूकता और विकास के लिए व्यक्तिगत अंतर्दृष्टि',
        'core-service-7-title': '✍️ हस्तलेखन और हस्ताक्षर विश्लेषण (ग्राफोलॉजी)',
        'core-service-7-p1': 'अपनी लिखावट बदलें, अपना जीवन बदलें<br>आपकी लिखावट आपके अवचेतन का दर्पण है। ग्राफोलॉजी के माध्यम से, हम डिकोड करते हैं:<br><br>' +
                              '• भावनात्मक पैटर्न और व्यक्तित्व लक्षण<br>' +
                              '• सूक्ष्म अवरोध जो आपके विकास और मानसिकता को प्रभावित करते हैं<br>' +
                              '• सफलता और ऊर्जा संरेखण के लिए हस्ताक्षर सुधार<br>' +
                              '• आत्मविश्वास और नेतृत्व गुणों के निर्माण के लिए सिफारिशें',
        'core-service-8-title': '📿 उपचार और ऊर्जावान उपाय',
        'core-service-8-li1': '<b>क्रिस्टल थेरेपी</b><br>प्यार, वित्त, स्वास्थ्य और आध्यात्मिक सुरक्षा के लिए क्रिस्टल का उपयोग करके व्यक्तिगत उपचार।<br><br>',
        'core-service-8-li2': '<b>भाग्यशाली संख्याएँ और वस्तु कंपन मिलान</b><br>व्यक्तिगत भाग्य को बढ़ावा देने के लिए मोबाइल, घर और वाहन नंबर सुझाव।<br><br>',
        'core-service-8-li3': '<b>अंक ज्योतिषीय पूर्वानुमान</b><br>मासिक और वार्षिक मार्गदर्शन<br>स्पष्टता के साथ योजना बनाने और तैयार करने के लिए।<br><br>',
        'core-service-8-li4': '<b>रंग थेरेपी और अनुष्ठान</b><br>रंगों और सरल उपायों के उपयोग के माध्यम से ऊर्जा-बढ़ाने वाले समाधान।',
        'contact-now-btn': 'अभी संपर्क करें',


        // Contact Section
        'contact-title': 'हमसे जुड़ें',
        'contact-subtitle': 'अपना जीवन बदलने के लिए तैयार हैं? हमारे विशेषज्ञ ज्योतिषियों से संपर्क करें',
        'contact-form-name': 'पूरा नाम',
        'contact-form-email': 'ईमेल पता',
        'contact-form-phone': 'फोन नंबर',
        'contact-form-service': 'रुचि की सेवा',
        'contact-form-message': 'आपका संदेश',
        'contact-form-btn': 'संदेश भेजें',
        'contact-info-title': 'संपर्क करें',
        'contact-whatsapp': 'व्हाट्सएप',
        'contact-email': 'ईमेल',
        'contact-usa': 'यूएसए कार्यालय',
        'contact-website': 'वेबसाइट'
    }
};


function openModal(imgElement) {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImg");
    modal.classList.add("show");
    modalImg.src = imgElement.src;
    document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeModal() {
    const modal = document.getElementById("imgModal");
    modal.classList.remove("show");
    document.body.style.overflow = ""; // re-enable scroll
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const offset = 80; // adjust for header height
    const target = document.querySelector(this.getAttribute('href'));
    const top = target.offsetTop - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

ScrollReveal().reveal('.reveal', {
  distance: '50px',
  duration: 1000,
  easing: 'ease-in-out',
  origin: 'bottom',
  interval: 200
});


// Run only when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeLanguageToggle();
});

function initializeLanguageToggle() {
    const langToggleBtn = document.getElementById('lang-toggle');
    const currentLangSpan = document.getElementById('current-lang');

    let currentLang = localStorage.getItem('lang') || 'en';
    applyTranslations(currentLang);
    currentLangSpan.textContent = currentLang.toUpperCase();

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'hi' : 'en';
        localStorage.setItem('lang', currentLang);
        currentLangSpan.textContent = currentLang.toUpperCase();
        applyTranslations(currentLang);
    });
}

function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
}




const carousel = document.querySelector('.review-carousel');
let scrollAmount = 0;

setInterval(() => {
    scrollAmount += 510;
    if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
        scrollAmount = 0;
    }
    carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
}, 4000);
