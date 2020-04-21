export default {
  add(state, newTask) {
    state.list.push({
      name: newTask,
      done: false
    })
  },

  toggle(state, task) {
    task.done = !task.done
  }
}
