/* ============================================
   VISION - Advanced Interactions & Effects
   Mouse Trail, Magnetic Buttons, Parallax, Counters
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initializeAdvancedInteractions();
});

function initializeAdvancedInteractions() {
  setupMouseTrail();
  setupMagneticButtons();
  setupParallaxDepth();
  setupCounterAnimation();
  setupScrollReveal();
  setupSmoothScroll();
  setupImageReveal();
  setupFormEnhancements();
  setupInteractiveCards();
}

/* ============================================
   1. MOUSE TRAIL EFFECT
   ============================================ */

function setupMouseTrail() {
  const particles = [];
  const maxParticles = 15;
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (Math.random() > 0.85) {
      createTrailParticle(mouseX, mouseY);
    }
  });

  function createTrailParticle(x, y) {
    if (particles.length < maxParticles) {
      const particle = document.createElement('div');
      particle.className = 'trail-particle';
      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.opacity = '0.8';
      document.body.appendChild(particle);
      particles.push(particle);

      setTimeout(() => {
        particle.remove();
        particles.shift();
      }, 800);
    }
  }
}

/* ============================================
   2. MAGNETIC BUTTON EFFECT
   ============================================ */

function setupMagneticButtons() {
  const buttons = document.querySelectorAll('.btn, button:not(.menu-toggle):not(.theme-toggle)');
  
  buttons.forEach(button => {
    let mouseX = 0;
    let mouseY = 0;
    let buttonX = 0;
    let buttonY = 0;

    button.addEventListener('mouseenter', () => {
      button.style.cursor = 'pointer';
    });

    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;

      const distance = Math.sqrt(mouseX ** 2 + mouseY ** 2);
      if (distance < 100) {
        buttonX = (mouseX / distance) * 15;
        buttonY = (mouseY / distance) * 15;
        button.style.transform = `translate(${buttonX}px, ${buttonY}px) scale(1.05)`;
        button.style.transition = 'transform 0.1s ease-out';
      }
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0) scale(1)';
      button.style.transition = 'transform 0.3s ease-out';
    });
  });
}

/* ============================================
   3. PARALLAX DEPTH EFFECT
   ============================================ */

function setupParallaxDepth() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-parallax') || 20;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

/* ============================================
   4. ANIMATED COUNTER
   ============================================ */

function setupCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  
  if (counters.length === 0) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => counterObserver.observe(counter));
}

/* ============================================
   5. SCROLL REVEAL WITH STAGGER
   ============================================ */

function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .stagger-item, .card, .fade-in');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

/* ============================================
   6. SMOOTH SCROLL ANCHOR LINKS
   ============================================ */

function setupSmoothScroll() {
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
}

/* ============================================
   7. IMAGE LAZY LOAD WITH REVEAL
   ============================================ */

function setupImageReveal() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        
        const tempImg = new Image();
        tempImg.onload = () => {
          img.src = src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        };
        tempImg.src = src;
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

/* ============================================
   8. FORM ENHANCEMENTS
   ============================================ */

function setupFormEnhancements() {
  const formInputs = document.querySelectorAll('input, textarea, select');
  
  formInputs.forEach(input => {
    // Floating label effect
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });

    // Check if input has value on load
    if (input.value) {
      input.parentElement.classList.add('focused');
    }
  });

  // Form submission with confetti
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      // Don't prevent default for actual form submission
      if (this.hasAttribute('data-confetti')) {
        createConfetti();
      }
    });
  }
}

/* ============================================
   9. CONFETTI BURST EFFECT
   ============================================ */

function createConfetti() {
  const confettiCount = 30;
  const colors = ['#FF1817', '#FFB800', '#111111'];

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = window.innerWidth / 2 + 'px';
      confetti.style.top = window.innerHeight / 2 + 'px';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      const tx = (Math.random() - 0.5) * 400;
      const ty = (Math.random() - 0.5) * 400;
      confetti.style.setProperty('--tx', tx + 'px');
      confetti.style.setProperty('--ty', ty + 'px');

      document.body.appendChild(confetti);

      setTimeout(() => confetti.remove(), 1000);
    }, i * 30);
  }
}

/* ============================================
   10. INTERACTIVE CARDS WITH 3D EFFECT
   ============================================ */

