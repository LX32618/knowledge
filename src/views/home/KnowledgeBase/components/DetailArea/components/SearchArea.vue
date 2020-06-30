<template>
  <div>
    <el-form label-width="1px">
      <el-form-item>
        <el-col :span="12">
          <el-form-item label="知识名称" label-width="80px">
            <el-input v-model="searchOption.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="知识编号" label-width="80px">
            <el-input v-model="searchOption.code"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="关键字" label-width="80px">
            <el-input v-model="searchOption.keyword"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建日期" label-width="80px">
            <el-date-picker
              v-model="searchOption.createDate"
              type="daterange"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item
        label="标签选择"
        label-width="80px"
        v-if="selectedCategory.type === 2 && labelAreaShow"
      >
        <knowledge-labels-input
          v-model="searchOption.labels"
          :data="selectedCategory.labelInfo"
          @loadingSuccess="handleLabelsLoad"
        />
      </el-form-item>
      <!-- 功能按钮组 -->
      <el-form-item class="button-area">
        <el-button type="success" icon="el-icon-search" @click="handleSearch"
          >查询</el-button
        >
        <el-button type="info" icon="el-icon-refresh" @click="handleReset"
          >重置</el-button
        >
        <template v-if="selectedCategory.type === 2">
          <el-button type="danger" icon="el-icon-circle-plus" @click="handleAdd"
            >添加</el-button
          >
          <el-button
            @click="handleSubscribe"
            :type="isSubscribe ? 'warning' : 'primary'"
          >
            <template v-if="isSubscribe">
              <i class="el-icon-s-release"></i> 取消订阅
            </template>
            <template v-else> <i class="el-icon-s-claim"></i> 订阅 </template>
          </el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { subscribe, cancelSubscribe } from '@/api/knowledgeSubscribe'
import KnowledgeLabelsInput from '@/components/Input/KnowledgeLabelsInput'

export default {
  name: 'KnowledgeBaseSearchArea',
  components: {
    KnowledgeLabelsInput
  },
  props: {
    selectedCategory: {
      type: Object,
      default: () => ({})
    },
    currentKnowledgeBase: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      searchOption: {
        labels: []
      }, // 查询选项
      labels: [],
      isLoading: false,
      isSubscribe: false,
      labelAreaShow: true
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    selectedCategory (val) {
      this.searchOption = {
        labels: []
      }
      this.isSubscribe = val.isSubscribe
    }
  },
  methods: {
    // 查询
    handleSearch () {
      this.$emit('search', this.searchOption)
    },
    // 重置
    handleReset () {
      this.searchOption = {}
    },
    // 新增
    handleAdd () {
      const routeData = this.$router.resolve({
        name: "knowledgeForm",
        params: {
          id: this.currentKnowledgeBase.id,
          classification: this.selectedCategory.id
        }
      });
      window.open(routeData.href, '_blank');
    },
    // 订阅 / 取消订阅目录
    handleSubscribe () {
      const id = this.selectedCategory.id
      const userId = this.userInfo.id
      const text = `${this.isSubscribe ? '取消' : ''}订阅`
      if (this.isSubscribe) {
        cancelSubscribe({
          ids: `${id}-0`,
          userId
        }).then(() => {
          this.isSubscribe = false
          this.$emit('subscribeChange', {
            id: this.selectedCategory.id
          })
          this.$success(`${text}成功`)
        }).catch(() => {
          this.$error(`${text}失败`)
        })
      } else {
        subscribe({
          id,
          userId,
          type: '0'
        }).then(() => {
          this.isSubscribe = true
          this.$emit('subscribeChange', {
            id: this.selectedCategory.id
          })
          this.$success(`${text}成功`)
        }).catch(() => {
          this.$error(`${text}失败`)
        })
      }
    },
    // 知识标签选择树图标显示
    labelIconClass (node) {
      if (node.isBranch) {
        return node.isExpanded ? 'fa-folder-open' : 'fa-folder'
      }
      return 'fa-bookmark'
    },
    handleLabelsLoad (data) {
      if (!data || data.length == 0) {
        this.labelAreaShow = false
      }
    }
  }
}
</script>

<style scoped>
.button-area {
  text-align: center;
}
</style>
