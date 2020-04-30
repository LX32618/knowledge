<template>
  <div class="container" v-if="currentKnowledgeBase" v-loading="isLoading">
    <div class="wrapper">
      <!-- 面包屑导航条 -->
      <div class="nav-container">
        <i class="el-icon-location"></i> 当前位置：
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }" class="breadcurmb-text"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item class="breadcurmb-text">{{
            this.currentKnowledgeBase.name
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <side-nav
            :knowledgeBase="currentKnowledgeBase"
            @selectCategory="handleCategoryChange"
          ></side-nav>
        </el-col>
        <el-col :span="18">
          <detail-area
            :selectedCategory="selectedCategory"
            :currentKnowledgeBase="currentKnowledgeBase"
          ></detail-area>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { errorMsg } from '@/utils/msg'
import SideNav from './components/SideNav'
import DetailArea from './components/DetailArea'
import _ from 'lodash'

export default {
  name: 'KnowledgeBase',
  components: {
    SideNav,
    DetailArea
  },
  props: {
    id: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {
      currentKnowledgeBase: {},
      isLoading: false,
      selectedCategory: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'docCategories'
    ])
  },
  async mounted () {
    this.isLoading = true
    await this.$store.dispatch('docCategory/fetchCategories')
    this.isLoading = false
    this.currentKnowledgeBase = this.docCategories.find(item => item.id == this.id)
    this.selectedCategory = _.pick(this.currentKnowledgeBase, ['id', 'name', 'type'])
    if (!this.currentKnowledgeBase) {
      this.$router.push('/')
      errorMsg('知识库不存在，请刷新再尝试')
      return
    }
    document.title = `${this.currentKnowledgeBase.name} | 知识工程`
  },
  methods: {
    handleCategoryChange (data) {
      this.selectedCategory = data
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: #ecf0f1;
  margin-top: 70px;
}
.wrapper {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 10px 0;
  font-size: 14px;
  line-height: 1;
  font-family: "PingFang SC";
}
.el-breadcrumb {
  display: inline-block;
}
.nav-container {
  margin-bottom: 10px;
}
</style>
