<template>
  <div>
    <h1>{{ title }}</h1>
    <div>
      <label for="name">课程名称：</label>
      <input id="name" type="text" v-model="courseInfo.name" />
    </div>
    <div style="margin: 16px 0;">
      <label for="price">课程价格：</label>
      <input id="price" type="number" v-model="courseInfo.price" />
    </div>
    <button @click="addCourseList">添加课程到列表</button>

    <table
      style="margin: 0 auto; margin-top: 16px"
      border="1"
      v-if="courseList.length > 0"
    >
      <thead>
        <tr>
          <th>课程名称</th>
          <th>课程价格</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in courseList" :key="item.name">
          <td>
            {{ item.name }}
          </td>
          <td>
            {{ item.price }}
          </td>
          <td>
            <button @click="addToShoppingCar(index)">添加到购物车</button>
          </td>
        </tr>
      </tbody>
    </table>

    <ShoppingCar
      :shoppingCarList="shoppingCarList"
      @removeCarItem="removeCarItem"
    ></ShoppingCar>
  </div>
</template>

<script>
import ShoppingCar from "../../components/ShoppingCar";

export default {
  components: {
    ShoppingCar
  },
  data() {
    return {
      title: "购物车",
      shoppingCarList: [],
      courseList: [],
      courseInfo: {
        name: "",
        price: ""
      }
    };
  },
  methods: {
    addCourseList() {
      const hasExist = this.courseList.find(
        item => item.name === this.courseInfo.name
      );
      if (!hasExist) {
        this.courseList.push(Object.assign({}, this.courseInfo));
      }
    },
    addToShoppingCar(index) {
      const selectCourse = this.courseList[index];
      const hasExist = this.shoppingCarList.find(
        item => item.name === selectCourse.name
      );
      if (hasExist) {
        hasExist.count++;
      } else {
        this.shoppingCarList.push({
          ...selectCourse,
          count: 1,
          isActive: true
        });
      }
    },
    removeCarItem(index) {
      this.shoppingCarList.splice(index, 1);
    }
  }
};
</script>
