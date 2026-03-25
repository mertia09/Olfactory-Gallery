/**
 * THE OLFACTORY GALLERY - SHARED APPLICATION LAYER
 *
 * Shared functionality:
 * - Dark mode and animations
 * - Shared product catalog
 * - Cart storage helpers and cart badge sync
 * - Search flow between pages
 * - Collection filtering and price injection
 */

const PRODUCTS_DB = {
    1: { name: 'Sandalwood Essence', category: 'Woody', price: 2999, image: 'https://images.pexels.com/photos/5632397/pexels-photo-5632397.jpeg', description: 'Warm sandalwood with oud base' },
    2: { name: 'Cedar Cologne', category: 'Woody', price: 2599, image: 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg', description: 'Fresh cedar with vetiver' },
    3: { name: 'Vetiver Trail', category: 'Woody', price: 2799, image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg', description: 'Earthy vetiver with myrrh' },
    4: { name: 'Timber Reserve', category: 'Woody', price: 3199, image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg', description: 'Rich wood blend with amber' },
    5: { name: 'Rose Bloom', category: 'Floral', price: 3299, image: 'https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg', description: 'Damask rose with white musk' },
    6: { name: 'Jasmine Night', category: 'Floral', price: 3199, image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg', description: 'Exotic jasmine with vanilla' },
    7: { name: 'Peony Garden', category: 'Floral', price: 2899, image: 'https://images.pexels.com/photos/5632403/pexels-photo-5632403.jpeg', description: 'Fresh peony with green notes' },
    8: { name: 'Orchid Silk', category: 'Floral', price: 3499, image: 'https://images.pexels.com/photos/5632404/pexels-photo-5632404.jpeg', description: 'Delicate orchid with silk musk' },
    9: { name: 'Citrus Zest', category: 'Fresh', price: 2499, image: 'https://images.pexels.com/photos/5632405/pexels-photo-5632405.jpeg', description: 'Bright lemon and bergamot' },
    10: { name: 'Aquatic Wave', category: 'Fresh', price: 2699, image: 'https://images.pexels.com/photos/5632406/pexels-photo-5632406.jpeg', description: 'Fresh water with sea salt' },
    11: { name: 'Herbal Breeze', category: 'Fresh', price: 2399, image: 'https://images.pexels.com/photos/5632407/pexels-photo-5632407.jpeg', description: 'Mint and eucalyptus blend' },
    12: { name: 'Green Tea', category: 'Fresh', price: 2299, image: 'https://images.pexels.com/photos/5632408/pexels-photo-5632408.jpeg', description: 'Light green tea with ginger' },
    13: { name: 'Amber Dynasty', category: 'Oriental', price: 3599, image: 'https://images.pexels.com/photos/5632409/pexels-photo-5632409.jpeg', description: 'Warm amber with oud' },
    14: { name: 'Musk Veil', category: 'Oriental', price: 3399, image: 'https://images.pexels.com/photos/5632410/pexels-photo-5632410.jpeg', description: 'Sensual musk with rose' },
    15: { name: 'Vanilla Romance', category: 'Oriental', price: 2999, image: 'https://images.pexels.com/photos/5632411/pexels-photo-5632411.jpeg', description: 'Sweet vanilla with tonka' },
    16: { name: 'Spice Luxe', category: 'Oriental', price: 3199, image: 'https://images.pexels.com/photos/5632412/pexels-photo-5632412.jpeg', description: 'Cinnamon and spice blend' },
    17: { name: 'Lavender Dream', category: 'Aromatic', price: 2399, image: 'https://images.pexels.com/photos/5632413/pexels-photo-5632413.jpeg', description: 'Soft lavender with chamomile' },
    18: { name: 'Mint Refresh', category: 'Aromatic', price: 2299, image: 'https://images.pexels.com/photos/5632414/pexels-photo-5632414.jpeg', description: 'Invigorating mint fusion' },
    19: { name: 'Spice Note', category: 'Aromatic', price: 2599, image: 'https://images.pexels.com/photos/5632415/pexels-photo-5632415.jpeg', description: 'Clove and cardamom blend' },
    20: { name: 'Rosemary Grace', category: 'Aromatic', price: 2499, image: 'https://images.pexels.com/photos/5632416/pexels-photo-5632416.jpeg', description: 'Herbaceous rosemary mix' },
    101: { name: 'Spring Essence', category: 'Seasoned Deals', price: 89, image: 'https://images.pexels.com/photos/1961781/pexels-photo-1961781.jpeg', description: 'Fresh floral collection with delicate notes.', originalPrice: 129 },
    102: { name: 'Summer Spice', category: 'Seasoned Deals', price: 99, image: 'https://images.pexels.com/photos/247113/anise-spices-seeds-sprockets-247113.jpeg', description: 'Warm and aromatic oriental blend.', originalPrice: 149 },
    103: { name: 'Autumn Wood', category: 'Seasoned Deals', price: 109, image: 'https://images.pexels.com/photos/345522/pexels-photo-345522.jpeg', description: 'Deep woody notes with earthy undertones.', originalPrice: 159 },
    104: { name: 'Winter Luxury', category: 'Seasoned Deals', price: 149, image: 'https://images.pexels.com/photos/4857813/pexels-photo-4857813.jpeg', description: 'Premium gift set with exclusive bottle.', originalPrice: 229 }
};

window.PRODUCTS_DB = PRODUCTS_DB;

function formatPrice(price, currency = '₹') {
    return `${currency}${price}`;
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cartItems) {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}

function updateCartCountDisplay() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('#cartCount');

    badges.forEach((badge) => {
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.classList.remove('hidden');
            badge.classList.add('flex');
        } else {
            badge.textContent = '0';
            badge.classList.add('hidden');
            badge.classList.remove('flex');
        }
    });
}

function addToCart(id, name, category, price) {
    const product = PRODUCTS_DB[id] || { name, category, price };
    const cart = getCart();
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name: product.name || name,
            category: product.category || category,
            price: product.price ?? price,
            quantity: 1,
            image: product.image || '',
            description: product.description || ''
        });
    }

    saveCart(cart);
    updateCartCountDisplay();
}

