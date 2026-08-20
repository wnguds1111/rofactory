const { execSync } = require('child_process');

const commits = execSync('git log --oneline -- market_detail.html').toString().split('\n').filter(Boolean);

for (const commitLine of commits) {
    const hash = commitLine.split(' ')[0];
    try {
        const content = execSync(`git show ${hash}:market_detail.html`, { maxBuffer: 10 * 1024 * 1024 }).toString('utf8');
        const hasCorruption = content.includes('?') || content.includes('?여') || content.includes('발자');
        console.log(`Commit ${hash}: ${hasCorruption ? 'Corrupted' : 'CLEAN'} - ${commitLine}`);
    } catch (e) {
        console.log(`Commit ${hash}: Error reading`);
    }
}
