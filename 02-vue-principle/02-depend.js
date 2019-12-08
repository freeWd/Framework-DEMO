// 02 依赖收集与追踪
class Dep {
  constructor() {
    // 存储所有依赖
    this.deps = [];
  }

  // 在deps中添加一个监听器对象
  addDep(depItem) {
    this.deps.push(depItem);
  }

  // 通知所有监听器对象更新视图
  notifyAll() {
    this.deps.forEach(depItem => {
      depItem.update();
    });
  }
}

class Watcher {
  constructor() {
    Dep.target = this;
  }

  updae() {
    console.log("视图更新了");
  }
}
