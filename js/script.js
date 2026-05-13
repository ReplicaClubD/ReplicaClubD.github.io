// ── scroll reveal ──
const revealObserverOptions = { threshold: 0.12 };
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, revealObserverOptions);

document.querySelectorAll('.reveal').forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 0.07}s`;
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
        // 0.5秒（500ミリ秒）後にロゴをじわっと表示
        setTimeout(() => {
            splashLogo.classList.add('show');
        }, 1500);

        // 読み込み完了から3秒（3000ミリ秒）後に黒い画面ごとじわっと消す
        setTimeout(() => {
            splash.classList.add('loaded');
            // ★ ここでスクロール禁止を解除して、動かせるようにするよ！
            document.body.classList.remove('no-scroll');
        }, 5000);
    } else {
        // スプラッシュ画面がない場合（エラー回避の保険）
        document.body.classList.remove('no-scroll');
    }
});