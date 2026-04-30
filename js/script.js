/**
 * Way Home Real Estate - Luxury Real Estate
 * Premium One-Page Website JavaScript
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const header = document.getElementById('header');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const animateElements = document.querySelectorAll('.animate-fade-up');

    // ============================================
    // Header Scroll Effect
    // ============================================
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    }

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Intersection Observer for Fade-Up Animations
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(element => {
        animationObserver.observe(element);
    });

    // ============================================
    // Staggered Animation for Grid Items
    // ============================================
    function setupStaggeredAnimation(containerSelector, itemSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        
        const items = container.querySelectorAll(itemSelector);
        items.forEach((item, index) => {
            const delay = (index % 3) * 0.1;
            item.style.transitionDelay = `${delay}s`;
        });
    }

    // Setup staggered animations for grids
    setupStaggeredAnimation('.properties-grid', '.property-card');
    setupStaggeredAnimation('.agents-grid', '.agent-card');
    setupStaggeredAnimation('.offers-grid', '.offer-card');

    // ============================================
    // Image Lazy Loading Enhancement
    // ============================================
    const imageObserverOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.01
    };

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    }, imageObserverOptions);

    // Observe images that have data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // ============================================
    // Form Handling
    // ============================================
    const searchForm = document.querySelector('.search-form');
    const contactForm = document.querySelector('.contact-form');

    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // In a real application, this would send to a backend
            console.log('Search submitted:', data);
            
            // Show feedback (for demo purposes)
            alert('Search functionality would filter properties based on your criteria. In a production environment, this would connect to a property database.');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            if (!data.fullname || !data.email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, this would send to a backend
            console.log('Contact form submitted:', data);
            
            // Show success message
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitted!';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                this.reset();
            }, 3000);
            
            alert('Thank you for your inquiry. One of our advisors will contact you within 24 hours.');
        });
    }

    // ============================================
    // Active Navigation Link Highlighting
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        const scrollPosition = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Run once on load

    // ============================================
    // Property Card Hover Effects Enhancement
    // ============================================
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add any additional hover effects here if needed
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove any additional hover effects here if needed
        });
    });

    // ============================================
    // Agent Card Interactions
    // ============================================
    const agentCards = document.querySelectorAll('.agent-card');
    
    agentCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // If clicking on the phone link, let it work normally
            if (e.target.closest('.agent-phone')) {
                return;
            }
            
            // In a real application, this could open a modal with agent details
            // or navigate to an agent profile page
        });
    });

    // ============================================
    // Parallax Effect for Hero (Subtle)
    // ============================================
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = 0.1; // Very subtle parallax
            
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrolled * rate}px)`;
            }
        });
    }

    // ============================================
    // CTA Banner Parallax (Subtle)
    // ============================================
    const ctaBannerImage = document.querySelector('.cta-banner-image');
    
    if (ctaBannerImage) {
        window.addEventListener('scroll', () => {
            const ctaSection = document.querySelector('.cta-banner');
            if (!ctaSection) return;
            
            const rect = ctaSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const scrolled = window.scrollY;
                const rate = 0.05; // Even more subtle
                ctaBannerImage.style.transform = `translateY(${scrolled * rate}px)`;
            }
        });
    }

    // ============================================
    // Number Counter Animation for Stats
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateNumber(entry.target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, statObserverOptions);

    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });

    function animateNumber(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasDollar = text.includes('$');
        const hasM = text.includes('M');
        
        // Extract the number
        let numStr = text.replace(/[^0-9.]/g, '');
        let num = parseFloat(numStr);
        
        if (isNaN(num)) return;
        
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = start + (num - start) * easeProgress;
            
            let formatted = '';
            if (hasM) {
                formatted = current.toFixed(0);
            } else {
                formatted = Math.floor(current).toString();
            }
            
            if (hasDollar) formatted = '$' + formatted;
            if (hasM) formatted += 'M';
            if (hasPlus) formatted += '+';
            
            element.textContent = formatted;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }

    // ============================================
    // Keyboard Navigation Support
    // ============================================
    document.addEventListener('keydown', (e) => {
        // Close mobile menu on Escape
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // ============================================
    // Resize Handler
    // ============================================
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Close mobile menu on resize to desktop
            if (window.innerWidth > 768 && nav.classList.contains('active')) {
                toggleMobileMenu();
            }
        }, 250);
    });

    // ============================================
    // Initialize
    // ============================================
    function init() {
        // Run initial checks
        handleScroll();
        highlightNavOnScroll();
        
        // Log initialization (remove in production)
        console.log('Way Home Real Estate website initialized');
    }

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();