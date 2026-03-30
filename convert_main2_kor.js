const fs = require('fs');

let c = fs.readFileSync('main2.html', 'utf8');

// Replace innerHTML of any tag that has data-ko attribute with the value of data-ko
// e.g. <span data-ko="한국어">English</span> -> <span data-ko="한국어">한국어</span>

const regex = /<([a-z0-9]+)([^>]*)data-ko="([^"]+)"([^>]*)>[\s\S]*?<\/\1>/gi;

c = c.replace(regex, '<$1$2data-ko="$3"$4>$3</$1>');

fs.writeFileSync('main2.html', c);
console.log('main2.html updated successfully.');
