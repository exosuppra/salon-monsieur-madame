"""Affiche les axes variables d'une police (vide si police statique)."""
import sys
from fontTools.ttLib import TTFont
f = TTFont(sys.argv[1], lazy=True)
print(",".join(a.axisTag for a in f["fvar"].axes) if "fvar" in f else "")
