import path from 'path';

import vue from '@vitejs/plugin-vue';

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  base: '/random-wheel/',
  alias: {
    '/@': path.resolve(__dirname, './src')
  },
  define: {
    BUNDLED_ON: Date.now(),
  },
};
