const fs = require('fs');

const fileNames = [
    'register.html', 'studio_myworks.html', 'studio_inventory.html', 'studio_wishlist.html', 
    'studio_detail.html', 'about.html', 'market.html', 'market_detail.html'
];

fileNames.forEach(f => {
    if(!fs.existsSync(f)) return;
    let c = fs.readFileSync(f, 'utf8');
    
    // Replace <span data-en="English" data-ko="Korean">Korean</span> with English text
    let re = /<span(?=.*?data-en="([^"]*)")[^>]*>.*?<\/span>/g;
    c = c.replace(re, '$1');

    fs.writeFileSync(f, c);
});
console.log('Spans stripped to English.');
