

class Slider {
    constructor() {
        let slides = document.querySelectorAll(".slide");
        let currentSlide = document.querySelector(".slide.show");
    }

    init(){

    }

    logSlide(){
        console.dir(this.currentSlide)
    }
}

//export {Slider};