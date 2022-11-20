

window.onload = function () {


    let headly = document.querySelector(".bg-header");
    let bodyly = document.querySelector(".bg-body");
    let footly = document.querySelector(".bg-footer");
    console.dir(bodyly);

    // get elements
    let presentation = document.querySelector(".presentation");
    let slides = document.querySelectorAll(".slide");
    let thumbSlides = document.querySelectorAll(".thumb-slide");

    console.dir(thumbSlides)
    let currentSlide = document.querySelector(".slide.show");
    let currentThumbSlide = document.querySelector(".thumb-slide.show")

    console.dir(currentThumbSlide);
    var slideNumber = document.querySelector(".counter");
    var toLeftBtn = document.querySelector("#left-btn");
    var toRightBtn = document.querySelector("#right-btn");

    let presentationController = document.querySelector("#presentation-area");
    var toFullScreenBtn = document.querySelector("#full-screen");
    var toSmallScreenBtn = document.querySelector("#small-screen");

    // initailize defualt values
    var screenStatus = 0;
    var currentSlideNo = 1;
    var currentThumbSlideNo = 1;
    var totalSides = 0;

    // run init script
    init();

    function init() {
        getCurrentSlideNo();
        totalSides = slides.length;
        setSlideNo();
        hideLeftButton();
        hideRightButton();
        scrollThumbIntoView();
        onkeyArrow()
    }

    // handle clicks on a thumbmail
    thumbSlides.forEach((slide, i) => {
        slide.addEventListener('click', (event) => {
            //handle click
            event.stopPropagation();
            console.log("Click");
            var tempSlide = currentThumbSlide;
            currentThumbSlide = event.currentTarget;
            console.dir(currentThumbSlide);
            tempSlide.classList.remove("show");
            currentThumbSlide.classList.add("show");

            getCurrentThumbSlideNo()

            moveToSpecSlide(currentThumbSlideNo)
        })
    });

    // Scroll Clicked Element into View
    function scrollThumbIntoView(){
        currentThumbSlide.scrollIntoView({behavior: "smooth", inline: "center"});
    }



    // handle clicks on left and right icons
    toLeftBtn.addEventListener("click", moveToLeftSlide);
    toRightBtn.addEventListener("click", moveToRightSlide);

    // handle full screen and small screen modes
    toFullScreenBtn.addEventListener("click", fullScreenMode);
    toSmallScreenBtn.addEventListener("click", smallScreenMode);

    // hide left button at first page
    function hideLeftButton() {
        if (currentSlideNo == 1) {
            toLeftBtn.classList.remove("show");
        } else {
            toLeftBtn.classList.add("show");
        }
    }

    // hide right button at last page
    function hideRightButton() {
        if (currentSlideNo === totalSides) {
            toRightBtn.classList.remove("show");
        } else {
            toRightBtn.classList.add("show");
        }
    }

    // moves to left slide
    function moveToLeftSlide() {

        if(currentSlideNo > 1) {
            var tempSlide = currentSlide;
            currentSlide = currentSlide.previousElementSibling;
            tempSlide.classList.remove("show");
            currentSlide.classList.add("show");
            moveToLeftThumbSlide();
            init();
        }
    }

    // set arrow event listener

    function onkeyArrow() {
        document.onkeydown = function myFunction(event) {

            event.preventDefault()
            switch (event.keyCode) {
                case 38:
                    console.log("Up key is pressed");
                    moveToLeftSlide()
                    break;
                case 40:
                    console.log("Down key is pressed");
                    moveToRightSlide()
                    break;
                case 37:
                    console.log("Right key is pressed");
                    moveToLeftSlide()
                    break;
                case 39:
                    console.log("left key is pressed");
                    moveToRightSlide()
                    break;
                case 27:
                    if(screenStatus){
                        smallScreenMode();
                    }
                    break;
            }
        }
    }


    // moves to specifics slide
    function moveToSpecSlide(id){

            var tempSlide = currentSlide;
            currentSlide = slides[id-1];
            tempSlide.classList.remove("show");
            currentSlide.classList.add("show");
            init();

    }

    // moves to left slide
    function moveToLeftThumbSlide() {
        var tempSlide = currentThumbSlide;
        currentThumbSlide = currentThumbSlide.previousElementSibling;
        tempSlide.classList.remove("show");
        currentThumbSlide.classList.add("show");

        init();
    }
    // moves to right slide
    function moveToRightSlide() {
        if(currentSlideNo < slides.length){
            var tempSlide = currentSlide;
            currentSlide = currentSlide.nextElementSibling;
            tempSlide.classList.remove("show");
            currentSlide.classList.add("show");
            moveToRightThumbSlide()
            init();
        }

    }


    // moves to right slide
    function moveToRightThumbSlide() {
        var tempSlide = currentThumbSlide;
        currentThumbSlide = currentThumbSlide.nextElementSibling;
        tempSlide.classList.remove("show");
        currentThumbSlide.classList.add("show");
        init();
    }

    // get current slide
    function getCurrentSlideNo() {
        let counter = 0;

        slides.forEach((slide, i) => {
            counter++;

            if (slide.classList.contains("show")) {
                currentSlideNo = counter;
            }
        });
    }

    // get current thumb slide
    function getCurrentThumbSlideNo() {
        let counter = 0;

        thumbSlides.forEach((slide, i) => {
            counter++;

            if (slide.classList.contains("show")) {
                currentThumbSlideNo = counter;
            }
        });
    }

    // go full screen
    function fullScreenMode() {
        //presentationController.classList.add("full-screen");
        bodyly.classList.add("full-screen");
        headly.classList.add("hide")
        footly.classList.add("hide")
        toFullScreenBtn.classList.remove("show");
        toSmallScreenBtn.classList.add("show");

        screenStatus = 1;
    }

    // switch to small screen
    function smallScreenMode() {
        //presentationController.classList.remove("full-screen");
        bodyly.classList.remove("full-screen");
        headly.classList.remove("hide");
        footly.classList.remove("hide");
        toFullScreenBtn.classList.add("show");
        toSmallScreenBtn.classList.remove("show");

        screenStatus = 0;
    }

    // update counter
    function setSlideNo() {
        slideNumber.innerText = `${currentSlideNo} of ${totalSides}`;
    }
}
