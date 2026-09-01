import { useState } from 'react'
import { MapPin } from 'lucide-react'

/**
 * Carte Google en chargement différé.
 *
 * L'iframe Google Maps pèse plusieurs centaines de kilo-octets et exécute du
 * JavaScript tiers. On n'affiche donc qu'un aperçu léger, et la carte réelle
 * n'est chargée qu'au clic du visiteur.
 *
 * Bénéfice supplémentaire : aucun cookie Google n'est déposé tant que le
 * visiteur n'a rien demandé.
 */
export default function MapEmbed({ coords, title, children }) {
  const [loaded, setLoaded] = useState(false)

  if (loaded) {
    return (
      <iframe
        title={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full"
        style={{ border: 0, filter: 'saturate(.85) sepia(.08)' }}
        src={`https://maps.google.com/maps?q=${coords}&t=&z=18&ie=UTF8&iwloc=&output=embed`}
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-sable text-encre transition-colors hover:bg-sable/80"
    >
      <span className="grid h-14 w-14 place-items-center rounded-full bg-creme shadow-[0_12px_34px_-22px_rgba(51,42,33,.4)]">
        <MapPin size={24} className="text-terracotta-deep" aria-hidden="true" />
      </span>
      <span className="font-hand text-2xl font-semibold">Afficher le plan</span>
      <span className="max-w-[16rem] text-center text-xs text-encre-doux">
        La carte est chargée depuis Google uniquement si vous le demandez.
      </span>
      {children}
    </button>
  )
}
