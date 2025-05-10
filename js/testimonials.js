let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");
let carouselDom = document.querySelector(".carousel");
let listItemDom = document.querySelectorAll(".carousel .list .item");
let thumbnailDom = document.querySelectorAll(".carousel .thumbnail .item");
let timeDom = document.querySelector(".time");

let currentIndex = 0;
let timeRunning = 5000;
let timeAutoNext = 5000; 
let runTimeOut;
let runAutoRun;

function showSlider(index) {
    document.querySelector(".carousel .list .item.active").classList.remove("active");
    document.querySelector(".carousel .thumbnail .item.active").classList.remove("active");

    listItemDom[index].classList.add("active");
    thumbnailDom[index].classList.add("active");

    timeDom.style.width = "0%";
    setTimeout(() => {
        timeDom.style.transition = `width ${timeRunning / 1000}s linear`;
        timeDom.style.width = "100%";
    }, 10); 
    clearTimeout(runAutoRun);
    runAutoRun = setTimeout(() => {
        nextSlide();
    }, timeAutoNext);
}

function nextSlide() {
    currentIndex++;
    if (currentIndex >= listItemDom.length) {
        currentIndex = 0;
    }
    showSlider(currentIndex);
}

function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = listItemDom.length - 1;
    }
    showSlider(currentIndex);
}

nextDom.addEventListener("click", () => {
    nextSlide();
    clearTimeout(runAutoRun); 
    runAutoRun = setTimeout(() => {
        nextSlide();
    }, timeAutoNext);
});

prevDom.addEventListener("click", () => {
    prevSlide();
    clearTimeout(runAutoRun); 
    runAutoRun = setTimeout(() => {
        nextSlide();
    }, timeAutoNext);
});

thumbnailDom.forEach((thumbnail, index) => {
    thumbnail.addEventListener("click", () => {
        currentIndex = index;
        showSlider(currentIndex);
        clearTimeout(runAutoRun);
        runAutoRun = setTimeout(() => {
            nextSlide();
        }, timeAutoNext);
    });
});
showSlider(currentIndex);