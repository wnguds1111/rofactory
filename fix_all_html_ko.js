const fs = require('fs');

const fileNames = [
    'register.html', 'studio_myworks.html', 'studio_inventory.html', 'studio_wishlist.html', 
    'studio_detail.html', 'about.html', 'market.html', 'market_detail.html', 'admin.html', 'admin_detail.html'
];

fileNames.forEach(f => {
    if(!fs.existsSync(f)) return;
    let c = fs.readFileSync(f, 'utf8');
    
    // Replace innerHTML of any tag containing data-ko
    c = c.replace(/<([a-z0-9]+)([^>]*?data-ko="([^"]+)"[^>]*?)>([\s\S]*?)<\/\1>/gi, '<$1$2>$3</$1>');
    
    // Some tags might have other inner tags, but our replace is non-greedy enough for simple tags
    // Let's do a reliable replace for specific known trailing English tags without data-ko:
    c = c.replace(/>Register</g, '>등록<')
         .replace(/>Register Asset</g, '>작품 등록<')
         .replace(/>Footprints</g, '>발자국<')
         .replace(/>Market</g, '>마켓<')
         .replace(/>Option Filter</g, '>옵션 필터<')
         .replace(/>Category</g, '>카테고리<')
         .replace(/>Type</g, '>타입<')
         .replace(/>Color</g, '>색상<')
         .replace(/>Item Name</g, '>작품명<')
         .replace(/>Price</g, '>가격<')
         .replace(/>Tags</g, '>태그<')
         .replace(/>STEP 1</g, '>1단계<')
         .replace(/>STEP 2</g, '>2단계<')
         .replace(/>STEP 3</g, '>3단계<')
         .replace(/>STEP 4</g, '>4단계<');

    fs.writeFileSync(f, c);
});
console.log('Stripped English text and applied data-ko natively.');
