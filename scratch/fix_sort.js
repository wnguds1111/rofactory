const fs = require('fs');
const fp = 'market.html';
let c = fs.readFileSync(fp, 'utf8');

// NEW
c = c.replace(
    '<button class="f-btn" data-val="new" data-en="NEW" data-ko="신상품">신상품</button>',
    '<button class="f-btn" data-val="new">NEW</button>'
);

// BEST (was 인기순/Trending)
c = c.replace(
    '<button class="f-btn" data-val="trending" data-en="Trending" data-ko="인기순">인기순</button>',
    '<button class="f-btn" data-val="trending">BEST</button>'
);

// TRENDING (was 추천순/Best)
c = c.replace(
    '<button class="f-btn" data-val="best" data-en="Best" data-ko="추천순">추천순</button>',
    '<button class="f-btn" data-val="best">TRENDING</button>'
);

fs.writeFileSync(fp, c, 'utf8');
console.log('Done: sort buttons fixed to English');
