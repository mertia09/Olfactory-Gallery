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

const MATERIAL_ICON_FALLBACKS = {
    add: '<path d="M12 5v14M5 12h14"/>',
    arrow_back: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    arrow_forward: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>',
    boxes: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
    check: '<path d="m20 6-11 11-5-5"/>',
    check_circle: '<path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10Z"/><path d="m9 12 2 2 4-4"/>',
    dark_mode: '<path d="M21 12.79A9 9 0 1 1 11.21 3c0 .34-.02.67-.02 1a7 7 0 0 0 7 7c.33 0 .66-.02 1-.06.32-.03.61.24.61.56 0 .1-.02.2-.06.29Z"/>',
    delete: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',
    eco: '<path d="M6 20c8 0 12-6 12-14-8 0-12 6-12 14Z"/><path d="M6 20c0-6 4-10 8-12"/>',
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    insights: '<path d="M4 19V9"/><path d="M10 19V5"/><path d="M16 19v-8"/><path d="M22 19v-4"/>',
    language: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/>',
    local_florist: '<path d="M12 22c4-3.5 6-6.8 6-10a3 3 0 0 0-6 0 3 3 0 0 0-6 0c0 3.2 2 6.5 6 10Z"/><circle cx="12" cy="10" r="2.2"/><path d="M12 12v10"/>',
    local_shipping: '<path d="M14 16H9"/><path d="M1 3h15v13H1Z"/><path d="M16 8h4l3 3v5h-7Z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
    location_on: '<path d="M12 21s-6-5.33-6-11a6 6 0 0 1 12 0c0 5.67-6 11-6 11Z"/><circle cx="12" cy="10" r="2.5"/>',
    mail: '<path d="M4 6h16v12H4Z"/><path d="m4 8 8 6 8-6"/>',
    palette: '<path d="M12 3a9 9 0 0 0 0 18h1.2a1.8 1.8 0 0 0 0-3.6H12a1.5 1.5 0 0 1 0-3 6 6 0 1 0 0-12Z"/><circle cx="7.5" cy="10" r="1"/><circle cx="10.5" cy="7" r="1"/><circle cx="15.5" cy="7.5" r="1"/><circle cx="17" cy="12" r="1"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.78.59 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.25a2 2 0 0 1 2.11-.45c.84.27 1.72.47 2.62.59A2 2 0 0 1 22 16.92Z"/>',
    public: '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z"/><path d="M2 12h20"/><path d="M12 2c2.8 2.7 4.5 6.2 4.5 10S14.8 19.3 12 22"/><path d="M12 2C9.2 4.7 7.5 8.2 7.5 12S9.2 19.3 12 22"/>',
    remove: '<path d="M5 12h14"/>',
    science: '<path d="M9 3h6"/><path d="M10 3v5l-5.5 9.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3.5L14 8V3"/><path d="M8.5 13h7"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a2 2 0 1 1-4 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a2 2 0 1 1 0-4h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a2 2 0 1 1 4 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a2 2 0 1 1 0 4h-.2a1 1 0 0 0-.9.6Z"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 3.9"/><path d="m15.4 6.6-6.8 3.8"/>',
    shopping_bag: '<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 1 1 6 0"/>',
    shopping_cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 4h2l2.1 10.2a1 1 0 0 0 1 .8H19a1 1 0 0 0 1-.8L22 7H7"/>',
    star: '<path d="m12 2.7 2.9 5.88 6.49.95-4.69 4.58 1.11 6.47L12 17.53l-5.81 3.05 1.11-6.47L2.61 9.53l6.49-.95L12 2.7Z"/>',
    verified: '<path d="m9 12 2 2 4-4"/><path d="M12 3l2.5 1.2 2.8.3 1.2 2.5 2 2-1 2.7.3 2.8-2.5 1.2-2 2-2.8-.3L12 21l-2.5-1.2-2.8-.3-1.2-2.5-2-2 1-2.7-.3-2.8 2.5-1.2 2-2 2.8.3L12 3Z"/>',
    verified_user: '<path d="M12 3 5 6v5c0 5 3.5 9.7 7 11 3.5-1.3 7-6 7-11V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>'
};

function createMaterialIconSvg(iconName, outlined = true) {
    const pathMarkup = MATERIAL_ICON_FALLBACKS[iconName];
    if (!pathMarkup) return null;

    const strokeIcons = new Set([
        'add', 'arrow_back', 'arrow_forward', 'boxes', 'check', 'check_circle', 'delete',
        'eco', 'home', 'insights', 'language', 'local_shipping', 'location_on', 'mail',
        'palette', 'phone', 'public', 'remove', 'science', 'search', 'settings', 'share',
        'shopping_cart', 'verified', 'verified_user'
    ]);

    const useStroke = outlined && strokeIcons.has(iconName);
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = pathMarkup;

    if (useStroke) {
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '1.8');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
    } else {
        svg.setAttribute('fill', 'currentColor');
    }

    return svg;
}

function applyMaterialIconFallback() {
    document.querySelectorAll('.material-symbols-outlined').forEach((iconEl) => {
        if (iconEl.dataset.iconFallback === 'true') return;

        const iconName = (iconEl.dataset.icon || iconEl.textContent || '').trim();
        const svg = createMaterialIconSvg(iconName, !iconEl.classList.contains('filled'));
        if (!svg) return;

        iconEl.dataset.icon = iconName;
        iconEl.dataset.iconFallback = 'true';
        iconEl.setAttribute('aria-hidden', 'true');
        iconEl.replaceChildren(svg);
    });
}

function initMaterialIconFallback() {
    const iconNodes = document.querySelectorAll('.material-symbols-outlined');
    if (!iconNodes.length) return;

    const observeNewIcons = () => {
        const observer = new MutationObserver((mutations) => {
            const hasNewIcons = mutations.some((mutation) => [...mutation.addedNodes].some((node) => (
                node.nodeType === Node.ELEMENT_NODE
                && (node.matches?.('.material-symbols-outlined') || node.querySelector?.('.material-symbols-outlined'))
            )));

            if (hasNewIcons) {
                applyMaterialIconFallback();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    };

    if (!('fonts' in document) || typeof document.fonts.load !== 'function') {
        applyMaterialIconFallback();
        observeNewIcons();
        return;
    }

    const fallbackTimer = window.setTimeout(() => {
        if (!document.fonts.check('24px "Material Symbols Outlined"')) {
            applyMaterialIconFallback();
        }
    }, 1200);

    document.fonts.load('24px "Material Symbols Outlined"')
        .then(() => {
            window.clearTimeout(fallbackTimer);
            if (!document.fonts.check('24px "Material Symbols Outlined"')) {
                applyMaterialIconFallback();
            }
            observeNewIcons();
        })
        .catch(() => {
            window.clearTimeout(fallbackTimer);
            applyMaterialIconFallback();
            observeNewIcons();
        });
}

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
    initMaterialIconFallback();
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
