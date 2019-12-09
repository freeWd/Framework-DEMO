// 第 1 步：创建一个 Vue 实例
const Vue = require("vue");
const server = require("express")();
const renderer = require("vue-server-renderer").createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
});

server.get("*", (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是 {{ url }}</div>`
  });

  const context = {
    title: 'hello',
    meta: `
      <meta ...>
      <meta ...>
    `
  }

  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end("Internal Server Error");
      return;
    }
    console.log(html);
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end(html);
  });
});

server.listen(8080);
