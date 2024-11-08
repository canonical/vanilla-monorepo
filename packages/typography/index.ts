import { readFileSync } from "fs"
import * as opentype from "opentype.js"


const baselineHeight = .4

// Define a function to calculate the nudges based on font metrics
function calculateNudges(fontPath: string, cssLineHeight: number): void {
    // Load and parse the font
    const fontBuffer = readFileSync(fontPath)
    const font = opentype.parse(fontBuffer.buffer)

    // Check if the font loaded correctly
    if (!font) {
        console.error("Could not parse the font.")
        return
    }

    // Extract required font metrics
    const ascender = font.ascender
    const descender = font.descender
    const unitsPerEm = font.unitsPerEm
    const naturalLineHeight = ascender - descender
    const lineHeightScale = naturalLineHeight / unitsPerEm
    const ascenderScale = ascender / unitsPerEm

    const baselinePos = (cssLineHeight - lineHeightScale) / 2 + ascenderScale

    const topNudge = baselineHeight - baselinePos % baselineHeight 

    console.log("baselinePos", baselinePos)
    console.log("topNudge", topNudge)
    // TODO bottom nudge
    
}

// Read font path from command line arguments and call the function
const fontPath = process.argv[2]
const cssLineHeight = process.argv[3] || 1.2
if (!fontPath) {
    console.error("Please provide a path to a .ttf font file.")
    process.exit(1)
}

calculateNudges(fontPath, cssLineHeight)
