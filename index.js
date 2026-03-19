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

// Gallery carousel with improved responsiveness
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let index = 0;

function updateSliderPosition() {
  const slideWidth = slider.parentElement.offsetWidth;
  slider.style.transform = `translateX(${-index * slideWidth}px)`;
}

const leftBtn = document.querySelector('.nav.left');
const rightBtn = document.querySelector('.nav.right');

if (leftBtn && rightBtn) {
  leftBtn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      updateSliderPosition();
    }
  });

  rightBtn.addEventListener('click', () => {
    if (index < slides.length - 1) {
      index++;
      updateSliderPosition();
    }
  });

  // Handle window resize
  window.addEventListener('resize', updateSliderPosition);
}

// Back to top button with enhanced styling
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'fixed bottom-8 right-8 bg-gold text-dark p-3 rounded-full shadow-xl opacity-0 transition-all duration-300 z-50 hover:scale-110 font-bold';
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

// Service cards enhanced hover effects
document.querySelectorAll('#services .border').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 25px 50px rgba(212, 175, 55, 0.25)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = 'none';
  });
});

// FULLSCREEN / SIDE MENU LOGIC with improved animations and accessibility
const menuBtn = document.getElementById("menuBtn");
const overlayMenu = document.getElementById("overlayMenu");
const menuLinks = document.querySelectorAll(".menu-link");

let menuOpen = false;

if (menuBtn && overlayMenu) {
  menuBtn.addEventListener("click", () => {
    menuOpen = !menuOpen;
    overlayMenu.classList.toggle("translate-x-full", !menuOpen);
    menuBtn.textContent = menuOpen ? "✕" : "Menu";
    menuBtn.setAttribute("aria-expanded", menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  });

  // Close menu when clicking on a link
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetId = link.dataset.target;
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }

      overlayMenu.classList.add("translate-x-full");
      menuBtn.textContent = "Menu";
      menuBtn.setAttribute("aria-expanded", "false");
      menuOpen = false;
      document.body.style.overflow = 'auto';
    });
  });

  // Close menu when clicking outside
  overlayMenu.addEventListener('click', (e) => {
    if (e.target === overlayMenu) {
      overlayMenu.classList.add("translate-x-full");
      menuBtn.textContent = "Menu";
      menuBtn.setAttribute("aria-expanded", "false");
      menuOpen = false;
      document.body.style.overflow = 'auto';
    }
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
      overlayMenu.classList.add("translate-x-full");
      menuBtn.textContent = "Menu";
      menuBtn.setAttribute("aria-expanded", "false");
      menuOpen = false;
      document.body.style.overflow = 'auto';
    }
  });
}

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.className = 'fixed top-0 left-0 h-1 bg-gold z-50';
progressBar.style.width = '0%';
progressBar.style.transition = 'width 0.1s ease';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${scrollPercent}%`;
});



// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(element => {
  observer.observe(element);
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
