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

Aucune photo de **l'intérieur** du salon (poste de coiffage, espace d'attente,
le fauteuil Chesterfield en entier, le miroir en bois). Ce sont elles qui
donneraient le plus de chaleur aux sections « Le salon ». À demander à Elodie.

## Droit à l'image

`realisation-carre-blond.jpg` laisse voir le profil d'une cliente (lunettes,
joue). Les autres réalisations sont cadrées de dos ou de dessus, sans visage
identifiable. Vérifier l'accord de la personne avant mise en ligne, ou retirer
ce fichier et sa `<figure>` dans `../maquette-3-signature/index.html`.

Idem pour `salon-terrasse.jpg`, où Elodie est reconnaissable — c'est elle qui a
fourni la photo, mais autant que ce soit dit explicitement.
