const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
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


// IP Whitelist Configuration (23 User Specified IPs + Localhost)
const ALLOWED_IPS = new Set([
    '127.0.0.1',
    '::1',
    '::ffff:127.0.0.1',
    'localhost',
    '119.192.146.201',
    '119.192.146.202',
    '119.192.146.203',
    '119.192.146.108',
    '203.156.9.212',
    '203.156.9.213',
    '203.156.9.214',
    '202.93.27.166',
    '202.93.27.78',
    '202.93.26.134',
    '175.138.142.52',
    '175.138.142.54',
    '202.55.94.251',
    '202.55.94.250',
    '202.93.27.162',
    '202.42.99.54',
    '125.26.15.54',
    '49.124.216.106',
    '180.155.10.82',
    '202.6.229.194',
    '193.186.4.148',
    '39.157.88.93',
    '187.15.156.158'
]);

function getClientIP(req) {
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
        const firstIp = forwarded.split(',')[0].trim();
        return firstIp.replace(/^::ffff:/, '');
    }
    const remote = req.socket.remoteAddress || '';
    return remote.replace(/^::ffff:/, '');
}

function isAllowedIP(ip) {
    if (!ip) return false;
    if (ALLOWED_IPS.has(ip)) return true;
    return false;
}

const server = http.createServer(async (req, res) => {
    // 🛡️ IP Whitelist Middleware Check
    const clientIP = getClientIP(req);
    if (!isAllowedIP(clientIP)) {
        console.warn(`[Blocked Access] Unauthorized IP attempt: ${clientIP} on ${req.url}`);
        res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(`
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <title>403 Access Denied</title>
                <style>
                    body { font-family: sans-serif; background: #0f172a; color: #ffffff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                    .card { background: #1e293b; border: 1.5px solid #ef4444; border-radius: 12px; padding: 32px; max-width: 480px; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
                    h2 { color: #f87171; margin-bottom: 12px; }
                    p { color: #cbd5e1; font-size: 14px; line-height: 1.6; }
                    .ip { font-weight: bold; color: #fca5a5; background: rgba(239,68,68,0.2); padding: 4px 8px; border-radius: 4px; font-family: monospace; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2>🔒 Access Denied (접근 거부)</h2>
                    <p>허용되지 않은 IP(<span class="ip">${clientIP}</span>)에서의 접근입니다.<br>인가된 IP 목록에서만 접근 가능합니다.</p>
                </div>
            </body>
            </html>
        `);
    }

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
