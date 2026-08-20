const puppeteer = require('puppeteer');

(async () => {
    console.log("=== Launching browser for description overlap test ===");
    const browser = await puppeteer.launch({ headless: true });
    
    async function testUrl(url) {
        console.log(`\n--- Testing URL: ${url} ---`);
        const page = await browser.newPage();
        
        let alerts = [];
        page.on('dialog', async dialog => {
            const msg = dialog.message();
            alerts.push(msg);
            console.log(`[ALERT] "${msg}"`);
            await dialog.accept();
        });

        page.on('console', msg => {
            console.log(`[CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
        });

        page.on('pageerror', err => {
            console.error(`[PAGE ERROR] ${err.toString()}`);
        });

        try {
            await page.goto(url, { waitUntil: 'networkidle0' });
            
            // Open Description Panel
            console.log("Opening Description Panel...");
            await page.click('.page-desc-btn');
            await new Promise(r => setTimeout(r, 500));
            
            const isPanelActive = await page.evaluate(() => {
                const panel = document.getElementById('pageDescPanel');
                return panel && panel.classList.contains('active');
            });
            console.log(`Description panel active: ${isPanelActive}`);

            // Step 0
            console.log("On Step 0. Clicking NEXT...");
            await page.click('#btnNext');
            await new Promise(r => setTimeout(r, 500));

            // Check if Step 1 active
            let activeStep = await page.evaluate(() => {
                const el = document.querySelector('.step-panel.active');
                return el ? el.id : null;
            });
            console.log(`Active Step: ${activeStep}`);

            // Step 1
            console.log("On Step 1. Clicking NEXT...");
            await page.click('#btnNext');
            await new Promise(r => setTimeout(r, 500));

            // Check if Step 2 active
            activeStep = await page.evaluate(() => {
                const el = document.querySelector('.step-panel.active');
                return el ? el.id : null;
            });
            console.log(`Active Step: ${activeStep}`);

            // Step 2
            console.log("On Step 2. Checking terms programmatically...");
            await page.evaluate(() => {
                document.getElementById('termsChk').checked = true;
            });
            await new Promise(r => setTimeout(r, 500));

            console.log("Clicking NEXT after terms...");
            await page.click('#btnNext');
            await new Promise(r => setTimeout(r, 500));

            // Check if Step 3 active
            activeStep = await page.evaluate(() => {
                const el = document.querySelector('.step-panel.active');
                return el ? el.id : null;
            });
            console.log(`Active Step: ${activeStep}`);

            // Step 3
            console.log("Entering work title...");
            await page.type('#workTitle', 'TestFootprint');

            const hasPostDate = await page.evaluate(() => {
                return !!document.getElementById('postDate');
            });
            if (hasPostDate) {
                await page.type('#postDate', '22.05.2026');
            }

            console.log("Clicking NEXT after filling details...");
            await page.click('#btnNext');
            await new Promise(r => setTimeout(r, 500));

            // Check if Step 4 active
            activeStep = await page.evaluate(() => {
                const el = document.querySelector('.step-panel.active');
                return el ? el.id : null;
            });
            console.log(`Active Step: ${activeStep}`);

        } catch (e) {
            console.error("Test failed with error:", e);
        } finally {
            await page.close();
        }
    }

    await testUrl('http://localhost:3000/register.html');

    await browser.close();
    console.log("=== Overlap Test finished ===");
})();
