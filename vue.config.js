module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        common: '@/common',
        components: '@/components',
        api: '@/api',
        pages: '@/pages',
      },
    },
  },
  devServer: {
    open: true,
    /* proxy: {
      '/api': { // 匹配所有以 '/api' 开头的请求路径
        target: 'http://localhost:4000', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        ws: true,
        pathRewrite: { // 重写路径：去掉路径开头的'/api'
          '^/api': '',
        },
      },
    }, */
  },
}
