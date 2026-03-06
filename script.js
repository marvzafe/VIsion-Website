document.addEventListener('DOMContentLoaded', () => {
  // --- 0. PERFORMANCE OPTIMIZATION ---
  if (window.requestIdleCallback) {
    requestIdleCallback(() => initializeFeatures());
  } else {
    setTimeout(initializeFeatures, 1);
  }

  function initializeFeatures() {
    setupNavigation();
    setupHeaderScroll();
    setupThemeToggle();
    setupMobileMenu();
    setupContactForm();
    setupScrollReveal();
    setupBlogPosts();
    setupParallaxEffect();
    setupImageLazyLoad();
    setupInteractiveElements();
  }

  // --- 1. DYNAMIC NAVIGATION (Active Color Effect) ---
  function setupNavigation() {
    const currentPath = window.location.pathname.replace(/^\/+/, '');
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (currentPath.includes(href)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // --- 2. HEADER SCROLL EFFECT ---
  function setupHeaderScroll() {
    const header = document.querySelector('header');
    let lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScrollY = window.scrollY;
    }, { passive: true });
  }

  // --- 3. DARK/LIGHT THEME TOGGLE ---
  function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';

    html.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
      themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
      themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
        themeToggle.style.animation = 'rotate 0.6s ease-in-out';
      });
    }
  }

  // --- 4. MOBILE MENU TOGGLE ---
  function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.style.animation = 'rotate 0.3s ease-in-out';
      });
      
      // Close menu on link click
      const navLinks = nav.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => nav.classList.remove('active'));
      });
    }
  }

  // --- 5. CONTACT FORM WITH VALIDATION ---
  function setupContactForm() {
    const contactForm = document.querySelector('form');
    if (contactForm && window.location.pathname.includes('contact.html')) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.disabled = true;
        btn.innerText = "SENDING...";
        btn.style.animation = 'pulse 1s infinite';

        try {
          const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
          });
          if (response.ok) {
            showNotification('Salamat! Naipadala na ang iyong mensahe.', 'success');
            contactForm.reset();
            btn.innerText = "MESSAGE SENT ✓";
            setTimeout(() => {
              btn.disabled = false;
              btn.innerText = originalText;
              btn.style.animation = 'none';
            }, 3000);
          } else {
            showNotification('Error sa pagpapadala.', 'error');
            btn.disabled = false;
            btn.innerText = originalText;
            btn.style.animation = 'none';
          }
        } catch (err) {
          showNotification('Connection Error.', 'error');
          btn.disabled = false;
          btn.innerText = originalText;
          btn.style.animation = 'none';
        }
      });
    }
  }

  // --- NOTIFICATION SYSTEM ---
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      z-index: 10000;
      animation: slideInDown 0.4s ease-out;
      font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideInUp 0.4s ease-in';
      setTimeout(() => notification.remove(), 400);
    }, 3000);
  }

  // --- 6. SCROLL REVEAL WITH INTERSECTION OBSERVER ---
  function setupScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    reveals.forEach(el => observer.observe(el));
  }

  // --- PARALLAX EFFECT ---
  function setupParallaxEffect() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
      parallaxElements.forEach(el => {
        const scrollPosition = window.scrollY;
        const elementOffset = el.offsetTop;
        const distance = scrollPosition - elementOffset;
        el.style.transform = `translateY(${distance * 0.5}px)`;
      });
    }, { passive: true });
  }

  // --- IMAGE LAZY LOADING ---
  function setupImageLazyLoad() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }
  }

  // --- INTERACTIVE ELEMENTS ---
  function setupInteractiveElements() {
    // Button ripple effect
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          left: ${x}px;
          top: ${y}px;
          pointer-events: none;
          animation: scaleIn 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // --- 7. BLOG POSTS WITH SAMPLE DATA ---
  function setupBlogPosts() {
    const blogPosts = [
      {
        id: 1,
        title: 'Future of Sustainable Construction',
        category: 'Sustainability',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
        text: 'Exploring how green materials and renewable energy are transforming the construction industry...',
        date: 'Jan 15, 2025',
        author: 'John Doe',
        link: '#blog-1'
      },
      {
        id: 2,
        title: 'Latest Construction Technology Trends',
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
        text: 'BIM, AI, and IoT are revolutionizing how we design and construct buildings...',
        date: 'Jan 12, 2025',
        author: 'Jane Smith',
        link: '#blog-2'
      },
      {
        id: 3,
        title: 'Safety First: Our Construction Standards',
        category: 'Safety',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
        text: 'Learn about the safety protocols that protect our workers and clients...',
        date: 'Jan 10, 2025',
        author: 'Mike Johnson',
        link: '#blog-3'
      }
    ];
    
    const blogGrid = document.getElementById("blogGrid");
    if (blogGrid) {
      blogPosts.forEach((post, index) => {
        const card = document.createElement("div");
        card.className = "card reveal";
        card.style.animation = `slideInUp 0.6s ease-out ${index * 0.1}s both`;
        card.innerHTML = `
          <img src="${post.image}" alt="${post.title}" class="card-image">
          <div class="card-content">
            <span class="card-meta">${post.category}</span>
            <h3 class="card-title">${post.title}</h3>
            <p class="card-text">${post.text}</p>
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.85rem; color: #999;">
              Published on ${post.date} by ${post.author}
            </div>
            <a href="${post.link}" style="display: inline-block; margin-top: 1rem; color: #FF1817; font-weight: 600; transition: all 0.3s ease;">Read More →</a>
          </div>
        `;
        blogGrid.appendChild(card);
      });
    }
  }
});

// --- 8. IMAGE SLIDER LOGIC ---
let slideIndex = 0;
function moveSlide(n) {
  const wrapper = document.getElementById('slider-wrapper');
  if (!wrapper) return;
  const slides = wrapper.children;
  slideIndex = (slideIndex + n + slides.length) % slides.length;
  wrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
  wrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
}


