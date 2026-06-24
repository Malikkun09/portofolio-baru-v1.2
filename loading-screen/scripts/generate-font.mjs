// Script to generate a Three.js-compatible typeface JSON font
import opentype from 'opentype.js'
import fs from 'fs'

const FONT_PATH = '/usr/share/fonts/truetype/english/Carlito-Bold.ttf'
const OUTPUT_PATH = '/home/z/my-project/public/fonts/Inter_Bold.json'

function generateTypefaceFont() {
  console.log('Reading font from:', FONT_PATH)
  
  const buffer = fs.readFileSync(FONT_PATH)
  const font = opentype.parse(buffer)
  
  const result = {
    glyphs: {},
    familyName: font.names.fontFamily?.en || 'Carlito',
    styleName: font.names.fontSubfamily?.en || 'Bold',
    resolution: 1000,
    original_font_information: {
      familyName: font.names.fontFamily?.en || '',
      styleName: font.names.fontSubfamily?.en || '',
    },
    cssFontWeight: 'bold',
    cssFontStyle: 'normal',
    ascender: Math.round(font.ascender * 1000 / font.unitsPerEm),
    underlinePosition: Math.round((font.tables.post?.underlinePosition || -100) * 1000 / font.unitsPerEm),
    underlineThickness: Math.round((font.tables.post?.underlineThickness || 50) * 1000 / font.unitsPerEm),
  }

  const glyphSet = {}
  
  for (let i = 0; i < font.glyphs.length; i++) {
    const glyph = font.glyphs.get(i)
    const unicode = glyph.unicode
    
    if (unicode === undefined || unicode === 0) continue
    
    // Convert path to typeface.js format at resolution 1000
    const path = glyph.getPath(0, 0, 1000 / font.unitsPerEm)
    
    const pathStr = path.commands.map(cmd => {
      switch (cmd.type) {
        case 'M': return `m ${cmd.x.toFixed(2)} ${cmd.y.toFixed(2)}`
        case 'L': return `l ${cmd.x.toFixed(2)} ${cmd.y.toFixed(2)}`
        case 'Q': return `q ${cmd.x1.toFixed(2)} ${cmd.y1.toFixed(2)} ${cmd.x.toFixed(2)} ${cmd.y.toFixed(2)}`
        case 'C': return `c ${cmd.x1.toFixed(2)} ${cmd.y1.toFixed(2)} ${cmd.x2.toFixed(2)} ${cmd.y2.toFixed(2)} ${cmd.x.toFixed(2)} ${cmd.y.toFixed(2)}`
        case 'Z': return 'z'
        default: return ''
      }
    }).join(' ')

    const ha = Math.round(glyph.advanceWidth * 1000 / font.unitsPerEm || 0)

    glyphSet[unicode] = {
      ha: ha,
      x_min: Math.round((glyph.xMin || 0) * 1000 / font.unitsPerEm),
      x_max: Math.round((glyph.xMax || 0) * 1000 / font.unitsPerEm),
      o: pathStr
    }
  }

  result.glyphs = glyphSet

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result))
  console.log(`Font generated: ${Object.keys(glyphSet).length} glyphs`)
  console.log('Saved to:', OUTPUT_PATH)
}

generateTypefaceFont()
