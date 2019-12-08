// 01 vue响应式原理：definedPrpperty
class SelfVue {
  constructor(option) {
    this._data = option.data;
    this.observer(this._data);
  }

  observer(value) {
    if (!value || typeof value !== "object") {
      return;
    }
    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key]);
    });
  }

  defineReactive(obj, key, val) {
    this.observer(val);
    Object.defineProperty(obj, key, {
      get() {
        return val;
      },
      set: newValue => {
        if (newValue === val) return;
        this.observer(newValue);
        console.log("数据更新了：", newValue);
      }
    });
  }
}

let obj = new SelfVue({
  data: {
    test: "123"
  }
});

obj._data.test = "hello world";
