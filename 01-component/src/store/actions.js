export default {
    change_async_name({
        commit
    }, payload) {
        setTimeout(() => {
            commit('change_name', payload);
        }, 1000)
    }
}