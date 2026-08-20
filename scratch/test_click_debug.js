const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log(`[CONSOLE] ${msg.text()}`));
    page.on('pageerror', err => console.error(`[PAGE ERROR] ${err.toString()}`));

    await page.goto('http://localhost:3000/register.html', { waitUntil: 'networkidle0' });
    
    // Move to step 2
    await page.click('#btnNext');
    await new Promise(r => setTimeout(r, 500));
    await page.click('#btnNext');
    await new Promise(r => setTimeout(r, 500));
    
    console.log("Current active panel ID:", await page.evaluate(() => {
        const el = document.querySelector('.step-panel.active');
        return el ? el.id : null;
    }));

    // Check modal class before click
    console.log("Modal classes before click:", await page.evaluate(() => {
        return document.getElementById('termsModal').className;
    }));

    // Click terms link
    console.log("Clicking terms link...");
    await page.click('.custom-chk a');
    await new Promise(r => setTimeout(r, 500));

    // Print details about the elements
    const elementDetails = await page.evaluate(() => {
        const a = document.querySelector('.custom-chk a');
        const label = document.querySelector('.custom-chk');
        const checkbox = document.querySelector('#termsChk');
        return {
            a: a ? {
                text: a.innerText,
                rect: a.getBoundingClientRect().toJSON(),
                offsetParent: a.offsetParent ? a.offsetParent.tagName : null,
                style: window.getComputedStyle(a).cssText.substring(0, 100)
            } : null,
            label: label ? {
                rect: label.getBoundingClientRect().toJSON(),
                style: window.getComputedStyle(label).cssText.substring(0, 100)
            } : null,
            checkbox: checkbox ? {
                rect: checkbox.getBoundingClientRect().toJSON(),
                checked: checkbox.checked,
                disabled: checkbox.disabled
            } : null
        };
    });
    console.log("Element Details:", JSON.stringify(elementDetails, null, 2));

    // Click terms link via Puppeteer
    console.log("Clicking terms link via Puppeteer...");
    try {
        await page.click('.custom-chk a');
    } catch (e) {
        console.error("Puppeteer click failed:", e.message);
    }
    await new Promise(r => setTimeout(r, 500));

    // Check modal class after click
    console.log("Modal classes after Puppeteer click:", await page.evaluate(() => {
        return document.getElementById('termsModal').className;
    }));

    // Reset modal classes
    await page.evaluate(() => {
        document.getElementById('termsModal').classList.remove('show');
    });

    // Click terms link via DOM
    console.log("Clicking terms link via DOM click()...");
    await page.evaluate(() => {
        document.querySelector('.custom-chk a').click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Check modal class after DOM click
    console.log("Modal classes after DOM click:", await page.evaluate(() => {
        return document.getElementById('termsModal').className;
    }));

    // Call forceOpenTerms directly
    console.log("Calling forceOpenTerms directly...");
    await page.evaluate(() => {
        forceOpenTerms(new Event('click'));
    });

    console.log("Modal classes after direct call:", await page.evaluate(() => {
        return document.getElementById('termsModal').className;
    }));

    await browser.close();
})();
