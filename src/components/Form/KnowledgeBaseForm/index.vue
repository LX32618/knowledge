<template>
  <div class="form-wrapper">
    <el-form
      ref="knowledgeBaseForm"
      label-width="100px"
      :model="knowledge"
      :rules="rules"
      v-loading="pageLoading"
    >
      <el-form-item label="知识名称" prop="name">
        <el-input v-model="knowledge.name"></el-input>
      </el-form-item>
      <el-form-item label="知识编码" prop="code">
        <el-input v-model="knowledge.code"></el-input>
        <span class="form-tip"> 可为空，若不填系统将自动生成。</span>
      </el-form-item>
      <el-form-item label="缩略语" prop="abbrev">
        <el-input v-model="knowledge.abbrev"></el-input>
      </el-form-item>
      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="knowledge.keyword"></el-input>
        <span class="form-tip">多个关键字请用加号连接，如：工艺+机加。</span>
      </el-form-item>
      <el-form-item label="选择知识库">
        <el-select v-model="category" value-key="id">
          <el-option
            v-for="item of docCategories"
            :key="item.id"
            :value="item.id"
            :label="item.name"
            ><i class="fa fa-database"></i> {{ item.name }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="知识目录" prop="baseid">
        <treeselect
          v-model="knowledge.baseid"
          :options="subCategories"
          placeholder="请选择知识目录"
          noResultsText="未找到目录"
          :disabled="!category"
          :clearable="false"
          :default-expand-level="1"
          searchable
          disable-branch-nodes
          show-count
          v-loading="isLoading"
        >
          <span
            slot="option-label"
            slot-scope="{ node, count, shouldShowCount }"
            ><i class="fa" :class="baseIdIconClass(node)"></i>
            {{ node.label }}
            <span v-if="shouldShowCount"> ({{ count }})</span></span
          >
        </treeselect>
        <span v-if="!category" class="form-tip-danger">请先选择知识库</span>
      </el-form-item>
      <el-form-item label="知识标签" prop="lables">
        <treeselect
          v-model="knowledge.lables"
          multiple
          :options="labels"
          placeholder="请选择知识标签"
          noResultsText="未找到目录"
          :disabled="!knowledge.baseid"
          disable-branch-nodes
          show-count
          v-loading="isLoading"
        >
          <span
            slot="option-label"
            slot-scope="{ node, count, shouldShowCount }"
            ><i class="fa" :class="labelIconClass(node)"></i>
            {{ node.label }}
            <span v-if="shouldShowCount"> ({{ count }})</span></span
          ></treeselect
        >
        <span v-if="!knowledge.baseid" class="form-tip-danger"
          >请先选择知识库与知识目录</span
        >
      </el-form-item>
      <el-form-item label="密级" prop="secretLevel">
        <el-select v-model="knowledge.secretLevel" value-key="value">
          <el-option
            v-for="item of secretLevels"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input
          type="textarea"
          v-model="knowledge.describe"
          :rows="4"
          resize="none"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">
          <i class="fa fa-save" /> 保存</el-button
        >
        <el-button type="danger" @click="close">
          <i class="fa fa-close" /> 取消</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCategoryTree, getLablesTree, validateKnowledgeName } from '@/api/knowledge'
import { unflatTree, walkTree } from '@/utils/tree'

export default {
  name: 'KnowledgeBaseForm',
  props: {
    id: {
      type: String,
      default: '0'
    },
    baseid: {
      type: String,
      default: '0'
    }
  },
  data () {
    // 知识名称校验
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入知识名称'))
      }
      validateKnowledgeName(value).then(res => {
        if (res.data) {
          callback()
        } else {
          callback(new Error('知识名称已使用'))
        }
      })
    }
    return {
      knowledge: {},
      pageLoading: false,
      isLoading: false,
      category: '', // 选中知识库
      subCategories: [], // 知识目录选择集
      labels: [], // 知识标签选择集
      rules: {
        name: [
          { validator: checkName, trigger: 'blur' },
          { required: true, message: '请输入知识名称', trigger: 'change' }],
        baseid: [{ required: true, message: '请选择知识目录', trigger: 'change' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'docCategories',
      'secretLevels'
    ]),
  },
  watch: {
    category () {
      // 重置已选择知识目录与知识标签
      this.$set(this.knowledge, 'baseid', undefined)
      this.$set(this.knowledge, 'lables', [])
      // 重置知识目录与知识标签选择集
      this.subCategories = []
      this.labels = []
      // 若未选择知识库直接返回
      if (!this.category) {
        return
      }
      // 更新知识目录选择集
      this.isLoading = true
      getCategoryTree({ id: this.category }).then(res => {
        let data = res.data
        data = unflatTree(data, 0) // 生成树
        // 格式化节点
        walkTree(data, item => {
          item.label = item.name
          if (!item.children || item.children.length === 0) {
            item.children = undefined
            // 叶子结点中类型为知识库或分类的不可选择
            if (item.type < 2) {
              item.isDisabled = true
            }
          }
          return item
        })
        this.subCategories = data
        this.isLoading = false
      })
    },
    'knowledge.baseid': function () {
      // 重置已选择知识标签与知识标签选择集
      this.$set(this.knowledge, 'lables', [])
      this.labels = []
      // 若未选择知识目录直接返回
      if (!this.knowledge.baseid) {
        return
      }
      // 更新知识标签选择集
      this.isLoading = true
      getLablesTree({ classificationid: this.knowledge.baseid }).then(res => {
        let data = res.data
        data = unflatTree(data, 0) // 生成树
        // 格式化节点
        walkTree(data, item => {
          if (!item.children || item.children.length === 0) {
            item.children = undefined
          }
          return item
        })
        this.labels = data
        this.isLoading = false
      })
    }
  },
  methods: {
    save () {
      this.$refs.knowledgeBaseForm.validate(valid => {
        if (!valid) return
        window.close()
      })
    },
    close () {
      window.close()
    },
    // 重置表单
    reset () {
      this.knowledge = {
        secretLevel: 10,
        lables: []
      }
    },
    // 知识目录选择树图标显示
    baseIdIconClass (node) {
      if (node.raw.type < 2) {
        return node.isExpanded ? 'fa-folder-open' : 'fa-folder'
      }
      return 'fa-book'
    },
    // 知识标签选择树图标显示
    labelIconClass (node) {
      if (node.isBranch) {
        return node.isExpanded ? 'fa-folder-open' : 'fa-folder'
      }
      return 'fa-bookmark'
    }
  },
  async mounted () {
    this.reset()
    this.pageLoading = true
    // 加载知识库
    await this.$store.dispatch('docCategory/fetchCategories')
    if (this.id == 0) {
      this.pageLoading = false
      return
    }

    /* 连接后端后用
    this.category = this.id
    this.knowledge.baseid = this.baseid
    */

    // 测试专用
    this.category = parseInt(this.id)

    this.pageLoading = false
  }
}
</script>

<style scoped>
.form-wrapper {
  max-width: 1000px;
  margin: 20px auto;
}
.form-tip {
  font-size: x-small;
  color: #909399;
}
.form-tip-danger {
  font-size: x-small;
  color: #f56c6c;
}
</style>
