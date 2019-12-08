<template>
  <div>
    <table
      style="margin: 0 auto; margin-top: 16px"
      border="1"
      v-if="shoppingCarList.length > 0"
    >
      <thead>
        <tr>
          <th>激活</th>
          <th>课程名称</th>
          <th>课程数量</th>
          <th>课程价格</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(carItem, index) in shoppingCarList" :key="carItem.name">
          <td>
            <input type="checkbox" name="shopping" checked="carItem.isActive" />
          </td>
          <td>
            {{ carItem.name }}
          </td>
          <td>
            <button @click="reduceCount(index)">-</button>
            {{ carItem.count }}
            <button @click="addCount(index)">+</button>
          </td>
          <td>
            {{ carItem.price * carItem.count }}
          </td>
        </tr>
        <tr>
          <td></td>
          <td colspan="2">{{ activeList }} / {{ allList }}</td>
          <td>
            {{ activePrice }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    shoppingCarList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    reduceCount(index) {
      const selectCarInfo = this.shoppingCarList[index];
      if (selectCarInfo.count === 1) {
        if (window.confirm("确认从购物车中删除此课程？")) {
          this.$emit("removeCarItem", index);
        }
      } else {
        selectCarInfo.count--;
      }
    },
    addCount(index) {
      const selectCarInfo = this.shoppingCarList[index];
      selectCarInfo.count++;
    }
  },
  computed: {
    activeList() {
      return this.shoppingCarList.filter(item => item.isActive).length;
    },
    allList() {
      return this.shoppingCarList.length;
    },
    activePrice() {
      return this.shoppingCarList.reduce((pre, next) => {
        return pre.price * pre.count + next.price * next.count;
      }, {price: 0, count: 0});
    }
  }
};
</script>
