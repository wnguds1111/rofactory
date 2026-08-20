const puppeteer = require('puppeteer');

(async () => {
    console.log("=== Diagnosing Next button and Save behavior ===");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    page.on('console', msg => {
        console.log(`[BROWSER CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
    });

    page.on('pageerror', err => {
        console.error(`[BROWSER PAGE ERROR] ${err.toString()}`);
    });

    let alertMsg = null;
    page.on('dialog', async dialog => {
        alertMsg = dialog.message();
        console.log(`[BROWSER ALERT] "${alertMsg}"`);
        await dialog.accept();
    });

    try {
        console.log("Navigating to http://localhost:3000/register.html...");
        await page.goto('http://localhost:3000/register.html', { waitUntil: 'networkidle0' });

        // Step 0 check
        let activeStep = await page.evaluate(() => {
            const el = document.querySelector('.step-panel.active');
            return el ? el.id : null;
        });
        console.log(`Initial active step: ${activeStep}`);

        // Try clicking Next button
        console.log("Clicking NEXT button on step 0...");
        await page.click('#btnNext');
        await new Promise(r => setTimeout(r, 500));

        activeStep = await page.evaluate(() => {
            const el = document.querySelector('.step-panel.active');
            return el ? el.id : null;
        });
        console.log(`Active step after click: ${activeStep}`);

        // Click description button
        console.log("Opening description panel...");
        await page.click('.page-desc-btn');
        await new Promise(r => setTimeout(r, 500));

        // Unlock
        console.log("Unlocking editing...");
        await page.click('#lockToggleBtn');
        await new Promise(r => setTimeout(r, 500));

        // Add a new mark
        console.log("Adding new mark...");
        await page.evaluate(() => {
            addMark();
        });
        await new Promise(r => setTimeout(r, 500));

        // Save
        console.log("Saving description...");
        await page.click('#lockToggleBtn');
        await new Promise(r => setTimeout(r, 3000)); // wait for save API response

        // Click NEXT button again
        console.log("Clicking NEXT button again...");
        await page.click('#btnNext');
        await new Promise(r => setTimeout(r, 500));

        activeStep = await page.evaluate(() => {
            const el = document.querySelector('.step-panel.active');
            return el ? el.id : null;
        });
        console.log(`Active step after second click: ${activeStep}`);

    } catch (e) {
        console.error("Diagnosis script failed with error:", e);
    } finally {
        await browser.close();
        console.log("=== Diagnosis finished ===");
    }
})();
