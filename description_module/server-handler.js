const fs = require('fs');
const path = require('path');

/**
 * Creates a handler for the Description Module save API.
 * 
 * @param {Object} options 
 * @param {string} options.mdFilePath - Path to the markdown file where descriptions will be saved
 * @param {string} options.jsonFilePath - Path to the JSON data file (e.g. desc-data.json)
 * @returns {Function} Express/HTTP handler function
 */
module.exports = function createDescSaveHandler(options) {
    const { mdFilePath, jsonFilePath } = options;

    return async function handleSave(data) {
        if (!data.pageKey) {
            throw new Error('Missing pageKey');
        }

        // 1. Update Markdown File
        if (mdFilePath) {
            let mdContent = '';
            if (fs.existsSync(mdFilePath)) {
                mdContent = fs.readFileSync(mdFilePath, 'utf-8');
            }

            let newSection = `## PAGE ${data.pageKey}: ${data.title || '페이지 제목'}\n`;
            if (data.overview && data.overview.trim()) {
                newSection += `${data.overview.trim()}\n`;
            }
            newSection += `\n`;

            if (data.marks && data.marks.length > 0) {
                data.marks.forEach((m, idx) => {
                    let suffix = '';
                    if (m.selector && m.selector.trim()) {
                        suffix += ` {selector:${m.selector.trim()}}`;
                    }
                    newSection += `${idx + 1}. **${m.title || '제목'}**: ${m.sub || '설명'}${suffix}\n`;
                });
            } else {
                newSection += `\n`;
            }

            const sections = mdContent.split(/(?=## PAGE )/);
            let updated = false;
            const targetHeader = `## PAGE ${data.pageKey}`;

            for (let i = 0; i < sections.length; i++) {
                const section = sections[i];
                if (section.startsWith(targetHeader)) {
                    const nextChar = section.substring(targetHeader.length, targetHeader.length + 1);
                    if (nextChar === ':' || nextChar === ' ' || nextChar === '\n' || nextChar === '\r') {
                        let suffixDivider = '';
                        if (section.includes('---')) {
                            suffixDivider = '\n---\n\n';
                        }
                        sections[i] = newSection + suffixDivider;
                        updated = true;
                        break;
                    }
                }
            }

            if (!updated) {
                sections.push('\n---\n\n' + newSection);
            }

            fs.writeFileSync(mdFilePath, sections.join(''), 'utf-8');
        }

        // 2. Update JSON Data File
        if (jsonFilePath) {
            let jsonData = { pages: {} };
            if (fs.existsSync(jsonFilePath)) {
                try {
                    jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
                } catch (err) {
                    console.error('Error parsing local desc-data.json:', err);
                }
            }
            jsonData.pages = jsonData.pages || {};
            jsonData.pages[data.pageKey] = {
                title: data.title || '',
                overview: (data.overview || '').trim(),
                marks: (data.marks || []).map(m => ({
                    id: m.id,
                    num: m.num,
                    label: m.label,
                    depth: m.depth || 0,
                    title: m.title,
                    sub: m.sub,
                    top: m.top,
                    left: m.left,
                    selector: m.selector || ''
                }))
            };
            fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');
        }

        return { success: true };
    };
};
