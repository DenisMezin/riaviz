const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

/**
 * Image Compression Script for Riaviz Website
 * Compresses large images to optimize page load performance
 */

async function compressImage(inputPath, outputPath, options = {}) {
    const ext = path.extname(inputPath).toLowerCase();
    const filename = path.basename(inputPath);

    try {
        const image = sharp(inputPath);
        const metadata = await image.metadata();

        console.log(`Processing: ${filename} (${(metadata.size / 1024 / 1024).toFixed(2)} MB)`);

        // Resize if too large (max 1920px width)
        let pipeline = image;
        if (metadata.width > 1920) {
            pipeline = pipeline.resize(1920, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }

        // Use temporary file to avoid input/output conflict
        const tempPath = outputPath + '.tmp';

        // Compress based on format
        if (ext === '.jpg' || ext === '.jpeg') {
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
        } else if (ext === '.png') {
            // Convert PNG to WebP for better compression
            const webpPath = outputPath.replace(/\.png$/i, '.webp');
            await pipeline
                .webp({
                    quality: options.quality || 85,
                    effort: 6
                })
                .toFile(webpPath);
            console.log(`  → Converted to WebP: ${path.basename(webpPath)}`);

            // Keep the original PNG for now
            const stats = await fs.stat(webpPath);
            return { original: metadata.size, compressed: stats.size };
        } else if (ext === '.webp') {
            await pipeline
                .webp({
                    quality: options.quality || 85,
                    effort: 6
                })
                .toFile(tempPath);

            // Replace original with compressed
            await fs.unlink(outputPath);
            await fs.rename(tempPath, outputPath);
        }

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

async function compressDirectory(directory, options = {}) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`Compressing images in: ${directory}`);
    console.log(`${'='.repeat(60)}\n`);

    const originalDir = path.join(directory, '..', `${path.basename(directory)}_original`);

    // Create backup directory
    try {
        await fs.access(originalDir);
        console.log(`⚠️  Backup directory already exists: ${originalDir}`);
        console.log(`⚠️  Skipping backup creation\n`);
    } catch {
        console.log(`Creating backup: ${originalDir}\n`);
        await fs.mkdir(originalDir, { recursive: true });

        // Copy original files to backup
        const files = await fs.readdir(directory);
        for (const file of files) {
            const srcPath = path.join(directory, file);
            const destPath = path.join(originalDir, file);
            const stat = await fs.stat(srcPath);
            if (stat.isFile()) {
                await fs.copyFile(srcPath, destPath);
            }
        }
        console.log(`✓ Backup created\n`);
    }

    // Get all image files
    const files = await fs.readdir(directory);
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    });

    let totalOriginal = 0;
    let totalCompressed = 0;

    // Compress each image
    for (const file of imageFiles) {
        const inputPath = path.join(directory, file);
        const outputPath = path.join(directory, file);

        const result = await compressImage(inputPath, outputPath, options);
        totalOriginal += result.original;
        totalCompressed += result.compressed;
    }

    // Summary
    console.log(`${'='.repeat(60)}`);
    console.log(`Summary for ${path.basename(directory)}:`);
    console.log(`  Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Compressed size: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Total reduction: ${((1 - totalCompressed / totalOriginal) * 100).toFixed(1)}%`);
    console.log(`${'='.repeat(60)}\n`);
}

async function main() {
    console.log('\n🚀 Riaviz Image Compression Tool\n');

    const projectRoot = path.join(__dirname, '..');

    try {
        // Compress risultati images (high quality JPEGs)
        await compressDirectory(
            path.join(projectRoot, 'public', 'risultati'),
            { quality: 82 }
        );

        // Compress hero gallery images (convert PNG to WebP)
        await compressDirectory(
            path.join(projectRoot, 'public', 'hero_gallery'),
            { quality: 85 }
        );

        console.log('\n✅ All images compressed successfully!\n');
        console.log('Original images backed up to *_original directories');
        console.log('You can delete the backup directories once you verify the compressed images look good.\n');

    } catch (error) {
        console.error('\n❌ Compression failed:', error.message);
        process.exit(1);
    }
}

main();
