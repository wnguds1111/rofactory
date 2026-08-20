const fs = require('fs');

const file = 'description_module/desc-data.json';
if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('판매 포인트')) {
        console.log("Found '판매 포인트' in desc-data.json");
    }
    if (content.includes('구매하기')) {
        console.log("Found '구매하기' in desc-data.json");
    }
} else {
    console.log("desc-data.json not found");
}
