<template>
  <div>
    <div class="list-wrap">
      <div v-for="(file, index) of fileList" :key="file.id" :ref="file.id" :id="file.id" class="list-item" :style="{...borderStyle(file), ...sizeStyle}">
        <img v-if="file.url" :src="file.url">
        <img v-else src="~@/assets/img/error/imgNotFound.png">
        <div class="uplaod-action">
          <i v-if="file.url" class="action-btn el-icon-view" @click="handlePreview(file, index)"></i>
          <i v-show="!disabled" class="action-btn el-icon-edit" @click="handleUpload(index)"></i>
          <i v-show="!disabled" class="action-btn el-icon-delete" @click="handleRemove(index)"></i>
        </div>
      </div>
      <div v-show="!disabled" class="list-item upload-icon" :style="sizeStyle" @click="handleUpload(-1)">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <input
      ref="file-upload"
      v-show="false" type="file"
      accept="image/png,image/jpg,image/jpeg,image/gif"
      @change="handleFileChange" />
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import Viewer from 'viewerjs'
import { uploadFile, downloadFile } from '@/api/file'

require('viewerjs/dist/viewer.css')
export default {
  name: '',
  components: {},
  inject: {
    contentContainer: {
      default: {}
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    length: {
      type: Number,
      default: 9
    },
    preView: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fileList: [],
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      editIndex: -1,
      viewer: null,
      selfUpdate: false
    }
  },
  computed: {
    baseId () {
      return this.contentContainer.baseData.id
    },
    categoryId () {
      return this.contentContainer.baseData.classification
    },
    sizeStyle () {
      return {
        width: this.width + 'px',
        height: this.height + 'px'
      }
    }
  },
  watch: {
    value () {
      this.updateFileList()
    }
  },
  methods: {
    handleUpload (editIndex) {
      if (editIndex === -1 && this.fileList.length >= this.length) {
        this.$warning('超过最大上传数')
        return
      }
      this.editIndex = editIndex
      this.$refs['file-upload'].click()
    },
    async handleFileChange () {
      const fd = new FormData()
      const file = this.$refs['file-upload'].files[0]
      if (!file) return
      const url = URL.createObjectURL(file)
      fd.append('filedata', file)
      this.$refs['file-upload'].value = ''
      try {
        const { content } = await uploadFile(fd)
        const info = content.info
        if (this.fileList.findIndex(item => item.id === info.id) >= 0) {
          this.$error('文件已存在')
          return
        }
        if (content.isExist) {
          await this.$confirm('系统中已存在该文件，是否关联到本条知识?', '提示', { type: 'info' })
        }
        const item = {
          ...info,
          url
        }
        this.editIndex >= 0
          ? this.fileList.splice(this.editIndex, 1, item)
          : this.fileList.push(item)
        this.updateValue()
      } catch (err) {
        if (err !== 'cancel') {
          this.$error(err)
        }
      }
    },
    handlePreview (file, index) {
      this.viewer && this.viewer.destroy()

      this.$nextTick(() => {
        this.viewer = new Viewer(document.getElementById(file.id))
        this.viewer.view(0)
      })
    },
    handleDownload (file) {},
    handleRemove (index) {
      this.$confirm('确定要删除图片?', '提示', { type: 'warning' }).then(() => {
        this.fileList.splice(index, 1)
        this.updateValue()
      })
    },
    updateValue () {
      const ids = this.fileList.map(file => file.id)
      this.selfUpdate = true
      this.$emit('input', ids.join(','))
    },
    async updateFileList () {
      if (this.selfUpdate) {
        this.selfUpdate = false
        return
      }
      this.fileList = []
      if (!this.value) return
      const ids = this.value.split(',')
      for(let index in ids) {
        const id = ids[index]
        const item = { id }
        try {
          const file = await downloadFile({
            baseId: this.baseId,
            categoryId: this.categoryId,
            attachId: id
          })
          item.url = file ? URL.createObjectURL(new Blob([ file ])) : ''
        } catch (err) {
          this.$error('图片加载失败')
        }
        this.fileList.push(item)
      }
    },
    borderStyle (file) {
      return {
        border: `2px solid ${file.url ? '#67C23A' : '#F56C6C'}`
      }
    }
  },
  created () {},
  mounted () {
    this.updateFileList()
  }
}
</script>

<style lang="less" scoped>
.list-wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .list-item {
    position: relative;
    margin: 5px;
    font-size: 28px;
    color: #8c939d;
    line-height: 100px;
    text-align: center;
    border-radius: 5px;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover{
      .uplaod-action{
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    .uplaod-action {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: none;
      background-color: rgba(22, 22, 22, 0.5);
      z-index: 10;
      .action-btn {
        color: white;
        font-size: 18px;
        cursor: pointer;
      }
    }
  }
  .upload-icon {
    border: 1px dashed#409EFF;
    cursor: pointer;
  }
}
</style>
