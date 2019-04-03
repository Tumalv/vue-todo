<template>
    <div class="todo-header">
        <span>{{Todo}}</span>    
    </div>
</template>


<script>
export default {
    data() {
        return {
            Todo: "Todos"
        }
    }
}
</script>

<style lang="stylus" scoped>
.todo-header {
    font-size: 100px;
    font-weight: 100px;
    text-align: center;
    margin: 20px;
}
</style>
