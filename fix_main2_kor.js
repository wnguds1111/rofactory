const fs = require('fs');
let c = fs.readFileSync('main2.html', 'utf8');

c = c.replace(/<([^>\s]+)([^>]+data-ko="([^"]+)"[^>]*)>.*?<\/\1>/gi, '<$1$2>$3</$1>');

// That still breaks on `<br>` inside attributes because `[^>]` thinks `>` is the end of the tag. 
// Let's do a reliable replacement using String.prototype.replace callback:
c = fs.readFileSync('main2.html', 'utf8');
c = c.replace(/<([a-z0-9]+)([\s\S]*?)>([\s\S]*?)<\/\1>/gi, (match, tag, attrs, inner) => {
    // If attrs contains data-ko="...", ignoring nested brackets for simplicity
    let m = attrs.match(/data-ko="([^"]+)"/);
    if (m) {
        return `<${tag}${attrs}>${m[1]}</${tag}>`;
    }
    return match;
});

fs.writeFileSync('main2.html', c);
console.log('Finished updating main2.html strings.');
