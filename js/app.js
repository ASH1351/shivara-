/**
 * SHIVARA BY RIDDHI - Master Application Script
 * Orchestrates Page Loader, Sticky Navbar, Mobile Drawer, Custom Cursor,
 * Currency Switcher, Testimonials Carousel, Modals, Toasts, and Scroll Animations.
 */

// Toast notification helper
function showToast(message, duration = 3400) {
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'luxury-toast';
  toast.innerHTML = `
    <div class="toast-gold-line"></div>
    <div class="toast-content">
      <div class="toast-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D9B26A" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </div>
      <p class="toast-text">${message}</p>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.add('is-visible');
  });

  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================
     1. PAGE LOADER
     ======================================================== */
  const pageLoader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (pageLoader) {
        pageLoader.classList.add('is-fading-out');
        setTimeout(() => {
          pageLoader.style.display = 'none';
        }, 700);
      }
    }, 400);
  });

  // Safety fallback if window.load takes too long
  setTimeout(() => {
    if (pageLoader && pageLoader.style.display !== 'none') {
      pageLoader.classList.add('is-fading-out');
      setTimeout(() => pageLoader.style.display = 'none', 700);
    }
  }, 2200);

  /* ========================================================
     2. STICKY NAVBAR & SCROLL PROGRESS BAR
     ======================================================== */
  const navbar = document.getElementById('siteNavbar');
  const scrollProgressBar = document.getElementById('scrollProgressBar');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar background blur transformation
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }

    // Scroll progress bar
    if (scrollProgressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      scrollProgressBar.style.width = `${progress}%`;
    }
  }, { passive: true });

  /* ========================================================
     3. MOBILE NAVIGATION DRAWER
     ======================================================== */
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
  const closeMobileDrawerBtn = document.getElementById('closeMobileDrawerBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileMenu = () => {
    if (mobileDrawer && mobileDrawerOverlay) {
      mobileDrawer.classList.add('is-open');
      mobileDrawerOverlay.classList.add('is-open');
      if (mobileMenuToggle) mobileMenuToggle.classList.add('is-active');
      document.body.classList.add('no-scroll');
    }
  };

  const closeMobileMenu = () => {
    if (mobileDrawer && mobileDrawerOverlay) {
      mobileDrawer.classList.remove('is-open');
      mobileDrawerOverlay.classList.remove('is-open');
      if (mobileMenuToggle) mobileMenuToggle.classList.remove('is-active');
      document.body.classList.remove('no-scroll');
    }
  };

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileMenu);
  if (closeMobileDrawerBtn) closeMobileDrawerBtn.addEventListener('click', closeMobileMenu);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  /* ========================================================
     4. CURRENCY SWITCHER
     ======================================================== */
  const currencySelects = document.querySelectorAll('.currency-selector');
  currencySelects.forEach(select => {
    select.value = currentCurrency;
    select.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      currencySelects.forEach(s => s.value = currentCurrency);

      // Re-render catalog and drawers
      if (typeof Catalog !== 'undefined') Catalog.renderProducts();
      if (typeof Cart !== 'undefined') Cart.render();
      if (typeof Wishlist !== 'undefined') Wishlist.render();

      showToast(`Currency changed to ${currentCurrency}`);
    });
  });

  /* ========================================================
     5. LUXURY CUSTOM CURSOR (DESKTOP ONLY)
     ======================================================== */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice && cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    const animateCursor = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover state over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .product-card, .collection-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('cursor-expanded'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('cursor-expanded'));
    });
  }

  /* ========================================================
     6. TESTIMONIALS CAROUSEL
     ======================================================== */
  const testimonialsContainer = document.getElementById('testimonialsSlider');
  const prevTestimonialBtn = document.getElementById('prevTestimonialBtn');
  const nextTestimonialBtn = document.getElementById('nextTestimonialBtn');
  const testimonialDotsContainer = document.getElementById('testimonialDots');

  if (testimonialsContainer && typeof TESTIMONIALS !== 'undefined') {
    let currentSlide = 0;
    let autoplayInterval = null;

    // Render slides
    testimonialsContainer.innerHTML = TESTIMONIALS.map((t, idx) => `
      <div class="testimonial-slide ${idx === 0 ? 'is-active' : ''}" data-index="${idx}">
        <div class="testimonial-ornament">
          <svg width="40" height="32" viewBox="0 0 24 24" fill="#D9B26A" opacity="0.65">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
          </svg>
        </div>
        <p class="testimonial-quote">"${t.quote}"</p>
        <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
        <div class="testimonial-author">
          <h4 class="author-name">${t.name}</h4>
          <span class="author-location">${t.city}</span>
          <span class="author-tag">• ${t.role}</span>
        </div>
        <div class="testimonial-occasion">${t.wedding}</div>
      </div>
    `).join('');

    // Render pagination dots
    if (testimonialDotsContainer) {
      testimonialDotsContainer.innerHTML = TESTIMONIALS.map((_, idx) => `
        <button class="t-dot ${idx === 0 ? 'is-active' : ''}" onclick="goToTestimonial(${idx})" aria-label="Slide ${idx + 1}"></button>
      `).join('');
    }

    const showSlide = (index) => {
      const slides = testimonialsContainer.querySelectorAll('.testimonial-slide');
      const dots = testimonialDotsContainer ? testimonialDotsContainer.querySelectorAll('.t-dot') : [];

      slides.forEach((s, idx) => {
        s.classList.toggle('is-active', idx === index);
      });
      dots.forEach((d, idx) => {
        d.classList.toggle('is-active', idx === index);
      });
      currentSlide = index;
    };

    window.goToTestimonial = (index) => {
      showSlide(index);
    };

    const nextSlide = () => {
      const next = (currentSlide + 1) % TESTIMONIALS.length;
      showSlide(next);
    };

    const prevSlide = () => {
      const prev = (currentSlide - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
      showSlide(prev);
    };

    if (nextTestimonialBtn) nextTestimonialBtn.addEventListener('click', nextSlide);
    if (prevTestimonialBtn) prevTestimonialBtn.addEventListener('click', prevSlide);

    // Auto-advance every 6 seconds
    const startAutoplay = () => {
      autoplayInterval = setInterval(nextSlide, 6500);
    };
    const stopAutoplay = () => {
      if (autoplayInterval) clearInterval(autoplayInterval);
    };

    testimonialsContainer.parentElement.addEventListener('mouseenter', stopAutoplay);
    testimonialsContainer.parentElement.addEventListener('mouseleave', startAutoplay);
    startAutoplay();
  }

  /* ========================================================
     7. INTERACTIVE NECKLINE & LAYERING STYLIST
     ======================================================== */
  const necklineBtns = document.querySelectorAll('.neckline-option-btn');
  const stylistRecommendation = document.getElementById('stylistRecommendation');

  const STYLING_GUIDE = {
    'bridal-lehenga': {
      title: 'Bridal Deep Scoop / Sweetheart Lehengas',
      pairing: 'The Royal Double Layer: Padmavati Polki Gulbandh + Maharani Swarna Rani Haar',
      desc: 'Deep bridal necklines require balanced visual architecture. Anchor the hollow of your neck with a structured 24K Jadau choker flush against the collarbone, complemented by a 30-inch cascading pearl Rani Haar that rests majestically over your bridal dupatta.',
      accent: 'Recommended Gemstones: Uncut Polki Diamonds & Basra Pearls'
    },
    'silk-saree': {
      title: 'Kanjivaram & Benares Heritage Silk Sarees',
      pairing: 'Devi Lakshmi Temple Hasli + Aadya Sacred Gold Haar',
      desc: 'Rich zari borders and closed neck blouses shine brightest with antique matte gold. The sculpted Lakshmi Hasli sits serenely beneath the collar, flanked by the protective energy of authentic gold-capped rudraksha beads.',
      accent: 'Recommended Metal: 22K Antique Nakashi Matte Gold'
    },
    'boat-neck': {
      title: 'High Boat Neck & Regal Anarkalis',
      pairing: 'Aishwarya Navratan Regal Collar or Sitara Lariat',
      desc: 'High collarlines call for circular statement collars that contour the fabric gracefully, or elongated lariats that create a slenderizing vertical elongation.',
      accent: 'Recommended Gemstones: Nine Planetary Sacred Gems'
    },
    'evening-gown': {
      title: 'Cocktail & Sangeet Evening Gowns',
      pairing: 'Basra Pearl & Emerald Choker or Tara Golden South Sea Suite',
      desc: 'For western or Indo-western silhouettes, nothing commands room-quieting sophistication quite like luminous pearls illuminated by untreated Colombian emeralds.',
      accent: 'Recommended Pearls: Golden South Sea & Natural Basra'
    }
  };

  necklineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      necklineBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const styleKey = btn.getAttribute('data-neckline');
      const data = STYLING_GUIDE[styleKey];

      if (stylistRecommendation && data) {
        stylistRecommendation.style.opacity = '0';
        setTimeout(() => {
          stylistRecommendation.innerHTML = `
            <div class="stylist-badge">Curated Pairing</div>
            <h4 class="stylist-pairing-title">${data.pairing}</h4>
            <p class="stylist-pairing-desc">${data.desc}</p>
            <div class="stylist-accent-tag">✨ ${data.accent}</div>
            <div class="stylist-action-row">
              <a href="#necklaces" class="gold-btn-solid stylist-view-btn">
                <span>View Recommended Suites</span>
              </a>
            </div>
          `;
          stylistRecommendation.style.opacity = '1';
        }, 150);
      }
    });
  });

  /* ========================================================
     8. BRIDAL CONSULTATION BOOKING MODAL
     ======================================================== */
  const bridalModal = document.getElementById('bridalModal');
  const openBridalBtns = document.querySelectorAll('.bridal-modal-trigger');
  const closeBridalBtn = document.getElementById('closeBridalModalBtn');
  const bridalOverlay = document.getElementById('bridalModalOverlay');
  const bridalForm = document.getElementById('bridalBookingForm');

  const openBridalModal = () => {
    if (bridalModal && bridalOverlay) {
      bridalModal.classList.add('is-open');
      bridalOverlay.classList.add('is-open');
      document.body.classList.add('no-scroll');
    }
  };

  const closeBridalModal = () => {
    if (bridalModal && bridalOverlay) {
      bridalModal.classList.remove('is-open');
      bridalOverlay.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }
  };

  openBridalBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openBridalModal();
  }));

  if (closeBridalBtn) closeBridalBtn.addEventListener('click', closeBridalModal);
  if (bridalOverlay) bridalOverlay.addEventListener('click', closeBridalModal);

  if (bridalForm) {
    bridalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const brideName = document.getElementById('bridalBrideName').value.trim();
      const bridePhone = document.getElementById('bridalPhone').value.trim();
      const appointmentType = document.querySelector('input[name="bridalType"]:checked')?.value || 'Salon';

      if (!brideName || !bridePhone) {
        showToast('Please provide your name and contact phone.');
        return;
      }

      closeBridalModal();
      bridalForm.reset();

      // Show luxury confirmation toast & modal trigger
      showToast(`Thank you, ${brideName}! Your Bridal Consultation request has been received. Our Master Concierge will connect with you via WhatsApp.`);
    });
  }

  /* ========================================================
     9. CHECKOUT MODAL & MOCK ORDER CONFIRMATION
     ======================================================== */
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckoutBtn = document.getElementById('closeCheckoutModalBtn');
  const checkoutOverlay = document.getElementById('checkoutModalOverlay');
  const checkoutForm = document.getElementById('checkoutForm');

  const closeCheckout = () => {
    if (checkoutModal) checkoutModal.classList.remove('is-open');
    if (checkoutOverlay) checkoutOverlay.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  };

  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeCheckout);
  if (checkoutOverlay) checkoutOverlay.addEventListener('click', closeCheckout);

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('checkoutName').value.trim();
      const phone = document.getElementById('checkoutPhone').value.trim();
      const city = document.getElementById('checkoutCity').value.trim();
      const payMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'UPI';

      if (!name || !phone || !city) {
        showToast('Please complete all delivery information.');
        return;
      }

      const orderRef = 'SHV-' + Math.floor(100000 + Math.random() * 900000);
      Cart.clearCart();
      closeCheckout();
      checkoutForm.reset();

      showToast(`Order Confirmed! Ref: ${orderRef}. We have sent your dossier and tracking link to ${phone}.`);
    });
  }

  /* ========================================================
     10. CONTACT ATELIER FORM VALIDATION
     ======================================================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const msg = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !msg) {
        showToast('Please fill in your name, email, and message.');
        return;
      }

      contactForm.reset();
      showToast(`Warm greetings, ${name}. Your message has been delivered to Riddhi’s private salon concierge.`);
    });
  }

  /* ========================================================
     11. NEWSLETTER CIRCLE SUBSCRIPTION
     ======================================================== */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      const email = emailInput ? emailInput.value.trim() : '';
      if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address.');
        return;
      }
      emailInput.value = '';
      showToast('Welcome to the Shivara Circle. A private welcoming missive has been dispatched to your inbox.');
    });
  }

  /* ========================================================
     12. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ======================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: reveal immediately
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* ========================================================
     13. RENDER COLLECTIONS LIST
     ======================================================== */
  const collectionsGrid = document.getElementById('collectionsGrid');
  if (collectionsGrid && typeof COLLECTIONS !== 'undefined') {
    collectionsGrid.innerHTML = COLLECTIONS.map(col => `
      <div class="collection-card" onclick="Catalog.setCategoryFromCollection('${col.id}')">
        <div class="collection-card-img-wrap">
          <img src="${col.image}" alt="${col.name}" loading="lazy">
          <div class="collection-overlay"></div>
          <div class="collection-shine"></div>
        </div>
        <div class="collection-card-content">
          <div class="collection-badge-tag">${col.count}</div>
          <span class="collection-subtitle">${col.subtitle}</span>
          <h3 class="collection-title">${col.name}</h3>
          <p class="collection-desc">${col.desc}</p>
          <span class="collection-link-text">
            <span>Explore Collection</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </span>
        </div>
      </div>
    `).join('');
  }

  // Quick category switch helper from collection cards
  Catalog.setCategoryFromCollection = (collectionId) => {
    const map = {
      'bridal-necklaces': 'bridal',
      'pearl-necklaces': 'pearl',
      'gold-choker-sets': 'choker',
      'temple-jewellery': 'temple',
      'daily-wear-elegance': 'daily',
      'festive-edit': 'festive'
    };
    const cat = map[collectionId] || 'all';
    Catalog.currentCategory = cat;

    const tabs = document.querySelectorAll('.filter-tab-btn');
    tabs.forEach(t => {
      if (t.getAttribute('data-category') === cat) {
        t.classList.add('is-active');
      } else {
        t.classList.remove('is-active');
      }
    });

    Catalog.renderProducts();

    // Smooth scroll to catalog
    const target = document.getElementById('necklaces');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard accessibility: Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (typeof Cart !== 'undefined') Cart.closeDrawer();
      if (typeof Wishlist !== 'undefined') Wishlist.closeDrawer();
      if (typeof QuickView !== 'undefined') QuickView.close();
      closeMobileMenu();
      closeBridalModal();
      closeCheckout();

      const searchModal = document.getElementById('searchModal');
      const searchOverlay = document.getElementById('searchModalOverlay');
      if (searchModal) searchModal.classList.remove('is-open');
      if (searchOverlay) searchOverlay.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }
  });

});
