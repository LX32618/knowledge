<template>
  <div class="tool-bar">
    <el-button-group>
      <el-button type="success" icon="el-icon-s-home" @click="handleHomeClick"
        >首页</el-button
      >
      <el-button type="warning" icon="el-icon-star-off" @click="handleCollect" :loading="collectLoading">{{ isCollect ? '取消收藏' : '收藏'}}</el-button>
      <el-button type="primary" icon="el-icon-s-claim" @click="handleSubscribe" :loading="subscribeLoading">{{ isSubscribe ? '取消订阅' : '订阅'}}</el-button>
      <!-- <el-button type="danger" icon="el-icon-document-add">新建版本</el-button>
      <el-button type="info" icon="el-icon-document-copy">历史版本</el-button> -->
      <el-button type="info" icon="el-icon-view" @click="test">发布</el-button>
    </el-button-group>
    <collect-dialog :show.sync="collectShow" :knowledge="knowledge" @success="collectSuccess"></collect-dialog>
  </div>
</template>

<script>
import CollectDialog from '@/components/Input/CollectDialog'
import { mapGetters } from 'vuex'
import { isSubscribe, subscribe, cancelSubscribe } from '@/api/knowledgeSubscribe'
import { isCollect, saveCollect, deleteCollect } from '@/api/knowledgeCollect'
import { passKnowledge } from '@/api/knowledgeBase'
import TagVue from '../../../bms/DictionaryTag/Tag.vue'

export default {
  name: 'ToolBar',
  components: {
    CollectDialog
  },
  props: {
    baseData: Object
  },
  data () {
    return {
      isSubscribe: false,
      isCollect: false,
      collectInfo: {},
      subscribeLoading: true,
      collectLoading: true,
      collectShow: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    knowledge () {
      return {
        NAME: this.baseData.name,
        KNOWLEDGE_ID: this.baseData.id
      }
    }
  },
  methods: {
    async test () {
      await passKnowledge({
        id: this.knowledge.KNOWLEDGE_ID,
        auditor: 'songyg',
        auditing: '1'
      })
      this.$success('知识发布成功')
    },
    handleHomeClick () {
      this.$router.push('/')
    },
    // 订阅 / 取消订阅知识
    handleSubscribe () {
      const id = this.$route.params.id
      const userId = this.userInfo.id
      const text = `${this.isSubscribe ? '取消' : ''}订阅`
      this.subscribeLoading = true
      if (this.isSubscribe) {
        cancelSubscribe({
          ids: `${id}-0`,
          userId
        }).then(() => {
          this.isSubscribe = false
          // this.$emit('update:isSubscribe', false)
          this.$success(`${text}成功`)
          this.subscribeLoading = false
        }).catch(() => {
          this.$error(`${text}失败`)
          this.subscribeLoading = false
        })
      } else {
        subscribe({
          id,
          userId,
        }).then(() => {
          this.isSubscribe = true
          // this.$emit('update:isSubscribe', true)
          this.$success(`${text}成功`)
          this.subscribeLoading = false
        }).catch(() => {
          this.$error(`${text}失败`)
          this.subscribeLoading = false
        })
      }
    },
    // 收藏 / 取消收藏知识
    handleCollect () {
      if (this.isCollect) {
        deleteCollect({
          knowledgeId: this.collectInfo.id,
          dictId: this.collectInfo.dictId
        }).then(() => {
          this.updateCollect()
          this.$success('取消收藏成功')
        })
      } else {
        this.collectShow = true
      }
    },
    collectSuccess () {
      this.updateCollect()
      this.$success('收藏成功')
    },
    updateCollect () {
      isCollect({
        knowledgeId: this.$route.params.id,
        userId: this.userInfo.id
      }).then(res => {
        this.isCollect = typeof res.content === 'object'
        if (this.isCollect) {
          this.collectInfo = res.content
        }
        this.collectLoading = false
      })
    }
  },
  mounted () {
    isSubscribe({
      id: this.$route.params.id,
      userId: this.userInfo.id
    }).then(res => {
      this.isSubscribe = res.content
      this.subscribeLoading = false
    })
    this.updateCollect()
  }
}
</script>

<style scoped>
.tool-bar {
  position: absolute;
  top: 5px;
  left: 5px;
}
</style>
