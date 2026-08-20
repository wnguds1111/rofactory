const fs = require('fs');
const fp = 'market.html';
let c = fs.readFileSync(fp, 'utf8');

// 1. Hide X button and 검색 button
c = c.replace(
    '<button class="market-search-btn" style="font-size: 12px;">&#10006;</button>',
    '<button class="market-search-btn" style="font-size: 12px; display:none;">&#10006;</button>'
);
c = c.replace(
    /(<button class="market-search-btn search-submit-btn"[^>]*>)검색(<\/button>)/,
    '$1<span style="display:none;">검색</span>$2'
);

// 2. Make all products FREE (price: 0, isFree: true)
// Replace price and isFree for each product line
c = c.replace(/price:\s*\d+,\s*isFree:\s*false/g, 'price: 0,     isFree: true');
c = c.replace(/price:\s*\d+,\s*isFree:\s*true/g,  'price: 0,     isFree: true');

fs.writeFileSync(fp, c, 'utf8');
console.log('Done: hidden X/검색 buttons, all products set to FREE');
