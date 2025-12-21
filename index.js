// Gallery carousel ping-pong functionality
let currentSlide = 0;
let direction = 1; // 1 for forward, -1 for backward
const gallerySlider = document.querySelector('.gallery-slider');
const galleryDots = document.querySelectorAll('.gallery-dot');

function updateSlide() {
  gallerySlider.style.transform = `translateX(-${currentSlide * 25}%)`;
  galleryDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  if (currentSlide === 3 && direction === 1) {
    direction = -1;
  } else if (currentSlide === 0 && direction === -1) {
    direction = 1;
  }
  currentSlide += direction;
  updateSlide();
}

function prevSlide() {
  currentSlide = Math.max(0, currentSlide - 1);
  if (currentSlide === 0) direction = 1;
  updateSlide();
}



// Dot navigation
galleryDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    updateSlide();
  });
});

// Touch and mouse swipe/drag functionality
let startX = 0;
let isDragging = false;
let currentTranslate = 0; // in %
let prevTranslate = 0;
const slideWidth = gallerySlider.parentElement.offsetWidth;

function startDrag(e) {
  isDragging = true;
  startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  prevTranslate = currentTranslate;
  gallerySlider.style.transition = 'none';
  e.preventDefault();
}

function drag(e) {
  if (!isDragging) return;
  const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  const deltaX = currentX - startX;
  const deltaPercent = (deltaX / slideWidth) * 25; // 25% per slide
  currentTranslate = prevTranslate - deltaPercent; // negative for left swipe
  gallerySlider.style.transform = `translateX(${currentTranslate}%)`;
}

function endDrag(e) {
  if (!isDragging) return;
  isDragging = false;
  gallerySlider.style.transition = 'transform 0.6s ease-in-out';
  const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
  const deltaX = startX - endX;
  if (Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      nextSlide();
    } else if (deltaX < 0) {
      prevSlide();
    }
  } else {
    updateSlide();
  }
}

// Touch events
gallerySlider.addEventListener('touchstart', startDrag);
gallerySlider.addEventListener('touchmove', drag);
gallerySlider.addEventListener('touchend', endDrag);

// Mouse events for desktop
gallerySlider.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', endDrag);
