const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'server.js');
let code = fs.readFileSync(targetPath, 'utf8');

const ipListCode = `
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
`;

const middlewareCheckCode = `const server = http.createServer(async (req, res) => {
    // 🛡️ IP Whitelist Middleware Check
    const clientIP = getClientIP(req);
    if (!isAllowedIP(clientIP)) {
        console.warn(\`[Blocked Access] Unauthorized IP attempt: \${clientIP} on \${req.url}\`);
        res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(\`
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
                    <p>허용되지 않은 IP(<span class="ip">\${clientIP}</span>)에서의 접근입니다.<br>인가된 IP 목록에서만 접근 가능합니다.</p>
                </div>
            </body>
            </html>
        \`);
    }
`;

// Insert IP List before http.createServer
if (!code.includes('ALLOWED_IPS')) {
    code = code.replace('const server = http.createServer', ipListCode + '\nconst server = http.createServer');
    code = code.replace('const server = http.createServer(async (req, res) => {', middlewareCheckCode);
    fs.writeFileSync(targetPath, code, 'utf8');
    console.log('Successfully added IP Whitelist Middleware to server.js!');
} else {
    console.log('ALLOWED_IPS already present in server.js');
}
