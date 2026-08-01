# Photos du salon

Dossier partagé par les trois maquettes statiques (`../maquette-*/index.html`).
La version React lit les mêmes fichiers depuis `../react-app/public/photos/` —
**si vous modifiez une photo ici, recopiez-la là-bas puis relancez le build**
(`npm run build` dans `react-app/`, puis copier `dist/` vers `app/`).

## Contenu

| Fichier | Sujet |
|---|---|
| `salon-terrasse.jpg` | La terrasse devant le salon, avenue des Marronniers — seule photo du lieu |
| `realisation-balayage-blond.jpg` | Balayage blond, reflets sable (on aperçoit le papier peint végétal et le Chesterfield) |
| `realisation-contraste-racines.jpg` | Racines fondues, blond très clair |
| `realisation-brushing-ondule.jpg` | Brushing ondulé, base blond doré |
| `realisation-cheveux-longs.jpg` | Longueurs châtain clair en vagues souples |
| `realisation-carre-blond.jpg` | Carré blond polaire |

## Ajouter de nouvelles photos

Un script fait tout le travail — rotation, suppression des métadonnées,
redimensionnement, compression — et écrit dans les **deux** emplacements à la
fois :

```bash
python tools/prepare-photos.py chemin/IMG_1234.jpeg=salon-poste-coiffage
```

Plusieurs paires `source=nom` peuvent être passées d'un coup. Options `--max`
(plus grand côté, 1600 px par défaut) et `--quality` (82 par défaut).

Ensuite, pour que la version React voie les nouvelles images :

```bash
cd react-app && npm run build
```

puis recopier `react-app/dist/` vers `app/`.

## Traitement appliqué

Les originaux (JPEG iPhone, ~2 Mo chacun) ont été :

1. **redressés** — quatre des six portaient une orientation EXIF `6` et
   s'affichaient couchées dès qu'un contexte ignorait la balise (c'est le cas
   des `background-image` CSS sur certains navigateurs) ; la rotation est
   désormais inscrite dans les pixels ;
2. **dépouillés de leurs métadonnées** — les JPEG iPhone embarquent les
   **coordonnées GPS** du lieu de prise de vue, le modèle d'appareil et
   l'horodatage. Aucun intérêt en ligne, et autant ne pas les publier ;
3. **redimensionnés et recompressés** en JPEG progressif qualité 82.

Total : 11,9 Mo → 2,0 Mo.

## Ce qui manque encore

Les photos de **l'intérieur** du salon (poste de coiffage, espace d'attente, le
fauteuil Chesterfield en entier, le miroir en bois). Elodie doit les envoyer.
Ce sont elles qui donneront de la chaleur aux sections « Le salon » des trois
maquettes, aujourd'hui illustrées par la terrasse ou une réalisation.

Noms à utiliser quand elles arriveront, pour rester cohérent :
`salon-poste-coiffage`, `salon-attente`, `salon-fauteuil`, `salon-miroir`,
`salon-vitrine`.

## Droit à l'image

Accord obtenu pour les personnes reconnaissables sur les photos actuelles
(Elodie sur `salon-terrasse.jpg`, la cliente de profil sur
`realisation-carre-blond.jpg`). À revérifier pour toute nouvelle photo où
une cliente serait identifiable.
