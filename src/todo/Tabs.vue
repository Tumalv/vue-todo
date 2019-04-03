<template>
  <div class="helper">
    <span class="left">{{unfinishedTodos}} items left</span>
    <span class="tabs">
      <span
        :class="[state, filter === state ? 'actived': '']"
        v-for="state in states"
        :key="state"
        @click="filterState(state)"
      >{{state}}</span>
    </span>
    <span class="clearCompleted" @click="clearAllCompleted">Clear completed</span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true
    },
    todos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      states: ["all", "active", "completed"]
    };
  },
  computed: {
      unfinishedTodos () {
          return this.todos.filter(todo => !todo.completed).length;
      }
  },
  methods: {
    filterState(state) {
        this.$emit('filterChanged', state);
    },
    clearAllCompleted() {
        this.$emit('clearAllCompleted');
    }
  }
};
</script>

<style lang="stylus" scoped>
.helper {
  font-weight: 100;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  line-height: 30px;
  background-color: #fff;
  font-size: 14px;
  font-smoothing: antialiased;
}

.left, .clearCompleted, .tabs {
  padding: 0 10px;
  box-sizing: border-box;
}

.left, .clearCompleted {
  width: 150px;
}

.left {
  text-align: left;
}

.clearCompleted {
  text-align: right;
  cursor: pointer;
}

.tabs {
  width: 200px;
  display: flex;
  justify-content: space-around;

  * {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid rgba(175, 47, 47, 0);

    &.actived {
      border-color: rgba(175, 47, 47, 0.4);
      border-radius: 5px;
    }
  }
}
</style>
