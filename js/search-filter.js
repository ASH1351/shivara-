/**
 * SHIVARA BY RIDDHI - Product Search, Filter, Sort & Catalog Renderer
 * Supports category tabs, price range filters, live keyword search,
 * and dynamic multi-currency display.
 */

const Catalog = {
  currentCategory: 'all',
  currentSort: 'featured',
  priceMax: 1000000,
  activeGemstone: 'all',

  init() {
    this.renderProducts();
    this.bindEvents();
    this.bindSearchOverlay();
  },

  getFilteredProducts() {
    let list = [...PRODUCTS];

    // Filter by Category
    if (this.currentCategory !== 'all') {
      list = list.filter(p => p.category === this.currentCategory);
    }

    // Filter by Max Price
    list = list.filter(p => p.priceINR <= this.priceMax);

    // Filter by Gemstone / Material
    if (this.activeGemstone !== 'all') {
      list = list.filter(p => {
        const gem = p.gemstones.toLowerCase();
        const pur = p.purity.toLowerCase();
        if (this.activeGemstone === 'pearl') return gem.includes('pearl');
        if (this.activeGemstone === 'polki') return gem.includes('polki') || pur.includes('kundan');
        if (this.activeGemstone === 'emerald') return gem.includes('emerald');
        if (this.activeGemstone === 'temple') return p.category === 'temple';
        return true;
      });
    }

    // Sorting
    if (this.currentSort === 'price-low') {
      list.sort((a, b) => a.priceINR - b.priceINR);
    } else if (this.currentSort === 'price-high') {
      list.sort((a, b) => b.priceINR - a.priceINR);
    } else if (this.currentSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    } else if (this.currentSort === 'newest') {
      list.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
    }

    return list;
  },

  renderProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;

    const list = this.getFilteredProducts();

    if (list.length === 0) {
      container.innerHTML = `
        <div class="no-products-found">
          <div class="empty-icon-box">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#B8863B" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h3>No Heirlooms Found</h3>
          <p>We could not find pieces matching your exact refinement criteria. Please adjust your price or gemstone filters.</p>
          <button class="gold-btn-outline" onclick="Catalog.resetFilters()">
            <span>Reset All Filters</span>
          </button>
        </div>
      `;
      return;
    }

    let html = '';
    list.forEach(product => {
      const isWishlisted = Wishlist.has(product.id);
      html += `
        <article class="product-card" data-id="${product.id}">
          <div class="product-card-media">
            <span class="product-badge badge-${product.badgeType || 'gold'}">${product.badge}</span>
            
            <button class="wishlist-toggle-btn ${isWishlisted ? 'is-active' : ''}" 
                    data-product-id="${product.id}" 
                    onclick="Wishlist.toggle('${product.id}', this)"
                    aria-label="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
              <svg class="heart-icon" width="20" height="20" viewBox="0 0 24 24" fill="${isWishlisted ? '#B8863B' : 'none'}" stroke="currentColor" stroke-width="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <div class="card-image-wrap" onclick="QuickView.open('${product.id}')">
              <img class="primary-img" src="${product.image}" alt="${product.name}" loading="lazy">
              <img class="hover-img" src="${product.imageHover}" alt="${product.name} lifestyle angle" loading="lazy">
            </div>

            <div class="card-quick-actions">
              <button class="card-quick-view-btn" onclick="QuickView.open('${product.id}')" aria-label="Quick View of ${product.name}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>Quick View</span>
              </button>
            </div>
          </div>

          <div class="product-card-body">
            <div class="product-category-tag">${product.categoryName}</div>
            <h3 class="product-title" onclick="QuickView.open('${product.id}')">${product.name}</h3>
            
            <div class="product-specs-snippet">
              <span>${product.purity.split('(')[0]}</span>
              <span class="dot-sep">•</span>
              <span>${product.grossWeight}</span>
            </div>

            <div class="product-rating-row">
              <div class="stars">
                ${'★'.repeat(5)}
              </div>
              <span class="rating-val">${product.rating.toFixed(1)}</span>
              <span class="reviews-count">(${product.reviewsCount})</span>
            </div>

            <div class="product-price-row">
              <span class="product-price">${formatCurrency(product.priceINR)}</span>
            </div>

            <div class="product-card-buttons">
              <button class="gold-btn-solid add-to-bag-btn" onclick="Cart.addItem('${product.id}', 1)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>Add to Bag</span>
              </button>

              <button class="wa-inquiry-btn" onclick="Catalog.orderPieceOnWhatsApp('${product.id}')" title="Order via WhatsApp" aria-label="Inquire on WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </button>
            </div>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;

    // Sync wishlist hearts
    if (typeof Wishlist !== 'undefined') {
      Wishlist.syncHeartIcons();
    }
  },

  orderPieceOnWhatsApp(productId) {
    const p = PRODUCTS.find(prod => prod.id === productId);
    if (!p) return;
    const price = formatCurrency(p.priceINR);
    const msg = `*INQUIRY: ${p.name.toUpperCase()}*\n` +
      `_Shivara By Riddhi — Tradition Worn With Grace_\n\n` +
      `Hello Atelier Concierge, I would like to inquire about purchasing *${p.name}* (${price}).\n` +
      `Purity: ${p.purity}\n` +
      `Gross Weight: ${p.grossWeight}\n\n` +
      `Please provide certification details and availability. Thank you.`;
    const url = `https://wa.me/919820012345?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  },

  resetFilters() {
    this.currentCategory = 'all';
    this.priceMax = 1000000;
    this.activeGemstone = 'all';
    this.currentSort = 'featured';

    // Reset UI controls
    const tabs = document.querySelectorAll('.filter-tab-btn');
    tabs.forEach(t => t.classList.remove('is-active'));
    const allTab = document.querySelector('.filter-tab-btn[data-category="all"]');
    if (allTab) allTab.classList.add('is-active');

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'featured';

    const priceSlider = document.getElementById('priceRangeSlider');
    if (priceSlider) priceSlider.value = 1000000;
    const priceDisplay = document.getElementById('priceFilterValue');
    if (priceDisplay) priceDisplay.textContent = formatCurrency(1000000);

    const stoneRadios = document.querySelectorAll('input[name="gemstoneFilter"]');
    stoneRadios.forEach(r => r.checked = r.value === 'all');

    this.renderProducts();
  },

  bindEvents() {
    // Filter Tabs
    const tabs = document.querySelectorAll('.filter-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        this.currentCategory = tab.getAttribute('data-category');
        this.renderProducts();
      });
    });

    // Sort Dropdown
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderProducts();
      });
    }

    // Price Slider
    const priceSlider = document.getElementById('priceRangeSlider');
    const priceDisplay = document.getElementById('priceFilterValue');
    if (priceSlider) {
      priceSlider.addEventListener('input', (e) => {
        this.priceMax = parseInt(e.target.value, 10);
        if (priceDisplay) priceDisplay.textContent = formatCurrency(this.priceMax);
        this.renderProducts();
      });
    }

    // Gemstone Radios
    const stoneRadios = document.querySelectorAll('input[name="gemstoneFilter"]');
    stoneRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.activeGemstone = e.target.value;
        this.renderProducts();
      });
    });

    // Reset Filter Button
    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) resetBtn.addEventListener('click', () => this.resetFilters());

    // Filter Drawer Toggle
    const filterOpenBtn = document.getElementById('openFilterDrawerBtn');
    const filterDrawer = document.getElementById('filterDrawer');
    const filterOverlay = document.getElementById('filterDrawerOverlay');
    const filterCloseBtn = document.getElementById('closeFilterDrawerBtn');

    if (filterOpenBtn && filterDrawer) {
      filterOpenBtn.addEventListener('click', () => {
        filterDrawer.classList.add('is-open');
        if (filterOverlay) filterOverlay.classList.add('is-open');
        document.body.classList.add('no-scroll');
      });
    }

    if (filterCloseBtn && filterDrawer) {
      filterCloseBtn.addEventListener('click', () => {
        filterDrawer.classList.remove('is-open');
        if (filterOverlay) filterOverlay.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
      });
    }

    if (filterOverlay && filterDrawer) {
      filterOverlay.addEventListener('click', () => {
        filterDrawer.classList.remove('is-open');
        filterOverlay.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
      });
    }
  },

  bindSearchOverlay() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('headerSearchInput');
    const resultsContainer = document.getElementById('searchResultsContainer');
    const openBtns = document.querySelectorAll('.search-trigger-btn');
    const closeBtn = document.getElementById('closeSearchModalBtn');
    const overlay = document.getElementById('searchModalOverlay');

    const openSearch = () => {
      if (searchModal) {
        searchModal.classList.add('is-open');
        if (overlay) overlay.classList.add('is-open');
        document.body.classList.add('no-scroll');
        setTimeout(() => searchInput && searchInput.focus(), 200);
      }
    };

    const closeSearch = () => {
      if (searchModal) {
        searchModal.classList.remove('is-open');
        if (overlay) overlay.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
      }
    };

    openBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSearch();
    }));

    if (closeBtn) closeBtn.addEventListener('click', closeSearch);
    if (overlay) overlay.addEventListener('click', closeSearch);

    // Live search listener
    if (searchInput && resultsContainer) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length === 0) {
          resultsContainer.innerHTML = `
            <div class="search-empty-prompt">
              <p>Type to search across our heirloom necklace archives...</p>
              <div class="search-suggestions">
                <span>Trending:</span>
                <button class="search-tag" onclick="Catalog.setSearchQuery('Rani Haar')">Rani Haar</button>
                <button class="search-tag" onclick="Catalog.setSearchQuery('Basra Pearls')">Basra Pearls</button>
                <button class="search-tag" onclick="Catalog.setSearchQuery('Polki Choker')">Polki Choker</button>
                <button class="search-tag" onclick="Catalog.setSearchQuery('Temple')">Temple Jewellery</button>
              </div>
            </div>
          `;
          return;
        }

        const matches = PRODUCTS.filter(p => {
          return p.name.toLowerCase().includes(query) ||
                 p.categoryName.toLowerCase().includes(query) ||
                 p.gemstones.toLowerCase().includes(query) ||
                 p.purity.toLowerCase().includes(query) ||
                 p.description.toLowerCase().includes(query);
        });

        if (matches.length === 0) {
          resultsContainer.innerHTML = `
            <div class="search-empty-prompt">
              <p>No jewelry pieces found matching "<strong>${query}</strong>".</p>
              <p class="search-hint">Try searching for "Gold", "Polki", "Pearl", or "Bridal".</p>
            </div>
          `;
          return;
        }

        resultsContainer.innerHTML = `
          <div class="search-results-grid">
            ${matches.map(p => `
              <div class="search-result-item" onclick="QuickView.open('${p.id}'); document.getElementById('searchModal').classList.remove('is-open'); document.getElementById('searchModalOverlay').classList.remove('is-open'); document.body.classList.remove('no-scroll');">
                <div class="search-result-thumb">
                  <img src="${p.image}" alt="${p.name}">
                </div>
                <div class="search-result-info">
                  <span class="search-result-cat">${p.categoryName}</span>
                  <h4 class="search-result-title">${p.name}</h4>
                  <div class="search-result-price">${formatCurrency(p.priceINR)}</div>
                  <span class="search-result-specs">${p.purity}</span>
                </div>
              </div>
            `).join('')}
          </div>
        `;
      });
    }
  },

  setSearchQuery(term) {
    const searchInput = document.getElementById('headerSearchInput');
    if (searchInput) {
      searchInput.value = term;
      searchInput.dispatchEvent(new Event('input'));
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Catalog.init();
});
