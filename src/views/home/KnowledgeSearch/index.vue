<template>
  <div>
    <!-- 页头 -->
    <home-header :isCategoriesLoading="isLoading">
      <!-- 搜索库筛选 -->
      <div slot="searchCategory">
        <el-select
          v-model="searchCategory"
          placeholder="知识库"
          size="large"
          v-loading="isLoading"
          value-key="id">
          <el-option label="知识库" :value="''"></el-option>
          <el-option
            v-for="category of docCategories"
            :key="category.id"
            :label="category.categoryName"
            :value="category.id"></el-option>
        </el-select>
      </div>
      <!-- 搜索框 -->
      <div slot="searchText">
        <el-input
          v-model="searchText"
          placeholder="请输入你想搜索的内容"
          size="large"
          @keyup.enter.native="updateSearch">
          <el-button slot="append" icon="el-icon-search" @click="updateSearch"></el-button>
        </el-input>
      </div>
    </home-header>
    <div class="container">
      <div class="wrapper">
        <!-- 面包屑导航条 -->
        <div class="nav-container">
          <i class="el-icon-location"></i> 当前位置：
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }" class="breadcurmb-text"
              >首页</el-breadcrumb-item
            >
            <el-breadcrumb-item class="breadcurmb-text">搜索列表</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 搜索类型选择框 -->
        <el-radio-group v-model="searchType" @change="updateSearch" v-loading="searchLoading">
          <el-radio v-for="item of searchTypes" :key="item.name" :label="item.value">{{ item.label }}</el-radio>
        </el-radio-group>
        <!-- 查询结构列表 -->
        <div v-loading="searchLoading">
          <div v-if="searchResults.length === 0" class="empty-text">
            没有搜索到记录
          </div>
          <div class="knowledge-item" v-for="item of searchResults" :key="item.id">
            <template v-if="searchType === 'category'">
              <el-link type="primary" @click="handleCategoryLinkClick(item.baseId)">{{ item.CATEGORYNAME }}</el-link>
              <el-row class="item-bottom">
                <el-col :span="4">
                  <i class="fa fa-database"></i>
                  {{ item.baseName }}
                </el-col>
                <el-col :span="4">
                  <i class="fa fa-book"></i>
                  {{ item.parentCategory }}
                </el-col>
              </el-row>
            </template>
            <template v-else>
              <el-link type="primary" @click="handleLinkClick(item.id)">
                <span v-if="isCodeSearch">{{ item.NAME }}</span>
                <span v-else v-html="item.showName"></span>
              </el-link>
              <el-row class="item-bottom">
                <el-col :span="4">
                  <i class="fa fa-clock-o"></i>
                  {{ isCodeSearch ? item.CREATEDATE : item.createDate }}
                </el-col>
                <el-col :span="4">
                  <i class="fa fa-user-o"></i>
                  {{ isCodeSearch ? item.CREATORNAME : item.creatorName }}
                </el-col>
                <el-col :span="4">
                  <i class="fa fa-book"></i>
                  {{ isCodeSearch ? item.BASELIBRARY : item.baseLibrary }}
                </el-col>
              </el-row>
            </template>
          </div>
        </div>
        <el-pagination
          v-if="searchResults.length > 0"
          :total="total"
          :page-size.sync="rows"
          :current-page.sync="page"
          :page-sizes="[5, 10, 15, 20]"
          @current-change="updateSearch"
          @size-change="updateSearch"
          layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import HomeHeader from '../components/Header'
import { mapGetters } from 'vuex'
import { solrSearch } from '@/api/solr'

export default {
  name: 'Search',
  components: {
    HomeHeader
  },
  props: {
    query: [Object, String]
  },
  data () {
    return {
      isLoading: false,
      searchLoading: false,
      searchCategory: '',
      searchType: 'search_text',
      searchText: '',
      searchTypes: [
        { label: '知识', value: 'search_text' },
        { label: '知识名称', value: 'knowname_text' },
        { label: '知识属性', value: 'knowbase_text' },
        { label: '知识编号', value: 'knowcode_text' },
        { label: '附件', value: 'attach_text' },
        { label: '目录', value: 'category' }
      ],
      searchResults: [],
      page: 1,
      rows: 20,
      total: 0
    }
  },
  computed: {
    ...mapGetters([
      'docCategories'
    ]),
    isCodeSearch () {
      return this.searchType === 'knowcode_text'
    }
  },
  methods: {
    updateSearch () {
      if (!this.searchText.trim()) {
        this.$warning('请输入搜索内容')
        this.searchResults = []
        return
      }
      this.searchLoading = true
      solrSearch({
        page: this.page,
        rows: this.rows,
        searchText: this.searchText,
        searchLibrary: this.searchCategory,
        searchType: this.searchType
      }).then(res => {
        this.searchResults = res.content.datas
        this.total = res.content.total
        this.searchLoading = false
      }).catch(_  => {
        this.searchResults = []
        this.searchLoading = false
      })
    },
    handleLinkClick (id) {
      this.$router.push({
        name: 'knowledgeDetail',
        params: {
          id
        }
      })
    },
    handleCategoryLinkClick (baseId) {
      this.$router.push({
        name: 'knowledgeBase',
        params: {
          id: baseId
          // categoryId:
        }
      })
    }
  },
  async mounted () {
    this.searchText = this.$route.query.search
    if (this.docCategories.length === 0) {
      this.isLoading = true
      await this.$store.dispatch('docCategory/fetchCategories')
      this.isLoading = false
    }
    this.updateSearch()
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  overflow: auto;
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
  margin-bottom: 20px;
}
.knowledge-item {
  width: 100%;
  padding: 6px;
  margin-top: 10px;
}
.knowledge-item .el-link span {
  font-size: 16px;
}
.item-bottom {
  color: #909399;
  margin-top: 10px;
}
.empty-text {
  margin: 20px 0;
}
</style>
