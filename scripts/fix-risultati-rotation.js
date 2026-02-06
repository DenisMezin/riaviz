const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

/**
 * Fix Risultati Images Rotation
 * Re-compress with correct EXIF orientation
 */

async function compressImage(inputPath, outputPath, options = {}) {
    const ext = path.extname(inputPath).toLowerCase();
    const filename = path.basename(inputPath);

    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        console.log(`Processing: ${filename} (${(metadata.size / 1024 / 1024).toFixed(2)} MB)`);

        // Auto-rotate based on EXIF orientation to prevent rotated images
        let pipeline = image.rotate();

        // Resize if too large (max 1920px width)
        if (metadata.width > 1920) {
            pipeline = pipeline.resize(1920, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }

        // Use temporary file to avoid input/output conflict
        const tempPath = outputPath + '.tmp';

        // Compress JPEG
        await pipeline
            .jpeg({
                quality: options.quality || 82,
                progressive: true,
                mozjpeg: true
            })
            .toFile(tempPath);

        // Replace original with compressed
        await fs.unlink(outputPath);
        await fs.rename(tempPath, outputPath);

        // Get output file size
        const stats = await fs.stat(outputPath);
        const outputSize = (stats.size / 1024 / 1024).toFixed(2);
        const reduction = ((1 - stats.size / metadata.size) * 100).toFixed(1);

        console.log(`  ✓ Compressed: ${outputSize} MB (${reduction}% reduction)\n`);

        return { original: metadata.size, compressed: stats.size };
    } catch (error) {
        console.error(`  ✗ Error processing ${filename}:`, error.message);
        throw error;
    }
}

async function main() {
    console.log('\n🔄 Fixing Risultati Images Rotation\n');

    const projectRoot = path.join(__dirname, '..');
    const risultatiDir = path.join(projectRoot, 'public', 'risultati');

    try {
        const files = await fs.readdir(risultatiDir);
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ext === '.jpeg' || ext === '.jpg';
        });

        console.log(`Found ${imageFiles.length} images to fix\n`);

        let totalOriginal = 0;
        let totalCompressed = 0;

        for (const file of imageFiles) {
            const inputPath = path.join(risultatiDir, file);
            const outputPath = path.join(risultatiDir, file);

            const result = await compressImage(inputPath, outputPath, { quality: 82 });
            totalOriginal += result.original;
            totalCompressed += result.compressed;
        }

        console.log(`${'='.repeat(60)}`);
        console.log(`Summary:`);
        console.log(`  Total compressed: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`);
        console.log(`${'='.repeat(60)}\n`);

        console.log('✅ All risultati images fixed successfully!\n');

    } catch (error) {
        console.error('\n❌ Fix failed:', error.message);
        process.exit(1);
    }
}

main();
