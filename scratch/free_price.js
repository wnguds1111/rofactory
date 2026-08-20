const fs = require('fs');
['studio_wishlist.html', 'studio_myworks.html', 'studio_inventory.html'].forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/price:\s*"[^"]+"/g, 'price:"FREE"');
    fs.writeFileSync(f, c);
    console.log(f + ' updated');
});
