/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        fraunces: ['"Fraunces"', 'Georgia', 'serif'],
        // Les « … Fallback » sont des polices système recalibrées (voir
        // tools/build-fonts.mjs) : elles occupent exactement la même place que
        // la police définitive, donc la page ne bouge pas quand celle-ci arrive.
        newsreader: ['"Newsreader"', '"Newsreader Fallback"', 'Georgia', 'serif'],
        karla: ['"Karla"', '"Karla Fallback"', 'system-ui', 'sans-serif'],
        hand: ['"Caveat"', '"Caveat Fallback"', 'cursive'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        jost: ['"Jost"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Signature (dark)
        ink: '#0A0A0B',
        ink2: '#111114',
        champagne: '#E8C39E',
        cuivre: '#C97B5A',
        // Éclat (luxe)
        charbon: '#14110F',
        ivoire: '#F5F0E6',
        or: '#C9A24B',
        orclair: '#D9BE7E',
        // Nuance / « Atelier » (provençal clair & chaud)
        lin: '#F3EBDF',
        creme: '#FBF6EF',
        sable: '#E8DCCA',
        bois: '#B08968',
        cognac: '#8A4B2A',
        terracotta: '#C0714E',
        'terracotta-light': '#D89272',
        // Variante assombrie pour le texte et les boutons : garantit 4,5:1 (WCAG AA)
        // sur les fonds clairs du site (lin, crème, rose-soft).
        'terracotta-deep': '#9E5231',
        rose: '#E3B3BE',
        'rose-soft': '#F5E2E6',
        'rose-deep': '#8E4E5E',
        olive: '#77835D',
        encre: '#332A21',
        'encre-doux': '#6B5D4E',
        terra: '#B9714F',
        terradeep: '#A0552F',
        sauge: '#7C8A6E',
        brun: '#3B332B',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-v': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
        aurora: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(3%,-4%) scale(1.08)' },
          '66%': { transform: 'translate(-3%,3%) scale(0.96)' },
        },
        spotlight: {
          '0%': { opacity: 0, transform: 'translate(-72%,-62%) scale(0.5)' },
          '100%': { opacity: 1, transform: 'translate(-50%,-40%) scale(1)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s linear infinite',
        marquee: 'marquee var(--duration,40s) linear infinite',
        'marquee-v': 'marquee-v var(--duration,40s) linear infinite',
        aurora: 'aurora 18s ease-in-out infinite',
        spotlight: 'spotlight 2s ease .3s forwards',
      },
    },
  },
  plugins: [],
}
