document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LOGIKA CURSOR GLOW
    // ==========================================
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth follow animation
        function animateCursor() {
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;
            
            cursorGlow.style.left = `${glowX}px`;
            cursorGlow.style.top = `${glowY}px`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // ==========================================
    // 2. LOGIKA WELCOME OVERLAY
    // ==========================================
    const welcomeOverlay = document.getElementById('welcome-overlay');
    if (welcomeOverlay) {
        setTimeout(() => {
            welcomeOverlay.classList.add('hidden');
            // Enable scroll after welcome screen
            document.body.style.overflow = 'auto';
        }, 2500);
        
        // Disable scroll during welcome
        document.body.style.overflow = 'hidden';
    }

    // ==========================================
    // 3. LOGIKA HEADER SCROLLED
    // ==========================================
    const header = document.getElementById('main-header');
    let lastScrollY = 0;
    let ticking = false;

    if (header) {
        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    // ==========================================
    // 4. LOGIKA SCROLL PROGRESS BAR
    // ==========================================
    const scrollProgressBar = document.createElement('div');
    scrollProgressBar.className = 'scroll-progress-bar';
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.appendChild(scrollProgressBar);
    document.body.insertBefore(scrollProgress, document.body.firstChild);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgressBar.style.width = scrolled + "%";
    });

    // ==========================================
    // 5. LOGIKA SMOOTH SCROLL DENGAN OFFSET
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // ==========================================
    // 6. LOGIKA ANIMASI SCROLL REVEAL (ADVANCED)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || (index * 100);
                
                setTimeout(() => {
                    entry.target.classList.add('active');
                    
                    // Typing effect untuk hero section
                    if (entry.target.classList.contains('type-animate')) {
                        typeWriter(entry.target);
                    }
                }, delay);
                
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Typing effect function
    const typeWriter = (element) => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';
        
        let i = 0;
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        };
        type();
    };

    // ==========================================
    // 7. LOGIKA NAVIGASI AKTIF (IMPROVED)
    // ==========================================
    const sections = document.querySelectorAll('.fullscreen-section');
    const navDots = document.querySelectorAll('.nav-dot');
    const navLinks = document.querySelectorAll('.header-nav a');

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                
                // Update side nav dots
                navDots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.dataset.section === currentSectionId) {
                        dot.classList.add('active');
                    }
                });

                // Update header nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px' });

    sections.forEach(section => navObserver.observe(section));

    // ==========================================
    // 8. LOGIKA TAB PENGALAMAN
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            // Animate out
            tabPanes.forEach(pane => {
                if (pane.classList.contains('active')) {
                    pane.style.opacity = '0';
                    pane.style.transform = 'translateX(-20px)';
                }
            });

            setTimeout(() => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));

                button.classList.add('active');
                const targetPane = document.getElementById(targetTab);
                targetPane.classList.add('active');
                
                // Animate in
                targetPane.style.opacity = '0';
                targetPane.style.transform = 'translateX(20px)';
                
                requestAnimationFrame(() => {
                    targetPane.style.transition = 'all 0.3s ease';
                    targetPane.style.opacity = '1';
                    targetPane.style.transform = 'translateX(0)';
                });
            }, 200);
        });
    });

    // ==========================================
    // 9. LOGIKA NAVIGASI MOBILE
    // ==========================================
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const headerNav = document.getElementById('header-nav');
    const mobileNavLinks = document.querySelectorAll('.header-nav a');

    if (mobileNavToggle && headerNav) {
        const toggleMenu = () => {
            const isOpen = headerNav.classList.contains('active');
            
            if (isOpen) {
                headerNav.classList.remove('active');
                mobileNavToggle.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                headerNav.classList.add('active');
                mobileNavToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        };

        mobileNavToggle.addEventListener('click', toggleMenu);

        // Close menu saat link diklik
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                headerNav.classList.remove('active');
                mobileNavToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu saat klik di luar
        document.addEventListener('click', (e) => {
            if (!headerNav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                headerNav.classList.remove('active');
                mobileNavToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ==========================================
    // 10. LOGIKA IMAGE MODAL (ZOOM & GALLERY)
    // ==========================================
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalFilename = document.getElementById('modal-filename');
    const images = document.querySelectorAll('.zoomable-image');
    const closeModalBtn = document.getElementById('close-modal');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');

    let currentGallery = [];
    let currentIndex = 0;

    const openModal = (img) => {
        modal.style.display = "flex";
        modal.style.opacity = "0";
        
        // Fade in animation
        requestAnimationFrame(() => {
            modal.style.transition = "opacity 0.3s ease";
            modal.style.opacity = "1";
        });

        modalImg.src = img.src;
        modalFilename.textContent = img.dataset.filename || 'Image';

        // Gallery logic
        if (img.dataset.gallery) {
            try {
                currentGallery = JSON.parse(img.dataset.gallery);
                currentIndex = currentGallery.indexOf(img.getAttribute('src'));
                if (currentIndex === -1) currentIndex = 0;

                prevBtn.style.display = currentGallery.length > 1 ? "block" : "none";
                nextBtn.style.display = currentGallery.length > 1 ? "block" : "none";
            } catch (e) {
                console.error("Format data-gallery salah.", e);
                currentGallery = [];
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
        } else {
            currentGallery = [];
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        }
    };

    images.forEach(img => {
        img.addEventListener('click', () => openModal(img));
    });

    const closeImageModal = () => {
        modal.style.opacity = "0";
        setTimeout(() => {
            modal.style.display = "none";
            currentGallery = [];
        }, 300);
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeImageModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('image-modal-container') || e.target.classList.contains('image-modal-body')) {
                closeImageModal();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === "flex") {
            if (e.key === 'Escape') closeImageModal();
            if (e.key === 'ArrowLeft' && currentGallery.length > 0) navigateGallery(-1);
            if (e.key === 'ArrowRight' && currentGallery.length > 0) navigateGallery(1);
        }
    });

    const navigateGallery = (direction) => {
        if (currentGallery.length === 0) return;
        
        currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
        
        // Fade transition
        modalImg.style.opacity = "0";
        setTimeout(() => {
            modalImg.src = currentGallery[currentIndex];
            modalImg.style.opacity = "1";
        }, 200);
    };

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateGallery(-1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateGallery(1);
        });
    }

    // ==========================================
    // 11. LOGIKA FILTER PROYEK (ADVANCED)
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-grid .project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.dataset.filter;

                // Update active button
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.transform = 'scale(1)';
                });
                button.classList.add('active');
                button.style.transform = 'scale(1.05)';

                // Filter dengan animasi
                projectCards.forEach((card, index) => {
                    const cardCategory = card.dataset.category;
                    const shouldShow = filterValue === 'all' || filterValue === cardCategory;

                    if (shouldShow) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, index * 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8) translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ==========================================
    // 12. LOGIKA LIGHT / DARK MODE TOGGLE
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const currentTheme = localStorage.getItem('theme');

    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.body.classList.remove('light-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };

    // Set theme saat load
    applyTheme(currentTheme || 'dark');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-mode');
            const newTheme = isLight ? 'light' : 'dark';
            
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);

            // Animate icon rotation
            themeIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeIcon.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }

    // ==========================================
    // 13. LOGIKA BACK TO TOP BUTTON
    // ==========================================
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Add click animation
            backToTopBtn.style.transform = 'translateY(-10px) scale(0.9)';
            setTimeout(() => {
                backToTopBtn.style.transform = '';
            }, 200);
        });
    }

    // ==========================================
    // 14. LOGIKA 3D NETWORK BACKGROUND (CANVAS)
    // ==========================================
    const canvas = document.getElementById('canvas-3d-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let isAnimating = true;
        let animationId;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        window.addEventListener('resize', resize);
        resize();

        const particles = [];
        const particleCount = window.matchMedia('(pointer: coarse)').matches ? 40 : 80;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                originalX: Math.random() * width,
                originalY: Math.random() * height
            });
        }

        let mouse = { x: null, y: null };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Pause animation when not visible
        const canvasObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isAnimating = entry.isIntersecting;
                if (isAnimating && !animationId) {
                    animate();
                }
            });
        });
        canvasObserver.observe(document.getElementById('home'));

        let frameCount = 0;
        function animate() {
            if (!isAnimating) {
                animationId = null;
                return;
            }

            animationId = requestAnimationFrame(animate);
            
            // Render every 2nd frame for performance (30fps)
            frameCount++;
            if (frameCount % 2 !== 0) return;

            ctx.clearRect(0, 0, width, height);

            const isLightMode = document.body.classList.contains('light-mode');
            const particleColor = isLightMode ? 'rgba(0, 142, 176, 0.6)' : 'rgba(100, 255, 218, 0.6)';
            const lineColor = isLightMode ? '0, 142, 176' : '100, 255, 218';

            particles.forEach((p, index) => {
                // Movement
                p.x += p.vx;
                p.y += p.vy;

                // Boundary check
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();

                // Draw connections (limit to every 3rd particle for performance)
                if (index % 3 === 0) {
                    for (let j = index + 1; j < particles.length; j += 2) {
                        const p2 = particles[j];
                        const dx = p.x - p2.x;
                        const dy = p.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);

                        if (dist < 120) {
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.strokeStyle = `rgba(${lineColor}, ${1 - dist / 120})`;
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    }
                }

                // Mouse interaction (throttled)
                if (mouse.x != null && index % 5 === 0) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        const force = (150 - dist) / 150;
                        p.x += dx * force * 0.02;
                        p.y += dy * force * 0.02;
                    }
                }
            });
        }

        animate();
    }

    // ==========================================
    // 15. LOGIKA 3D TILT EFFECT UNTUK PROJECT CARDS
    // ==========================================
    const initTiltEffect = () => {
        const cards = document.querySelectorAll('.project-card');
        
        // Skip untuk mobile
        if (window.matchMedia('(pointer: coarse)').matches) return;

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateY(-7px)
                    scale(1.02)
                `;
                card.style.transition = 'transform 0.1s ease-out';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
                card.style.transition = 'transform 0.5s ease-out';
            });
        });
    };

    initTiltEffect();

    // ==========================================
    // 16. LOGIKA RIPPLE EFFECT UNTUK BUTTONS
    // ==========================================
    const addRippleEffect = () => {
        const buttons = document.querySelectorAll('.btn-primary, .filter-btn, .tab-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(100, 255, 218, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    };

    addRippleEffect();

    // ==========================================
    // 17. LOGIKA TOAST NOTIFICATIONS
    // ==========================================
    window.showToast = (message, type = 'success') => {
        // Remove existing toasts
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(toast);
        
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // Form submission dengan toast
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulasi loading (Formspree akan handle actual submission)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // ==========================================
    // 18. LOGIKA GITHUB CALENDAR
    // ==========================================
    if (typeof GitHubCalendar !== 'undefined') {
        GitHubCalendar(".calendar", "nathanielsteave", { 
            responsive: true,
            tooltips: true,
            global_stats: true
        });
    }

    // ==========================================
    // 19. PREFERS REDUCED MOTION CHECK
    // ==========================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable complex animations
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('active');
            el.style.transition = 'none';
        });
        
        if (canvas) canvas.style.display = 'none';
    }

    console.log('🚀 Portfolio initialized successfully!');
});