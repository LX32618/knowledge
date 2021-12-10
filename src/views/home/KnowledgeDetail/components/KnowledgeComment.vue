<template>
  <el-row class="content-container">
    <el-col :span="18">
      <el-card>
        <span slot="header">大家对该知识的评论（共 {{ total }} 条）</span>
        <!-- 评论列表 -->
        <a-comment
          v-for="comment of pagedComments" :key="comment.id"
          :author="`${comment.userName}${comment.replayName ? ' 回复 ' + comment.replayName : ''}`"
          :content="comment.comment"
          :datetime="comment.createTime">
          <span slot="avatar">
            <el-avatar icon="el-icon-user"></el-avatar>
          </span>
          <template slot="actions">
            <el-input v-show="comment.id === activeCommentId" size="mini" v-model="replyContent" />
            <span v-show="comment.id !== activeCommentId" @click="activeCommentId = comment.id">回复</span>
            <span class="reply-btn" v-show="comment.id === activeCommentId" @click="handleReply(comment.userId)">确定</span>
            <span v-show="comment.id === activeCommentId" @click="activeCommentId = null">取消</span>
            <el-popconfirm title="确定要删除评论?" @onConfirm="handleDelete(comment.id)">
              <span slot="reference" v-if="comment.userId === userInfo.id && comment.id !== activeCommentId">删除</span>
            </el-popconfirm>
          </template>
        </a-comment>
        <el-pagination
          layout="total, prev, pager, next, jumper"
          :page-size="10"
          :current-page.sync="currentPage"
          :total="total" />
        <!-- 评论输入区域 -->
        <a-comment>
          <span slot="avatar">
            <el-avatar icon="el-icon-user"></el-avatar>
          </span>
          <span slot="content">
            <el-form>
              <el-form-item>
                <el-input type="textarea" v-model="commentContent" />
              </el-form-item>
              <el-form>
                <el-button type="primary" icon="fa fa-file-text" @click="handleComment"> 发表</el-button>
              </el-form>
            </el-form>
          </span>
        </a-comment>
      </el-card>
    </el-col>
    <el-col :offset="1" :span="5">
      <!-- <el-card>
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
      </el-card> -->
    </el-col>
  </el-row>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { mapGetters } from 'vuex'
import { quillEditor } from 'vue-quill-editor'
import { findCommentsByKnowledgeId, saveComment, deleteComment } from '@/api/knowledgeComment'

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
      replyContent: '',
      editorOption: {
        placeholder: '请输入评论',
      },
      comments: [],
      activeCommentId: null,
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    total () {
      return this.comments.length
    },
    pagedComments () {
      const currentPage = this.currentPage
      return this.comments.slice((currentPage - 1) * 10, currentPage * 10)
    }
  },
  methods: {
    update () {
      findCommentsByKnowledgeId(this.$route.params.id).then((res) => {
        this.comments = res.content
      })
    },
    handleComment () {
      if (!this.commentContent) {
        this.$error('评论内容不能为空')
        return
      }
      saveComment({
        comment: this.commentContent,
        knowledgeId: this.$route.params.id
      }).then(() => {
        this.$success('发表成功')
        this.update()
      })
    },
    handleReply (replyId) {
      if (!this.replyContent) {
        this.$error('回复内容不能为空')
        return
      }
      saveComment({
        comment: this.replyContent,
        knowledgeId: this.$route.params.id,
        replyId
      }).then(() => {
        this.$success('回复成功')
        this.activeCommentId = null
        this.update()
      })
    },
    handleDelete (id) {
      deleteComment(id).then(() => {
        this.$success('删除成功')
        this.update()
      })
    }
  },
  mounted () {
    this.update()
  }
}
</script>

<style scoped>
.content-container {
  width: 1200px;
  margin: 40px auto;
}
.reply-btn {
  margin-left: 5px;
}
</style>
