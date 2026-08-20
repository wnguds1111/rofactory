const puppeteer = require('puppeteer');

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    let alertMsg = null;
    page.on('dialog', async dialog => {
        alertMsg = dialog.message();
        console.log(`Alert dialog shown: "${alertMsg}"`);
        await dialog.accept();
    });

    page.on('console', msg => {
        console.log(`BROWSER CONSOLE ${msg.type().toUpperCase()}: ${msg.text()}`);
    });
    
    console.log("Navigating to register.html...");
    await page.goto('http://localhost:3000/register.html', { waitUntil: 'networkidle0' });
    
    // Check if the description button is visible
    const descBtn = await page.$('.page-desc-btn');
    if (!descBtn) {
        console.log("Error: .page-desc-btn not found!");
        await browser.close();
        return;
    }
    
    console.log("Clicking .page-desc-btn...");
    await page.click('.page-desc-btn');
    await new Promise(r => setTimeout(r, 500));
    
    // Check if lockToggleBtn is visible
    const lockBtn = await page.$('#lockToggleBtn');
    if (!lockBtn) {
        console.log("Error: #lockToggleBtn not found!");
        await browser.close();
        return;
    }
    
    console.log("Clicking #lockToggleBtn to unlock...");
    await page.click('#lockToggleBtn');
    await new Promise(r => setTimeout(r, 500));
    
    // Add a new mark
    console.log("Adding a new mark...");
    await page.evaluate(() => {
        addMark();
    });
    await new Promise(r => setTimeout(r, 500));
    
    // Click save
    console.log("Clicking #lockToggleBtn to save...");
    await page.click('#lockToggleBtn');
    
    // Wait for alert/dialog
    console.log("Waiting for dialog...");
    await new Promise(r => setTimeout(r, 5000));
    
    console.log("Done. Alert message received:", alertMsg);
    await browser.close();
})();
