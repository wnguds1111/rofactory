/**
 * ROZ GNB — Common Header Renderer
 * Pixel-perfect match to code.gnjoy.com/prototype/ggu/roz/index.html
 * Structure & dimensions from roz/assets/scss/_header.scss
 */

function renderGNB(opts = {}) {
    const assetBase = 'roz/assets/images/header';

    const gnbHTML = `
    <!-- GNJOY Topbar (46px) -->
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

    <!-- ROZ GNB (80px, image-based, exact ROZ spec) -->
    <header class="roz-gnb" id="rozGnb">
        <div class="roz-gnb-inner">

            <!-- Full menu image bar (NEWS / GAME INFO / COMMUNITY / RESOURCE etc.) -->
            <div class="roz-gnb-menu-wrap">
                <img src="${assetBase}/header-menu-full.webp" alt="Navigation Menu" class="roz-gnb-menu-img">
            </div>

            <!-- ROZ Logo: 159px wide, aspect-ratio 211/167, top:0 = sticks out below 80px bar -->
            <a href="main.html" class="roz-gnb-logo">
                <img src="${assetBase}/roz-logo.webp" alt="Ragnarok Zero Global">
            </a>

            <!--
                Download wrap: 278x76px, positioned at top:80px (= right below the 80px bar)
                CSS ::before renders shape-download-header.webp as background
                This element is hidden (opacity:0) and shows when .is-fixed is added on scroll
            -->
            <div class="roz-gnb-download-wrap">
                <button class="roz-gnb-download-btn" onclick="alert('UGC Editor Download starting...')">
                    <img src="${assetBase}/download-header.png" alt="Download">
                </button>
            </div>

        </div>
    </header>`;

    // Insert before <main> element
    const target = document.querySelector('main') || document.body.firstChild;
    const temp = document.createElement('div');
    temp.innerHTML = gnbHTML;
    while (temp.firstChild) {
        document.body.insertBefore(temp.firstChild, target);
    }

    // Scroll behavior: add is-fixed when GNJOY bar (46px) scrolls out of view
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
