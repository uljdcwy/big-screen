const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

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