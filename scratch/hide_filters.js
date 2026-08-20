const fs = require('fs');
const fp = 'market.html';
let c = fs.readFileSync(fp, 'utf8');

// Hide Category filter group
c = c.replace(
    '<div class="filter-group filter-category">',
    '<div class="filter-group filter-category" style="display:none;">'
);

// Hide Price filter group
c = c.replace(
    /(<div class="filter-group">\s*\n\s*<div class="filter-title"><span data-en="Price")/,
    '<div class="filter-group" style="display:none;">\n                        <div class="filter-title"><span data-en="Price"'
);

fs.writeFileSync(fp, c, 'utf8');
console.log('Done: hidden Category and Price filters');
