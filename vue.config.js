// const isProduction = process.env.NODE_ENV !== 'development'
// const devNeedCdn = false
// const cdn = {
//   externals: {
//     vue: 'Vue',
//     vuex: 'Vuex',
//     'vue-router': 'VueRouter'
//   },
//   css: [],
//   js: [
//     'https://cdn.staticfile.org/vue/2.6.10/vue.min.js',
//     'https://cdn.staticfile.org/vuex/3.0.1/vuex.min.js',
//     'https://cdn.staticfile.org/vue-router/3.0.3/vue-router.min.js'
//   ]
// }
module.exports = {
  // productionSourceMap: false
  // chainWebpack: config => {
  //   config.plugin("html").tap(args => {
  //     if (isProduction || devNeedCdn) args[0].cdn = cdn
  //     return args
  //   })
  // },
  // configureWebpack: config => {
  //   if (isProduction || devNeedCdn) config.externals = cdn.externals
  // }
}