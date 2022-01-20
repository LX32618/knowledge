<template>
  <div class="tool-bar">
    <el-button-group>
      <el-button type="success" icon="el-icon-s-home" @click="handleHomeClick"
        >首页</el-button
      >
      <el-button
        type="warning"
        icon="el-icon-star-off"
        @click="handleCollect"
        :loading="collectLoading"
        >{{ isCollect ? '取消收藏' : '收藏' }}</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-s-claim"
        @click="handleSubscribe"
        :loading="subscribeLoading"
        >{{ isSubscribe ? '取消订阅' : '订阅' }}</el-button
      >
      <el-button
        v-if="auditStatus !== '-1'"
        type="danger"
        icon="el-icon-document-add"
        @click="addVersion"
        >新建版本</el-button
      >
      <el-button
        type="info"
        icon="el-icon-document-copy"
        @click="viewHistoryVersion"
        >历史版本 V{{ baseData.ver }}</el-button
      >
      <el-button
        v-if="auditStatus === '-3' && !isEdit"
        type="success"
        icon="el-icon-view"
        @click="publish"
        :loading="publishLoading"
        >发布</el-button
      >
    </el-button-group>
    <collect-dialog
      :show.sync="collectShow"
      :knowledge="knowledge"
      @success="collectSuccess"
    ></collect-dialog>
    <!-- <el-dialog :visible.sync="flowShow" title="知识发布" fullscreen>
      <iframe v-if="flowShow" class="flow-iframe" src="http://glaway.soft.net/fms-basic/customWorkFlowFormConfigController.do?getDynamicFormByFormKey&processDefinitionId=process1621997049651:2:25030"></iframe>
    </el-dialog> -->
  </div>
</template>

<script>
import CollectDialog from '@/components/Input/CollectDialog'
import { mapGetters } from 'vuex'
import {
  isSubscribe,
  subscribe,
  cancelSubscribe
} from '@/api/knowledgeSubscribe'
import { isCollect, deleteCollect } from '@/api/knowledgeCollect'
import { passKnowledge } from '@/api/knowledgeBase'
import { createKnowledgeVersion } from '@/api/knowledgeVersion'
import { openNewWindows } from '@/utils/html'
import { startFlow, fetchProcessId } from '@/api/flow'
import { updateDataLifeCycle } from '@/api/knowledgeBase'

export default {
  name: 'ToolBar',
  components: {
    CollectDialog
  },
  props: {
    baseData: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isSubscribe: false,
      isCollect: false,
      collectInfo: {},
      subscribeLoading: true,
      collectLoading: true,
      publishLoading: false,
      hasPublished: false,
      processId: null,
      collectShow: false,
      flowShow: false,
      auditStatus: null
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    knowledge() {
      return {
        NAME: this.baseData.name,
        KNOWLEDGE_ID: this.baseData.id
      }
    }
  },
  watch: {
    'baseData.auditStatus': {
      handler(val) {
        this.auditStatus = val
      },
      immediate: true
    }
  },
  methods: {
    async publish() {
      this.publishLoading = true
      const id = this.knowledge.KNOWLEDGE_ID
      try {
        if (!this.processId) {
          await updateDataLifeCycle(id)
          this.$success('知识发布成功')
          this.auditStatus = '1'
          return
        }
        const res = await startFlow(this.processId, this.knowledge.KNOWLEDGE_ID)
        const { success, msg } = res
        if (success) {
          this.$success(msg)
          this.auditStatus = '-1'
        }
      } catch (err) {
        this.$error(err)
      } finally {
        this.publishLoading = false
      }
    },
    async test() {
      await passKnowledge({
        id: this.knowledge.KNOWLEDGE_ID,
        auditor: 'songyg',
        auditing: '1'
      })
      this.$success('知识发布成功')
    },
    handleHomeClick() {
      this.$router.push('/')
    },
    // 订阅 / 取消订阅知识
    handleSubscribe() {
      const id = this.$route.params.id
      const userId = this.userInfo.id
      const text = `${this.isSubscribe ? '取消' : ''}订阅`
      this.subscribeLoading = true
      if (this.isSubscribe) {
        cancelSubscribe({
          ids: `${id}-0`,
          userId
        })
          .then(() => {
            this.isSubscribe = false
            // this.$emit('update:isSubscribe', false)
            this.$success(`${text}成功`)
            this.subscribeLoading = false
          })
          .catch(() => {
            this.$error(`${text}失败`)
            this.subscribeLoading = false
          })
      } else {
        subscribe({
          id,
          userId
        })
          .then(() => {
            this.isSubscribe = true
            // this.$emit('update:isSubscribe', true)
            this.$success(`${text}成功`)
            this.subscribeLoading = false
          })
          .catch(() => {
            this.$error(`${text}失败`)
            this.subscribeLoading = false
          })
      }
    },
    // 收藏 / 取消收藏知识
    handleCollect() {
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
    collectSuccess() {
      this.updateCollect()
      this.$success('收藏成功')
    },
    updateCollect() {
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
    },
    // 新建版本
    async addVersion() {
      try {
        await this.$confirm(
          '新建版本后当前版本将进入历史版本中，新版本数据为待发布状态',
          '提示',
          {
            type: 'info'
          }
        )
        await createKnowledgeVersion(this.baseData.id)
        const url = this.$router.resolve({
          path: this.$route.path,
          query: {
            editType: 1
          }
        })
        // window.location.href = url.href
        window.open(url.href)
        window.close()
      } catch (err) {
        if (err === 'cancel') return
        this.$error('新建版本失败')
      }
    },
    // 查看历史版本
    viewHistoryVersion() {
      openNewWindows(this.$router, `/knowledgeVersion/${this.baseData.id}`)
    }
  },
  mounted() {
    isSubscribe({
      id: this.$route.params.id,
      userId: this.userInfo.id
    }).then(res => {
      this.isSubscribe = res.content
      this.subscribeLoading = false
    })
    fetchProcessId(this.$route.params.id).then(res => {
      this.processId = res.content.processDefId
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
.flow-iframe {
  width: 100%;
  height: 80vh;
}
</style>
