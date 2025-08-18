// Neo-Brutalist Portfolio JavaScript - Bug Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing enhanced portfolio...');
    
    // Enhanced Particle System
    function initParticles() {
        const canvas = document.getElementById('particles');
        if (!canvas) {
            console.error('Particles canvas not found');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        let mouse = { x: 0, y: 0 };
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            console.log(`Canvas resized to: ${canvas.width}x${canvas.height}`);
        }
        
        function createParticles() {
            particles = [];
            const count = Math.min(60, Math.floor(canvas.width * canvas.height / 15000)); // Adaptive count
            
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 1.2,
                    vy: (Math.random() - 0.5) * 1.2,
                    size: Math.random() * 3 + 1,
                    alpha: Math.random() * 0.5 + 0.3
                });
            }
            console.log(`Created ${particles.length} particles`);
        }
        
        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            particles.forEach((particle, index) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Mouse interaction
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    particle.vx += dx * 0.0001;
                    particle.vy += dy * 0.0001;
                }
                
                // Bounce off edges
                if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -0.8;
                if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -0.8;
                
                // Keep in bounds
                particle.x = Math.max(0, Math.min(canvas.width, particle.x));
                particle.y = Math.max(0, Math.min(canvas.height, particle.y));
                
                // Add some randomness
                particle.vx += (Math.random() - 0.5) * 0.02;
                particle.vy += (Math.random() - 0.5) * 0.02;
                
                // Limit velocity
                const maxVel = 2;
                if (Math.abs(particle.vx) > maxVel) particle.vx = maxVel * Math.sign(particle.vx);
                if (Math.abs(particle.vy) > maxVel) particle.vy = maxVel * Math.sign(particle.vy);
                
                // Draw particle
                ctx.globalAlpha = particle.alpha;
                ctx.fillStyle = '#404040';
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Draw connections with enhanced styling
            ctx.strokeStyle = '#606060';
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.2;
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        ctx.globalAlpha = (120 - distance) / 120 * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            ctx.globalAlpha = 1;
            animationId = requestAnimationFrame(drawParticles);
        }
        
        // Mouse tracking
        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        
        // Initialize
        resizeCanvas();
        createParticles();
        drawParticles();
        
        // Handle resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
        
        console.log('Enhanced particle system initialized');
    }
    
    initParticles();
    
    // Enhanced Typing Animation with AI journalism focus
    function initTypingAnimation() {
        const element = document.getElementById('typing-text');
        if (!element) return;
        
        const texts = [
            'BUILDING THE FUTURE',
            'AI ENGINEER',
            'TECH JOURNALIST', 
            'STARTUP RESEARCHER',
            'AI ETHICS ADVOCATE',
            'MACHINE LEARNING EXPERT'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(type, 500);
                } else {
                    setTimeout(type, 50);
                }
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentText.length) {
                    setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, 2000);
                } else {
                    setTimeout(type, 100);
                }
            }
        }
        
        type();
        console.log('Enhanced typing animation initialized');
    }
    
    initTypingAnimation();
    
    // Achievement Counter Animation
    function initAchievementCounters() {
        const counters = document.querySelectorAll('.achievement-number');
        let animated = false;
        
        function animateCounters() {
            if (animated) return;
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                let current = 0;
                const increment = target / 50; // 50 steps
                const duration = 2000; // 2 seconds
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, stepTime);
            });
            
            animated = true;
        }
        
        // Trigger when achievements section is visible
        function checkAchievementsVisibility() {
            const achievementsSection = document.getElementById('achievements');
            if (!achievementsSection) return;
            
            const rect = achievementsSection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.7;
            
            if (isVisible && !animated) {
                animateCounters();
            }
        }
        
        // Throttled scroll handler
        let ticking = false;
        function handleScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    checkAchievementsVisibility();
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', handleScroll);
        checkAchievementsVisibility(); // Initial check
        
        console.log('Achievement counters initialized');
    }
    
    initAchievementCounters();
    
    // FIXED: Enhanced Navigation System with proper section targeting
    function initNavigation() {
        console.log('Initializing FIXED navigation...');
        
        // Get all navigation elements
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
        const allNavElements = [...navLinks, ...heroButtons];
        
        console.log(`Found ${allNavElements.length} navigation elements`);
        
        // FIXED: Enhanced scroll function with better targeting
        function scrollToElement(targetId) {
            console.log(`FIXED: Scrolling to: ${targetId}`);
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) {
                console.error(`Target element not found: ${targetId}`);
                return false;
            }
            
            const navHeight = document.querySelector('.nav-fixed')?.offsetHeight || 80;
            const elementTop = targetElement.offsetTop;
            const targetPosition = elementTop - navHeight - 20; // Extra padding for better visibility
            
            console.log(`Target element: ${targetElement.id}, Position: ${targetPosition}`);
            
            // Force scroll with multiple fallbacks
            try {
                // Method 1: Modern smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Method 2: Fallback for older browsers
                setTimeout(() => {
                    if (Math.abs(window.pageYOffset - targetPosition) > 50) {
                        window.scrollTo(0, targetPosition);
                    }
                }, 100);
                
                return true;
            } catch (error) {
                console.error('Scroll error:', error);
                // Method 3: Final fallback
                window.scrollTo(0, targetPosition);
                return true;
            }
        }
        
        // FIXED: Enhanced click listeners with better error handling
        allNavElements.forEach((element, index) => {
            const href = element.getAttribute('href');
            console.log(`Adding FIXED listener to element ${index}: ${href}`);
            
            element.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const targetHref = this.getAttribute('href');
                console.log(`FIXED: Navigation clicked: ${targetHref}`);
                
                if (targetHref && targetHref.startsWith('#')) {
                    const success = scrollToElement(targetHref);
                    
                    if (success) {
                        // Enhanced visual feedback
                        this.style.transform = 'scale(0.95) rotate(-2deg)';
                        this.style.transition = 'all 0.15s ease';
                        setTimeout(() => {
                            this.style.transform = '';
                        }, 150);
                        
                        // Show feedback notification
                        const sectionName = targetHref.replace('#', '').toUpperCase().replace('-', ' ');
                        showNotification(`Navigating to ${sectionName}`, 'info');
                    }
                } else {
                    console.error('Invalid navigation target:', targetHref);
                }
            });
        });
        
        console.log('FIXED navigation system initialized');
    }
    
    initNavigation();
    
    // FIXED: Enhanced Contact Form with proper feedback
    function initContactForm() {
        const form = document.getElementById('contact-form');
        const submitBtn = form?.querySelector('button[type="submit"]');
        
        if (!form) {
            console.error('Contact form not found');
            return;
        }
        
        console.log('FIXED contact form found, initializing...');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('FIXED: Form submitted');
            
            const formData = new FormData(form);
            const name = formData.get('name')?.trim() || '';
            const email = formData.get('email')?.trim() || '';
            const message = formData.get('message')?.trim() || '';
            
            console.log('Form data:', { name, email, message });
            
            // Enhanced validation
            if (!name || name.length < 2) {
                showNotification('Please enter a valid name (minimum 2 characters)', 'error');
                form.querySelector('#name').focus();
                return;
            }
            
            if (!email) {
                showNotification('Please enter your email address', 'error');
                form.querySelector('#email').focus();
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                form.querySelector('#email').focus();
                return;
            }
            
            if (!message || message.length < 10) {
                showNotification('Please enter a message (minimum 10 characters)', 'error');
                form.querySelector('#message').focus();
                return;
            }
            
            // FIXED: Show immediate loading state and feedback
            if (submitBtn) {
                submitBtn.textContent = 'SENDING...';
                submitBtn.disabled = true;
                submitBtn.style.background = '#FFD400';
                submitBtn.style.color = '#000000';
            }
            
            // Show immediate success feedback
            showNotification('Processing your message...', 'info');
            
            // Create enhanced mailto
            const subject = `Portfolio Contact: ${name}`;
            const body = `Hello Abhishek,

I'm reaching out through your portfolio website.

Name: ${name}
Email: ${email}

Message:
${message}

Best regards,
${name}`;
            
            const mailtoUrl = `mailto:abhiashekjaiso25@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            console.log('Opening enhanced mailto:', mailtoUrl);
            
            // FIXED: Enhanced email handling with proper feedback
            setTimeout(() => {
                try {
                    // Try to open email client
                    window.location.href = mailtoUrl;
                    
                    // Show success message
                    showNotification('✅ EMAIL CLIENT OPENED! If it didn\'t open, please email me directly at abhiashekjaiso25@gmail.com', 'success');
                    
                    // Reset form after success
                    setTimeout(() => {
                        form.reset();
                        showNotification('Form cleared successfully!', 'info');
                    }, 1000);
                    
                } catch (error) {
                    console.error('Error opening email client:', error);
                    showNotification('❌ Could not open email client. Please email me at: abhiashekjaiso25@gmail.com', 'error');
                    
                    // Copy email to clipboard as fallback
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText('abhiashekjaiso25@gmail.com').then(() => {
                            showNotification('📋 Email address copied to clipboard!', 'success');
                        });
                    }
                }
                
                // FIXED: Always reset button state
                if (submitBtn) {
                    submitBtn.textContent = 'SEND MESSAGE';
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                }
            }, 500); // Small delay for better UX
        });
        
        // Enhanced form validation on input
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Real-time validation feedback
            input.addEventListener('input', function() {
                if (this.value.trim().length > 0) {
                    validateField(this);
                }
            });
        });
        
        console.log('FIXED contact form initialized with enhanced feedback');
    }
    
    function validateField(field) {
        const value = field.value.trim();
        
        // Remove existing error styling
        field.style.borderColor = '';
        field.style.boxShadow = '4px 4px 0px #00FFFF';
        
        let isValid = true;
        
        switch (field.type || field.tagName.toLowerCase()) {
            case 'text':
                if (value.length > 0 && value.length < 2) {
                    isValid = false;
                }
                break;
            case 'email':
                if (value.length > 0 && !isValidEmail(value)) {
                    isValid = false;
                }
                break;
            case 'textarea':
                if (value.length > 0 && value.length < 10) {
                    isValid = false;
                }
                break;
        }
        
        if (!isValid) {
            field.style.borderColor = '#FF007A';
            field.style.boxShadow = '4px 4px 0px #FF007A';
        }
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    initContactForm();
    
    // FIXED: Enhanced Notification System with better positioning
    function showNotification(message, type = 'info') {
        console.log(`FIXED: Showing notification: ${message} (${type})`);
        
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = message;
        
        const colors = {
            success: '#00FF00',
            error: '#FF007A',
            info: '#FFD400'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: #000000;
            padding: 15px 20px;
            border: 4px solid #000000;
            box-shadow: 8px 8px 0px #000000;
            font-weight: 900;
            font-size: 14px;
            letter-spacing: 1px;
            z-index: 10001;
            transform: translateX(100%);
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            max-width: 320px;
            word-wrap: break-word;
            cursor: pointer;
            border-radius: 0;
        `;
        
        document.body.appendChild(notification);
        
        // Click to copy email if it's the info notification about email
        if (message.includes('abhiashekjaiso25@gmail.com')) {
            notification.addEventListener('click', () => {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText('abhiashekjaiso25@gmail.com').then(() => {
                        showNotification('📧 Email copied to clipboard!', 'success');
                    });
                }
            });
            notification.style.cursor = 'pointer';
            notification.title = 'Click to copy email address';
        }
        
        // FIXED: Better animation sequence
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0) scale(1.05)';
            setTimeout(() => {
                notification.style.transform = 'translateX(0) scale(1)';
            }, 200);
        });
        
        // FIXED: Smart auto-remove timing
        const duration = type === 'error' ? 6000 : type === 'success' ? 4000 : 3000;
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%) scale(0.8)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 400);
            }
        }, duration);
    }
    
    // Enhanced Skill Tiles with Random Colors
    function initSkillEffects() {
        document.querySelectorAll('.skill-tile').forEach(tile => {
            tile.addEventListener('mouseenter', function() {
                const colors = ['#00FFFF', '#FF007A', '#FFD400', '#00FF00', '#FF6B00'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                const rotation = Math.random() * 30 - 15;
                const scale = 1.1 + Math.random() * 0.2;
                
                this.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
                this.style.boxShadow = `6px 6px 0px ${randomColor}`;
                this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                this.style.zIndex = '10';
            });
            
            tile.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                this.style.zIndex = '';
            });
        });
        
        console.log('Enhanced skill effects initialized');
    }
    
    initSkillEffects();
    
    // Enhanced Button Effects with Multiple States
    function initButtonEffects() {
        document.querySelectorAll('.btn-neon').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translate(4px, 4px) scale(1.05)';
                this.style.transition = 'all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
            
            btn.addEventListener('mousedown', function() {
                this.style.transform = 'translate(6px, 6px) scale(0.98)';
            });
            
            btn.addEventListener('mouseup', function() {
                this.style.transform = 'translate(4px, 4px) scale(1.05)';
            });
        });
        
        console.log('Enhanced button effects initialized');
    }
    
    initButtonEffects();
    
    // FIXED: Enhanced Scroll Animations with Intersection Observer and immediate visibility
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.article-card, .certificate-card, .network-card, .achievement-card, .testimonial-card, .project-card, .skill-category');
        
        // FIXED: Show elements immediately that are already visible
        function showVisibleElements() {
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    // Element is already visible, show it immediately
                    el.style.opacity = '1';
                    el.style.transform = el.style.transform.replace('translateY(50px)', 'translateY(0px)');
                    el.style.transition = 'all 0.6s ease';
                }
            });
        }
        
        // Create intersection observer for better performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    
                    // Add random delay for staggered animation, but only if not already visible
                    const delay = el.style.opacity === '1' ? 0 : Math.random() * 200;
                    
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = el.style.transform.replace('translateY(50px)', 'translateY(0px)');
                        el.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    }, delay);
                    
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Set initial state and observe elements
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = (el.style.transform || '') + ' translateY(50px)';
            observer.observe(el);
        });
        
        // FIXED: Show immediately visible elements
        setTimeout(showVisibleElements, 100);
        
        console.log('FIXED: Enhanced scroll animations with immediate visibility initialized');
    }
    
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        initScrollAnimations();
    } else {
        // Fallback for older browsers
        console.log('IntersectionObserver not supported, using scroll fallback');
        
        function fallbackScrollAnimations() {
            const elements = document.querySelectorAll('.article-card, .certificate-card, .network-card, .achievement-card, .testimonial-card, .project-card, .skill-category');
            
            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = (el.style.transform || '') + ' translateY(30px)';
            });
            
            function checkVisibility() {
                elements.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight * 0.8;
                    
                    if (isVisible && el.style.opacity === '0') {
                        el.style.opacity = '1';
                        el.style.transform = el.style.transform.replace('translateY(30px)', 'translateY(0px)');
                        el.style.transition = 'all 0.6s ease';
                    }
                });
            }
            
            let ticking = false;
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        checkVisibility();
                        ticking = false;
                    });
                    ticking = true;
                }
            });
            
            checkVisibility();
            setTimeout(checkVisibility, 100);
        }
        
        fallbackScrollAnimations();
    }
    
    // FIXED: Enhanced Active Navigation Highlighting with proper section detection
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        function updateActiveNav() {
            let current = 'hero';
            let minDistance = Infinity;
            
            // FIXED: Better section detection algorithm
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionTop = rect.top;
                const sectionBottom = rect.bottom;
                
                // Check if section is in the viewport center
                if (sectionTop <= window.innerHeight / 2 && sectionBottom >= window.innerHeight / 2) {
                    current = section.id;
                } else if (sectionTop < 200 && sectionTop > -200) {
                    // Or if it's very close to the top
                    const distance = Math.abs(sectionTop);
                    if (distance < minDistance) {
                        minDistance = distance;
                        current = section.id;
                    }
                }
            });
            
            console.log(`Active section: ${current}`);
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                const targetId = href ? href.substring(1) : '';
                const isActive = targetId === current;
                
                if (isActive) {
                    link.style.background = '#000000';
                    link.style.color = '#FFD400';
                    link.style.boxShadow = '4px 4px 0px #FF007A';
                    link.style.transform = 'scale(1.05)';
                } else {
                    link.style.background = '';
                    link.style.color = '#000000';
                    link.style.boxShadow = '';
                    link.style.transform = '';
                }
            });
        }
        
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateActiveNav();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        updateActiveNav();
        setTimeout(updateActiveNav, 500); // Update after initial load
        
        console.log('FIXED: Enhanced active navigation highlighting initialized');
    }
    
    initActiveNavigation();
    
    // Performance monitoring
    function logPerformance() {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
        }
    }
    
    window.addEventListener('load', logPerformance);
    
    console.log('🚀 FIXED: Enhanced Neo-Brutalist Portfolio with AI Journalism fully loaded!');
    console.log('🔧 FIXES: Navigation targeting, contact form feedback, section visibility');
    console.log('📱 Mobile responsive with progressive enhancement');
});

// Global utilities
window.portfolioUtils = {
    showNotification: function(message, type = 'info') {
        // This allows external scripts to show notifications if needed
        if (typeof showNotification === 'function') {
            showNotification(message, type);
        }
    }
};