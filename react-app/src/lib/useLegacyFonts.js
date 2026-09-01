import { useEffect } from 'react'

// Les maquettes d'origine (Éclat, Signature, page de choix) utilisent des
// polices que le site final n'emploie plus. On ne les charge donc que si l'une
// de ces pages est réellement ouverte : la page d'accueil n'en paie pas le coût.
const HREF =
  'https://fonts.googleapis.com/css2' +
  '?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500' +
  '&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400' +
  '&family=Inter:wght@300;400;500;600;700' +
  '&family=Jost:wght@300;400;500;600' +
  '&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400' +
  '&family=Space+Grotesk:wght@400;500;600;700' +
  '&display=swap'

const ID = 'legacy-maquette-fonts'

export default function useLegacyFonts() {
  useEffect(() => {
    if (document.getElementById(ID)) return
    const link = document.createElement('link')
    link.id = ID
    link.rel = 'stylesheet'
    link.href = HREF
    document.head.appendChild(link)
    // Volontairement pas de nettoyage : revenir sur une maquette ne doit pas
    // relancer un téléchargement.
  }, [])
}
