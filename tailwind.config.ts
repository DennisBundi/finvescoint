import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        black:        '#060810',
        navy:         '#0A0F1E',
        surface:      '#0F1628',
        border:       '#1E2A45',
        gold:         '#C9A84C',
        'gold-light': '#E8C97A',
        offwhite:     '#F0F2F8',
        muted:        '#7A8BAA',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'marquee':    'marquee 30s linear infinite',
        'marquee2':   'marquee2 30s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%':   { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
