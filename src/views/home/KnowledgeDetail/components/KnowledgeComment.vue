<template>
  <el-row class="content-container">
    <el-col :span="18">
      <el-card>
        <span slot="header">大家对该知识的评论（共0条）</span>
        <!-- 评论输入区域 -->
        <el-row class="input-container">
          <el-col :span="4" class="user-info-wrapper">
            <el-avatar icon="el-icon-user"></el-avatar><br />
            {{ userInfo.name }}
          </el-col>
          <el-col :span="20">
            <quill-editor v-model="commentContent" :options="editorOption" />
            <br />
            <el-button type="primary" icon="fa fa-file-text"> 发表</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :offset="1" :span="5">
      <el-card>
        <span slot="header">知识评价</span>
        <el-rate v-model="knowledgeAssess.rate"></el-rate><br />
        <el-radio-group v-model="knowledgeAssess.rank">
          <el-radio
            v-for="(rank, index) of ranks"
            :key="index"
            :label="index"
            >{{ rank }}</el-radio
          ></el-radio-group
        >
        <br /><br />
        <el-button type="primary" icon="fa fa-save"> 保存</el-button>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { mapGetters } from 'vuex'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'KnowledgeComment',
  components: {
    quillEditor
  },
  data () {
    return {
      ranks: ['好', '一般', '不好'],
      knowledgeAssess: {},
      commentContent: '',
      editorOption: {
        placeholder: '请输入评论',
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  }
}
</script>

<style scoped>
.content-container {
  width: 1200px;
  margin: 40px auto;
}
.user-info-wrapper {
  text-align: center;
}
.input-container {
  min-height: 300px;
}
.el-radio {
  color: black;
}
</style>
