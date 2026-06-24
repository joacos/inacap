const fs = require('fs');

const bundleStr = fs.readFileSync('public/construccion_bundle.js', 'utf8');

// Find an array of objects that have "year" or "title" or "id" and "image"
// The structure in the previous page was usually stored in a variable. Let's just look for something containing "description" and "image"
const regex = /\[(?:(?:\{[^{}]*\}|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|[^\[\]])*?)\]/g;
const matches = bundleStr.match(regex);

let found = null;
if (matches) {
    for (const match of matches) {
        if (match.includes('"title"') && match.includes('"description"') && match.includes('"year"')) {
            // It might be a JS array literal, not strictly JSON
            // We can try to parse it using a Function constructor or eval
            try {
                // Ensure it's safe-ish
                const parseFn = new Function('return ' + match + ';');
                const arr = parseFn();
                if (Array.isArray(arr) && arr.length > 5) {
                    found = arr;
                    break;
                }
            } catch (e) {
                // Ignore parse errors, try next
            }
        }
    }
}

if (found) {
    fs.writeFileSync('public/construccion_milestones.json', JSON.stringify(found, null, 2));
    console.log("Successfully extracted " + found.length + " items.");
} else {
    // If exact regex fails, try a looser one for just object literals
    console.log("Could not extract data via array match. Need deeper analysis.");
}
