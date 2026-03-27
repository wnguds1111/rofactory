/**
 * ROZ GNB — Common Header Renderer
 * Matches the official ROZ two-tier header structure exactly.
 * Automatically injects GNB when DOM is ready.
 * To set active page, add data-active-page="ro-factory" on <body>.
 */

function renderGNB(opts = {}) {
    const gnbHTML = `
    <!-- GNJOY Topbar -->
    <div class="gnjoy-topbar">
        <div class="container">
            <div class="gnjoy-logo">
                <a href="index.html">
                    <img src="roz/assets/images/header/logo-header-light.png" alt="GNJOY" style="height:22px;">
                </a>
            </div>
            <div class="gnjoy-links">
                <div class="lang-wrap">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    EN
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-top:2px;"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <button class="btn-signup" onclick="alert('Sign Up coming soon.')">Sign Up</button>
                <button class="btn-login" onclick="alert('Login coming soon.')">Login</button>
            </div>
        </div>
    </div>

    <!-- ROZ GNB -->
    <header class="gnb" id="rozGnb">
        <div class="container gnb-center-layout">
            <!-- Left nav -->
            <nav class="nav-left">
                <a href="#" class="gnb-item">
                    <span class="gnb-text">SUBSCRIPTION</span>
                </a>
                <span class="gnb-dot"></span>
                <a href="#" class="gnb-item">
                    <span class="gnb-text">TOP UP</span>
                </a>
                <span class="gnb-dot"></span>
                <div class="dropdown-wrapper">
                    <a href="main.html" class="gnb-item${opts.activePage === 'ro-factory' ? ' gnb-active' : ''}">
                        <span class="gnb-text">RO FACTORY</span>
                    </a>
                    <div class="dropdown-menu">
                        <a href="register.html">Register</a>
                        <a href="market.html">Market</a>
                        <a href="#" onclick="alert('Guide coming soon.'); return false;">Guide</a>
                        <a href="studio_myworks.html">My Studio</a>
                    </div>
                </div>
                <span class="gnb-dot"></span>
                <a href="#" class="gnb-item">
                    <span class="gnb-text">GET PORING</span>
                </a>
            </nav>

            <!-- Center Logo -->
            <div class="logo logo-center">
                <a href="main.html">
                    <img src="roz/assets/images/header/roz-logo.webp" alt="Ragnarok Zero Global" class="roz-logo-img">
                </a>
            </div>

            <!-- Scroll Download Button -->
            <a href="#" class="gnb-download-btn" onclick="alert('UGC Editor Download starting...'); return false;">
                <img src="roz/assets/images/header/download-header.png" alt="Download" style="height:28px; vertical-align:middle; margin-right:6px;">
                Download
            </a>

            <!-- Right nav -->
            <nav class="nav-right">
                <a href="#" class="gnb-item">
                    <span class="gnb-text">NEWS</span>
                </a>
                <span class="gnb-dot"></span>
                <a href="#" class="gnb-item">
                    <span class="gnb-text">GAME INFO</span>
                </a>
                <span class="gnb-dot"></span>
                <a href="#" class="gnb-item">
                    <span class="gnb-text">RESOURCE</span>
                </a>
                <span class="gnb-dot"></span>
                <a href="#" class="gnb-item">
                    <span class="gnb-text">COMMUNITY</span>
                </a>
            </nav>

            <!-- Mobile Hamburger -->
            <div class="hamburger-menu" id="hamburgerMenu">
                <span></span><span></span><span></span>
            </div>
        </div>
    </header>`;

    // Insert before <main> or at start of body
    const target = document.querySelector('main') || document.querySelector('.wizard-main') || document.body.firstChild;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = gnbHTML;
    document.body.insertBefore(wrapper, target);

    // === Scroll Behavior: add is-fixed after 46px (gnjoy bar height) ===
    const gnbEl = document.getElementById('rozGnb');
    if (gnbEl) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 46) {
                gnbEl.classList.add('is-fixed');
            } else {
                gnbEl.classList.remove('is-fixed');
            }
        });
    }

    // === Mobile Nav ===
    const hamburger = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => mobileNav.classList.add('active'));
        const closeBtn = document.getElementById('closeMobileNav');
        if (closeBtn) closeBtn.addEventListener('click', () => mobileNav.classList.remove('active'));
    }
}

// Auto-initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const activePage = document.body.dataset.activePage || 'ro-factory';
    renderGNB({ activePage });
});
