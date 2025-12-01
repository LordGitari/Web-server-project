// 404 page js
window.onload = function() {
  // fade in the error card
  var errorCard = document.querySelector('.error-card');
  if (errorCard) {
    errorCard.style.opacity = '0';
    setTimeout(function() {
      errorCard.style.transition = 'opacity 0.8s ease-out';
      errorCard.style.opacity = '1';
    }, 100);
  }
};

// car icon hover effect
var carIcon = document.querySelector('.error-car-icon');
if (carIcon) {
  carIcon.addEventListener('mouseenter', function() {
    carIcon.style.transform = 'scale(1.1) rotate(5deg)';
  });

  carIcon.addEventListener('mouseleave', function() {
    carIcon.style.transform = 'scale(1) rotate(0deg)';
  });
}

// ===================================
// Quick Links Stagger Animation
// ===================================
const quickLinks = document.querySelectorAll('.quick-link');
quickLinks.forEach((link, index) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(20px)';

    setTimeout(() => {
        link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
    }, 600 + (index * 100));
});

// ===================================
// Info Items Animation on Scroll
// ===================================
const infoItems = document.querySelectorAll('.info-item');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 150);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

infoItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// ===================================
// Error Code Glitch Effect (Optional)
// ===================================
const errorCode = document.querySelector('.error-code');
if (errorCode) {
    let glitchInterval;

    errorCode.addEventListener('mouseenter', () => {
        let glitchCount = 0;
        glitchInterval = setInterval(() => {
            if (glitchCount < 3) {
                errorCode.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                glitchCount++;
            } else {
                errorCode.style.transform = 'translate(0, 0)';
                clearInterval(glitchInterval);
            }
        }, 50);
    });
}

// ===================================
// Button Click Ripple Effect Enhancement
// ===================================
const errorButtons = document.querySelectorAll('.error-actions .btn');
errorButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        // Create ripple element
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-expand 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-expand {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// console stuff
console.log('404 - Page Not Found');
console.log('Looks like you took a wrong turn!');

// track 404 errors maybe
if (window.location.pathname !== '/error.html') {
  console.log('404 Error:', window.location.pathname);
  // could add analytics here later
}
