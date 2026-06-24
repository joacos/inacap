const fs = require('fs');
const content = fs.readFileSync('all_milestones_raw.txt', 'utf8');
const lines = content.trim().split('\n');
const parsed = lines.map(line => {
  // Wrap line in an array and evaluate it safely to get the object
  try {
    return eval('([' + line + '])')[0];
  } catch (e) {
    console.error("Failed to parse line:", line);
    return null;
  }
}).filter(x => x !== null);

fs.writeFileSync('public/all_milestones.json', JSON.stringify(parsed, null, 2));
console.log(`Saved ${parsed.length} milestones to public/all_milestones.json`);