function setupInteractiveCards() {
  const cards = document.querySelectorAll('.card, [data-card-3d]');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      card.style.transition = 'none';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      card.style.transition = 'transform 0.4s ease-out';
    });
  });
}

/* ============================================
   11. TYPEWRITER TEXT EFFECT
   ============================================ */

function setupTypewriterEffect() {
  const typewriterElements = document.querySelectorAll('[data-typewriter]');
  
  typewriterElements.forEach(element => {
    const text = element.textContent;
    const speed = element.getAttribute('data-typewriter-speed') || 50;
    
    element.textContent = '';
    let index = 0;

    const typeWriter = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
      }
    };

    typeWriter();
  });
}

/* ============================================
   12. PAGE TRANSITION EFFECT
   ============================================ */

function setupPageTransitions() {
  const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      // Optional: add page transition effect
      const href = link.getAttribute('href');
      
      // Create transition overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #FF1817;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 9999;
      `;
      
      document.body.appendChild(overlay);
      
      setTimeout(() => {
        overlay.style.opacity = '0.1';
      }, 0);
    });
  });
}

/* ============================================
   13. UTILITY: CREATE FLOATING PARTICLES
   ============================================ */

function createFloatingParticles(container, count = 5) {
  const container_el = document.querySelector(container);
  if (!container_el) return;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'float-element';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.width = (Math.random() * 20 + 10) + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(255, 24, 23, 0.1)';
    particle.style.borderRadius = '50%';
    particle.style.animationDelay = (Math.random() * 2) + 's';
    
    container_el.appendChild(particle);
  }
}

/* ============================================
   14. UTILITY: ANIMATE NUMBERS
   ============================================ */

function animateNumber(element, target, duration = 2000) {
  const increment = target / (duration / 16);
  let current = 0;

  const updateNumber = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = target.toLocaleString();
    }
  };

  updateNumber();
}

/* ============================================
   EXPORT FOR GLOBAL USE
   ============================================ */

window.VisionInteractions = {
  createConfetti,
  createFloatingParticles,
  animateNumber,
  setupTypewriterEffect
};
// Dark/Light Theme Toggle

class ThemeToggle {
  constructor() {
    this.themeKey = 'website-theme';
    this.init();
  }

  init() {
    // Create theme toggle button if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
      this.createToggleButton();
    }

    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem(this.themeKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (prefersDark) {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }

    // Listen for system theme preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.themeKey)) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  createToggleButton() {
    const button = document.createElement('button');
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Toggle dark mode');
    button.innerHTML = '🌙';
    button.addEventListener('click', () => this.toggle());
    document.body.appendChild(button);
  }

  toggle() {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  setTheme(theme) {
    const isDark = theme === 'dark';
    const button = document.querySelector('.theme-toggle');
    
    if (isDark) {
      document.body.classList.add('dark-theme');
      if (button) button.innerHTML = '☀️';
    } else {
      document.body.classList.remove('dark-theme');
      if (button) button.innerHTML = '🌙';
    }

    localStorage.setItem(this.themeKey, theme);
  }
}

// Initialize theme toggle when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ThemeToggle());
} else {
  new ThemeToggle();
}
// Scroll-Triggered Animations using Intersection Observer

class ScrollAnimations {
  constructor() {
    this.options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation based on data attribute or class
          const animationType = entry.target.dataset.animation || 'fade-in';
          entry.target.classList.add(animationType);
          
          // Also add active class for custom animations
          entry.target.classList.add('active');
          
          // Stop observing once animation is applied
          observer.unobserve(entry.target);
        }
      });
    }, this.options);

    // Observe all elements with reveal class or data-animation attribute
    document.querySelectorAll('.reveal, [data-animation]').forEach(element => {
      observer.observe(element);
    });

    // Also handle staggered animations for multiple elements
    this.handleStaggeredAnimations(observer);
  }

  handleStaggeredAnimations(observer) {
    // Find all containers with multiple animated children
    document.querySelectorAll('[data-stagger]').forEach(container => {
      const children = container.querySelectorAll('[data-animation], .reveal');
      children.forEach((child, index) => {
        const delay = index * 100;
        child.style.animationDelay = `${delay}ms`;
        observer.observe(child);
      });
    });
  }
}

// Counter Animation for numbers
class CounterAnimation {
  constructor(element, duration = 2000) {
    this.element = element;
    this.duration = duration;
    this.start = parseInt(this.element.textContent) || 0;
    this.end = parseInt(this.element.dataset.target) || this.start;
    this.isAnimating = false;
  }

  animate() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    const range = this.end - this.start;
    const increment = range / (this.duration / 16);
    let current = this.start;

    const counter = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= this.end) || (increment < 0 && current <= this.end)) {
        this.element.textContent = this.end.toLocaleString();
        clearInterval(counter);
        this.isAnimating = false;
      } else {
        this.element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  }

  static initAll() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          const counter = new CounterAnimation(entry.target);
          counter.animate();
          entry.target.dataset.animated = 'true';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => {
      observer.observe(counter);
    });
  }
}

// Parallax Scroll Effect
class ParallaxScroll {
  constructor() {
    this.elements = document.querySelectorAll('.parallax');
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const scrollTop = window.scrollY;
    
    this.elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollTop;
      const distance = scrollTop - elementTop;
      const offset = distance * 0.5;
      
      element.style.backgroundPosition = `center ${offset}px`;
    });
  }
}

// Initialize all scroll animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    CounterAnimation.initAll();
    new ParallaxScroll();
  });
} else {
  new ScrollAnimations();
  CounterAnimation.initAll();
  new ParallaxScroll();
}
// Advanced Interactive Effects

class InteractiveEffects {
  constructor() {
    this.init();
  }

  init() {
    this.setupMouseFollower();
    this.setupGlowHover();
    this.setupRippleEffect();
    this.setup3DTransform();
  }

  // Mouse follower effect
  setupMouseFollower() {
    const containers = document.querySelectorAll('.mouse-follow-container');
    if (containers.length === 0) return;

    containers.forEach(container => {
      const follower = document.createElement('div');
      follower.className = 'mouse-follower';
      container.appendChild(follower);

      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        follower.style.opacity = '1';
        follower.style.left = x + 'px';
        follower.style.top = y + 'px';
      });

      container.addEventListener('mouseleave', () => {
        follower.style.opacity = '0';
      });
    });
  }

  // Glow hover effect
  setupGlowHover() {
    const elements = document.querySelectorAll('.glow-hover');
    elements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--glow-x', x + 'px');
        element.style.setProperty('--glow-y', y + 'px');
      });
    });
  }

  // Ripple effect on click
  setupRippleEffect() {
    const rippleElements = document.querySelectorAll('.ripple');
    rippleElements.forEach(element => {
      element.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // 3D transform on mouse move
  setup3DTransform() {
    const cards = document.querySelectorAll('.product-card-3d');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 5;
        const rotateY = ((centerX - x) / centerX) * 5;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }
}

// Smooth Page Transitions
class PageTransitions {
  constructor() {
    this.init();
  }

  init() {
    this.setupLinkTransitions();
  }

  setupLinkTransitions() {
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href*="#"])');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Skip if it's the current page
        if (window.location.pathname.includes(href) || href.includes(window.location.pathname)) {
          return;
        }

        e.preventDefault();
        this.performTransition(href);
      });
    });
  }

  performTransition(href) {
    const fade = document.createElement('div');
    fade.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: white;
      z-index: 9999;
      animation: fadeOutPage 0.5s ease forwards;
    `;

    document.body.appendChild(fade);

    setTimeout(() => {
      window.location.href = href;
    }, 250);
  }
}

// Animated Buttons
class AnimatedButtons {
  constructor() {
    this.init();
  }

  init() {
    const buttons = document.querySelectorAll('.btn-interactive');
    buttons.forEach(btn => {
      btn.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });
  }
}


// Initialize all interactive effects when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new InteractiveEffects();
    new PageTransitions();
    new AnimatedButtons();

    // Add CSS animation for page fade
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeOutPage {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleExpand 0.6s ease-out;
        pointer-events: none;
      }

      @keyframes rippleExpand {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  });
} else {
  new InteractiveEffects();
  new PageTransitions();
  new AnimatedButtons();
}
 