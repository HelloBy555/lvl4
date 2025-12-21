// Gallery carousel ping-pong functionality
let currentSlide = 0;
let direction = 1; // 1 for forward, -1 for backward
let currentTranslate = 0; // current translateX value in %
const gallerySlider = document.querySelector('.gallery-slider');
const galleryDots = document.querySelectorAll('.gallery-dot');

function updateSlide() {
  gallerySlider.style.transform = `translateX(${currentTranslate}%)`;
  galleryDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  currentTranslate -= 25; // move left by one slide
  currentSlide = Math.round(-currentTranslate / 25);
  if (currentSlide >= 3) {
    direction = -1;
  } else if (currentSlide <= 0) {
    direction = 1;
  }
  updateSlide();
}

function prevSlide() {
  currentTranslate += 25; // move right by one slide
  currentSlide = Math.round(-currentTranslate / 25);
  if (currentSlide <= 0) {
    direction = 1;
  }
  updateSlide();
}

// Dot navigation
galleryDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    gallerySlider.style.transition = 'none'; // disable transition for instant jump
    currentTranslate = -index * 25;
    currentSlide = index;
    updateSlide();
    gallerySlider.style.transition = 'transform 0.6s ease-in-out'; // re-enable transition
  });
});

// Touch and mouse swipe/drag functionality
let startX = 0;
let isDragging = false;
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
  currentTranslate = prevTranslate - deltaPercent;
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
    // snap back to current slide
    currentTranslate = -currentSlide * 25;
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
