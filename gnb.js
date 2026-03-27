/**
 * ROZ GNB — Common Header Renderer
 * Matches the official ROZ site (code.gnjoy.com/prototype/ggu/roz/index.html) exactly.
 * Uses actual ROZ image assets from /roz/assets/images/header/
 * Auto-initializes on DOMContentLoaded.
 */

function renderGNB(opts = {}) {
    // Determine relative path to roz assets based on current page depth
    const assetBase = 'roz/assets/images/header';

    const gnbHTML = `
    <!-- ====== GNJOY Topbar (46px) ====== -->
    <div class="gnjoy-topbar">
        <div class="gnb-inner-wrap">
            <div class="gnjoy-logo">
                <a href="index.html">
                    <img src="${assetBase}/logo-header-light.png" alt="GNJOY" style="height:20px; display:block;">
                </a>
            </div>
            <div class="gnjoy-util">
                <div class="gnjoy-lang">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    EN
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                <button class="gnb-btn-outline" onclick="alert('Sign Up coming soon.')">Sign Up</button>
                <button class="gnb-btn-solid" onclick="alert('Login coming soon.')">Login</button>
            </div>
        </div>
    </div>

    <!-- ====== ROZ GNB (80px image-based) ====== -->
    <header class="roz-gnb" id="rozGnb">
        <div class="roz-gnb-inner">

            <!-- Left: Dropdown Toggle (NOTICE/UPDATE/EVENTS/PROBLIST) -->
            <div class="roz-gnb-dropdown-wrap">
                <div class="roz-gnb-dropdown-trigger">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#025DD0" stroke-width="2.5" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </div>
                <div class="roz-gnb-dropdown-menu">
                    <img src="${assetBase}/header-dropdown.png" alt="Menu" style="width:160px; display:block; border-radius:8px; box-shadow:0 8px 24px rgba(0,0,0,0.15);">
                </div>
            </div>

            <!-- Center: Full menu image (NEWS, GAME INFO, COMMUNITY, RESOURCE...) -->
            <div class="roz-gnb-menu-wrap">
                <img src="${assetBase}/header-menu-full.webp" alt="Navigation" class="roz-gnb-menu-img">

                <!-- RO FACTORY Sub-nav overlaid on menu image (right side area) -->
                <div class="roz-gnb-sub-overlay">
                    <a href="main.html" class="roz-sub-link${opts.activePage === 'ro-factory' ? ' active' : ''}">RO FACTORY</a>
                    <span class="roz-sub-dot"></span>
                    <a href="register.html" class="roz-sub-link">REGISTER</a>
                    <span class="roz-sub-dot"></span>
                    <a href="market.html" class="roz-sub-link">MARKET</a>
                    <span class="roz-sub-dot"></span>
                    <a href="studio_myworks.html" class="roz-sub-link">MY STUDIO</a>
                </div>
            </div>

            <!-- Center: ROZ Logo (absolutely centered) -->
            <a href="main.html" class="roz-gnb-logo">
                <img src="${assetBase}/roz-logo.webp" alt="Ragnarok Zero Global">
            </a>

            <!-- Download Button (hidden → visible on scroll) -->
            <div class="roz-gnb-download-wrap" id="gnbDownload">
                <div class="roz-gnb-download-bg"></div>
                <button class="roz-gnb-download-btn" onclick="alert('UGC Editor Download starting...')">
                    <img src="${assetBase}/download-header.png" alt="Download">
                </button>
            </div>

        </div>
    </header>`;

    // Insert at start of body (before <main> or first child)
    const target = document.querySelector('main') || document.body.firstChild;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = gnbHTML;
    // Insert each child node (avoid extra wrapper div)
    while (wrapper.firstChild) {
        document.body.insertBefore(wrapper.firstChild, target);
    }

    // === Scroll: show download button + fix gnb after gnjoy bar scrolls out ===
    const gnbEl = document.getElementById('rozGnb');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 46) {
            gnbEl.classList.add('is-fixed');
        } else {
            gnbEl.classList.remove('is-fixed');
        }
    });

    // === Dropdown hover ===
    const dropTrigger = document.querySelector('.roz-gnb-dropdown-wrap');
    if (dropTrigger) {
        dropTrigger.addEventListener('mouseenter', () => dropTrigger.classList.add('open'));
        dropTrigger.addEventListener('mouseleave', () => dropTrigger.classList.remove('open'));
    }
}

// Auto-initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const activePage = document.body.dataset.activePage || 'ro-factory';
    renderGNB({ activePage });
});
