/**
 * SHIVARA BY RIDDHI - Luxury Wishlist Management System
 * Handles saved heirlooms, localStorage persistence, heart micro-animations,
 * and direct transfer to shopping bag.
 */

const Wishlist = {
  items: [],
  STORAGE_KEY: 'shivara_luxury_wishlist',

  init() {
    this.load();
    this.bindEvents();
    this.render();
  },

  load() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      this.items = saved ? JSON.parse(saved) : [];
    } catch (e) {
      this.items = [];
    }
    this.updateBadges();
  },

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.error('Could not save wishlist:', e);
    }
    this.updateBadges();
    this.syncHeartIcons();
  },

  has(productId) {
    return this.items.some(id => id === productId);
  },

  toggle(productId, targetHeartBtn = null) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const index = this.items.indexOf(productId);
    if (index > -1) {
      this.items.splice(index, 1);
      showToast(`Removed from Wishlist: ${product.name}`);
    } else {
      this.items.push(productId);
      showToast(`Saved to Wishlist: ${product.name}`);
      if (targetHeartBtn) {
        targetHeartBtn.classList.add('heart-pop-anim');
        setTimeout(() => targetHeartBtn.classList.remove('heart-pop-anim'), 600);
      }
    }

    this.save();
    this.render();
  },

  remove(productId) {
    this.items = this.items.filter(id => id !== productId);
    this.save();
    this.render();
  },

  moveToCart(productId) {
    Cart.addItem(productId, 1);
    this.remove(productId);
  },

  updateBadges() {
    const count = this.items.length;
    const badges = document.querySelectorAll('.wishlist-count-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  },

  syncHeartIcons() {
    const heartBtns = document.querySelectorAll('.wishlist-toggle-btn');
    heartBtns.forEach(btn => {
      const pid = btn.getAttribute('data-product-id');
      if (this.has(pid)) {
        btn.classList.add('is-active');
        btn.setAttribute('aria-label', 'Remove from Wishlist');
      } else {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-label', 'Add to Wishlist');
      }
    });
  },

  render() {
    const container = document.getElementById('wishlistItemsContainer');
    const emptyState = document.getElementById('wishlistEmptyState');
    const countHeader = document.getElementById('wishlistDrawerCount');

    if (!container) return;

    const count = this.items.length;
    if (countHeader) countHeader.textContent = `(${count} ${count === 1 ? 'heirloom' : 'heirlooms'})`;

    if (count === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      this.updateBadges();
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    let html = '';
    this.items.forEach(pid => {
      const product = PRODUCTS.find(p => p.id === pid);
      if (!product) return;

      html += `
        <div class="wishlist-drawer-item">
          <div class="wishlist-item-thumb">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
          </div>
          <div class="wishlist-item-info">
            <h4 class="wishlist-item-title">${product.name}</h4>
            <p class="wishlist-item-purity">${product.purity}</p>
            <div class="wishlist-item-price">${formatCurrency(product.priceINR)}</div>
            <div class="wishlist-item-actions">
              <button class="gold-btn-sm" onclick="Wishlist.moveToCart('${product.id}')">
                <span>Move to Bag</span>
              </button>
              <button class="wishlist-item-remove" onclick="Wishlist.remove('${product.id}')" aria-label="Remove piece">
                Remove
              </button>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    this.updateBadges();
  },

  openDrawer() {
    const drawer = document.getElementById('wishlistDrawer');
    const overlay = document.getElementById('wishlistDrawerOverlay');
    if (drawer && overlay) {
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.classList.add('no-scroll');
    }
  },

  closeDrawer() {
    const drawer = document.getElementById('wishlistDrawer');
    const overlay = document.getElementById('wishlistDrawerOverlay');
    if (drawer && overlay) {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }
  },

  bindEvents() {
    const openBtns = document.querySelectorAll('.wishlist-trigger-btn');
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    const closeBtn = document.getElementById('closeWishlistDrawerBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeDrawer());

    const overlay = document.getElementById('wishlistDrawerOverlay');
    if (overlay) overlay.addEventListener('click', () => this.closeDrawer());
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Wishlist.init();
});
