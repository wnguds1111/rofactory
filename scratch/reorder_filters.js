const fs = require('fs');
const fp = 'market.html';
let c = fs.readFileSync(fp, 'utf8');
const lines = c.split('\n');

// Extract blocks (0-indexed: line 390 to 437 = index 390-437)
// Type block: lines 391-398 (index 390-397)
const typeBlock = lines.slice(390, 399).join('\n'); // includes trailing blank line at 399
// Color block: lines 400-410 (index 399-409)  
const colorBlock = lines.slice(399, 411).join('\n'); // includes trailing blank line
// Price block: lines 412-429 (index 411-429)
const priceBlock = lines.slice(411, 430).join('\n'); // includes trailing blank line  
// Sort block: lines 431-438 (index 430-438)
const sortBlock = lines.slice(430, 438).join('\n');

// New order: Price, Sort, Type, Color
const newSection = [priceBlock, '', sortBlock, '', typeBlock, colorBlock].join('\n');

// Replace lines 391-438 (index 390-437)
const before = lines.slice(0, 390);
const after = lines.slice(438);
const result = [...before, newSection, ...after].join('\n');

fs.writeFileSync(fp, result, 'utf8');
console.log('Done: reordered filter sections');