function goToCart() {
    document.documentElement.style.opacity = '0.8';
    setTimeout(() => {
        window.location.href = 'Cart.html';
    }, 200);
}

window.addToCart = addToCart;
window.goToCart = goToCart;

function initDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);

    if (isDark) {
        document.documentElement.classList.add('dark');
    }

    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (themeToggle) {
        themeToggle.addEventListener('click', (event) => {
            toggleThemeWithWave(event.currentTarget);
        });
    }
}

function toggleThemeWithWave(trigger) {
    const nextIsDark = !document.documentElement.classList.contains('dark');
    const rect = trigger.getBoundingClientRect();
    const originX = rect.left + (rect.width / 2);
    const originY = rect.top + (rect.height / 2);
    const maxRadius = Math.hypot(
        Math.max(originX, window.innerWidth - originX),
        Math.max(originY, window.innerHeight - originY)
    );

    const wave = document.createElement('div');
    wave.className = `theme-wave ${nextIsDark ? 'is-dark' : 'is-light'}`;
    wave.style.setProperty('--wave-x', `${originX}px`);
    wave.style.setProperty('--wave-y', `${originY}px`);
    document.body.appendChild(wave);

    requestAnimationFrame(() => {
        wave.style.clipPath = `circle(${maxRadius}px at ${originX}px ${originY}px)`;
    });

    window.setTimeout(() => {
        document.documentElement.classList.toggle('dark', nextIsDark);
        localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
    }, 180);

    window.setTimeout(() => {
        wave.style.opacity = '0';
    }, 560);

    window.setTimeout(() => {
        wave.remove();
    }, 820);
}

function initScrollReveal() {
    const revealItems = document.querySelectorAll('.reveal-on-scroll');
    if (!revealItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealItems.forEach((el) => observer.observe(el));
}

function initHeroAnimation() {
    const heroImg = document.getElementById('hero-perfume-img');
    if (!heroImg) return;

    let ticking = false;

    const updateHero = () => {
        const scrollPos = window.scrollY;
        const fadeEnd = window.innerHeight * 0.8;
        const opacity = Math.max(0, Math.min(1, 1 - (scrollPos / fadeEnd)));
        const scale = 1 + (scrollPos / 5000);

        heroImg.style.opacity = opacity;
        heroImg.style.transform = `scale(${scale})`;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHero);
            ticking = true;
        }
    }, { passive: true });
}

function initMagneticButtons() {
    return;
}

function initImageFallbacks() {
    document.querySelectorAll('img').forEach((img) => {
        img.addEventListener('error', function handleImageError() {
            this.style.backgroundColor = this.id === 'hero-perfume-img' ? '#f0eee8' : '#e5e2dc';
            this.style.opacity = '0.8';
        });

        if (img.src && (img.src.includes('unsplash') || img.src.includes('pexels') || img.src.includes('googleusercontent'))) {
            const timeout = setTimeout(() => {
                if (!img.complete || img.naturalHeight === 0) {
                    img.onerror && img.onerror();
                }
            }, 5000);

            img.addEventListener('load', () => clearTimeout(timeout));
        }
    });
}

