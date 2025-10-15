document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LOGIKA CURSOR GLOW ---
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursorGlow.style.left = `${e.clientX}px`;
                cursorGlow.style.top = `${e.clientY}px`;
            });
        });
    }

    // --- 2. LOGIKA WELCOME OVERLAY ---
    const welcomeOverlay = document.getElementById('welcome-overlay');
    if (welcomeOverlay) {
        setTimeout(() => {
            welcomeOverlay.classList.add('hidden');
        }, 3000);
    }

    // --- 3. LOGIKA HEADER SCROLLED ---
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 4. LOGIKA ANIMASI SCROLL REVEAL ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));

    // --- 5. LOGIKA NAVIGASI AKTIF ---
    const sections = document.querySelectorAll('.fullscreen-section');
    const navDots = document.querySelectorAll('.nav-dot');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                navDots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.dataset.section === currentSectionId) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });
    sections.forEach(section => navObserver.observe(section));

    // --- 6. LOGIKA TAB PENGALAMAN ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // --- 7. LOGIKA NAVIGASI MOBILE ---
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const headerNav = document.getElementById('header-nav');
    const navLinks = document.querySelectorAll('.header-nav a');

    if (mobileNavToggle && headerNav) {
        // Buka/tutup menu saat tombol hamburger diklik
        mobileNavToggle.addEventListener('click', () => {
            headerNav.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');
        });

        // Tutup menu saat salah satu link navigasi diklik
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                headerNav.classList.remove('active');
                mobileNavToggle.classList.remove('active');
            });
        });
    }

    // --- 8. LOGIKA IMAGE MODAL (ZOOM) ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalFilename = document.getElementById('modal-filename');
    const images = document.querySelectorAll('.zoomable-image');
    const closeModalBtn = document.getElementById('close-modal');

    images.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = "flex";
            modalImg.src = img.src;
            modalFilename.textContent = img.dataset.filename || 'Image';
        });
    });

    const closeImageModal = () => {
        modal.style.display = "none";
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeImageModal);
    }

    if (modal) {
        // Tutup modal jika klik di luar container gambar
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeImageModal();
            }
        });
    }
});