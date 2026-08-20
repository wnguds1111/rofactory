const puppeteer = require('puppeteer');

(async () => {
    console.log("=== Launching browser for description local storage cache test ===");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    // Alert handler
    let alertMsg = '';
    page.on('dialog', async dialog => {
        alertMsg = dialog.message();
        console.log(`[ALERT RECEIVED] "${alertMsg}"`);
        await dialog.accept();
    });

    try {
        await page.goto('http://localhost:3000/register.html', { waitUntil: 'networkidle0' });
        
        // 1. Open description panel
        console.log("Opening description panel...");
        await page.click('.page-desc-btn');
        await new Promise(r => setTimeout(r, 500));

        // Unlock description panel to make it editable
        console.log("Unlocking description panel...");
        await page.click('#lockToggleBtn');
        await new Promise(r => setTimeout(r, 500));

        // Modify title and overview
        console.log("Editing title and overview...");
        await page.evaluate(() => {
            const titleEl = document.querySelector('.pdp-top-title');
            titleEl.innerText = "Cached Test Title!";
            titleEl.dispatchEvent(new Event('blur'));

            const overviewEl = document.querySelector('.pdp-top-overview');
            overviewEl.innerText = "Cached Test Overview Description!";
            overviewEl.dispatchEvent(new Event('blur'));
        });
        await new Promise(r => setTimeout(r, 500));

        // Click save button (lockToggleBtn) to save changes
        console.log("Saving changes...");
        await page.click('#lockToggleBtn');
        await new Promise(r => setTimeout(r, 1500)); // wait for api/github sync attempt

        console.log(`Alert shown: "${alertMsg}"`);

        // Check localStorage directly
        const storedData = await page.evaluate(() => {
            return localStorage.getItem('rofactory_desc_drafts') || localStorage.getItem('rofactory_desc_all_pages_data');
        });
        console.log("Stored Data in LocalStorage:", storedData);

        // 2. Reload the page
        console.log("Reloading page...");
        await page.reload({ waitUntil: 'networkidle0' });

        // 3. Open panel and check values
        console.log("Opening description panel after reload...");
        // Click the btn again to open
        await page.click('.page-desc-btn');
        await new Promise(r => setTimeout(r, 500));

        const loadedTitle = await page.evaluate(() => {
            const titleEl = document.querySelector('.pdp-top-title');
            return titleEl ? titleEl.innerText : null;
        });
        const loadedOverview = await page.evaluate(() => {
            const overviewEl = document.querySelector('.pdp-top-overview');
            return overviewEl ? overviewEl.innerText : null;
        });

        console.log(`Loaded Title: "${loadedTitle}"`);
        console.log(`Loaded Overview: "${loadedOverview}"`);

        if (loadedTitle === "Cached Test Title!" && loadedOverview === "Cached Test Overview Description!") {
            console.log("🎉 SUCCESS: Cache loaded and merged successfully after reload!");
        } else {
            console.error("❌ FAILURE: Caching or loading failed.");
        }

    } catch (e) {
        console.error("Test failed with error:", e);
    } finally {
        await page.close();
        await browser.close();
    }
})();
