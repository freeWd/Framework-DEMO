export default {
    change_name(state, payload) {
        console.log(payload);
        state.name = payload;
    }
}