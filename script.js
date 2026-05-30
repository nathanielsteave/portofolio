// ==========================================
// PORTFOLIO JS — Nathaniel Steave Harjanto
// Modern 3D Interactive Experience
// ==========================================

import * as THREE from 'three';

// ==========================================
// 1. THREE.JS 3D BACKGROUND
// ==========================================
const initThreeBackground = () => {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Geometric shapes
    const shapesGroup = new THREE.Group();
    const geometries = [
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.OctahedronGeometry(0.8, 0),
        new THREE.TorusGeometry(0.7, 0.2, 16, 32),
        new THREE.TetrahedronGeometry(0.7, 0),
    ];

    const shapes = [];
    for (let i = 0; i < 20; i++) {
        const geo = geometries[Math.floor(Math.random() * geometries.length)];
        const isLight = document.body.classList.contains('light-mode');
        const material = new THREE.MeshStandardMaterial({
            color: isLight ? 0x008e70 : 0x00d4aa,
            metalness: 0.1,
            roughness: 0.4,
            transparent: true,
            opacity: 0.15,
            wireframe: Math.random() > 0.5,
        });
        const mesh = new THREE.Mesh(geo, material);
        mesh.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 20
        );
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        mesh.userData = {
            speedX: (Math.random() - 0.5) * 0.005,
            speedY: (Math.random() - 0.5) * 0.005,
            speedZ: (Math.random() - 0.5) * 0.003,
        };
        shapes.push(mesh);
        shapesGroup.add(mesh);
    }
    scene.add(shapesGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x404060, 1);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x00d4aa, 2, 50);
    pointLight.position.set(5, 5, 15);
    scene.add(pointLight);

    // Mouse tracking
    let mouseX = 0, mouseY = 0;
    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);

        shapes.forEach(shape => {
            shape.rotation.x += shape.userData.speedX;
            shape.rotation.y += shape.userData.speedY;
            shape.rotation.z += shape.userData.speedZ;
        });

        shapesGroup.rotation.x += (mouseY * 0.02 - shapesGroup.rotation.x) * 0.05;
        shapesGroup.rotation.y += (mouseX * 0.02 - shapesGroup.rotation.y) * 0.05;

        renderer.render(scene, camera);
    };
    animate();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Theme change listener
    const themeObserver = new MutationObserver(() => {
        const isLight = document.body.classList.contains('light-mode');
        shapes.forEach(shape => {
            shape.material.color.set(isLight ? 0x008e70 : 0x00d4aa);
        });
    });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
};

