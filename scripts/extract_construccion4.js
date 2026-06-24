const fs = require('fs');

const bundleStr = fs.readFileSync('public/construccion_bundle.js', 'utf8');
const regex = /\{id:\d+,year:"[^"]+",title:"[^"]+",description:"[^"]+",image:"[^"]+",type:"[^"]+"\}/g;
const matches = bundleStr.match(regex);
console.log("matches strict:", matches ? matches.length : 0);

const looseRegex = /\{id:\d+,year:"[^"]+",title:"[^"]+".*?type:"[^"]+"\}/g;
const looseMatches = bundleStr.match(looseRegex);
console.log("matches loose:", looseMatches ? looseMatches.length : 0);
if(looseMatches) {
    console.log(looseMatches[0]);
}

