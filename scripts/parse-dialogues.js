const fs = require('fs');
const path = require('path');

const transcriptsDir = path.join(__dirname, '../src/data/transcripts');
const outputFile = path.join(__dirname, '../src/data/dialogos.json');

// Helper to parse SRT timestamps to seconds
function parseTimestamp(timestamp) {
  const parts = timestamp.trim().split(':');
  if (parts.length !== 3) return 0;
  const h = parts[0];
  const m = parts[1];
  const sMs = parts[2];
  const [s, ms] = sMs.split(',');
  return parseInt(h, 10) * 3600 + parseInt(m, 10) * 60 + parseInt(s, 10) + parseInt(ms || 0, 10) / 1000;
}

function parseSRT(content) {
  // Normalize newlines and split by double newlines
  const blocks = content.replace(/\r\n/g, '\n').trim().split(/\n\s*\n/);
  const lines = [];
  
  for (const block of blocks) {
    const parts = block.split('\n');
    if (parts.length >= 3) {
      const timeRange = parts[1];
      const textLines = parts.slice(2);
      const text = textLines.join(' ').trim();
      
      const startTimeStr = timeRange.split(' --> ')[0];
      if (startTimeStr) {
        const time = parseTimestamp(startTimeStr);
        lines.push({ time, text });
      }
    }
  }
  return lines;
}

function main() {
  if (!fs.existsSync(transcriptsDir)) {
    console.log(`Directorio ${transcriptsDir} no existe.`);
    return;
  }

  const files = fs.readdirSync(transcriptsDir);
  const outputData = {};

  for (const file of files) {
    if (!file.endsWith('.txt')) continue;
    
    // Pattern matches:
    // 1. [zona]_[id].txt (e.g. inacap_1.txt)
    // 2. [zona]_[type]_[id].txt (e.g. inacap_local_1.txt)
    const nameWithoutExt = path.basename(file, '.txt');
    const matches = nameWithoutExt.split('_');
    
    if (matches.length < 2) continue;
    
    const filePath = path.join(transcriptsDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsedLines = parseSRT(content);
    
    if (matches.length === 2) {
      // e.g. inacap_1.txt
      const [zona, idStr] = matches;
      if (!outputData[zona]) outputData[zona] = {};
      outputData[zona][idStr] = parsedLines;
    } else if (matches.length === 3) {
      // e.g. inacap_local_1.txt
      const [zona, type, idStr] = matches;
      const key = `${zona}_${type}`;
      if (!outputData[key]) outputData[key] = {};
      outputData[key][idStr] = parsedLines;
    }
  }

  fs.writeFileSync(outputFile, JSON.stringify(outputData, null, 2), 'utf-8');
  console.log(`Diálogos exportados correctamente a ${outputFile}`);
}

main();
