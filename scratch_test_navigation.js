const puppeteer = require('puppeteer');

(async () => {
    console.log("=== Launching browser for navigation test ===");
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
            console.log("On Step 2. Clicking NEXT without terms...");
            alerts = [];
            await page.click('#btnNext');
            await new Promise(r => setTimeout(r, 500));
            console.log(`Alerts shown: ${JSON.stringify(alerts)}`);

            console.log("Agreeing to terms...");
            // Click label's link to open terms modal
            await page.click('.custom-chk a');
            await new Promise(r => setTimeout(r, 500));

            // Scroll terms content to bottom
            const modalVisible = await page.evaluate(() => {
                const modal = document.getElementById('termsModal');
                return modal && modal.classList.contains('show');
            });
            console.log(`Terms modal shown: ${modalVisible}`);

            if (modalVisible) {
                await page.evaluate(() => {
                    const el = document.getElementById('termsContent');
                    el.scrollTop = el.scrollHeight;
                    // Trigger scroll event manually just in case
                    el.dispatchEvent(new Event('scroll'));
                });
                await new Promise(r => setTimeout(r, 500));

                const agreeBtnDisabled = await page.evaluate(() => {
                    return document.getElementById('btnAgree').disabled;
                });
                console.log(`Agree button disabled: ${agreeBtnDisabled}`);

                await page.click('#btnAgree');
                await new Promise(r => setTimeout(r, 500));
            }

            const termsChecked = await page.evaluate(() => {
                return document.getElementById('termsChk').checked;
            });
            console.log(`Terms checked status: ${termsChecked}`);

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
            console.log("On Step 3. Clicking NEXT without title...");
            alerts = [];
            await page.click('#btnNext');
            await new Promise(r => setTimeout(r, 500));
            console.log(`Alerts shown: ${JSON.stringify(alerts)}`);

            console.log("Entering work title...");
            await page.type('#workTitle', 'MyFootprint');

            // If we are on /register (nested), it also requires postDate validation!
            const hasPostDate = await page.evaluate(() => {
                return !!document.getElementById('postDate');
            });
            if (hasPostDate) {
                console.log("Entering post date...");
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
    await testUrl('http://localhost:3000/register');

    await browser.close();
    console.log("=== Test finished ===");
})();
