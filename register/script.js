document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. HERO SLIDER CAROUSEL LOGIC (+ Mouse Drag)
    // ==========================================
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-pagination .dot');
    const sliderContainer = document.querySelector('.hero-slider');
    
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => { d.classList.remove('active'); d.style.background = 'rgba(255,255,255,0.35)'; });
            
            currentSlide = (index + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            if(dots.length > 0) { dots[currentSlide].classList.add('active'); dots[currentSlide].style.background = '#fff'; }
            
            const curEl = document.getElementById('slideCurrent');
            if(curEl) curEl.innerText = currentSlide + 1;
            const totEl = document.getElementById('slideTotal');
            if(totEl) totEl.innerText = slides.length;
        }

        function nextSlide() { showSlide(currentSlide + 1); }
        function prevSlide() { showSlide(currentSlide - 1); }
        
        // Dots
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => { showSlide(idx); resetInterval(); });
        });

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        // Mouse Drag (Swipe) Detection
        if (sliderContainer) {
            let isDown = false;
            let startX;

            sliderContainer.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX;
                sliderContainer.classList.add('hover-grabbing');
                sliderContainer.classList.remove('hover-grab');
            });
            sliderContainer.addEventListener('mouseleave', () => {
                isDown = false;
                sliderContainer.classList.add('hover-grab');
                sliderContainer.classList.remove('hover-grabbing');
            });
            sliderContainer.addEventListener('mouseup', (e) => {
                if(!isDown) return;
                isDown = false;
                sliderContainer.classList.add('hover-grab');
                sliderContainer.classList.remove('hover-grabbing');
                
                const endX = e.pageX;
                const diff = startX - endX;
                
                // If dragged more than 50px left or right
                if(diff > 50) {
                    nextSlide();
                    resetInterval();
                } else if(diff < -50) {
                    prevSlide();
                    resetInterval();
                }
            });
        }
        
        resetInterval();
    }


    // ==========================================
    // 2. BUTTON SCROLL FOR PRODUCT LISTS
    // ==========================================
    // scrollSlider is called from onclick in HTML buttons
    window.scrollSlider = function(trackId, dir) {
        const track = document.getElementById(trackId);
        if (!track) return;
        const wrapper = track.closest('.slider-wrapper');
        if (!wrapper) return;
        const cards = track.querySelectorAll('.item-card');
        if (cards.length === 0) return;
        const cardW = cards[0].offsetWidth + 20; // card width + gap
        const totalCards = cards.length;
        const visibleCards = Math.floor(wrapper.clientWidth / cardW);
        const maxStep = Math.max(0, totalCards - visibleCards);
        
        // Get current step index
        let step = parseInt(track.dataset.step || '0');
        step += dir;
        
        // Clamp (no wrap)
        if (step < 0) step = 0;
        if (step > maxStep) step = maxStep;
        
        track.dataset.step = step;
        track.style.transform = 'translateX(' + (-step * cardW) + 'px)';
    };


    // ==========================================
    // 3. MASSTIGE SCROLL-LINKED ANIMATION
    // ==========================================
    const track = document.querySelector('.masstige-scroll-track');
    const sweepInner = document.querySelector('.masstige-sweep-inner');
    const steps = document.querySelectorAll('.masstige-sweep-inner .step-card');
    
    if (track && sweepInner) {
        
        function updateScrollAnimation() {
            const rect = track.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // The scrollable distance is the height of the track minus the viewport height
            // We reverted track size to 200vh to ensure it sweeps slightly slower!
            const scrollableDistance = rect.height - windowHeight;
            
            // Current scroll offset relative to the start of the section
            const currentScroll = -rect.top;
            
            if (scrollableDistance > 0) {
                // Calculate progress 0 to 1
                let progress = currentScroll / scrollableDistance;
                progress = Math.max(0, Math.min(1, progress));
                
                // Sweep completes comfortably over 70% of the long scrolling distance
                let sweepRatio = (progress - 0.1) / 0.7;
                sweepRatio = Math.max(0, Math.min(1, sweepRatio));
                
                // 100% means fully clipped/hidden. 0% means fully revealed.
                let clipPercent = 100 - (sweepRatio * 100);
                sweepInner.style.clipPath = `inset(${clipPercent}% 0 0 0)`;
                
                // Stagger reveal the step cards when sweep is almost done
                if (progress > 0.75) {
                    steps.forEach((step, idx) => {
                        if (!step.classList.contains('visible')) {
                            // setTimeout gives a nice staggered ripple effect
                            setTimeout(() => { step.classList.add('visible'); }, idx * 250);
                        }
                    });
                } else if (progress < 0.6) {
                    steps.forEach(step => step.classList.remove('visible'));
                }
            }
        }
        
        window.addEventListener('scroll', updateScrollAnimation, { passive: true });
        window.addEventListener('resize', updateScrollAnimation, { passive: true });
        
        // Initial trigger
        updateScrollAnimation();
    }

    // ==========================================
    // 4. GNB SCROLL COLOR TOGGLE
    // ==========================================
    const gnb = document.querySelector('.gnb');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            gnb.classList.add('scrolled');
        } else {
            gnb.classList.remove('scrolled');
        }
    }, { passive: true });

    // ==========================================
    // 5. MOBILE HAMBURGER MENU & REGISTER BLOCK
    // ==========================================
    const hamburger = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    const closeNav = document.getElementById('closeMobileNav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.add('active');
            document.body.style.overflow = 'hidden'; // block background scroll
        });
        closeNav.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Toggle dropdown in mobile nav
    const mobDropdown = document.querySelector('.mobile-nav-dropdown > span');
    if (mobDropdown) {
        mobDropdown.addEventListener('click', function() {
            this.parentElement.classList.toggle('open');
        });
    }

    // Block register.html on mobile sizes
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href="register.html"]');
        if (target) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                alert('해당 메뉴는 PC 환경에서만 지원합니다.\n작품 등록을 위해 PC로 다시 접속해주세요.');
            }
        }
    });

});
