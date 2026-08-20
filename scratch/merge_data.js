const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'description_module', 'desc-data.json');

// Load current data
const currentData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
console.log('Current pages:', Object.keys(currentData.pages));

// Load old data from good commit
const oldData = JSON.parse(
    execSync('git show 43adbbc:description_module/desc-data.json').toString('utf8')
);
console.log('Old pages:', Object.keys(oldData.pages));

// Merge: keep all old pages, overlay current pages on top
const merged = { pages: {} };

// First add all old pages
Object.keys(oldData.pages).forEach(k => {
    merged.pages[k] = oldData.pages[k];
});

// Then add/overlay current pages (these are newer)
Object.keys(currentData.pages).forEach(k => {
    merged.pages[k] = currentData.pages[k];
});

console.log('Merged pages:', Object.keys(merged.pages));

// Write back
fs.writeFileSync(jsonPath, JSON.stringify(merged, null, 2), 'utf8');
console.log('Done! Merged desc-data.json saved.');
