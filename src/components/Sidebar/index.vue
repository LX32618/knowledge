<template>
  <el-menu :default-active="defaultActive">
    <cs-sideitem
      v-for="item in items"
      :item="item"
      :basePath="basePath"
      :key="item.name"
    ></cs-sideitem>
  </el-menu>
</template>

<script>
export default {
  name: "SideBar",
  props: ["defaultActive", "basePath", "items"],
  data () {
    return {};
  },

}
</script>

<style scoped>
</style>