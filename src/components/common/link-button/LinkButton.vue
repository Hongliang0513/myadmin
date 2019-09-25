<template>
  <button class="linkbutton" @click="buttonClick()">{{title}}</button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return '按钮'
      },
    },
    buttonClick: {
      type: Function,
    },
  },
}
</script>

<style lang="less" scoped>
.linkbutton {
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  color: skyblue;
}
</style>
