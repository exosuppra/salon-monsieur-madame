"""Calcule les métriques d'une police et les corrections à appliquer à sa police de repli.

Objectif : que le texte occupe exactement la même place avant et après le
chargement de la police définitive. Sans cela, la page se réajuste au moment du
remplacement (« saut » visuel, pénalisé par Google sous le nom CLS).

Sortie : JSON sur la sortie standard.
Usage  : python tools/font-metrics.py <police.woff2>
"""
import json
import sys

from fontTools.ttLib import TTFont

# Lettres les plus fréquentes en français : donne une largeur moyenne bien plus
# représentative d'un texte réel que le xAvgCharWidth déclaré dans la police.
SAMPLE = 'etaisnrulodcpmvqfbghjxyzw '

# Police de repli de référence, présente sur Windows, macOS et Android
# (où elle est aliasée vers Roboto).
FALLBACK = 'C:/Windows/Fonts/arial.ttf'


def metrics(path):
    font = TTFont(path, fontNumber=0, lazy=True)
    upm = font['head'].unitsPerEm
    hhea = font['hhea']
    cmap = font.getBestCmap()
    hmtx = font['hmtx']
    widths = [hmtx[cmap[ord(c)]][0] for c in SAMPLE if ord(c) in cmap]
    return {
        'ascent': hhea.ascent / upm,
        'descent': abs(hhea.descent) / upm,
        'lineGap': hhea.lineGap / upm,
        'avgWidth': sum(widths) / len(widths) / upm,
    }


def main():
    web = metrics(sys.argv[1])
    fallback = metrics(FALLBACK)
    ratio = web['avgWidth'] / fallback['avgWidth']
    print(json.dumps({
        'sizeAdjust': round(ratio * 100, 2),
        'ascentOverride': round(web['ascent'] / ratio * 100, 2),
        'descentOverride': round(web['descent'] / ratio * 100, 2),
        'lineGapOverride': round(web['lineGap'] / ratio * 100, 2),
    }))


if __name__ == '__main__':
    main()
