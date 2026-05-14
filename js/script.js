// ── initial background setup ──
const initBg = () => {
    if (window.innerWidth <= 1024) {
        document.body.classList.add('bg-sp');
    } else {
        document.body.classList.add('bg-pc');
    }
};
initBg();

// ── scroll reveal ──
const revealObserverOptions = { threshold: 0.15 };
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, revealObserverOptions);

document.querySelectorAll('.reveal').forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 0.15}s`;
    revealObserver.observe(el);
});

// ── hero fade on scroll ──
const heroContent = document.querySelector('.hero-content.pc-layout');
window.addEventListener('scroll', () => {
    if (!heroContent) return;
    const opacity = Math.max(1 - window.scrollY / 400, 0);
    heroContent.style.opacity = opacity.toString();
}, { passive: true });

// ── lightbox ──
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

const closeLightbox = () => {
    if (lightbox) lightbox.classList.remove('active');
};

document.querySelectorAll('.screenshot-item').forEach((item) => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img && lightboxImg) {
            lightboxImg.src = img.src;
        }
        if (lightbox) {
            lightbox.classList.add('active');
        }
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
});

// ── smooth nav highlight ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let currentSectionId = '';
    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.style.color = 'var(--accent2)';
        } else {
            link.style.color = '';
        }
    });
}, { passive: true });

// ── mobile background scroll ──
window.addEventListener('scroll', () => {
    if (window.innerWidth <= 1024) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll > 0) {
            const scrollRatio = window.scrollY / maxScroll;
            const startPosition = 5;
            const currentPosition = startPosition + (scrollRatio * (100 - startPosition));
            document.body.style.backgroundPositionX = `${currentPosition}%`;
        }
    } else {
        document.body.style.backgroundPositionX = '';
    }
}, { passive: true });

// ── splash screen ──
window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    const splashLogo = document.querySelector('.splash-logo');

    if (splash && splashLogo) {
        setTimeout(() => {
            splashLogo.classList.add('show');
        }, 1500);

        setTimeout(() => {
            splash.classList.add('loaded');
            document.body.classList.remove('no-scroll');
        }, 5000);
    } else {
        document.body.classList.remove('no-scroll');
    }
});

// ── breakpoint transition ──
const transitionOverlay = document.getElementById('transition-overlay');
let isMobileView = window.innerWidth <= 1024;

window.addEventListener('resize', () => {
    const currentIsMobile = window.innerWidth <= 1024;

    if (isMobileView !== currentIsMobile) {
        isMobileView = currentIsMobile;

        if (transitionOverlay) {
            transitionOverlay.classList.remove('animate');
            void transitionOverlay.offsetWidth;
            transitionOverlay.classList.add('animate');

            // 画面がストライプで完全に覆われるタイミングで背景クラスを切り替える
            setTimeout(() => {
                if (currentIsMobile) {
                    document.body.classList.add('bg-sp');
                    document.body.classList.remove('bg-pc');
                } else {
                    document.body.classList.add('bg-pc');
                    document.body.classList.remove('bg-sp');
                }
            }, 600);
        } else {
            // 要素が見つからない場合のフォールバック
            if (currentIsMobile) {
                document.body.classList.add('bg-sp');
                document.body.classList.remove('bg-pc');
            } else {
                document.body.classList.add('bg-pc');
                document.body.classList.remove('bg-sp');
            }
        }
    }
}, { passive: true });