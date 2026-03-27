/**
 * ROZ GNB — Common Header Renderer
 * HTML-based nav with real icon images (crisp, no blur).
 * Left 4: SUBSCRIPTION, TOP UP, RO FACTORY, GET PORING
 * Right 4: NEWS, GAME INFO, RESOURCE, COMMUNITY
 */

function renderGNB(opts = {}) {
    const assetBase = 'roz/assets/images/header';

    const leftItems = [
        { icon: 'gnb-sub.png',     label: 'SUBSCRIPTION', href: '#' },
        { icon: 'gnb-topup.png',   label: 'TOP UP',       href: '#' },
        {
            icon: 'gnb-factory.png', label: 'RO FACTORY', href: 'main.html',
            active: opts.activePage === 'ro-factory',
            dropdown: [
                { href: 'register.html',       label: 'Register'  },
                { href: 'market.html',         label: 'Market'    },
                { href: 'studio_myworks.html', label: 'My Studio' },
            ]
        },
        { icon: 'gnb-poring.png',  label: 'GET PORING',  href: '#' },
    ];

    const rightItems = [
        { icon: 'gnb-bi-1.png', label: 'NEWS',       href: '#' },
        { icon: 'gnb-bi-2.png', label: 'GAME INFO',  href: '#' },
        { icon: 'gnb-bi-6.png', label: 'RESOURCE',   href: '#' },
        { icon: 'gnb-bi-5.png', label: 'COMMUNITY',  href: '#' },
    ];

    const renderItem = (item) => {
        const dropdownHTML = item.dropdown
            ? `<div class="roz-gnb-dropdown">${item.dropdown.map(d => `<a href="${d.href}">${d.label}</a>`).join('')}</div>`
            : '';
        const activeClass = item.active ? ' roz-gnb-item--active' : '';
        return `
        <div class="roz-gnb-item-wrap${item.dropdown ? ' roz-gnb-has-dropdown' : ''}">
            <a href="${item.href}" class="roz-gnb-item${activeClass}">
                <img src="${assetBase}/${item.icon}" alt="${item.label}" class="roz-gnb-icon">
                <span class="roz-gnb-label">${item.label}</span>
            </a>${dropdownHTML}
        </div>`;
    };

    const gnbHTML = `
    <!-- GNJOY Topbar (46px) -->
    <div class="gnjoy-topbar">
        <div class="gnb-inner-wrap">
            <div class="gnjoy-logo">
                <a href="index.html">
                    <img src="${assetBase}/logo-header-light.png" alt="GNJOY" style="height:20px;display:block;">
                </a>
            </div>
            <div class="gnjoy-util">
                <div class="gnjoy-lang">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    EN
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <button class="gnb-btn-outline" onclick="alert('Sign Up coming soon.')">Sign Up</button>
                <button class="gnb-btn-solid"   onclick="alert('Login coming soon.')">Login</button>
            </div>
        </div>
    </div>

    <!-- ROZ GNB (80px, HTML icon nav) -->
    <header class="roz-gnb" id="rozGnb">
        <div class="roz-gnb-inner">

            <nav class="roz-gnb-nav roz-gnb-nav--left">
                ${leftItems.map(renderItem).join('')}
            </nav>

            <!-- Center Logo: 159×126px, top:0 → straddles below bar -->
            <a href="main.html" class="roz-gnb-logo">
                <img src="${assetBase}/roz-logo.webp" alt="Ragnarok Zero Global">
            </a>

            <nav class="roz-gnb-nav roz-gnb-nav--right">
                ${rightItems.map(renderItem).join('')}
            </nav>

            <!-- Download button (hidden → shown on scroll) -->
            <div class="roz-gnb-download-wrap">
                <button class="roz-gnb-download-btn" onclick="alert('UGC Editor Download starting...')">
                    <img src="${assetBase}/download-header.png" alt="Download">
                </button>
            </div>

        </div>
    </header>`;

    const target = document.querySelector('main') || document.body.firstChild;
    const temp = document.createElement('div');
    temp.innerHTML = gnbHTML;
    while (temp.firstChild) document.body.insertBefore(temp.firstChild, target);

    // Scroll: is-fixed after GNJOY bar scrolls out (46px)
    const gnbEl = document.getElementById('rozGnb');
    if (gnbEl) {
        window.addEventListener('scroll', () => {
            gnbEl.classList.toggle('is-fixed', window.scrollY > 46);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderGNB({ activePage: document.body.dataset.activePage || 'ro-factory' });
});