// ==========================================
// 2. PROJECTS DATA
// ==========================================
const projectsData = [
    {
        id: 'sukha-pos',
        title: 'Sukha POS',
        description: 'A Point of Sales (POS) website for restaurants that digitizes the entire process from ordering to payment to increase efficiency.',
        tech: ['Laravel', 'PHP', 'MySQL'],
        category: 'web',
        image: 'assets/sukha.png',
        github: 'https://github.com/sukharesto/Sukha-Serve',
        external: 'https://sukha.great-site.net/',
    },
    {
        id: 'co2-emission',
        title: 'CO2 Emission Analysis',
        description: 'Data analysis and machine learning models to predict CO2 emissions in Spain, complemented by interactive visualizations to support sustainable decisions.',
        tech: ['Python', 'Random Forest', 'Looker Studio'],
        category: 'data',
        image: 'assets/co2-spain.png',
        external: 'https://lookerstudio.google.com/s/j9UaD2x0vrk',
    },
    {
        id: 'sipeta-cuaca',
        title: 'SiPETA CUACA TANI',
        description: 'A web-based information system that provides accurate weather predictions to help farmers plan agricultural activities effectively.',
        tech: ['Python', 'Flask', 'Weather API'],
        category: 'web',
        image: 'assets/sipeta-cuaca-tani.png',
        github: 'https://github.com/nathanielsteave/sipeta-cuaca-tani',
        external: 'https://sipeta-cuaca-tani.vercel.app/',
    },
    {
        id: 'bmi-calculator',
        title: 'BMI Calculator',
        description: 'A responsive, single-page application built with HTML5, CSS3, and Vanilla JavaScript. Features real-time calculation and persistent dark mode.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        category: 'basic',
        image: 'assets/bmi-calculator.png',
        github: 'https://github.com/nathanielsteave/bmi-calculator',
        external: 'https://bmi-calculator-mocha-eight-47.vercel.app/',
    },
    {
        id: 'todo-list',
        title: 'To-Do List',
        description: 'A responsive SPA with full CRUD functionality, localStorage persistence, deadline handling, and dark mode support.',
        tech: ['HTML', 'CSS', 'JavaScript', 'CRUD'],
        category: 'basic',
        image: 'assets/to-do-list.png',
        github: 'https://github.com/nathanielsteave/to-do-list',
        external: 'https://to-do-list-nathaniel.vercel.app/',
    },
    {
        id: 'notes-app',
        title: 'Notes App',
        description: 'A dual-pane note-taking app with CRUD functionality, auto-saving with debounce, and localStorage persistence.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        category: 'basic',
        image: 'assets/notes-app.png',
        github: 'https://github.com/nathanielsteave/notes-app',
        external: 'https://notes-app-mu-jade.vercel.app/',
    },
    {
        id: 'ai-code-reviewer',
        title: 'AI Code Reviewer',
        description: 'A diagnostic client-server application for deep Python code inspection. Leverages static analysis and the Llama 3.1 model via Groq API to instantly uncover logical bugs, styling deviations, and performance bottlenecks.',
        tech: ['Python', 'FastAPI', 'Groq AI', 'Vanilla JS'],
        category: 'ai',
        image: 'assets/ai-code-reviewer (4).png',
        gallery: ['assets/ai-code-reviewer (4).png', 'assets/ai-code-reviewer (1).png', 'assets/ai-code-reviewer (2).png', 'assets/ai-code-reviewer (3).png'],
        github: 'https://github.com/nathanielsteave/ai-code-reviewer',
    },
    {
        id: 'crypto-pulse',
        title: 'Crypto Pulse AI',
        description: 'A Web3 Intelligence Platform that tracks real-time cryptocurrency prices, on-chain whale activities, and analyzes market sentiment using Groq AI (Llama 3.1) with Plotly interactive charts.',
        tech: ['Python', 'Streamlit', 'Groq AI', 'Plotly'],
        category: 'ai',
        image: 'assets/crypto-pulse(1).png',
        gallery: ['assets/crypto-pulse(1).png', 'assets/crypto-pulse(2).png', 'assets/crypto-pulse(3).png'],
        github: 'https://github.com/nathanielsteave/ai-crypto-pulse',
        external: 'https://ai-crypto-pulse-t7hwrda7cupn98e4uxkbyc.streamlit.app/',
    },
    {
        id: 'face-puzzle',
        title: 'Face Puzzle Game',
        description: 'A fully client-side interactive computer vision game powered by MediaPipe Web. Captures photos using hand gesture recognition and allows users to solve a dynamically generated sliding puzzle via real-time finger tracking.',
        tech: ['JavaScript', 'MediaPipe Web', 'HTML5 Canvas', 'Computer Vision'],
        category: 'cv',
        image: 'assets/face-puzzle-game(1).png',
        gallery: ['assets/face-puzzle-game(1).png', 'assets/face-puzzle-game(2).png'],
        github: 'https://github.com/nathanielsteave/face-puzzle-web',
        external: 'https://face-puzzle-web.vercel.app/',
    },
    {
    id: 'race-pace-calculator',
    title: 'Race Pace Calculator',
    description: 'An interactive web application for runners to calculate race paces, view per-kilometer splits, predict finish times, and import GPX files to adjust estimated times based on elevation gain.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
    category: 'web',
    image: 'assets/race-pace-calculator.png',
    github: 'https://github.com/nathanielsteave/race-pace-calculator',
    external: 'https://race-pace-calculator-three.vercel.app/',
    },
    {
    id: 'collabboard',
    title: 'CollabBoard',
    description: 'A real-time collaborative whiteboard web application featuring freehand drawing, shape tools, text input, pan/zoom capabilities, and live chat within shared rooms.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Socket.io', 'Canvas API'],
    category: 'web',
    image: 'assets/collaboard(3).png',
    gallery: ['assets/collaboard(1).png', 'assets/collaboard(2).png'],
    github: 'https://github.com/nathanielsteave/collabboard',
    external: 'https://collaboard-rz5c.vercel.app/',
    },
    {
    id: 'visiobus26',
    title: 'VisioBus26 (Visionary Business)',
    description: 'A futuristic catalog website that presents trend predictions and a directory of business ideas for 2026. Equipped with a dark-themed UI (glassmorphism), interactive category filters, and responsive design.',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript'],
    category: 'web',
    image: 'assets/visiobus(1).png', 
    gallery: ['assets/visiobus(1).png', 'assets/visiobus(2).png', 'assets/visiobus(3).png', 'assets/visiobus(4).png', 'assets/visiobus(5).png', 'assets/visiobus(6).png', 'assets/visiobus(7).png'],
    github: 'https://github.com/nathanielsteave/website-celine',
    external: 'https://website-celine.vercel.app/index.html',
    },
    {
    id: 'nutrifood-figma',
    title: 'NutriFood Mobile Design',
    description: 'A modern, user-centric mobile UI/UX design for a nutrition tracker and healthy food ordering platform, featuring highly polished layout assets and full interactive prototyping.',
    tech: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping'],
    category: 'uiux',
    image: 'assets/nutrifood.png',
    external: 'https://www.figma.com/design/CzoKLlWbaVcGsLFPIkG3EY/Figma---NutriFood-Project?node-id=0-1&t=PUYUzyaip9JR3OwR-1',
    portrait: true,
    },
];

