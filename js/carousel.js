const track = document.querySelector('.carousel-track'); // searches entire document looking for .carousel-track, first one is saved
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const indNav = document.querySelector('.carousel-nav');
// const dots = Array.from(indNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;



// this is a function that makes for loop readable without knowing exactly what it does
const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};
// for loop
slides.forEach(setSlidePosition);

console.log(nextButton);

            // ********** RIGHT BUTTON ************ //
nextButton.addEventListener('click', e => {
  console.log("clicked right button")
      // find current and next slide
  // only looks through track element, faster than going through whole doc
  const currentSlide = track.querySelector('.current-slide'); 
  console.log(currentSlide)
  console.log(currentSlide.nextElementSibling)
  const nextSlide = currentSlide.nextElementSibling;
  // finds where next slide is, and by how much to move it over to get to corrent position
  const amtToMove = nextSlide.style.left; 

  // move to next slide (done by moving the ENTIRE track over)
  track.style.transform = 'translateX(-' + amtToMove + ')'; // make sure to use correct +/- direction

  // then we update the current slide
  // don't put . before classname in this scenario because this looks through a 
  // classlist, so adding a . will make it seem like the classname actually has the .
  currentSlide.classList.remove('current-slide');
  nextSlide.classList.add('current-slide');
})

            // ********** LEFT BUTTON ************ //
prevButton.addEventListener('click', e => {
      // find current and next slide
  // only looks through track element, faster than going through whole doc
  const currentSlide = track.querySelector('.current-slide'); 
  const prevSlide = currentSlide.previousElementSibling;
  // finds where next slide is, and by how much to move it over to get to corrent position
  const amtToMove = prevSlide.style.left; 

  // move to next slide (done by moving the ENTIRE track over)
  track.style.transform = 'translateX(-' + amtToMove + ')'; // make sure to use correct +/- direction

  // then we update the current slide
  // don't put . before classname in this scenario because this looks through a 
  // classlist, so adding a . will make it seem like the classname actually has the .
  currentSlide.classList.remove('current-slide');
  prevSlide.classList.add('current-slide');
})


console.log(slideWidth);



// when click left, moves slides to left, vice versa
// each indicator should move to that specific slide
