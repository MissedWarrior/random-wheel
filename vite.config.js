import path from 'path';

import vue from '@vitejs/plugin-vue';

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  base: '/random-wheel/',
  resolve: {
    alias: {
      '/@': path.resolve(__dirname, './src')
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
  define: {
    BUNDLED_ON: Date.now(),
  },
};
