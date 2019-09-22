module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        api: '@/api',
        views: '@/views',
        utils: '@/utils',
      },
    },
  },
  devServer: {
    open: true,
    proxy: 'http://localhost:5000',
    /* proxy: {
      '/manage': { // 匹配所有请求路径
        target: 'http://localhost:5000', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        ws: true,
        pathRewrite: { // 重写路径：去掉路径开头的'/manage'
          '^/manage': '',
        },
      },
    }, */
  },
}
