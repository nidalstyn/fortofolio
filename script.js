const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('nav a')];

function fitSlides() {
    slides.forEach((slide) => {
        slide.firstElementChild.style.setProperty('--s', slide.clientWidth / 1456);
    });
}

fitSlides();
window.addEventListener('resize', fitSlides);

const lightbox = document.getElementById('lb');
const lightboxImage = lightbox.querySelector('img');

document.querySelectorAll('.pic').forEach((picture) => {
    const openLightbox = () => {
        lightboxImage.src = picture.src;
        lightboxImage.alt = picture.alt;
        lightbox.classList.add('o');
    };

    picture.addEventListener('click', openLightbox);
    picture.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openLightbox();
        }
    });
});

lightbox.addEventListener('click', () => lightbox.classList.remove('o'));
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        lightbox.classList.remove('o');
    }
});

slides.forEach((slide) => {
    new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                dots.forEach((dot) => {
                    dot.classList.toggle('on', dot.getAttribute('href') === '#' + entry.target.id);
                });
            }
        });
    }, { threshold: 0.5 }).observe(slide);
});