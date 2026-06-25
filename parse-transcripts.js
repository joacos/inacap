const fs = require('fs');
const path = require('path');

const transcriptsDir = path.join(__dirname, 'src/data/transcripts');
const outputFile = path.join(__dirname, 'src/data/dialogos.json');

const files = fs.readdirSync(transcriptsDir).filter(f => f.endsWith('.txt'));

const dialogos = {
  inacap: {},
  construccion: {},
  herramientas: {},
  inacap_local: {},
  inacap_carreras: {},
  construccion_local: {},
  construccion_carreras: {}
};

files.forEach(file => {
  const content = fs.readFileSync(path.join(transcriptsDir, file), 'utf8');
  
  // filename format: zona_id.txt (e.g. inacap_1.txt)
  const match = file.match(/^([a-zA-Z_]+)_(\d+)\.txt$/);
  if (!match) return;
  
  const zona = match[1];
  const id = match[2];
  
  if (!dialogos[zona]) {
    dialogos[zona] = {};
  }
  
  // Parse SRT blocks
  const blocks = content.trim().split(/\n\s*\n/);
  const dialogueLines = [];
  
  blocks.forEach(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length >= 3) {
      // Line 0: index
      // Line 1: time range e.g. 00:00:00,000 --> 00:00:06,000
      // Line 2+: text
      const timeLine = lines[1];
      const timeMatch = timeLine.match(/^(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->/);
      if (timeMatch) {
        const hours = parseInt(timeMatch[1], 10);
        const minutes = parseInt(timeMatch[2], 10);
        const seconds = parseInt(timeMatch[3], 10);
        const milliseconds = parseInt(timeMatch[4], 10);
        
        const timeInSeconds = hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
        
        const text = lines.slice(2).join(' ');
        
        dialogueLines.push({
          time: parseFloat(timeInSeconds.toFixed(3)),
          text: text
        });
      }
    }
  });
  
  if (dialogueLines.length > 0) {
    dialogos[zona][id] = dialogueLines;
  }
});

fs.writeFileSync(outputFile, JSON.stringify(dialogos, null, 2));
console.log('Successfully generated dialogos.json with ' + files.length + ' transcripts.');
