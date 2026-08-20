const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;
const MD_FILE_PATH = path.join(__dirname, 'RO_Factory_Detailed_Features.md');

const createDescSaveHandler = require('./description_module/server-handler');
const descSaveHandler = createDescSaveHandler({
    mdFilePath: path.join(__dirname, 'RO_Factory_Detailed_Features.md'),
    jsonFilePath: path.join(__dirname, 'description_module', 'desc-data.json')
});

function getBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => resolve(body));
        req.on('error', err => reject(err));
    });
}

const server = http.createServer(async (req, res) => {
    // API endpoint: Save description marks to MD file
    if (req.method === 'POST' && req.url === '/api/save') {
        try {
            const bodyStr = await getBody(req);
            const data = JSON.parse(bodyStr); // { pageKey, title, overview, marks }
            
            await descSaveHandler(data);

            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            return res.end(JSON.stringify({ success: true }));
        } catch (e) {
            console.error(e);
            const status = e.message === 'Missing pageKey' ? 400 : 500;
            res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            return res.end(JSON.stringify({ error: e.message }));
        }
    }

    // API endpoint: Save contest policy HTML edits
    if (req.method === 'POST' && req.url === '/api/contest-policy/save') {
        try {
            const bodyStr = await getBody(req);
            const data = JSON.parse(bodyStr);
            if (data.htmlContent) {
                fs.writeFileSync(path.join(__dirname, 'contest_policy.html'), data.htmlContent, 'utf-8');
            }
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            return res.end(JSON.stringify({ success: true }));
        } catch (e) {
            console.error(e);
            res.writeHead(500, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            return res.end(JSON.stringify({ error: e.message }));
        }
    }

    // CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        return res.end();
    }

    // Serve static files
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url.split('?')[0]);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        const indexHtml = path.join(filePath, 'index.html');
        const registerHtml = path.join(filePath, 'register.html');
        if (fs.existsSync(indexHtml)) {
            filePath = indexHtml;
        } else if (fs.existsSync(registerHtml)) {
            filePath = registerHtml;
        }
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.woff2': 'application/font-woff2',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`  RO Factory Local Web Server running!`);
    console.log(`  URL: http://localhost:${PORT}`);
    console.log(`  Now, any edits you make in the browser will be`);
    console.log(`  automatically written to RO_Factory_Detailed_Features.md!`);
    console.log(`==================================================`);
});
