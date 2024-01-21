import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';
// @ts-ignore
import pages from 'vituum/plugins/pages.js';
import tailwindcss from '@vituum/vite-plugin-tailwindcss';
import tailwindConfig from '../tailwind.config';
import checker from 'vite-plugin-checker';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'; // ознакомиться с доками и сделать оптимизацию для сборки изображений
import babel from 'vite-plugin-babel';

export const buildPlugins = ({ mode }) => {
  return [
    vituum({
      pages: {
        dir: './src/pugs/pages',
      },
    }),
    pug({
      root: './src',
    }),
    pages(),
    tailwindcss({
      autoprefixer: {
        add: true,
        flexbox: true,
        grid: true,
      },
      tailwindcss: tailwindConfig,
    }),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/scripts/entry.ts"',
      },
    }),
    mode === 'production' &&
      ViteImageOptimizer({
        jpg: {
          quality: 80, // нужно сделать сжатие изображений
        },
      }),
    babel(),
  ];
};
