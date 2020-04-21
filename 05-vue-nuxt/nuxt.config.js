module.exports = {
  mode: 'universal',
  /*
   * 该配置项用于配置应用默认的meta标签。
   * Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   * 该配置项用于个性化定制 Nuxt.js 使用的加载组件
   * Customize the progress-bar color
   */
  loading: '~/components/Loading.vue',
  /*
   * 该配置项用于定义应用的全局（所有页面均需引用的）样式文件、模块或第三方库
   * Global CSS
   */
  css: ['element-ui/lib/theme-chalk/index.css', '~/css/main.css'],
  /*
   * 该配置项用于配置那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件
   * Plugins to load before mounting the App
   */
  plugins: ['@/plugins/element-ui', '@/plugins/axios-interceptor'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   * 该配置项允许您将Nuxt模块添加到项目中
   * Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},

  // 配置全局路由中间件
  router: {
    middleware: ['visits', 'user-agent']
  },
  /*
   * 对底层的webpack做一些优化和自定义配置
   * Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
