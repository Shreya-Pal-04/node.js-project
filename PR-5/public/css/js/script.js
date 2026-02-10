const track = document.querySelector(".slider-track");
let slides = document.querySelectorAll(".slide");
let index = 1;

// Clone first and last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

// Add clones to DOM
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = document.querySelectorAll(".slide");

// Center the initial first slide
function goToSlide(i, animate = true) {
    const sliderWidth = document.querySelector(".peek-slider").clientWidth;
    const slideWidth = slides[0].offsetWidth;
    const gap = 20;

    const position = (slideWidth + gap) * i - (sliderWidth / 2 - slideWidth / 2);

    track.style.transition = animate ? "0.6s ease-in-out" : "none";
    track.style.transform = `translateX(-${position}px)`;
}

// Reset slide after clone transition
track.addEventListener("transitionend", () => {
    if (slides[index].id === "first-clone") {
        index = 1;          // Go to real first slide
        goToSlide(index, false);
    }

    if (slides[index].id === "last-clone") {
        index = slides.length - 2;   // Go to real last slide
        goToSlide(index, false);
    }
});

// Auto slide
function nextSlide() {
    index++;
    goToSlide(index);
}

goToSlide(index, false);
setInterval(nextSlide, 1000);
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        clearInterval(sliderInterval);
    } else {
        startSlider();
    }
});
