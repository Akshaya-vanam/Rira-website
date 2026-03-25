// ── PRODUCT DATA ───────────────────────────────────────
const products = [
  {
    id: 'p1',
    name: 'Neel Pearl Blossom Set',
    fabric: 'Mul Chanderi',
    price: 4500,
    image: 'images/blue emb.jpg',
    tag: 'Bestseller'
  },
  {
    id: 'p2',
    name: 'Indigo Garden Tunic',
    fabric: 'Mul Chanderi',
    price: 3200,
    image: 'images/blue lay.jpg',
    tag: 'New Arrival'
  },
  {
    id: 'p3',
    name: 'Blush Magnolia Kurta',
    fabric: 'Mul Chanderi',
    price: 4200,
    image: 'images/blush magnolia.jpg',
    tag: null
  },
  {
    id: 'p4',
    name: 'Plum Zari Anarkali',
    fabric: 'Mul Chanderi',
    price: 4800,
    image: 'images/plum.jpg',
    tag: 'Bestseller'
  },
  {
    id: 'p5',
    name: 'Terra Elephant Tunic',
    fabric: 'Mul Chanderi',
    price: 4000,
    image: 'images/rose and rust.jpg',
    tag: 'Limited'
  },
  {
    id: 'p6',
    name: 'Olive Zari Peplum Set',
    fabric: 'Mul Chanderi',
    price: 3900,
    image: 'images/olive.jpg',
    tag: null
  },
  {
    id: 'p7',
    name: 'Sapphire Pearl Kurta Set',
    fabric: 'Mul Chanderi',
    price: 4500,
    image: 'images/rust.jpg',
    tag: 'New Arrival'
  },
  {
    id: 'p8',
    name: 'Rust Pintuck Anarkali',
    fabric: 'Mul Chanderi',
    price: 4600,
    image: 'images/yellow.jpg',
    tag: 'Bestseller'
  },
  {
    id: 'p9',
    name: 'Lime Wildflower Coord',
    fabric: 'Mul Chanderi',
    price: 3800,
    image: 'images/lime coord.jpg',
    tag: 'Limited'
  },
  {
    id: 'p10',
    name: 'Mint Snowflake Kurta',
    fabric: 'Mul Chanderi',
    price: 3500,
    image: 'images/yellow2.jpg',
    tag: 'New Arrival'
  },
  {
    id: 'p11',
    name: 'Rose Safari Coord',
    fabric: 'Mul Chanderi',
    price: 4800,
    image: 'images/orange.jpg',
    tag: null
  }
];

// ── RENDER PRODUCT GRID ────────────────────────────────
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  grid.innerHTML = products.map(p => `
    <div class="product-card reveal">
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy"/>
        ${p.tag ? `<div class="product-tag">${p.tag}</div>` : ''}
        <button class="product-add-btn"
          onclick="addToCart('${p.id}','${p.name}',${p.price},'${p.image}')">
          Add to Cart
        </button>
      </div>
      <div class="product-name">${p.name}</div>
      <div class="product-fabric">${p.fabric} · XS–3XL</div>
      <div class="product-price">₹${p.price.toLocaleString()}</div>
    </div>
  `).join('');

  observeReveal();
}

// ── CART STATE ─────────────────────────────────────────
let cart = [];

// ── ADD TO CART ────────────────────────────────────────
function addToCart(id, name, price, image) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, image, qty: 1 });
  }
  updateCartCount();
  renderCart();
  openCart();
}

// ── REMOVE FROM CART ───────────────────────────────────
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartCount();
  renderCart();
}

// ── CHANGE QUANTITY ────────────────────────────────────
function changeQty(id, delta) {
  const item = cart.find(item => item.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    updateCartCount();
    renderCart();
  }
}

// ── UPDATE BADGE ───────────────────────────────────────
function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  }
}

// ── CART TOTAL ─────────────────────────────────────────
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// ── RENDER CART ────────────────────────────────────────
function renderCart() {
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <p>Your cart is empty</p>
        <span>Add something beautiful</span>
      </div>`;
    if (totalEl) totalEl.textContent = '₹0';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}"/>
      </div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">
          ₹${(item.price * item.qty).toLocaleString()}
        </div>
        <div class="cart-item-qty">
          <button onclick="changeQty('${item.id}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.id}', 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove"
        onclick="removeFromCart('${item.id}')">✕</button>
    </div>
  `).join('');

  if (totalEl) totalEl.textContent = '₹' + getCartTotal().toLocaleString();
}

// ── CART OPEN / CLOSE ──────────────────────────────────
function openCart() {
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('cart-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── SCROLL REVEAL ──────────────────────────────────────
function observeReveal() {
  const reveals = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(el => observer.observe(el));
}

// ── OPEN CHECKOUT ──────────────────────────────────────
function openCheckout() {
  closeCart();  // close cart first
  document.getElementById('checkout-modal').classList.add('open');
  document.getElementById('checkout-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderSummary();  // fill in the order summary
}

// ── CLOSE CHECKOUT ─────────────────────────────────────
function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('open');
  document.getElementById('checkout-overlay').classList.remove('open');
  document.body.style.overflow = '';
  openCart();  // go back to cart
}

// ── RENDER ORDER SUMMARY ───────────────────────────────
function renderSummary() {
  const container  = document.getElementById('summary-items');
  const subtotalEl = document.getElementById('summary-subtotal');
  const totalEl    = document.getElementById('summary-total');
  if (!container) return;

  container.innerHTML = cart.map(item => `
    <div class="summary-item">
      <div class="summary-item-img">
        <img src="${item.image}" alt="${item.name}"/>
      </div>
      <div>
        <div class="summary-item-name">${item.name}</div>
        <div class="summary-item-qty">Qty: ${item.qty}</div>
      </div>
      <div class="summary-item-price">
        ₹${(item.price * item.qty).toLocaleString()}
      </div>
    </div>
  `).join('');

  const total = getCartTotal();
  if (subtotalEl) subtotalEl.textContent = '₹' + total.toLocaleString();
  if (totalEl)    totalEl.textContent    = '₹' + total.toLocaleString();
}

// ── SIZE SELECTION ─────────────────────────────────────
function selectSize(btn) {
  // remove active from all size buttons
  document.querySelectorAll('.size-btn')
    .forEach(b => b.classList.remove('active'));
  // add active to the clicked one
  btn.classList.add('active');
}

// ── PLACE ORDER ────────────────────────────────────────
function placeOrder() {
  // check all required fields are filled
  const required = [
    'input-email', 'input-phone', 'input-name',
    'input-address', 'input-city', 'input-pin', 'input-state'
  ];

  let valid = true;
  required.forEach(id => {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = 'var(--terracotta)';  // highlight empty fields
      valid = false;
    } else {
      el.style.borderColor = '';
    }
  });

  if (!valid) {
    alert('Please fill in all required fields.');
    return;
  }

  // close checkout, show success
  document.getElementById('checkout-modal').classList.remove('open');
  document.getElementById('checkout-overlay').classList.remove('open');
  document.getElementById('success-overlay').classList.add('open');

  // clear the cart
  cart = [];
  updateCartCount();
  renderCart();
}

// ── CLOSE SUCCESS ──────────────────────────────────────
function closeSuccess() {
  document.getElementById('success-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── INIT ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  observeReveal();
});