import { defineConfig } from 'vite';
import { buildResolve } from './vite/resolve.config';
import { buildPlugins } from './vite/plugins.config';
import { buildConfig } from './vite/build.config';
import { buildServer } from './vite/server.config';

export default defineConfig(({ mode }) => {
  return {
    css: {
      devSourcemap: true,
    },
    build: buildConfig(),
    server: buildServer(),
    plugins: buildPlugins({ mode }),
    resolve: buildResolve(),
  };
});
