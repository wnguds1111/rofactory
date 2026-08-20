const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    const url = 'https://gravity.dooray.com/share/pages/gpEHonYVS0Sn1-Jjzy_zDg';
    console.log(`Navigating to ${url}...`);
    
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        console.log("Page loaded. Waiting 5 seconds for React to render...");
        await new Promise(r => setTimeout(r, 5000));
        
        // Let's get the innerText of the body first to see if content is loaded
        const bodyText = await page.evaluate(() => document.body.innerText);
        console.log("Body text length:", bodyText.length);
        
        // Let's also look for common Dooray class names or structural content container
        const content = await page.evaluate(() => {
            // Dooray share page usually renders a document in some viewer
            // Let's look for markdown container, post body, or article body
            const article = document.querySelector('article') || 
                            document.querySelector('.post-body') || 
                            document.querySelector('.wiki-body') ||
                            document.querySelector('.dooray-shared-page') ||
                            document.querySelector('#root');
            return article ? article.innerText : document.body.innerText;
        });

        // Save raw html also to debug if needed
        const rawHtml = await page.evaluate(() => document.body.innerHTML);
        fs.writeFileSync(path.join(__dirname, 'dooray_raw.html'), rawHtml);
        
        fs.writeFileSync(path.join(__dirname, 'dooray_content.txt'), content);
        console.log("Content written successfully to dooray_content.txt");
    } catch (e) {
        console.error("Error occurred:", e);
    } finally {
        await browser.close();
    }
})();
