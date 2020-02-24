const Vue = require("vue");
const path = require("path");
const express = require("express");
const fs = require("fs");
const { createBundleRenderer } = require("vue-server-renderer");

const app = express();

const template = fs.readFileSync("./dist/index-server.html", "utf-8");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");
const serverBundle = require("./dist/vue-ssr-server-bundle.json");

const render = createBundleRenderer(serverBundle, {
  template,
  clientManifest
});

app.get("/", (req, resp) => {
  // 把渲染好的字符串传递给客户端，只是返回一个字符串，并没有vue的实际功能
  let context = {
    url: req.url
  };

  render.renderToString(context, (err, html) => {
    console.log("1----->", html, err);
    resp.send(html);
  });
});

// 顺序报在下面, 通过中间件设置路径，允许index-ssr.html加载client.js
app.use(express.static(path.resolve(__dirname, "dist")));
app.use("/favicon.ico", (req, resp) => {
  resp.end();
});

// 如果访问的路径不存在，默认渲染index-ssr.html 并且把路由定向到当前请求的路径
app.get("*", (req, res) => {
  const context = {
    url: req.url
  };
  render.renderToString(context, (err, html) => {
    console.log("2----->", html, err);
    res.send(html);
  });
});

app.listen(3003, function() {
  console.log("vue ssr 服务启动成功");
});
