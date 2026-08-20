const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'server.js');
let content = fs.readFileSync(targetPath, 'utf8');

// The new logic requires require('./description_module/server-handler')
const requireCode = `const createDescSaveHandler = require('./description_module/server-handler');
const descSaveHandler = createDescSaveHandler({
    mdFilePath: path.join(__dirname, 'RO_Factory_Detailed_Features.md'),
    jsonFilePath: path.join(__dirname, 'description_module', 'desc-data.json')
});`;

content = content.replace(/(const MD_FILE_PATH = path\.join\(__dirname, 'RO_Factory_Detailed_Features\.md'\);)/, `$1\n\n${requireCode}`);

// Now replace the inside of /api/save
const apiSaveBlockRegex = /if \(req\.method === 'POST' && req\.url === '\/api\/save'\) \{[\s\S]*?(?=\s+\/\/ CORS preflight requests)/;

const newApiSaveBlock = `if (req.method === 'POST' && req.url === '/api/save') {
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
    }`;

content = content.replace(apiSaveBlockRegex, newApiSaveBlock);

fs.writeFileSync(targetPath, content, 'utf8');
console.log("Refactored server.js successfully.");
