<template>
  <li>
    <slot></slot>
  </li>
</template>
<script>

  export default {
    name:'my-li'
  }
</script>
<style scoped>
  li {
    float: left;
    height: 20%;
    line-height: 218px;
    width: 33%;
    text-align: center;
    position: relative;
  }
</style>
