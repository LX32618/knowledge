<template>
  <div class="catalog">
    <div class="catalog-header">
      <h1 class="catalog-title">知识目录</h1>
    </div>
    <el-carousel
      class="catalog-list"
      height="480px"
      trigger="click"
      :autoplay="false"
    >
      <el-carousel-item
        v-for="(slicedArray, index) of slicedCategories"
        :key="index"
      >
        <router-link
          :to="`/knoweldgeBase/${item.id}`"
          tag="div"
          class="catalog-item"
          v-for="item of slicedArray"
          :key="item.id"
        >
          <i :class="iconClass(item.picture)"></i>
          <p>{{ item.categoryName }}</p>
        </router-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'KnowledgeCatalog',
  computed: {
    ...mapGetters([
      'docCategories',
      'defaultIcon',
      'icons'
    ]),
    slicedCategories () {
      const result = []
      let tmp = []
      for (let i = 0; i < this.docCategories.length; ++i) {
        tmp.push(this.docCategories[i])
        if (i % 12 === 11) {
          result.push(tmp)
          tmp = []
        }
      }
      if (tmp.length > 0) {
        result.push(tmp)
      }
      return result
    }
  },
  methods: {
    iconClass (picture) {
      return this.icons.indexOf(picture) > -1 ? picture : this.defaultIcon
    }
  }
}
</script>

<style scoped>
.catalog {
  width: 100%;
  height: auto;
  min-height: 500px;
  min-width: 1200px;
  background: url(../../../../assets/img/home/backgroundImg.png) no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.catalog-header {
  text-align: center;
  margin: 90px auto 0;
}
.catalog-title {
  font-size: 32px;
  color: #fff;
}
.catalog-list {
  width: 1200px;
  height: auto;
  margin: 30px auto;
  overflow: hidden;
}
.catalog-item {
  width: 198px;
  height: 128px;
  float: left;
  text-align: center;
  padding-top: 20px;
  margin: 0 50px;
  color: #ececec;
  font-size: 50px;
  cursor: pointer;
  border: 1px solid transparent;
}
.catalog-item:hover {
  border: 1px solid #fff;
}
.catalog-item p {
  color: #ececec;
  font-size: 14px;
  margin-top: 20px;
  cursor: default;
}
</style>
