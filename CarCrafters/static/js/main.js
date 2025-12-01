// main js file for carcrafters
// dark mode stuff
var darkModeToggle = document.getElementById('darkModeToggle');
var body = document.body;
var icon = darkModeToggle.querySelector('i');

// check if user had dark mode before
var savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  icon.classList.remove('bi-moon-stars-fill');
  icon.classList.add('bi-sun-fill');
}

// toggle dark mode when clicked
darkModeToggle.addEventListener('click', function() {
  body.classList.toggle('dark-mode');
  
  // change the icon
  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('bi-moon-stars-fill');
    icon.classList.add('bi-sun-fill');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.remove('bi-sun-fill');
    icon.classList.add('bi-moon-stars-fill');
    localStorage.setItem('theme', 'light');
  }
});

// smooth scrolling for links
var anchors = document.querySelectorAll('a[href^="#"]');
for(var i = 0; i < anchors.length; i++) {
  anchors[i].addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    
    if (href !== '#' && href.startsWith('#')) {
      e.preventDefault();
      var target = document.querySelector(href);
      
      if (target) {
        var navHeight = document.querySelector('.navbar').offsetHeight;
        var targetPosition = target.offsetTop - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // close mobile menu if its open
        var navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
          var bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    }
  });
}

// ===================================
// Navbar Background and Auto-Hide on Scroll
// ===================================
const navbar = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add background when scrolled
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(45, 55, 72, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(45, 55, 72, 0.85)';
        navbar.style.boxShadow = 'none';
    }
    
    // Auto-hide navbar
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down - hide navbar
        navbar.classList.add('navbar-hidden');
    } else {
        // Scrolling up or at top - show navbar
        navbar.classList.remove('navbar-hidden');
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Carousel Auto-play Control
// ===================================
const heroCarousel = document.getElementById('heroCarousel');
if (heroCarousel) {
    const carousel = new bootstrap.Carousel(heroCarousel, {
        interval: 5000,
        ride: 'carousel',
        pause: 'hover',
        wrap: true
    });
    
    // Pause carousel when user interacts with controls
    const carouselControls = heroCarousel.querySelectorAll('.carousel-control-prev, .carousel-control-next, .carousel-indicators button');
    carouselControls.forEach(control => {
        control.addEventListener('click', () => {
            carousel.pause();
            setTimeout(() => {
                carousel.cycle();
            }, 10000); // Resume after 10 seconds
        });
    });
}

// ===================================
// Scroll Animation for Elements
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all cards and panels
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.glass-card, .glass-panel, .gallery-card');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
});

// ===================================
// Active Navigation Link Highlight
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Gallery Card Hover Effects Enhancement
// ===================================
const galleryCards = document.querySelectorAll('.gallery-card');

galleryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ===================================
// Feature Cards Stagger Animation
// ===================================
const featureCards = document.querySelectorAll('.feature-card');

const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    staggerObserver.observe(card);
});

// ===================================
// Parallax Effect for Hero Section
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===================================
// Button Ripple Effect
// ===================================
const buttons = document.querySelectorAll('.btn-gradient, .btn-outline-gradient');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn-gradient, .btn-outline-gradient {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Lazy Loading Images
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// Prevent Flash of Unstyled Content
// ===================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===================================
// Back to Top Button
// ===================================
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Newsletter Form
// ===================================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (email) {
            alert('Thank you for subscribing!');
            newsletterForm.reset();
        }
    });
}

// ===================================
// Search Form
// ===================================
const searchForm = document.querySelector('.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchForm.querySelector('input[type="search"]').value;
        if (query) {
            window.location.href = `gallery.html?search=${encodeURIComponent(query)}`;
        }
    });
}

// just some fun console stuff
console.log('🚗 Welcome to CarCrafters! 🚗');
console.log('Built with love for car enthusiasts');

// check page load time
if (window.performance) {
  window.addEventListener('load', function() {
    setTimeout(function() {
      var perfData = window.performance.timing;
      var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log('Page loaded in ' + pageLoadTime + 'ms');
    }, 0);
  });
}
