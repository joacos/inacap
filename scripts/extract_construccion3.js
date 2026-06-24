const fs = require('fs');

const bundleStr = fs.readFileSync('public/construccion_bundle.js', 'utf8');

const testRegex = /\{id:\d+[^}]*title:"[^"]+"[^}]*\}/g;
const testMatches = bundleStr.match(testRegex);
if(testMatches) {
    console.log("Found " + testMatches.length + " items.");
    
    // Some objects might have nested objects or arrays if the regex caught too much or too little.
    // Let's try to parse them with a more robust regex to find the array variable.
}

const arrRegex = /const \w+=(\[\{id:1,year:"1902".*?\]);/
const arrMatch = bundleStr.match(arrRegex);
if(arrMatch) {
   const parseFn = new Function('return ' + arrMatch[1] + ';');
   const arr = parseFn();
   fs.writeFileSync('public/construccion_milestones.json', JSON.stringify(arr, null, 2));
   console.log("Extracted via array match length:", arr.length);
} else {
    console.log("Failed to find exact array.");
}
