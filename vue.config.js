const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production'
    ? '/anlim-test-vue/'
    : '/',
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: ' @import "@/assets/sass/index.scss"; '
      }
    }
  }
});
