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
        }, 1500);
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

    // --- 8. LOGIKA IMAGE MODAL (ZOOM & GALLERY) ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalFilename = document.getElementById('modal-filename');
    const images = document.querySelectorAll('.zoomable-image');
    const closeModalBtn = document.getElementById('close-modal');

    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');

    let currentGallery = [];
    let currentIndex = 0;

    images.forEach(img => {
        img.addEventListener('click', () => {
            modal.style.display = "flex";
            modalImg.src = img.src;
            modalFilename.textContent = img.dataset.filename || 'Image';

            // Deteksi apakah gambar memiliki atribut data-gallery (array gambar)
            if (img.dataset.gallery) {
                try {
                    currentGallery = JSON.parse(img.dataset.gallery);
                    currentIndex = currentGallery.indexOf(img.getAttribute('src'));
                    if (currentIndex === -1) currentIndex = 0;

                    // Tampilkan tombol navigasi jika gambar lebih dari 1
                    if (currentGallery.length > 1) {
                        prevBtn.style.display = "block";
                        nextBtn.style.display = "block";
                    } else {
                        prevBtn.style.display = "none";
                        nextBtn.style.display = "none";
                    }
                } catch (e) {
                    console.error("Format data-gallery salah. Harus format JSON Array.", e);
                    currentGallery = [];
                    prevBtn.style.display = "none";
                    nextBtn.style.display = "none";
                }
            } else {
                // Untuk proyek lain yang hanya punya 1 gambar
                currentGallery = [];
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
        });
    });

    const closeImageModal = () => {
        modal.style.display = "none";
        currentGallery = []; // Reset galeri
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeImageModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            // Tutup jika klik latar belakang gelap, BUKAN pada gambar atau tombol
            if (e.target === modal || e.target.classList.contains('image-modal-container') || e.target.classList.contains('image-modal-body')) {
                closeImageModal();
            }
        });
    }

    // Logika tombol Next & Prev
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah klik tembus ke belakang
            if (currentGallery.length > 0) {
                currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
                modalImg.src = currentGallery[currentIndex];
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Mencegah klik tembus ke belakang
            if (currentGallery.length > 0) {
                currentIndex = (currentIndex + 1) % currentGallery.length;
                modalImg.src = currentGallery[currentIndex];
            }
        });
    }

    // --- 9. LOGIKA FILTER PROYEK ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-grid .project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterValue = button.dataset.filter;

                // 1. Set tombol aktif
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // 2. Tampilkan/sembunyikan kartu proyek
                projectCards.forEach(card => {
                    const cardCategory = card.dataset.category;

                    // Logika ini akan otomatis menangani "basic", "web", "data", dll.
                    if (filterValue === 'all' || filterValue === cardCategory) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // --- 10. LOGIKA LIGHT / DARK MODE TOGGLE ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const currentTheme = localStorage.getItem('theme');

    // Cek preferensi tema sebelumnya di localStorage
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // Event listener untuk tombol toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');

            // Simpan ke localStorage dan ubah ikon
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        });
    }

    // --- 11. LOGIKA BACK TO TOP BUTTON ---
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            // Tampilkan tombol jika user sudah scroll lebih dari 500px ke bawah
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Event saat tombol diklik
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- 12. LOGIKA 3D NETWORK BACKGROUND (CANVAS) ---
    const canvas = document.getElementById('canvas-3d-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;

        // Menyesuaikan ukuran canvas dengan layar
        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        window.addEventListener('resize', resize);
        resize();

        const particles = [];
        // Jumlah partikel (kurangi jika performa dirasa berat, tambah jika ingin lebih ramai)
        const particleCount = 80;

        // Membuat partikel awal
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 1, // Kecepatan X
                vy: (Math.random() - 0.5) * 1, // Kecepatan Y
                radius: Math.random() * 2 + 1 // Ukuran titik
            });
        }

        let mouse = { x: null, y: null };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Loop Animasi
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, width, height);

            // Cek mode saat ini agar warna garis & partikel menyesuaikan
            const isLightMode = document.body.classList.contains('light-mode');
            const particleColor = isLightMode ? 'rgba(0, 142, 176, 0.6)' : 'rgba(100, 255, 218, 0.6)';
            const lineColor = isLightMode ? '0, 142, 176' : '100, 255, 218';

            particles.forEach((p, index) => {
                // Pergerakan partikel
                p.x += p.vx;
                p.y += p.vy;

                // Memantul jika menyentuh ujung layar
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Menggambar titik (Nodes)
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();

                // Menggambar garis (Network) jika jarak partikel berdekatan
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        // Garis memudar perlahan (efek 3D Depth) jika jarak makin jauh
                        ctx.strokeStyle = `rgba(${lineColor}, ${1 - dist / 120})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }

                // Efek Parallax/Menghindar dari kursor mouse (Efek Dorongan 3D)
                if (mouse.x != null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) { // Radius dorongan mouse
                        p.x += dx * 0.02;
                        p.y += dy * 0.02;
                    }
                }
            });
        }

        // Memulai animasi
        animate();
    }
    
    // --- 13. LOGIKA GITHUB CALENDAR ---
    // Memastikan library GitHub Calendar sudah termuat
    if (typeof GitHubCalendar !== 'undefined') {
        GitHubCalendar(".calendar", "nathanielsteave", { 
            responsive: true,
            tooltips: true
        });
    }
});