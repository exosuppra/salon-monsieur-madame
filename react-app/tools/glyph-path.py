"""Extrait le contour d'un caractère sous forme de tracé SVG.

Sert à fabriquer le favicon à partir de la police du logo (Caveat) sans avoir
à embarquer la police : le tracé est figé dans le SVG, donc il s'affiche
identiquement partout.

Usage  : python tools/glyph-path.py <police.woff2> <caractère> [graisse]
Sortie : JSON sur la sortie standard.
"""
import json
import sys

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

font_path, char = sys.argv[1], sys.argv[2]
weight = float(sys.argv[3]) if len(sys.argv) > 3 else None

font = TTFont(font_path)

# Police variable : on la fige sur la graisse demandée avant de lire le contour.
if weight is not None and 'fvar' in font:
    axes = {a.axisTag for a in font['fvar'].axes}
    if 'wght' in axes:
        font = instancer.instantiateVariableFont(font, {'wght': weight})

cmap = font.getBestCmap()
if ord(char) not in cmap:
    raise SystemExit(f'Le caractère « {char} » est absent de {font_path}')

name = cmap[ord(char)]
glyph_set = font.getGlyphSet()
pen = SVGPathPen(glyph_set)
glyph_set[name].draw(pen)

glyf = font['glyf'][name]
advance, _ = font['hmtx'][name]

print(json.dumps({
    'path': pen.getCommands(),
    'unitsPerEm': font['head'].unitsPerEm,
    'advance': advance,
    'xMin': glyf.xMin, 'yMin': glyf.yMin,
    'xMax': glyf.xMax, 'yMax': glyf.yMax,
}))
