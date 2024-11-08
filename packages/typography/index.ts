import * as opentype from 'opentype.js';
import { readFileSync } from 'fs';
import { basename } from 'path';

// Define a function to calculate the nudges based on font metrics
function calculateNudges(fontPath: string, cssLineHeight:number): void {
    // Load and parse the font
    const fontBuffer = readFileSync(fontPath);
    const font = opentype.parse(fontBuffer.buffer);

    // Check if the font loaded correctly
    if (!font) {
        console.error('Could not parse the font.');
        return;
    }

    // Extract required font metrics
    const ascender = font.ascender;
    const descender = font.descender;
    const naturalLineHeight = ascender - descender
    const unitsPerEm = font.unitsPerEm;

    const lineHeightScale = naturalLineHeight / unitsPerEm;

    const capHeight = font.tables.os2.sCapHeight || font.ascender; // Fallback if capHeight is unavailable
    const xHeight = font.tables.os2.sxHeight || capHeight / 2; // Fallback if xHeight is unavailable

    // Calculate offsets in em units
    const baselineOffset = (ascender - xHeight) / unitsPerEm;
    const centerOffset = ((ascender - descender) - (ascender - descender)) / (2 * unitsPerEm);
    const capHeightOffset = (ascender - capHeight) / unitsPerEm;
    const descenderOffset = descender / unitsPerEm;

    console.log(`Line Height Scale: ${lineHeightScale}`);
    console.log(`Nudge offsets for font: ${basename(fontPath)}`);
    console.log(`Baseline Offset: ${baselineOffset.toFixed(4)}em`);
    console.log(`Center Offset: ${centerOffset.toFixed(4)}em`);
    console.log(`Cap Height Offset: ${capHeightOffset.toFixed(4)}em`);
    console.log(`Descender Offset: ${descenderOffset.toFixed(4)}em`);
}

// Read font path from command line arguments and call the function
const fontPath = process.argv[2];
const cssLineHeight = process.argv[3] || 1.2;
if (!fontPath) {
    console.error('Please provide a path to a .ttf font file.');
    process.exit(1);
}

calculateNudges(fontPath, cssLineHeight);

