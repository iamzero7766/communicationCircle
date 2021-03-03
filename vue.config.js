const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  },
  configureWebpack: (config) => {
    if(process.env.NODE_ENV === 'production') {
      config.mode = 'production';
      return {
        plugins: [ new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.js$|\.html$|\.css/, //匹配文件名
          threshold: 10240, //对超过10k的数据进行压缩
          deleteOriginalAssets: false //是否删除原文件
        })]
      }

    }
  },
};
