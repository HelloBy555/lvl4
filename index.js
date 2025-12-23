// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Remove light/dark mode toggle
// The light/dark mode toggle button and its event listener have been removed as per the task

// Gallery carousel button controls only
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let index = 0;
const slideWidth = slider.parentElement.offsetWidth;

const leftBtn = document.querySelector('.nav.left');
const rightBtn = document.querySelector('.nav.right');

leftBtn.addEventListener('click', () => {
  if (index > 0) {
    index--;
    slider.style.transform = `translateX(${-index * slideWidth}px)`;
  }
});

rightBtn.addEventListener('click', () => {
  if (index < slides.length - 1) {
    index++;
    slider.style.transform = `translateX(${-index * slideWidth}px)`;
  }
});

// Typing effect for hero title - disabled due to HTML content
// const heroTitle = document.querySelector('h2');
// const originalText = heroTitle.innerHTML;
// heroTitle.innerHTML = '';
// let charIndex = 0;

// function typeWriter() {
//   if (charIndex < originalText.length) {
//     heroTitle.innerHTML += originalText.charAt(charIndex);
//     charIndex++;
//     setTimeout(typeWriter, 50);
//   }
// }

// Start typing effect after page load
// window.addEventListener('load', () => {
//   setTimeout(typeWriter, 1000);
// });



// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'fixed bottom-8 right-8 bg-gold text-dark p-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 z-50';
backToTopBtn.style.display = 'none';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = 'block';
    setTimeout(() => backToTopBtn.style.opacity = '1', 10);
  } else {
    backToTopBtn.style.opacity = '0';
    setTimeout(() => backToTopBtn.style.display = 'none', 300);
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Service cards hover effects
document.querySelectorAll('#services .border').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.05)';
    card.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.3)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
    card.style.boxShadow = 'none';
  });
});

// Testimonials carousel with JS control
const testimonialsContainer = document.querySelector('#testimonials .overflow-hidden');
const testimonialsWrapper = testimonialsContainer.querySelector('div');
let testimonialsScroll = 0;
const testimonialsSpeed = 1;

function animateTestimonials() {
  testimonialsScroll += testimonialsSpeed;
  if (testimonialsScroll >= testimonialsWrapper.offsetWidth / 3) {
    testimonialsScroll = 0;
  }
  testimonialsWrapper.style.transform = `translateX(-${testimonialsScroll}px)`;
  requestAnimationFrame(animateTestimonials);
}

animateTestimonials();

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

// Form validation for booking modal
const bookingForm = document.querySelector('#bookingModal form');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = bookingForm.querySelector('input[type="text"]').value.trim();
    const phone = bookingForm.querySelector('input[type="tel"]').value.trim();

    if (name === '' || phone === '') {
      alert('Please fill in all fields.');
      return;
    }

    if (!/^\d{10,}$/.test(phone.replace(/\D/g, ''))) {
      alert('Please enter a valid phone number.');
      return;
    }

    // Simulate form submission
    alert('Thank you for your booking request! We will contact you soon.');
    bookingForm.reset();
    document.getElementById('bookingModal').classList.add('hidden');
  });
}



// FULLSCREEN / SIDE MENU LOGIC
const menuBtn = document.getElementById("menuBtn");
const overlayMenu = document.getElementById("overlayMenu");
const menuLinks = document.querySelectorAll(".menu-link");

let menuOpen = false;

menuBtn.addEventListener("click", () => {
  menuOpen = !menuOpen;

  overlayMenu.classList.toggle("translate-x-full", !menuOpen);
  menuBtn.textContent = menuOpen ? "✕" : "Menu";
});

// Close menu + scroll
menuLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetId = link.dataset.target;
    const target = document.getElementById(targetId);

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }

    overlayMenu.classList.add("translate-x-full");
    menuBtn.textContent = "Menu";
    menuOpen = false;
  });
});

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'fixed top-0 left-0 h-1 bg-gold z-50';
progressBar.style.width = '0%';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${scrollPercent}%`;
});

// Enhanced animations with GSAP-like effects (using CSS transitions)
document.querySelectorAll('[data-animate]').forEach(el => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  observer.observe(el);
});

// Remove redundant fade-in observer from HTML script
// The IntersectionObserver in HTML is redundant with this one, so we keep this one for consistency