const certificatesData = [
    { title: 'Python Developer', org: 'Micro1', image: 'assets/certi-micro1.png', link: 'https://micro1-portal-data.s3.amazonaws.com/engineer-certificates/1778163470-3bf7f6c0-982f-42f2-9c01-255f549c74b9.jpg' },
    { title: 'Belajar Dasar Data Science', org: 'Dicoding Indonesia', image: 'assets/dasar-data-science.png', link: 'https://www.dicoding.com/certificates/4EXGQLY71ZRL' },
    { title: 'Belajar Dasar SQL', org: 'Dicoding Indonesia', image: 'assets/dasar-sql.png', link: 'https://www.dicoding.com/certificates/MRZME1K5KPYQ' },
    { title: 'Belajar Dasar Manajemen Proyek', org: 'Dicoding Indonesia', image: 'assets/dasar-manajemenproyek.png', link: 'https://www.dicoding.com/certificates/JLX17Y37GX72' },
    { title: 'Belajar Dasar AI', org: 'Great Learning', image: 'assets/dasar-ai.png', link: 'https://www.dicoding.com/certificates/4EXGQ26QQZRL' },
    { title: 'CCNAv7: Introduction to Networks', org: 'Cisco Networking Academy', image: 'assets/cisco-jarkom.png', link: '' },
    { title: 'Short Class FrontEnd Development', org: 'MySkill', image: 'assets/myskill-frontend.png', link: '' },
    { title: 'Short Class UX Writing', org: 'MySkill', image: 'assets/myskill-uxwriting.png', link: '' },
    { title: 'Competitive Programming Participation', org: 'P!NGFEST', image: 'assets/competitive-programming-pingfest.png', link: '' },
    { title: 'Kampus Merdeka Batch 7 – Data Science', org: 'Startup Campus', image: 'assets/msib-sc-datascience.png', link: 'https://www.startupcampus.id/certificate/public/KM7-DS33E6' },
];

