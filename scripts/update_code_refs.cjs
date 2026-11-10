const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

function getAllSourceFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllSourceFiles(fullPath));
    } else {
      if (['.ts', '.tsx', '.html', '.css'].includes(path.extname(file))) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

const files = getAllSourceFiles(srcDir);
files.push(path.join(__dirname, '..', 'index.html'));

let totalReplacements = 0;

for (const filePath of files) {
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace /images/... .jpg and .png with .webp
  content = content.replace(/\/images\/([a-zA-Z0-9_\-\/]+)\.(jpg|jpeg|png)/g, '/images/$1.webp');

  // Replace /videos/peacock-water.mp4 with /videos/peacock-water.webm
  content = content.replace(/\/videos\/([a-zA-Z0-9_\-\/]+)\.mp4/g, '/videos/$1.webm');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated references in: ${path.relative(path.join(__dirname, '..'), filePath)}`);
    totalReplacements++;
  }
}

console.log(`Updated ${totalReplacements} files.`);
