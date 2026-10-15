/**
 * SHIVARA BY RIDDHI - Luxury Cart Management System
 * Handles cart state, localStorage persistence, currency calculations,
 * shipping threshold progress, and pre-formatted WhatsApp order generation.
 */

const Cart = {
  items: [],
  STORAGE_KEY: 'shivara_luxury_cart',
  WHATSAPP_NUMBER: '919820012345',

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
  },

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    } catch (e) {
      console.error('Could not save cart:', e);
    }
    this.updateBadges();
  },

  addItem(productId, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = this.items.find(item => item.id === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        priceINR: product.priceINR,
        purity: product.purity,
        image: product.image,
        quantity: quantity
      });
    }

    this.save();
    this.render();
    this.openDrawer();

    // Trigger visual micro-interaction on cart icon
    this.bounceCartIcons();
    showToast(`Added to your Jewelry Bag: ${product.name}`);
  },

  updateQuantity(productId, delta) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(productId, false);
    } else {
      this.save();
      this.render();
    }
  },

  removeItem(productId, showNotification = true) {
    const item = this.items.find(i => i.id === productId);
    const name = item ? item.name : 'Piece';
    this.items = this.items.filter(i => i.id !== productId);
    this.save();
    this.render();
    if (showNotification) {
      showToast(`Removed from Jewelry Bag: ${name}`);
    }
  },

  clearCart() {
    this.items = [];
    this.save();
    this.render();
  },

  getSubtotalINR() {
    return this.items.reduce((total, item) => total + (item.priceINR * item.quantity), 0);
  },

  getTotalItemsCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  },

  updateBadges() {
    const count = this.getTotalItemsCount();
    const badges = document.querySelectorAll('.cart-count-badge');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });

    const subtotalText = document.querySelectorAll('.cart-subtotal-text');
    subtotalText.forEach(el => {
      el.textContent = formatCurrency(this.getSubtotalINR());
    });
  },

  bounceCartIcons() {
    const icons = document.querySelectorAll('.cart-trigger-btn');
    icons.forEach(btn => {
      btn.classList.add('pop-animation');
      setTimeout(() => btn.classList.remove('pop-animation'), 600);
    });
  },

  render() {
    const container = document.getElementById('cartItemsContainer');
    const emptyState = document.getElementById('cartEmptyState');
    const footer = document.getElementById('cartDrawerFooter');
    const countHeader = document.getElementById('cartDrawerCount');

    if (!container) return;

    const totalCount = this.getTotalItemsCount();
    if (countHeader) countHeader.textContent = `(${totalCount} ${totalCount === 1 ? 'piece' : 'pieces'})`;

    if (this.items.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      if (footer) footer.style.display = 'none';
      this.updateBadges();
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (footer) footer.style.display = 'block';

    let html = '';
    this.items.forEach(item => {
      const itemSubtotal = item.priceINR * item.quantity;
      html += `
        <div class="cart-drawer-item" data-id="${item.id}">
          <div class="cart-item-thumb">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
          </div>
          <div class="cart-item-details">
            <div class="cart-item-top">
              <h4 class="cart-item-title">${item.name}</h4>
              <button class="cart-item-remove-btn" onclick="Cart.removeItem('${item.id}')" aria-label="Remove item" title="Remove piece">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            <p class="cart-item-purity">${item.purity}</p>
            <div class="cart-item-bottom">
              <div class="qty-stepper">
                <button class="qty-btn minus" onclick="Cart.updateQuantity('${item.id}', -1)" aria-label="Decrease quantity">−</button>
                <span class="qty-num">${item.quantity}</span>
                <button class="qty-btn plus" onclick="Cart.updateQuantity('${item.id}', 1)" aria-label="Increase quantity">+</button>
              </div>
              <div class="cart-item-price">${formatCurrency(itemSubtotal)}</div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    // Subtotal and shipping
    const subtotal = this.getSubtotalINR();
    const subtotalEl = document.getElementById('cartDrawerSubtotal');
    if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);

    this.updateBadges();
  },

  openDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartDrawerOverlay');
    if (drawer && overlay) {
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.classList.add('no-scroll');
    }
  },

  closeDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartDrawerOverlay');
    if (drawer && overlay) {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }
  },

  bindEvents() {
    const openBtns = document.querySelectorAll('.cart-trigger-btn');
    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    const closeBtn = document.getElementById('closeCartDrawerBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeDrawer());

    const overlay = document.getElementById('cartDrawerOverlay');
    if (overlay) overlay.addEventListener('click', () => this.closeDrawer());

    const waBtn = document.getElementById('cartWhatsAppCheckoutBtn');
    if (waBtn) {
      waBtn.addEventListener('click', () => this.orderOnWhatsApp());
    }

    const checkoutBtn = document.getElementById('cartProceedCheckoutBtn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => this.openCheckoutModal());
    }
  },

  orderOnWhatsApp() {
    if (this.items.length === 0) {
      showToast('Your jewelry bag is currently empty.');
      return;
    }

    const subtotal = formatCurrency(this.getSubtotalINR());
    let message = `*INQUIRY FROM SHIVARA BY RIDDHI WEB ATELIER*\n`;
    message += `_Tradition Worn With Grace_\n\n`;
    message += `I would like to place a bespoke order for the following necklace(s):\n\n`;

    this.items.forEach((item, idx) => {
      message += `${idx + 1}. *${item.name}*\n`;
      message += `   • Quantity: ${item.quantity}\n`;
      message += `   • Price: ${formatCurrency(item.priceINR * item.quantity)}\n`;
      message += `   • Details: ${item.purity}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `*Total Order Value:* ${subtotal}\n`;
    message += `*Packaging:* Signature Ivory & Gold Velvet Keepsake Casket\n`;
    message += `*Delivery:* White-Glove Insured Delivery\n\n`;
    message += `Please confirm the availability, certificate dossiers, and delivery dispatch timeline. Thank you.`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${this.WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank');
  },

  openCheckoutModal() {
    this.closeDrawer();
    const modal = document.getElementById('checkoutModal');
    if (modal) {
      const summaryEl = document.getElementById('checkoutOrderSummaryList');
      const totalEl = document.getElementById('checkoutTotalValue');
      if (summaryEl) {
        summaryEl.innerHTML = this.items.map(item => `
          <div class="checkout-summary-row">
            <span>${item.name} (x${item.quantity})</span>
            <span>${formatCurrency(item.priceINR * item.quantity)}</span>
          </div>
        `).join('');
      }
      if (totalEl) totalEl.textContent = formatCurrency(this.getSubtotalINR());

      modal.classList.add('is-open');
      document.body.classList.add('no-scroll');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Cart.init();
});
