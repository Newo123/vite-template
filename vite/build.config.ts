export const buildConfig = () => {
  return {
    outDir: './build/',
    assetsDir: 'js',
    emptyOutDir: true,
    minify: true,
    assetsInlineLimit: 0,

    rollupOptions: {
      input: ['./src/pugs/pages/**/*.pug'],
      output: {
        assetFileNames: ({ name }) => {
          if (
            /\.(png|jpe?g|gif|svg|webp|ico|webm|mp4|ogv|mov)$/.test(name ?? '')
          ) {
            return 'img/[name][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'css/styles.min[extname]';
          }
          if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? '')) {
            return 'fonts/[name][extname]';
          }

          return 'assets/[name][extname]';
        },
        entryFileNames: '[name]/[name].ts',
        chunkFileNames: 'js/scripts.min.js',
      },
    },
  };
};
