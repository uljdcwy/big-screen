const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080, // 子应用端口
    headers: {
      'Access-Control-Allow-Origin': '*',               // 解决 CORS
    },
  },

  publicPath: process.env.NODE_ENV === 'production'
    ? '/subapp/'              // 👉 生产环境子应用部署路径
    : 'http://localhost:8080/', // 👉 开发环境必须写完整地址，避免 404

  configureWebpack: {
    output: {
      library: `vueApp1`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_vueApp1`,
    },
    devtool: false
  },

  // 配置 Webpack 规则
  chainWebpack: config => {
    config.module
      .rule('gltf')
      .test(/\.(glb|gltf)$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        outputPath: 'assets/glbModel/',
        name: '[name].[hash:8].[ext]'
      })
      .end();

    // 配置 HDR 加载
    config.module
      .rule('hdr')
      .test(/\.hdr$/)
      .use('file-loader') // 或 'url-loader'
      .loader('file-loader')
      .options({
        outputPath: 'assets/hdr/',
        name: '[name].[hash:8].[ext]'
      })
      .end();
  }
});