export default function (Vue) {
  return {
    namespaced: true,
    state: {
      example: {},
    },
    mutations: {
      initExample(state) {
        let example = localStorage.getItem('example');
        if (example) {
          state.example = JSON.parse(example);
        }
      }
    }
  }
}