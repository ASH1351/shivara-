/**
 * SHIVARA BY RIDDHI - Luxury Product Quick View Modal
 * Multi-angle image switcher, craftsmanship specs table, WhatsApp order & bag actions.
 */

const QuickView = {
  activeProductId: null,
  quantity: 1,

  init() {
    this.bindEvents();
  },

  open(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    this.activeProductId = productId;
    this.quantity = 1;

    const modal = document.getElementById('quickViewModal');
    if (!modal) return;

    // Populate data
    const mainImg = document.getElementById('qvMainImage');
    const thumbContainer = document.getElementById('qvThumbnails');
    const badge = document.getElementById('qvBadge');
    const title = document.getElementById('qvTitle');
    const category = document.getElementById('qvCategory');
    const price = document.getElementById('qvPrice');
    const desc = document.getElementById('qvDescription');
    const purity = document.getElementById('qvPurity');
    const grossWeight = document.getElementById('qvGrossWeight');
    const netWeight = document.getElementById('qvNetWeight');
    const gemstones = document.getElementById('qvGemstones');
    const certification = document.getElementById('qvCertification');
    const closure = document.getElementById('qvClosure');
    const qtyVal = document.getElementById('qvQtyValue');

    if (mainImg) mainImg.src = product.image;
    if (badge) {
      badge.textContent = product.badge;
      badge.className = `product-badge badge-${product.badgeType || 'gold'}`;
    }
    if (title) title.textContent = product.name;
    if (category) category.textContent = product.categoryName;
    if (price) price.textContent = formatCurrency(product.priceINR);
    if (desc) desc.textContent = product.description;
    if (purity) purity.textContent = product.purity;
    if (grossWeight) grossWeight.textContent = product.grossWeight;
    if (netWeight) netWeight.textContent = product.netGoldWeight;
    if (gemstones) gemstones.textContent = product.gemstones;
    if (certification) certification.textContent = product.certification;
    if (closure) closure.textContent = product.closure;
    if (qtyVal) qtyVal.textContent = '1';

    // Populate thumbnails
    if (thumbContainer) {
      thumbContainer.innerHTML = product.gallery.map((imgUrl, idx) => `
        <button class="qv-thumb-btn ${idx === 0 ? 'is-active' : ''}" onclick="QuickView.switchImage('${imgUrl}', this)">
          <img src="${imgUrl}" alt="${product.name} angle ${idx + 1}">
        </button>
      `).join('');
    }

    // Sync wishlist button in Quick View
    const qvWishBtn = document.getElementById('qvWishlistBtn');
    if (qvWishBtn) {
      if (Wishlist.has(product.id)) {
        qvWishBtn.classList.add('is-active');
      } else {
        qvWishBtn.classList.remove('is-active');
      }
    }

    modal.classList.add('is-open');
    document.body.classList.add('no-scroll');
  },

  switchImage(imgUrl, clickedThumb) {
    const mainImg = document.getElementById('qvMainImage');
    if (mainImg) {
      mainImg.style.opacity = '0.3';
      setTimeout(() => {
        mainImg.src = imgUrl;
        mainImg.style.opacity = '1';
      }, 150);
    }
    const allThumbs = document.querySelectorAll('.qv-thumb-btn');
    allThumbs.forEach(t => t.classList.remove('is-active'));
    if (clickedThumb) clickedThumb.classList.add('is-active');
  },

  changeQty(delta) {
    this.quantity = Math.max(1, this.quantity + delta);
    const qtyVal = document.getElementById('qvQtyValue');
    if (qtyVal) qtyVal.textContent = this.quantity;
  },

  addToBag() {
    if (!this.activeProductId) return;
    Cart.addItem(this.activeProductId, this.quantity);
    this.close();
  },

  orderOnWhatsApp() {
    const product = PRODUCTS.find(p => p.id === this.activeProductId);
    if (!product) return;

    const price = formatCurrency(product.priceINR * this.quantity);
    let msg = `*BESPOKE INQUIRY - SHIVARA BY RIDDHI*\n`;
    msg += `_Tradition Worn With Grace_\n\n`;
    msg += `I am interested in acquiring this necklace:\n`;
    msg += `• *Piece:* ${product.name}\n`;
    msg += `• *Purity:* ${product.purity}\n`;
    msg += `• *Quantity:* ${this.quantity}\n`;
    msg += `• *Estimated Value:* ${price}\n`;
    msg += `• *Gemstones:* ${product.gemstones}\n\n`;
    msg += `Could your atelier concierge please share high-definition video of the piece, certification dossier details, and dispatch timeframe?\n`;
    msg += `Reference ID: ${product.id.toUpperCase()}`;

    const url = `https://wa.me/919820012345?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  },

  toggleWishlist() {
    if (!this.activeProductId) return;
    const btn = document.getElementById('qvWishlistBtn');
    Wishlist.toggle(this.activeProductId, btn);
    if (btn) {
      if (Wishlist.has(this.activeProductId)) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    }
  },

  close() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
      modal.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    }
    this.activeProductId = null;
  },

  bindEvents() {
    const closeBtn = document.getElementById('closeQuickViewBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const overlay = document.getElementById('quickViewOverlay');
    if (overlay) overlay.addEventListener('click', () => this.close());

    const addBagBtn = document.getElementById('qvAddToBagBtn');
    if (addBagBtn) addBagBtn.addEventListener('click', () => this.addToBag());

    const waBtn = document.getElementById('qvWhatsAppBtn');
    if (waBtn) waBtn.addEventListener('click', () => this.orderOnWhatsApp());

    const wishBtn = document.getElementById('qvWishlistBtn');
    if (wishBtn) wishBtn.addEventListener('click', () => this.toggleWishlist());
  }
};

document.addEventListener('DOMContentLoaded', () => {
  QuickView.init();
});
