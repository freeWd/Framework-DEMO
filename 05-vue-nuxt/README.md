# Nuxt

[Nuxt.js docs](https://nuxtjs.org).

Nuxt 可以说是对 Vue 结合其他一些第三方库的二次深度封装，使用它不仅仅是为了服务端渲染，也可以是 PWA，前后端都有集成，如果用它默认的东西可以帮我们省掉很多初始项目的框架搭建中要考虑的到一些公共内容的编写和组合。
动态路由，loading, 扩展的 layout, SSR, PWA，JAMStack（静态站点）...

下面描述来自官网对自身特点的描述：

- NuxtJS 让你构建你的下一个 Vue.js 应用程序变得更有信心。这是一个 开源 的框架，让 web 开发变得简单而强大。
- Nuxt 基于一个强大的模块化架构。你可以从 50 多个模块中进行选择，让你的开发变得更快、更简单。对 PWA 的支持、添加谷歌分析到你的网页或生成网站地图，这些功能都无需重新发明轮子来获得
- Nuxt.js 默认优化你的应用程序。 我们尽可能地利用 Vue.js 和 Node.js 的最佳实践来构建高性能的应用程序。 Nuxt 帮你把所有不需要的比特都从你的应用程序中剔除，并且还包含了一组分析器，以便更好地优化你的应用程序
- Nuxt.js 具备有吸引力的解决方案、描述清晰的错误消息、强大的默认值和详细的文档

## 在使用过程中遇到的情况

> 使用 npx create-nuxt-app [app_name] 来安装，安装过程中做了一些选择，总体上的配置如下

- 使用 Javascript
- 使用 Koa
- 使用 Element
- 使用 Eslint 和 Prettier
- 使用 Jest （测试框架）

### 路由 路由根据 Pages 目录结构自动生成 vue-router 模块的路由设置

```js
// 在 Nuxt.js 里面定义带参数的动态路由，需要创建对应的以下划线作为前缀的 Vue 文件 或 目录。

pages/
--| _slug/
-----| comments.vue
-----| index.vue
--| users/
-----| _id.vue
--| index.vue

router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'users-id',
      path: '/users/:id?',
      component: 'pages/users/_id.vue'
    },
    {
      name: 'slug',
      path: '/:slug',
      component: 'pages/_slug/index.vue'
    },
    {
      name: 'slug-comments',
      path: '/:slug/comments',
      component: 'pages/_slug/comments.vue'
    }
  ]
}

// 你会发现名称为 users-id 的路由路径带有 :id? 参数，表示该路由是可选的。如果你想将它设置为必选的路由，需要在 users/_id 目录内创建一个 index.vue 文件。
```

### 异步数据

asyncData 方法会在组件（限于页面组件）每次加载之前被调用。它可以在服务端或路由更新之前被调用。 在这个方法被调用的时候，第一个参数被设定为当前页面的上下文对象，你可以利用 asyncData 方法来获取数据，Nuxt.js 会将 asyncData 返回的数据融合组件 data 方法返回的数据一并返回给当前组件。

```js
export default {
  async asyncData({ params }) {
    const { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
```

如果组件的数据不需要异步获取或处理，可以直接返回指定的字面对象作为组件的数据

```js
export default {
  data() {
    return { foo: 'bar' }
  }
}
```

Nuxt.js 在上下文对象 context 中提供了一个 error(params) 方法，你可以通过调用该方法来显示错误信息页面。params.statusCode 可用于指定服务端返回的请求状态码

```js
// promise
export default {
  asyncData({ params, error }) {
    return axios
      .get(`https://my-api/posts/${params.id}`)
      .then((res) => {
        return { title: res.data.title }
      })
      .catch((e) => {
        error({ statusCode: 404, message: 'Post not found' })
      })
  }
}

// 回调
export default {
  asyncData({ params }, callback) {
    axios
      .get(`https://my-api/posts/${params.id}`)
      .then((res) => {
        callback(null, { title: res.data.title })
      })
      .catch((e) => {
        callback({ statusCode: 404, message: 'Post not found' })
      })
  }
}
```

### Nuxt 使用 axios 重构 HTTP 请求, 强烈建议用户 使用他们的 axios 模块 用于 Nuxt 项目中。

如果您的项目中直接使用了 node_modules 中的 axios，并且使用 axios.interceptors 添加拦截器对请求或响应数据进行了处理，确保使用 axios.create 创建实例后再使用。否则多次刷新页面请求服务器，服务端渲染会重复添加拦截器，导致数据处理错误。

```js
import axios from 'axios'
const myaxios = axios.create({
  // ...
})
myaxios.interceptors.response.use(
  function(response) {
    return response.data
  },
  function(error) {
    // ...
  }
)
```

### Middleware 中间件

> 中间件和路由紧密相关，有点类似于 vue 中的路由守卫

中间件允许您定义一个自定义函数运行在一个页面或一组页面渲染之前。
一个中间件接收 context 作为第一个参数：

```js
export default function(context) {
  context.userAgent = process.server
    ? context.req.headers['user-agent']
    : navigator.userAgent
}
```

中间件执行流程顺序
1 nuxt.config.js
2 匹配布局
3 匹配页面

中间件可以异步执行,只需要返回一个 Promise 或使用第 2 个 callback 作为第一个参数：

```js
// middleware/stats.js
import axios from 'axios'

export default function({ route }) {
  return axios.post('http://my-stats-api.com', {
    url: route.fullPath
  })
}

