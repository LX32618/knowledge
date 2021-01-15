<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="less">
</style>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
@import url('~@/style/index.less');
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  box-sizing: border-box;
}
</style>
