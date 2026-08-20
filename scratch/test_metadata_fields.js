const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Spin up a quick server to serve files from root
const PORT = 4500;
const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, '..', req.url === '/' ? 'register.html' : req.url.split('?')[0]);
    if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        return res.end("Not Found");
    }
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.css') contentType = 'text/css';
    if (ext === '.js') contentType = 'text/javascript';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
});

server.listen(PORT, async () => {
    console.log(`Test server running on port ${PORT}`);
    const browser = await puppeteer.launch({ headless: true });
    try {
        const page = await browser.newPage();
        
        console.log("Navigating to registration page...");
        await page.goto(`http://localhost:${PORT}/register.html`, { waitUntil: 'networkidle0' });

        // Wait for the elements to render
        const metadataInput = await page.$('#f_meta');
        if (metadataInput) {
            console.log("SUCCESS: Metadata file input '#f_meta' is present in the DOM!");
        } else {
            throw new Error("FAIL: Metadata file input '#f_meta' not found!");
        }

        const metadataBox = await page.evaluate(() => {
            const box = document.getElementById('f_meta').closest('.file-box');
            return box ? box.innerHTML : null;
        });

        if (metadataBox && metadataBox.includes('메타 데이터 파일')) {
            console.log("SUCCESS: Metadata file box correctly displays label '메타 데이터 파일'!");
        } else {
            throw new Error("FAIL: Metadata file box label not found or incorrect!");
        }

        // Test editing page as well
        console.log("Navigating to edit page...");
        await page.goto(`http://localhost:${PORT}/edit.html`, { waitUntil: 'networkidle0' });

        const editMetadataInput = await page.$('#ef_meta');
        if (editMetadataInput) {
            console.log("SUCCESS: Edit page metadata file input '#ef_meta' is present in the DOM!");
        } else {
            throw new Error("FAIL: Edit page metadata file input '#ef_meta' not found!");
        }

        console.log("ALL VERIFICATIONS COMPLETED SUCCESSFULLY!");
    } catch (err) {
        console.error("VERIFICATION FAILED:", err.message);
        process.exit(1);
    } finally {
        await browser.close();
        server.close();
        process.exit(0);
    }
});
