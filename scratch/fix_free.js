const fs = require('fs');
const fp = 'market.html';
let c = fs.readFileSync(fp, 'utf8');

const old = '<button class="f-btn" data-val="0"><span data-en="Free" data-ko="무료">무료</span></button>';
const rep = '<button class="f-btn active" data-val="0"><span data-en="Free" data-ko="무료">무료</span></button>';

if (c.includes(old)) {
    c = c.replace(old, rep);
    fs.writeFileSync(fp, c, 'utf8');
    console.log('Done: added active class to Free button');
} else {
    console.log('Pattern not found');
}