// ==========================================
// 3. RENDER PROJECTS
// ==========================================
const renderProjects = (filter = 'all') => {
    const grid = document.getElementById('project-grid');
    if (!grid) return;

    const filtered = filter === 'all' ? projectsData : projectsData.filter(p => p.category === filter);
    grid.innerHTML = filtered.map((p, i) => `
        <div class="project-card reveal" data-delay="${i * 50}" data-project="${p.id}">
            <div class="project-image-wrapper ${p.portrait ? 'portrait' : ''}">
                <img src="${p.image}" alt="${p.title}" loading="lazy">
            </div>
            <div class="project-card-body">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="project-card-tech">
                    ${p.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Re-attach reveal observers & click handlers
    observeRevealElements();
    attachProjectClickHandlers();
};

const renderCertificates = () => {
    const grid = document.getElementById('certificate-grid');
    if (!grid) return;

    grid.innerHTML = certificatesData.map((c, i) => `
        <div class="certificate-card reveal" data-delay="${i * 50}">
            <img src="${c.image}" alt="${c.title}" class="zoomable-cert" data-src="${c.image}" data-title="${c.title}" loading="lazy">
            <div class="certificate-card-body">
                <h4>${c.title}</h4>
                <p>${c.org}</p>
                ${c.link ? `<a href="${c.link}" target="_blank" rel="noopener noreferrer">View Certificate <i class="fa-solid fa-arrow-up-right-from-square"></i></a>` : ''}
            </div>
        </div>
    `).join('');

    observeRevealElements();
};

// ==========================================
// 4. MODAL FUNCTIONALITY
// ==========================================
const modal = document.getElementById('project-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTechTags = document.getElementById('modal-tech-tags');
const modalLinks = document.getElementById('modal-links');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');
const modalDots = document.getElementById('modal-dots');
const modalClose = document.getElementById('modal-close');

let currentProject = null;
let currentGalleryIndex = 0;

const openModal = (projectId) => {
    const project = projectsData.find(p => p.id === projectId);
    if (!project || !modal) return;

    currentProject = project;
    currentGalleryIndex = 0;

    const images = project.gallery || [project.image];
    updateModalImage(images[currentGalleryIndex]);

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalTechTags.innerHTML = project.tech.map(t => `<span>${t}</span>`).join('');

    modalLinks.innerHTML = '';
    if (project.external) {
        modalLinks.innerHTML += `<a href="${project.external}" target="_blank" rel="noopener noreferrer">Visit <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`;
    }
    if (project.github) {
        modalLinks.innerHTML += `<a href="${project.github}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github"></i> Code</a>`;
    }

    // Gallery navigation
    if (images.length > 1) {
        modalPrev.style.display = 'block';
        modalNext.style.display = 'block';
        renderDots(images);
    } else {
        modalPrev.style.display = 'none';
        modalNext.style.display = 'none';
        modalDots.innerHTML = '';
    }

    const container = modalImage?.closest('.modal-image-container');
    if (container) {
        if (project.portrait) {
            container.classList.add('portrait');
        } else {
            container.classList.remove('portrait');
        }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

const updateModalImage = (src) => {
    if (modalImage) {
        modalImage.style.opacity = '0';
        setTimeout(() => {
            modalImage.src = src;
            modalImage.style.opacity = '1';
        }, 200);
    }
};

const renderDots = (images) => {
    modalDots.innerHTML = images.map((_, i) =>
        `<span class="dot ${i === currentGalleryIndex ? 'active' : ''}" data-index="${i}"></span>`
    ).join('');
    document.querySelectorAll('.modal-dots .dot').forEach(dot => {
        dot.addEventListener('click', () => {
            currentGalleryIndex = parseInt(dot.dataset.index);
            const images = currentProject.gallery || [currentProject.image];
            updateModalImage(images[currentGalleryIndex]);
            renderDots(images);
        });
    });
};

const closeModal = () => {
    modal?.classList.remove('active');
    document.body.style.overflow = '';
    currentProject = null;
};

modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

modalPrev?.addEventListener('click', () => {
    if (!currentProject) return;
    const images = currentProject.gallery || [currentProject.image];
    currentGalleryIndex = (currentGalleryIndex - 1 + images.length) % images.length;
    updateModalImage(images[currentGalleryIndex]);
    renderDots(images);
});

modalNext?.addEventListener('click', () => {
    if (!currentProject) return;
    const images = currentProject.gallery || [currentProject.image];
    currentGalleryIndex = (currentGalleryIndex + 1) % images.length;
    updateModalImage(images[currentGalleryIndex]);
    renderDots(images);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft' && modal?.classList.contains('active')) modalPrev?.click();
    if (e.key === 'ArrowRight' && modal?.classList.contains('active')) modalNext?.click();
});

const attachProjectClickHandlers = () => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            if (projectId) openModal(projectId);
        });
    });
};

// Certificate image click to open in modal
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('zoomable-cert')) {
        const src = e.target.dataset.src;
        const title = e.target.dataset.title;
        if (modal && modalImage && modalTitle) {
            modalTitle.textContent = title;
            modalDescription.textContent = '';
            modalTechTags.innerHTML = '';
            modalLinks.innerHTML = '';
            modalPrev.style.display = 'none';
            modalNext.style.display = 'none';
            modalDots.innerHTML = '';
            updateModalImage(src);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
});

// ==========================================
// 5. REVEAL ON SCROLL
// ==========================================
const observeRevealElements = () => {
    const revealEls = document.querySelectorAll('.reveal:not(.active)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || index * 80;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));
};



// ==========================================
// 7. STATS COUNTER
// ==========================================
const animateStats = () => {
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.stat-number[data-target]');
                numbers.forEach(num => {
                    const target = parseInt(num.dataset.target);
                    const duration = 2000;
                    const start = performance.now();

                    const update = (now) => {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        num.textContent = Math.floor(eased * target).toLocaleString();
                        if (progress < 1) requestAnimationFrame(update);
                        else num.textContent = target.toLocaleString();
                    };
                    requestAnimationFrame(update);
                });
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.about-stats').forEach(stats => statObserver.observe(stats));
};

// ==========================================
// 8. CUSTOM CURSOR
// ==========================================
const initCursor = () => {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    const animate = () => {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animate);
    };
    animate();

    // Hover effect on interactive elements
    const interactiveEls = document.querySelectorAll('a, button, .project-card, .certificate-card, input, textarea, .filter-btn');
    interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('hover'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
    });

    // Hide cursor on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
};

// ==========================================
// 9. HEADER SCROLL & MOBILE MENU
// ==========================================
const initHeader = () => {
    const header = document.getElementById('main-header');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    });

    // Progress bar
    const progressBar = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) progressBar.style.width = progress + '%';
    });

    // Mobile menu
    mobileMenuBtn?.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu?.classList.toggle('active');
        document.body.style.overflow = mobileMenu?.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileMenu?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
};

// ==========================================
// 10. ACTIVE NAV LINK
// ==========================================
const initActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -40% 0px' });

    sections.forEach(section => observer.observe(section));
};

// ==========================================
// 11. FILTER BUTTONS
// ==========================================
const initFilters = () => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderProjects(btn.dataset.filter);
        });
    });
};

// ==========================================
// 12. THEME TOGGLE
// ==========================================
const initTheme = () => {
    const toggle = document.getElementById('theme-toggle');
    const icon = toggle?.querySelector('i');
    const savedTheme = localStorage.getItem('theme');

    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
        } else {
            document.body.classList.remove('light-mode');
            if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
        }
    };

    applyTheme(savedTheme || 'dark');

    toggle?.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        applyTheme(isLight ? 'light' : 'dark');
    });
};

// ==========================================
// 13. BACK TO TOP
// ==========================================
const initBackToTop = () => {
    const btn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            btn?.classList.add('visible');
        } else {
            btn?.classList.remove('visible');
        }
    });
    btn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

// ==========================================
// 14. WELCOME OVERLAY
// ==========================================
const initWelcome = () => {
    const overlay = document.getElementById('welcome-overlay');
    if (!overlay) return;

    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 2500);
};

// ==========================================
// 15. VISITOR COUNTER
// ==========================================
const initVisitorCounter = () => {
    const el = document.getElementById('visitor-counter');
    if (!el) return;
    fetch('https://api.countapi.xyz/hit/nathanielsteave/portfolio')
        .then(res => res.json())
        .then(data => {
            el.textContent = `👁️ ${data.value.toLocaleString()} portfolio views`;
        })
        .catch(() => {
            el.textContent = '👁️ Views tracking offline';
        });
};

// ==========================================
// 16. 3D TILT ON CARDS (Desktop)
// ==========================================
const initTiltEffect = () => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cards = document.querySelectorAll('.project-card, .learning-card, .certificate-card, .skill-category');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });
};

// ==========================================
// 17. INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initThreeBackground();
    renderProjects();
    renderCertificates();
    observeRevealElements();

    animateStats();
    initCursor();
    initHeader();
    initActiveNav();
    initFilters();
    initTheme();
    initBackToTop();
    initWelcome();
    initVisitorCounter();

    // Re-run tilt after project render
    setTimeout(initTiltEffect, 500);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                history.pushState(null, null, targetId);
            }
        });
    });

    console.log('✨ Portfolio 3D initialized successfully!');
});