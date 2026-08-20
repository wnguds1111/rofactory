const puppeteer = require('puppeteer');

(async () => {
    console.log("=== Launching browser for market pagination test ===");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    page.on('console', msg => {
        console.log(`[BROWSER CONSOLE] ${msg.text()}`);
    });

    page.on('pageerror', err => {
        console.error(`[BROWSER PAGE ERROR] ${err.toString()}`);
    });

    try {
        console.log("Navigating to http://localhost:3000/market.html ...");
        await page.goto('http://localhost:3000/market.html', { waitUntil: 'networkidle0' });

        // Wait for marketGridContainer to render products
        await page.waitForSelector('#marketGridContainer');
        
        // 1. Verify page buttons and arrow buttons exist
        console.log("Verifying pagination buttons exist...");
        const pageButtons = await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('#paginationWrap button'));
            return buttons.map(btn => ({
                text: btn.innerText,
                disabled: btn.disabled,
                classes: Array.from(btn.classList),
                title: btn.title
            }));
        });

        console.log("Found pagination buttons:");
        pageButtons.forEach(btn => {
            console.log(`- Text: "${btn.text}", Title: "${btn.title}", Disabled: ${btn.disabled}, Classes: ${btn.classes.join(' ')}`);
        });

        // 2. Check total pages is 5 and arrow buttons are present
        const page1Btn = pageButtons.find(b => b.text === '1');
        const firstPageBtn = pageButtons.find(b => b.text === '«');
        const prevPageBtn = pageButtons.find(b => b.text === '‹');
        const nextPageBtn = pageButtons.find(b => b.text === '›');
        const lastPageBtn = pageButtons.find(b => b.text === '»');

        if (!page1Btn || !firstPageBtn || !prevPageBtn || !nextPageBtn || !lastPageBtn) {
            throw new Error("Missing essential pagination buttons! Check renderPagination.");
        }

        // 3. Verify disabled states on page 1
        console.log("\nChecking initial state (Page 1)...");
        if (!firstPageBtn.disabled || !prevPageBtn.disabled) {
            throw new Error("First/Prev buttons should be disabled on page 1!");
        }
        console.log("Success: First/Prev buttons are disabled on page 1.");

        // 4. Click Next Page button '›'
        console.log("\nClicking next page arrow ('›')...");
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('#paginationWrap button'));
            const next = btns.find(b => b.innerText === '›');
            next.click();
        });
        await new Promise(r => setTimeout(r, 500));

        // Check active page
        let activePage = await page.evaluate(() => {
            const active = document.querySelector('#paginationWrap button.active');
            return active ? active.innerText : null;
        });
        console.log(`Current active page after clicking '›': ${activePage}`);
        if (activePage !== '2') {
            throw new Error(`Expected active page to be 2, but got ${activePage}`);
        }

        // 5. Click Last Page button '»'
        console.log("\nClicking last page arrow ('»')...");
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('#paginationWrap button'));
            const last = btns.find(b => b.innerText === '»');
            last.click();
        });
        await new Promise(r => setTimeout(r, 500));

        activePage = await page.evaluate(() => {
            const active = document.querySelector('#paginationWrap button.active');
            return active ? active.innerText : null;
        });
        console.log(`Current active page after clicking '»': ${activePage}`);
        if (activePage !== '5') {
            throw new Error(`Expected active page to be 5, but got ${activePage}`);
        }

        // Verify disabled states on page 5 (last page)
        const lastPageStates = await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('#paginationWrap button'));
            const next = btns.find(b => b.innerText === '›');
            const last = btns.find(b => b.innerText === '»');
            return {
                nextDisabled: next.disabled,
                lastDisabled: last.disabled
            };
        });
        console.log(`Last page disabled states: next: ${lastPageStates.nextDisabled}, last: ${lastPageStates.lastDisabled}`);
        if (!lastPageStates.nextDisabled || !lastPageStates.lastDisabled) {
            throw new Error("Next/Last buttons should be disabled on the last page!");
        }
        console.log("Success: Next/Last buttons are disabled on page 5.");

        // 6. Click First Page button '«'
        console.log("\nClicking first page arrow ('«')...");
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('#paginationWrap button'));
            const first = btns.find(b => b.innerText === '«');
            first.click();
        });
        await new Promise(r => setTimeout(r, 500));

        activePage = await page.evaluate(() => {
            const active = document.querySelector('#paginationWrap button.active');
            return active ? active.innerText : null;
        });
        console.log(`Current active page after clicking '«': ${activePage}`);
        if (activePage !== '1') {
            throw new Error(`Expected active page to be 1, but got ${activePage}`);
        }

        console.log("\n=== All pagination test cases passed successfully! ===");
    } catch (error) {
        console.error("Test failed:", error);
        process.exit(1);
    } finally {
        await browser.close();
    }
})();
