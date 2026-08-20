const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'description_module', 'desc-script.js');
let content = fs.readFileSync(targetPath, 'utf8');

// Inject DescConfig loading
const configInjection = `
window.DescConfig = window.DescConfig || {};
const STORAGE_PREFIX = window.DescConfig.storagePrefix || 'rofactory_';
const GITHUB_REPO = window.DescConfig.githubRepo || 'wnguds1111/rofactory';
const GITHUB_PATH = window.DescConfig.githubPath || 'description_module/desc-data.json';
const FALLBACK_TOKEN_PARTS = window.DescConfig.githubTokenParts || ['ghp_Xxy', 'U1Po6oKHa', 'hLJyWS8t69', 'ooIzhpch0fgT4e'];
const JSON_URL = window.DescConfig.jsonUrl || (window.descModuleBasePath + 'description_module/desc-data.json');
`;

content = content.replace(/(window\.isLocalEnv = false;)/, `$1\n${configInjection}`);

// Replace Local Storage Keys
content = content.replace(/'rofactory_desc_panel_locked'/g, 'STORAGE_PREFIX + "desc_panel_locked"');
content = content.replace(/'rofactory_github_token'/g, 'STORAGE_PREFIX + "github_token"');
content = content.replace(/'rofactory_desc_panel_active'/g, 'STORAGE_PREFIX + "desc_panel_active"');
content = content.replace(/'rofactory_desc_drafts'/g, 'STORAGE_PREFIX + "desc_drafts"');
content = content.replace(/'rofactory_desc_all_pages_data'/g, 'STORAGE_PREFIX + "desc_all_pages_data"');

// Replace JSON URL
content = content.replace(/const jsonUrl = window\.descModuleBasePath \+ 'description_module\/desc-data\.json';/, 'const jsonUrl = JSON_URL;');

// Replace GitHub Sync logic
content = content.replace(
    /const _a = 'ghp_Xxy', _b = 'U1Po6oKHa', _c = 'hLJyWS8t69', _d = 'ooIzhpch0fgT4e';\s*const token = localStorage\.getItem\('rofactory_github_token'\) \|\| \(_a \+ _b \+ _c \+ _d\);/,
    `const token = localStorage.getItem(STORAGE_PREFIX + "github_token") || FALLBACK_TOKEN_PARTS.join('');`
);
// Make sure this doesn't fail if we already replaced rofactory_github_token
content = content.replace(
    /const _a = 'ghp_Xxy', _b = 'U1Po6oKHa', _c = 'hLJyWS8t69', _d = 'ooIzhpch0fgT4e';\s*const token = localStorage\.getItem\(STORAGE_PREFIX \+ "github_token"\) \|\| \(_a \+ _b \+ _c \+ _d\);/,
    `const token = localStorage.getItem(STORAGE_PREFIX + "github_token") || FALLBACK_TOKEN_PARTS.join('');`
);


content = content.replace(
    /const apiUrl = 'https:\/\/api\.github\.com\/repos\/wnguds1111\/rofactory\/contents\/description_module\/desc-data\.json';/,
    `const apiUrl = 'https://api.github.com/repos/' + GITHUB_REPO + '/contents/' + GITHUB_PATH;`
);

fs.writeFileSync(targetPath, content, 'utf8');
console.log("Refactored desc-script.js successfully.");
