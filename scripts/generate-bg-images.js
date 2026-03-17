// npm install sharp fs-extra
import sharp from "sharp";
import fs from "fs-extra";
import path from "path";

const inputDir = "./site_images/masters";  // folder with your PNGs
const outputDir = "./public/images";          // served at /images/ by Vite
const sizes = [800, 1280, 1600, 1920]; // responsive widths

async function processImage(fileName) {
  const name = path.parse(fileName).name;
  const inputPath = path.join(inputDir, fileName);

  await Promise.all(
    sizes.map(async (width) => {
      const webpPath = path.join(outputDir, `${name}-${width}.webp`);
      const avifPath = path.join(outputDir, `${name}-${width}.avif`);

      await sharp(inputPath)
        .resize({ width })
        .webp({ quality: 75 })
        .toFile(webpPath);

      await sharp(inputPath)
        .resize({ width })
        .avif({ quality: 55 })
        .toFile(avifPath);
    })
  );

  console.log(`Processed ${fileName}`);
}

async function main() {
  await fs.ensureDir(outputDir);
  const files = await fs.readdir(inputDir);

  for (const file of files) {
    if (file.endsWith(".png")) {
      await processImage(file);
    }
  }
}

main().catch(console.error);