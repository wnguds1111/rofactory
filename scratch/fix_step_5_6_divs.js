const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

html = html.replace('</div>\n                    </div>\n                    </div>\n\n                    <!-- Proposal Box:', '</div>\n\n                    <!-- Proposal Box:');

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Cleaned up closing divs after Step 09!');
