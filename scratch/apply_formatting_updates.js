const fs = require('fs');
const path = require('path');

const policyPath = path.join(__dirname, '..', 'contest_policy.html');
const eventPath = path.join(__dirname, '..', 'contest_event.html');
const votePath = path.join(__dirname, '..', 'contest_vote.html');

// Helper function to strip all emojis
function removeEmojis(str) {
    return str.replace(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F1E6}-\u{1F1FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA70}-\u{1FAFF}]/gu, '');
}

// ----------------------------------------------------
// 1. UPDATE contest_policy.html
// ----------------------------------------------------
let policyHtml = fs.readFileSync(policyPath, 'utf8');

// Strip all emojis from policyHtml
policyHtml = removeEmojis(policyHtml);

// Fix double spaces left by emoji removal
policyHtml = policyHtml.replace(/\s+/g, ' '); // We must be careful not to break tags with whitespace replace!
// Let's do a targeted replace for common emoji strings instead of global space collapse
policyHtml = fs.readFileSync(policyPath, 'utf8');

const emojisToRemove = ['🏆', '📅', '🎨', '🎟️', '🎟', '🛡️', '🛡', '🤖', '📢', '🗳️', '🗳', '🛒', '📋', '✏️', '✏', '💾', '🔄', '⚡', '👣', '🔥', '🌸', '🗑️', '🗑', '✅', '⚠️', '❌', '🆕', '➕', '💡', '🔔', '⬇️', '⬇'];

emojisToRemove.forEach(e => {
    policyHtml = policyHtml.split(e).join('');
});

// Update step arrow size and style (replace empty arrow containers with large text arrow ↓)
policyHtml = policyHtml.replace(/<div style="text-align:center; color:#94a3b8; font-size:18px; font-weight:900; margin:2px 0;"><\/div>/g, 
    '<div style="text-align:center; color:#64748b; font-size:32px; font-weight:900; margin:8px 0; line-height:1;">↓</div>');

// Update Step Titles font-size: 15px -> 16px (and 15.5px -> 16px)
policyHtml = policyHtml.replace(/font-size:15px; font-weight:900; color:#0f172a;/g, 'font-size:16px; font-weight:900; color:#0f172a;');
policyHtml = policyHtml.replace(/font-size:15.5px; font-weight:900; color:#064e3b;/g, 'font-size:16px; font-weight:900; color:#064e3b;');

// Update Step Description font-size: 16px -> 15px
policyHtml = policyHtml.replace(/font-size:16px; color:#334155; line-height:1.6;/g, 'font-size:15px; color:#334155; line-height:1.6;');
policyHtml = policyHtml.replace(/font-size:16px; color:#047857; line-height:1.6;/g, 'font-size:15px; color:#047857; line-height:1.6;');
policyHtml = policyHtml.replace(/font-size:16px; color:#dcfce7; line-height:1.6;/g, 'font-size:15px; color:#dcfce7; line-height:1.6;');

// Update Considerations (고려사항) font-size: 12.5px -> 14.5px (+2px)
policyHtml = policyHtml.replace(/font-size:12.5px; color:#475569; line-height:1.6;/g, 'font-size:14.5px; color:#475569; line-height:1.6;');
policyHtml = policyHtml.replace(/font-size:12.5px; color:#065f46; line-height:1.6;/g, 'font-size:14.5px; color:#065f46; line-height:1.6;');
policyHtml = policyHtml.replace(/font-size:12.5px; color:#f0fdf4; line-height:1.6;/g, 'font-size:14.5px; color:#f0fdf4; line-height:1.6;');
policyHtml = policyHtml.replace(/font-size:12.5px; color:#475569; line-height:1.7;/g, 'font-size:14.5px; color:#475569; line-height:1.7;');

// Save updated contest_policy.html
fs.writeFileSync(policyPath, policyHtml, 'utf8');
console.log('Updated contest_policy.html successfully!');

// ----------------------------------------------------
// 2. UPDATE contest_event.html
// ----------------------------------------------------
if (fs.existsSync(eventPath)) {
    let eventHtml = fs.readFileSync(eventPath, 'utf8');
    emojisToRemove.forEach(e => {
        eventHtml = eventHtml.split(e).join('');
    });
    fs.writeFileSync(eventPath, eventHtml, 'utf8');
    console.log('Updated contest_event.html successfully!');
}

// ----------------------------------------------------
// 3. UPDATE contest_vote.html
// ----------------------------------------------------
if (fs.existsSync(votePath)) {
    let voteHtml = fs.readFileSync(votePath, 'utf8');
    emojisToRemove.forEach(e => {
        voteHtml = voteHtml.split(e).join('');
    });
    fs.writeFileSync(votePath, voteHtml, 'utf8');
    console.log('Updated contest_vote.html successfully!');
}
