#!/usr/bin/env python3
"""Prépare des photos du salon pour le web.

Usage :
    python tools/prepare-photos.py IMG_1234.jpeg=salon-poste-coiffage \
                                   IMG_5678.jpeg=salon-attente

Chaque argument est une paire `fichier source=nom de sortie` (sans extension).
Le script, pour chaque photo :

  1. applique la rotation EXIF puis SUPPRIME toutes les métadonnées — les JPEG
     iPhone embarquent les coordonnées GPS du lieu de prise de vue ;
  2. redimensionne au plus grand côté demandé (1600 px par défaut) ;
  3. réencode en JPEG progressif optimisé ;
  4. écrit le résultat dans assets/ ET dans react-app/public/photos/, les deux
     emplacements devant rester synchronisés.

Après exécution, penser à :
    cd react-app && npm run build      # puis recopier dist/ vers app/

Dépendance : Pillow (pip install Pillow)
"""
import argparse
import os
import sys

try:
    from PIL import Image, ImageOps, ExifTags
except ImportError:
    sys.exit("Pillow est requis : pip install Pillow")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESTS = [
    os.path.join(ROOT, "assets"),
    os.path.join(ROOT, "react-app", "public", "photos"),
]

GPS_TAG = next(k for k, v in ExifTags.TAGS.items() if v == "GPSInfo")


def prepare(src_path, out_name, max_side, quality):
    if not os.path.isfile(src_path):
        print(f"  introuvable, ignoré : {src_path}")
        return 0, 0

    before = os.path.getsize(src_path)
    im = Image.open(src_path)
    had_gps = GPS_TAG in (im.getexif() or {})

    im = ImageOps.exif_transpose(im)      # redresse selon l'orientation EXIF
    im = im.convert("RGB")
    im.thumbnail((max_side, max_side), Image.LANCZOS)

    # Recréer l'image à partir des seuls pixels : aucune métadonnée conservée.
    clean = Image.new("RGB", im.size)
    clean.paste(im)

    after = 0
    for dest in DESTS:
        os.makedirs(dest, exist_ok=True)
        out_path = os.path.join(dest, out_name + ".jpg")
        clean.save(out_path, "JPEG", quality=quality, optimize=True, progressive=True)
        after = os.path.getsize(out_path)

    print(f"  {out_name + '.jpg':40} {im.size[0]:>4}x{im.size[1]:<4} "
          f"{before / 1024:>6.0f} Ko -> {after / 1024:>5.0f} Ko"
          f"{'   [GPS supprimé]' if had_gps else ''}")
    return before, after


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("pairs", nargs="+", metavar="SOURCE=NOM",
                    help="fichier source et nom de sortie, sans extension")
    ap.add_argument("--max", type=int, default=1600, dest="max_side",
                    help="plus grand côté en pixels (défaut : 1600)")
    ap.add_argument("--quality", type=int, default=82,
                    help="qualité JPEG (défaut : 82)")
    args = ap.parse_args()

    total_before = total_after = 0
    for pair in args.pairs:
        if "=" not in pair:
            sys.exit(f"Argument mal formé : {pair!r} — attendu SOURCE=NOM")
        src, out_name = pair.split("=", 1)
        b, a = prepare(src, out_name.strip(), args.max_side, args.quality)
        total_before += b
        total_after += a

    if total_before:
        print(f"\nTotal : {total_before / 1024 / 1024:.1f} Mo -> "
              f"{total_after / 1024:.0f} Ko")
        print("Pensez au rebuild : cd react-app && npm run build, "
              "puis recopier dist/ vers app/")


if __name__ == "__main__":
    main()
