module.exports = {
  configureWebpack:{
    resolve:{
      extensions: [],
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
      }
    }
  }
}
//配置别名