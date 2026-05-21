const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;
const MD_FILE_PATH = path.join(__dirname, 'RO_Factory_Detailed_Features.md');

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
            
            if (!data.pageKey) {
                res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                return res.end(JSON.stringify({ error: 'Missing pageKey' }));
            }

            let mdContent = '';
            if (fs.existsSync(MD_FILE_PATH)) {
                mdContent = fs.readFileSync(MD_FILE_PATH, 'utf-8');
            }

            // Generate updated markdown section
            let newSection = `## PAGE ${data.pageKey}: ${data.title || '페이지 제목'}\n`;
            if (data.overview && data.overview.trim()) {
                newSection += `${data.overview.trim()}\n`;
            }
            newSection += `\n`;

            if (data.marks && data.marks.length > 0) {
                data.marks.forEach((m, idx) => {
                    let suffix = '';
                    if (m.selector && m.selector.trim()) {
                        suffix += ` {selector:${m.selector.trim()}}`;
                    }
                    newSection += `${idx + 1}. **${m.title || '제목'}**: ${m.sub || '설명'}${suffix}\n`;
                });
            } else {
                newSection += `\n`;
            }

            // Split markdown content by headings to replace the target block
            // Use split with lookahead regex for PAGE headers
            const sections = mdContent.split(/(?=## PAGE )/);
            let updated = false;
            const targetHeader = `## PAGE ${data.pageKey}`;

            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                if (section.startsWith(targetHeader)) {
                    // Check if the next character matches the pageKey end
                    const nextChar = section.substring(targetHeader.length, targetHeader.length + 1);
                    if (nextChar === ':' || nextChar === ' ' || nextChar === '\n' || nextChar === '\r') {
                        // Keep trailing rule divider if present
                        let suffixDivider = '';
                        if (section.includes('---')) {
                            suffixDivider = '\n---\n\n';
                        }
                        sections[i] = newSection + suffixDivider;
                        updated = true;
                        break;
                    }
                }
            }

            if (!updated) {
                // Append as new section
                sections.push('\n---\n\n' + newSection);
            }

            const newContent = sections.join('');
            fs.writeFileSync(MD_FILE_PATH, newContent, 'utf-8');

            // Also save to desc-data.json locally
            const jsonPath = path.join(__dirname, 'description_module', 'desc-data.json');
            let jsonData = { pages: {} };
            if (fs.existsSync(jsonPath)) {
                try {
                    jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
                } catch (jsonErr) {
                    console.error('Error parsing local desc-data.json:', jsonErr);
                }
            }
            jsonData.pages = jsonData.pages || {};
            jsonData.pages[data.pageKey] = {
                title: data.title || '',
                overview: (data.overview || '').trim(),
                marks: (data.marks || []).map(m => ({
                    id: m.id,
                    num: m.num,
                    label: m.label,
                    depth: m.depth || 0,
                    title: m.title,
                    sub: m.sub,
                    top: m.top,
                    left: m.left,
                    selector: m.selector || ''
                }))
            };
            fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf-8');

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
