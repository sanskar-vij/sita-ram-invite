const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { spawnSync } = require('child_process');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

const publicImagesDir = path.join(__dirname, '..', 'public', 'images');
const publicVideosDir = path.join(__dirname, '..', 'public', 'videos');

async function convertImages() {
  console.log('=== CONVERTING IMAGES TO WEBP ===');
  
  function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getFiles(fullPath));
      } else {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          results.push(fullPath);
        }
      }
    });
    return results;
  }

  const files = getFiles(publicImagesDir);
  console.log(`Found ${files.length} images to convert.`);

  let totalOriginal = 0;
  let totalWebp = 0;

  for (const file of files) {
    const ext = path.extname(file);
    const webpPath = file.substring(0, file.length - ext.length) + '.webp';
    const originalSize = fs.statSync(file).size;
    totalOriginal += originalSize;

    try {
      await sharp(file)
        .webp({ quality: 85, effort: 4 })
        .toFile(webpPath);

      const webpSize = fs.statSync(webpPath).size;
      totalWebp += webpSize;
      const savings = (((originalSize - webpSize) / originalSize) * 100).toFixed(1);
      console.log(`Converted: ${path.relative(publicImagesDir, file)} -> ${(webpSize / 1024).toFixed(1)} KB (${savings}% saved)`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }

  console.log(`\nTotal Original Image Size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total WebP Image Size: ${(totalWebp / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total Image Size Savings: ${(((totalOriginal - totalWebp) / totalOriginal) * 100).toFixed(1)}%\n`);
}

function convertVideos() {
  console.log('=== CONVERTING VIDEOS TO WEBM ===');
  if (!fs.existsSync(publicVideosDir)) {
    console.log('No videos directory found.');
    return;
  }

  const videoFiles = fs.readdirSync(publicVideosDir).filter(f => f.toLowerCase().endsWith('.mp4'));
  console.log(`Found ${videoFiles.length} MP4 videos to convert.`);

  for (const file of videoFiles) {
    const src = path.join(publicVideosDir, file);
    const baseName = path.parse(file).name;
    const dest = path.join(publicVideosDir, `${baseName}.webm`);

    console.log(`Converting ${file} to ${baseName}.webm using FFmpeg...`);
    const originalSize = fs.statSync(src).size;

    // Use VP9 codec for high quality & compression WebM
    const args = [
      '-y',
      '-i', src,
      '-c:v', 'libvpx-vp9',
      '-crf', '32',
      '-b:v', '0',
      '-an', // Video is muted in the invite
      dest
    ];

    const result = spawnSync(ffmpeg.path, args, { stdio: 'inherit' });
    if (result.error) {
      console.error(`FFmpeg error on ${file}:`, result.error);
    } else {
      const destSize = fs.statSync(dest).size;
      console.log(`Successfully converted ${dest} (${(destSize / 1024 / 1024).toFixed(2)} MB vs original ${(originalSize / 1024 / 1024).toFixed(2)} MB)`);
    }
  }
}

async function main() {
  await convertImages();
  convertVideos();
  console.log('=== ASSET CONVERSION COMPLETE ===');
}

main().catch(console.error);
