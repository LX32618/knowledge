<template>
  <div>
    <el-upload :action="realUrl"
      name="filedata"
      :accept="acceptFiles"
      :disabled="disabled"
      :multiple="multiple"
      :auto-upload="autoUpload"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :show-file-list="false">
      <el-button size="small" type="primary" :disabled="disabled" v-if="edit" :loading="isLoading">{{ btnTitle }}</el-button>
      <div slot="tip" class="el-upload__tip">{{tips}}</div>
    </el-upload>
    <div class="file-list" v-for="(file, index) of fileList" :key="file.id" :id="file.id">
      <div>
        <i :class="iconClass(file.type)"></i> {{ showFileName(file) }}
      </div>
      <div>
        <el-button
          class="view-btn"
          :loading="isLoading"
          type="success"
          icon="el-icon-view"
          circle
          size="mini"
          @click="handlePreview(file)"></el-button>
        <el-button
          class="view-btn"
          :loading="isLoading"
          type="primary"
          icon="el-icon-download"
          circle
          size="mini"
          @click="handleDownload(file)"></el-button>
        <el-button
          v-show="!disabled"
          :loading="isLoading"
          class="remove-btn"
          type="danger"
          icon="el-icon-close"
          circle
          size="mini"
          @click="handleRemove(file, index)"></el-button>
      </div>
    </div>
    <!-- <el-dialog :visible.sync="previewShow" title="视频预览">
      <video class="preview-video" controls preload="auto">
        <source :src="previewUrl" :type="`video/${previewFile.type}`" />
        <source src="http://glaway.soft.net/app-zuul/knowledge/app/authcenter/api/viewImage?attachid=BF6604D079CA4D3BAE2F62E87E6FBE48" :type="`video/${previewFile.type}`" />
      </video>
    </el-dialog> -->
  </div>
</template>

<script>
import Viewer from 'viewerjs'
import { ntkoBrowser } from '@/plugins/officePreview/ntkobackground.min.js'
import { getAttachInfo, downloadFile, getFileUrl } from '@/api/file'

