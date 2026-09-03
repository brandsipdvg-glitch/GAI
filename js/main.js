/* ======================================
   Main JavaScript File
   ====================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initPreloader();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollEffects();
    initTestimonialSlider();
    initContactForm();
    initBackToTop();
    initAOS(); // Animation on Scroll
});

/* ======================================
   Preloader
   ====================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('hidden');
        }, 500);
    });
    
    // Fallback: hide preloader after 3 seconds
    setTimeout(function() {
        preloader.classList.add('hidden');
    }, 3000);
}

/* ======================================
   Navbar Scroll Effect
   ====================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink(sections, navLinks);
    });
    
    // Initial check
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
}

function updateActiveNavLink(sections, navLinks) {
    let current = '';
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

/* ======================================
   Mobile Menu Toggle
   ====================================== */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ======================================
   Smooth Scrolling
   ====================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ======================================
   Scroll Effects
   ====================================== */
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .product-card, .testimonial-card').forEach(function(el) {
        observer.observe(el);
    });
}

/* ======================================
   Testimonial Slider
   ====================================== */
function initTestimonialSlider() {
    const slider = document.getElementById('testimonialSlider');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialDots');
    
    if (!slider) return;
    
    const cards = slider.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    const cardsToShow = getCardsToShow();
    
    // Create dots
    const totalDots = Math.ceil(cards.length / cardsToShow);
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', function() {
            goToSlide(i);
        });
        dotsContainer.appendChild(dot);
    }
    
    function getCardsToShow() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }
    
    function goToSlide(index) {
        currentIndex = index;
        const cardWidth = cards[0].offsetWidth + 30; // Including gap
        slider.scrollTo({
            left: currentIndex * cardWidth * cardsToShow,
            behavior: 'smooth'
        });
        updateDots();
    }
    
    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach(function(dot, index) {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentIndex < totalDots - 1) {
            goToSlide(currentIndex + 1);
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newCardsToShow = getCardsToShow();
        const newTotalDots = Math.ceil(cards.length / newCardsToShow);
        
        // Recreate dots
        dotsContainer.innerHTML = '';
        for (let i = 0; i < newTotalDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', function() {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
    });
    
    // Auto-slide
    let autoSlide = setInterval(function() {
        if (currentIndex < totalDots - 1) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0);
        }
    }, 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', function() {
        clearInterval(autoSlide);
    });
    
    slider.addEventListener('mouseleave', function() {
        autoSlide = setInterval(function() {
            if (currentIndex < totalDots - 1) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(0);
            }
        }, 5000);
    });
}

/* ======================================
   Contact Form
   ====================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        });
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(function() {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Thank you for your inquiry! We will contact you soon.', 'success');
            
            // Reset form
            form.reset();
            
            // Optionally open WhatsApp with pre-filled message
            // openWhatsAppWithMessage(data);
        }, 1500);
    });
}

function validateForm(data) {
    if (!data.name || data.name.trim() === '') {
        showNotification('Please enter your name.', 'error');
        return false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!data.phone || data.phone.trim() === '') {
        showNotification('Please enter your phone number.', 'error');
        return false;
    }
    
    if (!data.inquiryType) {
        showNotification('Please select an inquiry type.', 'error');
        return false;
    }
    
    if (!data.message || data.message.trim() === '') {
        showNotification('Please enter your message.', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showNotification(message, type) {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10001;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
    `;
    
    closeBtn.addEventListener('click', function() {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(function() {
        notification.remove();
    }, 5000);
}

function openWhatsAppWithMessage(data) {
    const message = encodeURIComponent(
        `Hello! I'm interested in your water bottles.\n\n` +
        `Name: ${data.name}\n` +
        `Company: ${data.company || 'N/A'}\n` +
        `Inquiry Type: ${data.inquiryType}\n` +
        `Message: ${data.message}`
    );
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
}

/* ======================================
   Back to Top Button
   ====================================== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ======================================
   Animation on Scroll (AOS)
   ====================================== */
