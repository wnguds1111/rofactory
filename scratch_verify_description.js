const puppeteer = require('puppeteer');

(async () => {
    console.log("=== Launching browser for description page tests ===");
    const browser = await puppeteer.launch({ headless: true });
    
    const pagesToTest = [
        { url: 'http://localhost:3000/main2.html', expectedKey: '0', expectedTitle: '메인 홈페이지 (Main)' },
        { url: 'http://localhost:3000/register.html', expectedKey: '1-0', expectedTitle: '작품 등록 페이지' },
        { url: 'http://localhost:3000/market.html', expectedKey: '2-list', expectedTitle: '마켓 > 리스트' },
        { url: 'http://localhost:3000/studio_myworks.html', expectedKey: '3-myworks', expectedTitle: '마이 스튜디오 (나의 작품)' },
        { url: 'http://localhost:3000/studio_inventory.html', expectedKey: '3-inventory', expectedTitle: '마이 스튜디오 (인벤토리)' },
        { url: 'http://localhost:3000/studio_detail.html', expectedKey: '4', expectedTitle: '작품 상세 보기' },
        { url: 'http://localhost:3000/studio_inventory_detail.html', expectedKey: '4', expectedTitle: '작품 상세 보기' },
        { url: 'http://localhost:3000/market_detail.html', expectedKey: '4', expectedTitle: '작품 상세 보기' },
        { url: 'http://localhost:3000/edit.html', expectedKey: '5', expectedTitle: '정보 수정 모드' }
    ];

    let successCount = 0;
    for (const testCase of pagesToTest) {
        console.log(`\nTesting page: ${testCase.url}`);
        const page = await browser.newPage();
        
        page.on('console', msg => {
            console.log(`[BROWSER CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
        });

        page.on('pageerror', err => {
            console.error(`[BROWSER PAGE ERROR] ${err.toString()}`);
        });

        try {
            await page.evaluateOnNewDocument(() => {
                localStorage.setItem('rofactory_desc_panel_active', 'true');
            });
            await page.goto(testCase.url, { waitUntil: 'networkidle0' });
            
            // Wait for description button to ensure scripts are loaded
            await page.waitForSelector('.page-desc-btn', { timeout: 3000 });
            await new Promise(r => setTimeout(r, 500));

            // Get resolved page key, title, and pageData
            const result = await page.evaluate(async () => {
                if (typeof loadDescData === 'function') {
                    await loadDescData();
                }
                const key = typeof getTargetKey === 'function' ? getTargetKey() : null;
                if (typeof showDynamicDescPanel === 'function') {
                    // Call without silent to ensure it's rendered properly
                    await showDynamicDescPanel(window.currentPrdPageNum, true);
                }
                const titleEl = document.querySelector('.pdp-top-title');
                const titleText = titleEl ? titleEl.innerText : null;
                const pagesData = window.descAllPagesData;
                const localData = localStorage.getItem('rofactory_desc_all_pages_data');
                const typeofPageTitle = typeof window.descPageTitle;
                const valueOfPageTitle = window.descPageTitle ? window.descPageTitle.toString() : '';
                const outerHtml = titleEl ? titleEl.outerHTML : null;
                const contentHtml = document.getElementById('descContent') ? document.getElementById('descContent').innerHTML : null;
                return { key, titleText, pagesData, localData, currentPrdPageNum: window.currentPrdPageNum, typeofPageTitle, valueOfPageTitle, outerHtml, contentHtml };
            });

            console.log(`  Resolved Key: ${result.key} (Expected: ${testCase.expectedKey})`);
            console.log(`  Rendered Title: "${result.titleText}" (Expected: "${testCase.expectedTitle}")`);
            console.log(`  window.descPageTitle Type: ${result.typeofPageTitle}, Value: "${result.valueOfPageTitle}"`);
            console.log(`  Outer HTML of title: ${result.outerHtml}`);
            console.log(`  descContent HTML: ${result.contentHtml}`);
            console.log(`  currentPrdPageNum: ${result.currentPrdPageNum}`);
            if (result.pagesData && result.pagesData.pages) {
                console.log(`  pageData in descAllPagesData.pages:`, JSON.stringify(result.pagesData.pages[result.key]));
            }
            if (result.localData) {
                try {
                    const parsedLocal = JSON.parse(result.localData);
                    console.log(`  pageData in localStorage:`, JSON.stringify(parsedLocal.pages ? parsedLocal.pages[result.key] : null));
                } catch(e) {}
            }

            if (result.key === testCase.expectedKey && result.titleText === testCase.expectedTitle) {
                console.log(`  [PASS] Successfully resolved and rendered description!`);
                successCount++;
            } else {
                console.log(`  [FAIL] Mismatch detected!`);
            }
        } catch (e) {
            console.error(`  [ERROR] Failed to verify:`, e.message);
        } finally {
            await page.close();
        }
    }

    console.log(`\n=== Verification Summary: ${successCount}/${pagesToTest.length} passed ===`);
    await browser.close();
    
    if (successCount === pagesToTest.length) {
        process.exit(0);
    } else {
        process.exit(1);
    }
})();
