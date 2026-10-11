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


// 파일을 쓰는 API(/api/save, /api/contest-policy/save)는 이 PC(localhost)에서 직접 온 요청만 허용
// (Railway 등 프록시를 거친 요청은 x-forwarded-for 헤더가 붙으므로 거부됨)
function isLocalRequest(req) {
    if (req.headers['x-forwarded-for']) return false;
    const remote = (req.socket.remoteAddress || '').replace(/^::ffff:/, '');
    return remote === '127.0.0.1' || remote === '::1';
}

function rejectNonLocal(res) {
    res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ error: '저장은 로컬 서버(localhost)에서만 가능합니다.' }));
}

const server = http.createServer(async (req, res) => {
    // API endpoint: Save description marks to MD file
    if (req.method === 'POST' && req.url === '/api/save') {
        if (!isLocalRequest(req)) return rejectNonLocal(res);
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
        if (!isLocalRequest(req)) return rejectNonLocal(res);
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

    // 프로젝트 폴더 밖의 파일 요청 차단 (../ 경로 이동 방지)
    const resolvedPath = path.resolve(filePath);
    if (resolvedPath !== PUBLIC_DIR && !resolvedPath.startsWith(PUBLIC_DIR + path.sep)) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        return res.end('<h1>403 Forbidden</h1>', 'utf-8');
    }
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
