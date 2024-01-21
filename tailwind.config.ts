import type { Config } from 'tailwindcss';
import { KeyValuePair, ResolvableTo } from 'tailwindcss/types/config';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

const spacings = (function (): KeyValuePair<string, string> {
  // padding, margin, width, height, maxHeight, gap, inset, space и translate с шагом 2px(16*0.125rem)
  const spacings: ResolvableTo<KeyValuePair<string, string>> = {};
  for (let i = 0; i < 401; i++) {
    spacings[i] = i * 0.125 + 'em';
  }
  return spacings;
})();

export default {
  content: ['./src/**/*.{html,jsx,tsx,pug}'],
  darkMode: 'class',
  theme: {
    spacing: spacings,
    screens: {
      xs: '475px',
      sm: '540px',
      md: '720px',
      lg: '960px',
      xl: '1140px',
      '2xl': '1320px',
      '3xl': '1920px',
    },
    extend: {},
  },
  plugins: [typography, forms, containerQueries],
} satisfies Config;
