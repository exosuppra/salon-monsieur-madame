import manifest from '../generated/images.json'

const BASE = import.meta.env.BASE_URL

/**
 * Photo responsive : sert de l'AVIF, puis du WebP, puis un JPEG de repli.
 * Le navigateur ne télécharge qu'une seule variante, à la largeur utile.
 *
 * Les dimensions natives sont écrites sur le <img> : le navigateur réserve la
 * place avant même d'avoir reçu le fichier, donc aucun décalage visuel (CLS).
 *
 * @param src      nom du fichier source, ex. « salon-terrasse.jpg »
 * @param sizes    largeur d'affichage prévue, ex. « (min-width: 768px) 40vw, 100vw »
 * @param priority true pour l'image du haut de page : chargée en priorité, sans lazy-load
 */
export default function Photo({
  src,
  alt,
  sizes = '100vw',
  priority = false,
  className = '',
  imgClassName = '',
  ...rest
}) {
  const meta = manifest[src]
  if (!meta) throw new Error(`Photo « ${src} » absente du manifeste — relancer « node tools/build-images.mjs ».`)

  const srcSet = (variants) =>
    Object.entries(variants)
      .map(([width, file]) => `${BASE}${file} ${width}w`)
      .join(', ')

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={srcSet(meta.avif)} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(meta.webp)} sizes={sizes} />
      <img
        src={`${BASE}${meta.fallback}`}
        alt={alt}
        width={meta.width}
        height={meta.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
        {...rest}
      />
    </picture>
  )
}
