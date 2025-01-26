function updateClock(){

    const now = new Date();
    let hours = now.getHours();
    const meridiem = hours>= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, 0);
    const minutes = now.getMinutes().toString().padStart(2, 0);
    const seconds = now.getSeconds().toString().padStart(2, 0);
    const timeString = `${hours}:${minutes}:${seconds} ${meridiem}`;
    document.getElementById("clock").textContent = timeString;
}

updateClock();
setInterval(updateClock,1000);

const imagePaths = [
    "../images/background-0.jpg",
    "../images/background-1.jpg",
    "../images/background-2.jpg",
    "../images/background-3.jpg",
    "../images/background-4.jpg",
    "../images/background-5.jpg",
    "../images/background-6.jpg",
    "../images/background-7.jpg"
]


const timeInterval = 15000;
let slideIndex=0;
const numSlides=8;
let intervalId = null;

const prev = document.getElementById("prev");
const next = document.getElementById("next");

prev.addEventListener("click",prevSlide);
next.addEventListener("click",()=>{
    nextSlide();
    startSlideshow();
});

const preloadedImages = [];

function preloadImages(paths, callback){
    for(let i = 0; i < paths.length; i++){
        preloadedImages[i] = new Image();
        preloadedImages[i].src = paths[i];
    }
    callback();
}

preloadImages(imagePaths, startSlideshow);


function startSlideshow(){
    clearInterval(intervalId);
    intervalId = setInterval(nextSlide, timeInterval);
}

function showSlide(index){
    if(index >= numSlides){
        slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = numSlides - 1;
    }
    document.body.style.backgroundImage = `url("${imagePaths[slideIndex]}")`;
}


function prevSlide(){
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex)
}

function nextSlide(){
    slideIndex++;
    showSlide(slideIndex);
}

