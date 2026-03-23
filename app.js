document.addEventListener('DOMContentLoaded', function() {
    console.log('Architecting Portfolio from scratch...');

    // 1. Particle Engine (Subtle & Fluid)
    function initParticles() {
        const canvas = document.getElementById('particles');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.4 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }
            draw() {
                ctx.fillStyle = `rgba(141, 163, 153, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function init() {
            particles = [];
            const count = (canvas.width * canvas.height) / 25000;
            for (let i = 0; i < count; i++) particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            requestAnimationFrame(animate);
        }
        init();
        animate();
    }

    // 2. Custom Cursor (Interactive Gesture)
    function initCursor() {
        const cursor = document.getElementById('custom-cursor');
        if (!cursor) return;
        window.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
        const activeElements = document.querySelectorAll('a, button, .doc-nav-item, .profile-corner');
        activeElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }

    // 3. Documentary Logic (Tab Switching)
    function initDocTabs() {
        const navItems = document.querySelectorAll('.doc-nav-item');
        const sections = document.querySelectorAll('.doc-section');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const target = item.getAttribute('data-target');
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                sections.forEach(sec => {
                    sec.classList.remove('active');
                    if (sec.id === target) sec.classList.add('active');
                });
            });
        });
    }

    // 4. Reveal Gestures (Intersection Observer)
    function initReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        const revealers = document.querySelectorAll('.gesture-reveal, .service-card, .research-card, .failure-block');
        revealers.forEach(el => observer.observe(el));
    }

    // 5. Smooth Internal Navigation
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
            });
        });
    }

    // Initialize Architecture
    initParticles();
    initCursor();
    initDocTabs();
    initReveal();
    initSmoothScroll();
    console.log('Portfolio Architecture Fully Executed.');
});
