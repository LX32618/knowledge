<template>
  <div class="list-wrapper">
    <div class="refresh-button-wrapper">
      <el-button
        type="primary"
        icon="el-icon-refresh"
        circle
        plain
        @click="update(nowTabIndex)"
      ></el-button>
    </div>
    <el-tabs class="list-tabs" @tab-click="handleClick" v-loading="isLoading">
      <el-tab-pane label="最新知识" name="0"></el-tab-pane>
      <el-tab-pane label="我的知识" name="1"></el-tab-pane>
      <el-tab-pane label="热点知识" name="2"></el-tab-pane>
      <div class="knowledge-list">
        <div v-for="item of list" :key="item.id" class="knowledge-item">
          <el-link type="primary" :disabled="!item.hasPermission"
            ><span>{{ item.name }}</span></el-link
          >
          <div class="item-content">{{ item.describe }}</div>
          <div class="item-footer">
            <span>{{ item.creator }}</span
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{ item.createDate | dateTime }}</span>
          </div>
        </div>
      </div>
    </el-tabs>
  </div>
</template>

<script>
import { fetchKnowledges } from '@/api/knowledge'
// import { fetchCollectKnowledge } from '@/api/knowledgeCollect'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeKnowledgeListWrapper',
  data () {
    return {
      list: [],
      isLoading: false,
      nowTabIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ])
  },
  methods: {
    update (type) {
      this.isLoading = true
      fetchKnowledges({
        creator: this.userInfo.name,
        type
      }).then(res => {
        this.list = res.content.list
        this.isLoading = false
      }).catch(error => {
        console.log(error)
        this.isLoading = false
      })
    },
    handleClick (tab) {
      this.nowTabIndex = tab.name
      this.update(tab.name)
    }
  },
  mounted () {
    this.update(this.nowTabIndex)
  }
}
</script>

<style scoped>
.list-wrapper {
  width: 842px;
  height: auto;
  background: #fff;
  float: left;
  position: relative;
}
.list-tabs {
  width: 100%;
  height: 48px;
}
.knowledge-list {
  width: 100%;
  padding: 6px;
}
.knowledge-item {
  width: 100%;
  border-bottom: solid 1px #ecf0f1;
  padding: 6px;
}
.el-link span {
  font-size: 16px;
  line-height: 36px;
}
.item-content {
  width: 100%;
  max-height: 40px;
  word-break: break-all;
  display: -webkit-box;
  font-size: 14px;
  line-height: 20px;
  color: #464646;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -moz-box;
  -moz-line-clamp: 2;
  -moz-box-orient: vertical;
}
.item-footer {
  font-size: 12px;
  color: #464646;
  line-height: 20px;
  margin-top: 16px;
}
.refresh-button-wrapper {
  z-index: 1;
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>