function initAOS() {
    // Simple AOS implementation
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(function() {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(function(el) {
        observer.observe(el);
    });
    
    // Add AOS styles
    const style = document.createElement('style');
    style.textContent = `
        [data-aos] {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        [data-aos].aos-animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

/* ======================================
   Utility Functions
   ====================================== */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

// Lazy loading for images
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

/* ======================================
   Product Quick View Modal
   ====================================== */
function initProductQuickView() {
    const quickViewBtns = document.querySelectorAll('.quick-view');
    
    quickViewBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product');
            showProductQuickView(productId);
        });
    });
}

function showProductQuickView(productId) {
    // Product data
    const products = {
        '300ml': {
            name: '300ml Packaged Drinking Water Bottle',
            capacity: '300 ML',
            description: 'Compact and convenient, perfect for events, offices, and retail distribution.',
            image: 'images/products/300ml-bottle.png'
        },
        '500ml': {
            name: '500ml Packaged Drinking Water Bottle',
            capacity: '500 ML',
            description: 'Our most popular size, ideal for retail, events, and corporate gifting.',
            image: 'images/products/500ml-bottle.png'
        },
        '1l': {
            name: '1 Litre Packaged Drinking Water Bottle',
            capacity: '1 LITRE',
            description: 'Family-sized bottle perfect for households, restaurants, and hospitality.',
            image: 'images/products/1l-bottle.png'
        },
        '2l': {
            name: '2 Litre Packaged Drinking Water Bottle',
            capacity: '2 LITRE',
            description: 'Economical choice for families and institutions.',
            image: 'images/products/2l-bottle.png'
        },
        '20l': {
            name: '20 Litre Water Can',
            capacity: '20 LITRE',
            description: 'Commercial-grade water dispenser bottle for offices and institutions.',
            image: 'images/products/20l-can.png'
        }
    };
    
    const product = products[productId];
    if (!product) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="product-modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="modal-info">
                    <h2>${product.name}</h2>
                    <span class="modal-capacity"><i class="fas fa-tint"></i> ${product.capacity}</span>
                    <p>${product.description}</p>
                    <div class="modal-actions">
                        <a href="https://wa.me/919876543210?text=Hi, I'm interested in ${product.name}" class="btn btn-whatsapp" target="_blank">
                            <i class="fab fa-whatsapp"></i> Inquire on WhatsApp
                        </a>
                        <a href="#contact" class="btn btn-outline">
                            <i class="fas fa-envelope"></i> Send Email
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = modal.querySelector('.product-modal-content');
    content.style.cssText = `
        background: white;
        border-radius: 16px;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow: auto;
        position: relative;
    `;
    
    const closeBtn = content.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        width: 40px;
        height: 40px;
        background: #f0f0f0;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
    `;
    
    const body = content.querySelector('.modal-body');
    body.style.cssText = `
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        padding: 40px;
    `;
    
    const image = body.querySelector('.modal-image');
    image.style.cssText = `
        background: linear-gradient(135deg, #f0f8ff 0%, #e0f4ff 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;
    
    const info = body.querySelector('.modal-info');
    info.style.cssText = `
        display: flex;
        flex-direction: column;
        justify-content: center;
    `;
    
    info.querySelector('h2').style.cssText = `
        font-size: 1.5rem;
        margin-bottom: 10px;
        color: #212529;
    `;
    
    const capacity = info.querySelector('.modal-capacity');
    capacity.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: rgba(0,119,182,0.1);
        color: #0077B6;
        border-radius: 50px;
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 20px;
        width: fit-content;
    `;
    
    info.querySelector('p').style.cssText = `
        color: #6c757d;
        line-height: 1.8;
        margin-bottom: 30px;
    `;
    
    const actions = info.querySelector('.modal-actions');
    actions.style.cssText = `
        display: flex;
        flex-direction: column;
        gap: 12px;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Close modal
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(function() {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Add fadeOut animation
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(fadeOutStyle);
}

// Initialize product quick view
document.addEventListener('DOMContentLoaded', initProductQuickView);

/* ======================================
   Counter Animation
   ====================================== */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(function(counter) {
        const target = parseInt(counter.textContent);
        const suffix = counter.textContent.includes('+') ? '+' : '';
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = function() {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        // Use Intersection Observer to trigger animation
        const observer = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

document.addEventListener('DOMContentLoaded', animateCounters);