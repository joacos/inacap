const fs = require('fs');

const bundleStr = fs.readFileSync('public/construccion_bundle.js', 'utf8');

// The objects probably look like: {id:1,year:"1960",title:"Casa Prochelle I",description:"...",image:"...",type:"..."}
const regex = /\{id:\d+,year:"[^"]+",title:"[^"]+",description:"[^"]+",image:"[^"]+",type:"[^"]+"\}/g;
const matches = bundleStr.match(regex);

if (matches) {
    const arr = matches.map(m => {
        // Evaluate the string literal as a JS object
        const parseFn = new Function('return ' + m + ';');
        return parseFn();
    });
    fs.writeFileSync('public/construccion_milestones.json', JSON.stringify(arr, null, 2));
    console.log("Successfully extracted " + arr.length + " items using specific regex.");
} else {
    console.log("Second attempt failed. Let's dump matches for `title:\"`");
    const testRegex = /title:"[^"]+"/g;
    const testMatches = bundleStr.match(testRegex);
    if(testMatches) {
        console.log("Found " + testMatches.length + " titles.");
        console.log(testMatches.slice(0, 10).join("\n"));
    }
}
