<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="What to do next?"
      @keyup.enter="addTodo"
    >
    <Item v-for="todo in filterTodos" :key="todo.id" :todo="todo" @del="deleteTodo"></Item>
    <tabs :todos="todos" :filter="filter" @clearAllCompleted="clearAllCompleted" @filterChanged="filterChanged"></tabs>
  </section>
</template>

<script>
import Item from "./Item.vue";
import Tabs from "./Tabs.vue";
let id = 0;
export default {
  components: {
    Item, Tabs
  },
  data() {
    return {
      todos: [],
      filter: "all"
    };
  },
  computed: {
      filterTodos() {
          if(this.filter === 'all') {
              return this.todos;
          }
          const completed = this.filter === 'completed';
          return this.todos.filter(todo => todo.completed === completed)
      }
  },
  methods: {
    addTodo(e) {
        this.todos.unshift({
            id: id++,
            contents: e.target.value.trim(),
            completed: false
        });
        e.target.value = '';
    },
    deleteTodo(todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
    },
    clearAllCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
    },
    filterChanged(state) {
        this.filter = state;
    }
  }
};
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
