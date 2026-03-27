const fs = require('fs');

const dir = 'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filePath = `${dir}\\${file}`;
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(/family=Pretendard:wght/g, 'family=Poppins:wght');
    content = content.replace(/Use Pretendard/g, 'Use Poppins');
    content = content.replace(/border-radius: 50px;/g, 'border-radius: 8px;');
    content = content.replace(/border-radius: 30px;/g, 'border-radius: 12px;');
    content = content.replace(/border-radius: 20px;/g, 'border-radius: 12px;');
    content = content.replace(/border-radius:50px;/g, 'border-radius: 8px;');
    content = content.replace(/border-radius:30px;/g, 'border-radius:12px;');
    content = content.replace(/border-radius:20px;/g, 'border-radius:12px;');
    
    fs.writeFileSync(filePath, content, 'utf8');
});

const cssPath = `${dir}\\styles.css`;
let cssContent = fs.readFileSync(cssPath, 'utf8');
cssContent = cssContent.replace(/border-radius: 50px;/g, 'border-radius: 8px;');
cssContent = cssContent.replace(/border-radius: 30px;/g, 'border-radius: 12px;');
cssContent = cssContent.replace(/border-radius: 20px;/g, 'border-radius: 12px;');
cssContent = cssContent.replace(/border-radius: 28px;/g, 'border-radius: 12px;');
cssContent = cssContent.replace(/border-radius: 24px;/g, 'border-radius: 12px;');
fs.writeFileSync(cssPath, cssContent, 'utf8');

console.log("Batch ROZ styling update applied successfully.");
