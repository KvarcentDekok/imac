const Resolution = {
    Large: {
        width: 1300,
        numberOfSlides: 4
    },
    Medium: {
        width: 600,
        numberOfSlides: 2
    },
    Small: {
        width: 0,
        numberOfSlides: 1
    }
};

const EXTRA_SHIFT = 26;

const carousel = document.querySelector('.carousel');
const carouselList = carousel.querySelector('.carousel__list');
const slides = carouselList.querySelectorAll('.carousel__item');
const controlPrev = carousel.querySelector('.carousel__control--prev');
const controlNext = carousel.querySelector('.carousel__control--next');

let currentShift = 0;

function iterateSlides(number) {
    for (let i = 0; i < slides.length; i++) {
        slides[i].dataset.active = 'false';
    }

    for (let i = 0; i < number; i++) {
        if (slides[i]) {
            slides[i].dataset.active = 'true';
        }
    }
}

function setActiveSlides() {
    if (window.innerWidth > Resolution.Large.width) {
        iterateSlides(Resolution.Large.numberOfSlides)
    } else if (window.innerWidth > Resolution.Medium.width) {
        iterateSlides(Resolution.Medium.numberOfSlides)
    } else {
        iterateSlides(Resolution.Small.numberOfSlides);
    }
}

function setSlidesIndex() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].dataset.index = `${i}`;
    }
}

function controlNextClickHandler() {
    const firstActiveSlide = carousel.querySelector('[data-active="true"]:nth-child(1 of [data-active="true"])');
    const lastActiveSlide = carousel.querySelector('[data-active="true"]:nth-last-child(1 of [data-active="true"])');
    const nextSlide = slides[Number(lastActiveSlide.dataset.index) + 1];
    const afterNextSlide = slides[Number(lastActiveSlide.dataset.index) + 2];

    if (nextSlide) {
        const slideWidth = nextSlide.clientWidth;

        currentShift -= (slideWidth + EXTRA_SHIFT);
        carouselList.style.transform = `translate(${String(currentShift)}px)`;
        firstActiveSlide.dataset.active = 'false';
        nextSlide.dataset.active = 'true';
        controlPrev.classList.remove('carousel__control--disable');

        if (!afterNextSlide) {
            controlNext.classList.add('carousel__control--disable');
        }
    }
}

function controlPrevClickHandler() {
    const firstActiveSlide = carousel.querySelector('[data-active="true"]:nth-child(1 of [data-active="true"])');
    const lastActiveSlide = carousel.querySelector('[data-active="true"]:nth-last-child(1 of [data-active="true"])');
    const prevSlide = slides[Number(firstActiveSlide.dataset.index) - 1];
    const beforePrevSlide = slides[Number(firstActiveSlide.dataset.index) - 2];

    if (prevSlide) {
        const slideWidth = prevSlide.clientWidth;

        currentShift += (slideWidth + EXTRA_SHIFT);
        carouselList.style.transform = `translate(${String(currentShift)}px)`;
        lastActiveSlide.dataset.active = 'false';
        prevSlide.dataset.active = 'true';
        controlNext.classList.remove('carousel__control--disable');

        if (!beforePrevSlide) {
            controlPrev.classList.add('carousel__control--disable');
        }
    }
}

function resetShift() {
    currentShift = 0;
    carouselList.style.transform = `translate(${String(currentShift)}px)`;
    controlPrev.classList.add('carousel__control--disable');
    controlNext.classList.remove('carousel__control--disable');
}

setSlidesIndex();
setActiveSlides();

window.addEventListener('resize', () => {
    setActiveSlides();
    resetShift();
});

controlNext.addEventListener('click', () => {
    controlNextClickHandler();
});

controlPrev.addEventListener('click', () => {
    controlPrevClickHandler();
});