require('viewerjs/dist/viewer.css')
export default {
  name: "FileUpload",
  inject: {
    contentContainer: {
      default: {}
    }
  },
  props:{
    value: {
      type: String,
      default: ''
    },
    uploadUrl: {
      type: String,
      default:""
    },
    accept:{
      type:Array,
      default:()=>[]
    },
    defaultAccept:{
      type:Array,
      default:()=>[]
    },
    limit:{
      type:Number,
      default:1
    },
    disabled:{
      type:Boolean,
      default:false
    },
    edit:{
      type:Boolean,
      default:true
    },
    autoUpload:{
      type:Boolean,
      default:false
    },
    // fileList:{
    //   type:Array,
    //   default:()=>[]
    // },
    multiple:{
      type:Boolean,
      default:true
    },
    tips:{
      type:String,
      default:""
    },
    btnTitle:{
      type:String,
      default:""
    },
    knowledgeId: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      fileList: [],
      videoTypes: ['mp4'],
      officeTypes: ['doc', 'docx', 'xlx', 'xlsx'],
      imageTypes: ['png', 'jpg', 'jpeg', 'gif'],
      isLoading: false,
      previewShow: false,
      previewFile: {},
      previewUrl: '',
      selfUpdate: false
    }
},
  computed:{
    acceptFiles(){
      return this.accept.map(a=>"."+a).join(",");
    },
    realUrl () {
      // return `/app-zuul/knowledge/app/authcenter/api/knowledgeUpload/post?categoryId=${this.knowledgeId}`
      return '/app-zuul/knowledge/app/authcenter/api/upLoadFile/post'
    },
    baseId () {
      return this.contentContainer.baseData.id
    },
    categoryId () {
      return this.contentContainer.baseData.classification
    }
  },
  watch: {
    value () {
      this.updateFileList()
    }
  },
  methods:{
    iconClass (type) {
      if (this.videoTypes.indexOf(type) >= 0) {
        return 'el-icon-video-camera'
      } else if (this.imageTypes.indexOf(type) >= 0) {
        return 'el-icon-picture-outline'
      } else {
        return 'el-icon-document'
      }
    },
    updateValue () {
      const ids = this.fileList.map(item => item.id)
      this.$emit('input', ids.join(','))
      this.selfUpdate = true
    },
    async updateFileList () {
      if (this.selfUpdate) {
        this.selfUpdate = false
        return
      }
      this.isLoading = true
      const { content } = await getAttachInfo(this.value)
      this.fileList = content
      this.isLoading = false
    },
    async handlePreview (file){
      if (this.officeTypes.indexOf(file.type) >= 0) {
        const res = await getFileUrl(file.id)
        ntkoBrowser.openWindow(`${process.env.VUE_APP_FILE_URL}/editindex.html?cmd=2&url=${res.content}`)
        // this.$info('文件格式暂不支持预览')
      } else if (file.type === 'pdf') {
        const res = await getFileUrl(file.id)
        window.open(res.content)
      } else if (this.videoTypes.indexOf(file.type) >= 0) {
        window.open(`/app-zuul/knowledge/app/authcenter/api/viewImage?attachid=${file.id}`)
      } else if (this.imageTypes.indexOf(file.type) >= 0) {
        this.viewer && this.viewer.destroy()

        this.$nextTick(() => {
          this.viewer = new Viewer(document.getElementById(file.id))
          this.viewer.view(0)
        })
      } else {
        this.$info('文件格式不支持预览')
      }
    },
    handleRemove(file, index){
      this.$confirm(`确定移除${ file.name }？`).then(() => {
        this.fileList.splice(index, 1)
        this.updateValue()
      }).catch(() => {})
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择${this.limit}个文件，本次选择了 ${files.length}个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleBeforeUpload () {
      this.isLoading = true
    },
    handleSuccess(response, file, fileList) {//上传成功
      const content = response.content
      const info = content.info
      if (this.fileList.findIndex(item => item.id === info.id) >= 0) {
        // fileList.splice(changeIndex, 1)
        this.$error('文件已存在')
        return
      }
      if (content.isExist) {
        this.$confirm('系统中已存在该文件，是否关联到本条知识?', '提示', { type: 'info' }).then(() => {
          this.fileList.push(info)
          this.updateValue()
        }).catch(() => {})
      } else {
        this.fileList.push(info)
        this.updateValue()
      }
      this.isLoading = false
    },
    handleError(err, file, fileList){
      this.$error(err)
    },
    async handleDownload (fileConfig) {
      this.isLoading = true
      try {
        const file = await downloadFile({
          baseId: this.baseId,
          categoryId: this.categoryId,
          attachId: fileConfig.id
        })
        const url = URL.createObjectURL(new Blob([ file ]))
        const downloadElement  = document.createElement('a')
        downloadElement.style.display = 'none'
        downloadElement.href = url
        downloadElement.download = fileConfig.name
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
        URL.revokeObjectURL(url)
        this.isLoading = false
      } catch (err) {
        this.$error('文件下载失败')
        this.isLoading = false
      }
    },
    showFileName (file) {
      return file.name.length > 15
        ? `${file.name.slice(0, 8)}....${file.type}`
        : file.name
    },
    async initialPreview (fileConfig) {
      this.isLoading = true
      try {
        const file = await downloadFile({
          baseId: this.baseId,
          categoryId: this.categoryId,
          attachId: fileConfig.id
        })
        this.previewUrl = URL.createObjectURL(new Blob([ file ]))
        this.isLoading = false
      } catch (error) {
        this.$error(error)
        this.isLoading = false
        this.previewUrl = ''
      }
    }
  },
  mounted () {
    this.updateFileList()
  }
}
</script>

<style lang="less" scoped>
.file-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  .view-btn {
    // color: #67C23A;
    cursor: pointer;
  }
  .remove-btn {
    margin-left: 10px;
    // color: #F56C6C;
    cursor: pointer;
  }
}
.preview-video {
  width: 100%;
  height: 100%;
}
</style>
