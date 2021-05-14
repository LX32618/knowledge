<template>
  <div class="person-info-wrapper" v-loading="isLoading">
    <!-- 头像框 -->
    <div class="head-box">
      <el-avatar class="user-avator" :size="76" icon="el-icon-user-solid"></el-avatar>
      <div class="info-wrapper">
        <p class="info-name">{{ userInfo.realName }}</p>
      </div>
    </div>
    <!-- 知识信息 -->
    <div class="info-knowledge-wrapper">
      <div class="knowledge-info">
        <div class="knowledge-info-item">
          <span class="item-count">{{ knowledgeCount }}</span>
          <br />
          <span class="item-name">发布知识</span>
        </div>
        <div class="knowledge-info-item">
          <span class="item-count">{{ collectKnowledgeCount }}</span>
          <br />
          <span class="item-name">收藏知识</span>
        </div>
      </div>
    </div>
    <!-- 知识添加按钮 -->
    <div class="button-box">
      <el-button type="primary" @click="openAddKnowledgePage"
        >添加我的知识</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import { fetchCollectKnowledgeCount } from '@/api/knowledgeCollect'
import { fetchKnowledgeCount } from '@/api/knowledgeBase'
import { errorMsg } from '@/utils/msg'
import KnowledgeBaseForm from '@/components/Form/KnowledgeBaseForm'

export default {
  name: 'HomePersonCenter',
  components: {
    KnowledgeBaseForm
  },
  data () {
    return {
      headUrl: require('../../../../assets/img/home/head.jpg'),
      isLoading: false,
      knowledgeCount: 0, // 发布知识总条数
      collectKnowledgeCount: 0, // 收藏知识总条数
      dialogShow: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    // 获取发布知识总条数
    getknowledgeCount () {
      fetchKnowledgeCount({
        createId: this.userInfo.id
      }).then(res => {
        this.knowledgeCount = res.content
      }).catch(e => errorMsg(e))
    },
    // 获取收藏知识总条数
    getCollectKnowledgeCount () {
      fetchCollectKnowledgeCount({
        userId: this.userInfo.id
      }).then(res => {
        this.collectKnowledgeCount = res.content
      }).catch(e => errorMsg(e))
    },
    // 打开新增知识页面
    openAddKnowledgePage () {
      // const routeData = this.$router.resolve({
      //   name: "knowledgeForm",
      //   params: {
      //     id: '0',
      //     classification: '0'
      //   }
      // })
      // window.open(routeData.href, '_blank')
      this.$router.push({
        name: "knowledgeForm",
        params: {
          id: '0',
          classification: '0'
        }
      })
    }
  },
  mounted () {
    this.isLoading = true
    axios.all([this.getknowledgeCount(), this.getCollectKnowledgeCount()]).then(() => {
      this.isLoading = false
    }).catch(e => errorMsg(e))
  }
}
</script>

<style scoped>
.person-info-wrapper {
  width: 100%;
  height: auto;
  background: rgb(248, 248, 248);
}
.head-box {
  width: 100%;
  height: 112px;
  background: url(../../../../assets/img/home/user_background.png) no-repeat;
  background-size: auto;
  background-size: 100% 112px;
}
.el-avatar {
  float: left;
  margin: 20px;
  font-size: 36px;
}
.info-wrapper {
  float: left;
  color: #fff;
}
.info-name {
  font-size: 20px;
  line-height: 40px;
  font-weight: 600;
}
.info-knowledge-wrapper {
  width: 100%;
  padding: 6px;
}
.knowledge-info {
  overflow: hidden;
  width: 240px;
  margin: 0 auto;
}
.knowledge-info-item {
  width: 108px;
  margin: 6px;
  padding-bottom: 2px;
  float: left;
  text-align: center;
}
.item-count {
  font-size: 16px;
  color: #3c96e4;
  line-height: 40px;
  cursor: pointer;
}
.item-name {
  font-size: 14px;
  color: #696969;
}
.button-box {
  clear: both;
  text-align: center;
}
.el-button {
  width: 278px;
  font-size: 16px;
  height: 40px;
  margin: 10px auto;
}
</style>