function initDynamicAddToCartButtons() {
    document.querySelectorAll('[data-add-to-cart]').forEach((button) => {
        button.addEventListener('click', () => {
            const id = Number(button.dataset.productId);
            const product = PRODUCTS_DB[id];
            if (!product) return;

            addToCart(id, product.name, product.category, product.price);

            const originalLabel = button.dataset.originalLabel || button.textContent.trim();
            button.dataset.originalLabel = originalLabel;
            button.textContent = 'Added to Cart';
            window.setTimeout(() => {
                button.textContent = originalLabel;
            }, 1200);
        });
    });
}

function runSearch(query) {
    const cleanedQuery = (query || '').trim();
    if (!cleanedQuery) return;

    const searchParams = new URLSearchParams();
    searchParams.set('search', cleanedQuery);
    window.location.href = `inventory.html?${searchParams.toString()}`;
}

function initSearch() {
    const input = document.querySelector('[data-search-input]');
    const button = document.querySelector('[data-search-button]');
    if (!input || !button) return;

    button.addEventListener('click', () => runSearch(input.value));
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            runSearch(input.value);
        }
    });
}

function initInventoryCards() {
    const productButtons = document.querySelectorAll('button[onclick^="addToCart("]');
    if (!productButtons.length) return;

    productButtons.forEach((button) => {
        const onclick = button.getAttribute('onclick') || '';
        const match = onclick.match(/addToCart\((\d+)/);
        if (!match) return;

        const id = Number(match[1]);
        const product = PRODUCTS_DB[id];
        const card = button.closest('[class*="aspect-[3/4]"]');
        if (!product || !card) return;

        card.dataset.productCard = 'true';
        card.dataset.productName = product.name;
        card.dataset.productCategory = product.category;
        card.dataset.productDescription = product.description || '';

        const content = button.previousElementSibling;
        if (content && !content.querySelector('[data-product-price]')) {
            const price = document.createElement('p');
            price.dataset.productPrice = 'true';
            price.className = 'text-sm text-secondary font-semibold mt-2';
            price.textContent = formatPrice(product.price);
            content.appendChild(price);
        }

        button.setAttribute('data-add-to-cart', '');
        button.dataset.productId = String(id);
        button.removeAttribute('onclick');

        const sectionGroup = card.closest('.grid.grid-cols-1.lg\\:grid-cols-12');
        if (sectionGroup) {
            sectionGroup.dataset.productGroup = 'true';
        }
    });
}

function applyInventorySearchFilter() {
    const searchSummary = document.querySelector('[data-search-summary]');
    const searchInput = document.querySelector('[data-search-input]');
    const params = new URLSearchParams(window.location.search);
    const search = (params.get('search') || '').trim().toLowerCase();
    const cards = document.querySelectorAll('[data-product-card]');

    if (!cards.length) return;
    if (searchInput && search) {
        searchInput.value = params.get('search') || '';
    }

    let visibleCount = 0;

    cards.forEach((card) => {
        const haystack = [
            card.dataset.productName,
            card.dataset.productCategory,
            card.dataset.productDescription
        ].join(' ').toLowerCase();

        const isMatch = !search || haystack.includes(search);
        card.classList.toggle('hidden', !isMatch);
        if (isMatch) visibleCount += 1;
    });

    document.querySelectorAll('[data-product-group]').forEach((group) => {
        const visibleChildren = group.querySelectorAll('[data-product-card]:not(.hidden)');
        group.classList.toggle('hidden', visibleChildren.length === 0);
    });

    if (searchSummary) {
        if (search) {
            searchSummary.textContent = visibleCount > 0
                ? `Showing ${visibleCount} result${visibleCount === 1 ? '' : 's'} for "${params.get('search')}"`
                : `No products found for "${params.get('search')}"`;
        } else {
            searchSummary.textContent = 'Discover our curated selection of premium fragrances organized by fragrance family, origin, and formulation concentration.';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initScrollReveal();
    initHeroAnimation();
    initMagneticButtons();
    initImageFallbacks();
    initInventoryCards();
    initDynamicAddToCartButtons();
    initSearch();
    updateCartCountDisplay();
    applyInventorySearchFilter();
});
