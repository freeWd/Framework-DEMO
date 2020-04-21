<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-for="(item, index) of GET_LIST" :key="index">
      <div :class="{ done: item.done }">
        <input :checked="item.done" type="checkbox" @click="toggle(item)" />
        {{ item.name }}
      </div>
    </div>

    <input type="text" v-model="newTask" />
    <button @click="addTask">+</button>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      title: 'Task List Title',
      newTask: null
    }
  },
  computed: {
    ...mapState('todos', ['list']),
    ...mapGetters('todos', ['GET_LIST'])
  },
  methods: {
    ...mapMutations('todos', ['add', 'toggle']),
    addTask() {
      if (this.newTask) {
        this.add(this.newTask)
        this.newTask = null
      }
    }
  }
}
</script>

<style scoped>
.done {
  text-decoration-line: line-through;
}
</style>
