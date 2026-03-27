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
            icon: 'gnb-factory.png', label: 'RO FACTORY', href: 'main2.html',
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
        { icon: 'gnb-news.png',      label: 'NEWS',       href: '#' },
        { icon: 'gnb-gameinfo.png',  label: 'GAME INFO',  href: '#' },
        { icon: 'gnb-resource.png',  label: 'RESOURCE',   href: '#' },
        { icon: 'gnb-community.png', label: 'COMMUNITY',  href: '#' },
    ];

    const renderItem = (item) => {
        const dropdownHTML = item.dropdown
            ? `<div class="roz-gnb-dropdown">${item.dropdown.map(d => `<a href="${d.href}">${d.label}</a>`).join('')}</div>`
            : '';
        const activeClass = item.active ? ' roz-gnb-item--active' : '';
        return `
        <div class="roz-gnb-item-wrap${item.dropdown ? ' roz-gnb-has-dropdown' : ''}">
            <a href="${item.href}" class="roz-gnb-item${activeClass}" title="${item.label}">
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
                <style>
                .gnjoy-lang { position:relative; display:flex; align-items:center; cursor:pointer; font-family:'Poppins', sans-serif; gap:4px; font-weight:700; color:#555; }
                .gnjoy-lang-list { position:absolute; top:calc(100% + 10px); right:0; background:#fff; border:1px solid #e8eaed; border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.1); width:80px; display:none; flex-direction:column; padding:4px; z-index:999; }
                .gnjoy-lang:hover .gnjoy-lang-list { display:flex; }
                .gnjoy-lang-option { padding:8px; font-size:12px; font-weight:700; text-align:center; color:#333; cursor:pointer; border-radius:4px; text-transform:uppercase; transition:0.2s;}
                .gnjoy-lang-option:hover { background:#f1f5f9; color:#1e3a8a; }
                .gnjoy-lang-option.active { background:#e0f2fe; color:#0369a1; }
                </style>
                <div class="gnjoy-lang">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <span id="currentLangLabel">EN</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    <div class="gnjoy-lang-list">
                        <div class="gnjoy-lang-option" onclick="changeLang('en')" id="langOptEn">EN</div>
                        <div class="gnjoy-lang-option" onclick="changeLang('kr')" id="langOptKr">KR</div>
                    </div>
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
            <a href="main2.html" class="roz-gnb-logo">
                <img src="${assetBase}/roz-logo.webp" alt="Ragnarok Zero Global">
            </a>

            <!-- Right 4 items -->
            <nav class="roz-gnb-nav roz-gnb-nav--right">
                ${rightItems.map(renderItem).join('')}
            </nav>

            <!-- Mobile Hamburger Toggle -->
            <button class="roz-gnb-toggle" id="rozGnbToggle">
                <span></span><span></span><span></span>
            </button>

            <!-- Download button (hidden → shown on scroll) -->
            <div class="roz-gnb-download-wrap">
                <button class="roz-gnb-download-btn" onclick="alert('UGC Editor Download starting...')">
                    <img src="${assetBase}/download-header.png" alt="Download">
                </button>
            </div>

        </div>

        <!-- Mobile Side Menu -->
        <div class="roz-gnb-mobile-wrapper" id="rozGnbMobile">
            <div class="roz-gnb-mobile-dim"></div>
            <div class="roz-gnb-mobile-menu">
                <button class="roz-gnb-mobile-close" id="rozGnbMobileClose">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div class="roz-gnb-mobile-logo">
                    <img src="${assetBase}/roz-logo.webp" alt="ROZ">
                </div>
                <!-- Combined menus for mobile -->
                <div class="roz-gnb-mobile-nav">
                    ${[...leftItems, ...rightItems].map(item => `
                        <div class="roz-gnb-mobile-item-wrap">
                            <a href="${item.href}" class="roz-gnb-mobile-item">
                                <img src="${assetBase}/${item.icon}" alt="${item.label}" class="roz-gnb-icon">
                                <span>${item.label}</span>
                            </a>
                            ${item.dropdown ? `
                            <div class="roz-gnb-mobile-sub">
                                ${item.dropdown.map(d => `<a href="${d.href}">${d.label}</a>`).join('')}
                            </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
                
                <button class="roz-gnb-mobile-download" onclick="alert('UGC Editor Download starting...')">
                    UGC EDITOR DOWNLOAD
                </button>
            </div>
        </div>
    </header>`;

    const target = document.body.firstChild;
    const temp = document.createElement('div');
    temp.innerHTML = gnbHTML;
    while (temp.firstChild) document.body.insertBefore(temp.firstChild, target);

    // Initial Lang Load Process (Runs when DOM is ready)
    const savedLang = localStorage.getItem('roz_lang') || 'kr';
    window.changeLang = function(lang) {
        localStorage.setItem('roz_lang', lang);
        
        let label = document.getElementById('currentLangLabel');
        if(label) label.innerText = lang.toUpperCase();
        
        let lEn = document.getElementById('langOptEn');
        if(lEn) lEn.className = lang === 'en' ? 'gnjoy-lang-option active' : 'gnjoy-lang-option';
        
        let lKr = document.getElementById('langOptKr');
        if(lKr) lKr.className = lang === 'kr' ? 'gnjoy-lang-option active' : 'gnjoy-lang-option';
        
        let dataLang = lang === 'kr' ? 'ko' : lang;
        
        document.querySelectorAll('[data-' + dataLang + ']').forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = el.getAttribute('data-' + dataLang);
            } else {
                el.innerHTML = el.getAttribute('data-' + dataLang);
            }
        });
    };
    
    // Auto-apply current lang as soon as rendering finishes
    setTimeout(() => { if(window.changeLang) window.changeLang(savedLang); }, 50);

    // Scroll & Mobile Toggle Logic
    const gnbEl = document.getElementById('rozGnb');
    const toggleBtn = document.getElementById('rozGnbToggle');
    const closeBtn = document.getElementById('rozGnbMobileClose');
    const mobileWrap = document.getElementById('rozGnbMobile');
    const mobileDim = mobileWrap ? mobileWrap.querySelector('.roz-gnb-mobile-dim') : null;

    if (gnbEl) {
        window.addEventListener('scroll', () => {
            gnbEl.classList.toggle('is-fixed', window.scrollY > 46);
        });
    }

    const openMenu = () => mobileWrap && mobileWrap.classList.add('is-open');
    const closeMenu = () => mobileWrap && mobileWrap.classList.remove('is-open');

    if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (mobileDim) mobileDim.addEventListener('click', closeMenu);
}

document.addEventListener('DOMContentLoaded', () => {
    renderGNB({ activePage: document.body.dataset.activePage || 'ro-factory' });
});