// 然后在nuxt.config.js 、 layouts 或者 pages 中使用中间件

// nuxt.config.js
// 在nuxt.config.js添加后，stats 中间件将在每个路由改变时被调用
module.exports = {
  router: {
    middleware: 'stats'
  }
}

// 也可以将 middleware 添加到指定的布局或者页面
// pages/index.vue 或者 layouts/default.vue
export default {
  middleware: 'stats'
}
```

### Header 配置应用默认的 meta 标签 （具体使用查看下面三个地方）

- 官方文档
- /nuxt.config.js
- /pages/index.vue

### 视图 & 布局

- 默认有个 default.vue 文件，相当于 vue 中的 App.vue，构建自己的页头，页脚等基本布局信息
- 可以添加不同的布局页面，比如新建一个 dark.vue， 在跳转到 about 页面是，通过配置如下，来设置 about 路由使用 dark 布局而非 default
  ```js
  export default {
    layout: 'dark'
  }
  ```
- 可以通过编辑 layouts/error.vue 文件来定制化错误页面,这个布局文件不需要包含 <nuxt/> 标签。你可以把这个布局文件当成是显示应用错误（404，500 等）的组件。

### 插件

Nuxt.js 允许您在运行 Vue.js 应用程序之前执行 js 插件。这在您需要使用自己的库或第三方模块时特别有用。
说白了就是下载的第三方库的使用和调用

- 使用第三方模块，对于像 lodash 这样的第三方模块，下载后直接使用即可
- 使用 Vue 插件，比如 vue-notifications， elementui 需要在运行前配置好插件

  - 在 plugins 文件夹中添加

  ```js
  import Vue from 'vue'
  import VueNotifications from 'vue-notifications'

  Vue.use(VueNotifications)
  ```

  - `nuxt.config.js` 内配置 plugins 如下

  ```js
  module.exports = {
    plugins: ['~/plugins/vue-notifications']
  }
  ```

  - 如果插件位于 node_modules 并导出模块，需要将其添加到 transpile 构建选项：

  ```js
  module.exports = {
    build: {
      transpile: ['vue-notifications']
    }
  }
  ```

- 注入 \$root 和 context(有时您希望在整个应用程序中使用某个函数或属性值，此时，你需要将它们注入到 Vue 实例（客户端），context（服务器端）甚至 store(Vuex))

  - 注入实例

    ```js
    // plugins/vue-inject.js:
    import Vue from 'vue'
    Vue.prototype.$myInjectedFunction = (string) =>
      console.log('This is an example', string)

    // nuxt.config.js
    export default {
      plugins: ['~/plugins/vue-inject.js']
    }

    // 使用 example-component.vue:
    export default {
      mounted() {
        this.$myInjectedFunction('test')
      }
    }
    ```

  - 注入上下文

  ```js
  // plugins/ctx-inject.js:
  export default ({ app }, inject) => {
    // Set the function directly on the context.app object
    app.myInjectedFunction = (string) =>
      console.log('Okay, another function', string)
  }

  // nuxt.config.js:
  export default {
    plugins: ['~/plugins/ctx-inject.js']
  }

  // 只要获得context，就可以使用该函数（例如在asyncData和fetch中）。 ctx-example-component.vue:
  export default {
    asyncData(context) {
      context.app.myInjectedFunction('ctx!')
    }
  }
  ```

  - 同时注入(同时在 context，Vue 实例，甚至 Vuex 中同时注入), 使用 inject 方法

  ```js
  // plugins/combined-inject.js:
  export default ({ app }, inject) => {
    inject('myInjectedFunction', (string) =>
      console.log('That was easy!', string)
    )
  }

  // nuxt.config.js:
  export default {
    plugins: ['~/plugins/combined-inject.js']
  }

  // 现在就可以在context，或者Vue实例中的this，或者Vuex的actions/mutations方法中的this来调用myInjectedFunction方法
  export default {
    mounted() {
      this.$myInjectedFunction('works in mounted')
    },
    asyncData(context) {
      context.app.$myInjectedFunction('works with context')
    }
  }
  ```

- 控制插件时在客户端还是服务端使用

```js
export default {
  plugins: [
    { src: '~/plugins/both-sides.js' },
    { src: '~/plugins/client-only.js', mode: 'client' },
    { src: '~/plugins/server-only.js', mode: 'server' }

    // 或者通过命名变化也可以自动设置
    '~/plugins/foo.client.js', // only in client side
    '~/plugins/bar.server.js', // only in server side
    '~/plugins/baz.js' // both client & server
  ]

}
```

### Vuex 状态树

关于 Vuex 的状态数
和 vue 中的 vuex 使用一致，多了些小东西，以及可以根据文件名称动态添加到 Store 中。

- fetch 方法 fetch 方法会在渲染页面前被调用，作用是填充状态树 (store) 数据，与 asyncData 方法类似，不同的是它不会设置组件的数据。

- nuxtServerInit 方法 如果在状态树中指定了 nuxtServerInit 方法，Nuxt.js 调用它的时候会将页面的上下文对象作为第 2 个参数传给它（服务端调用时才会酱紫哟）。当我们想将服务端的一些数据传到客户端时，这个方法是灰常好用的。

举个例子，假设我们服务端的会话状态树里可以通过 req.session.user 来访问当前登录的用户。将该登录用户信息传给客户端的状态树，我们只需更新 store/index.js 如下：

```js
actions: {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session.user) {
      commit('user', req.session.user)
    }
  }
}
```
