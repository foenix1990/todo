module.exports = {
  runtimeCompiler: true,
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: './src/scss/mixins.scss',
        })
        .end()
    })
  }
}
