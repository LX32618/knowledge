<template>
  <div>
    <object id="office-preview" classid="clsid:A64E3073-2016-4baf-A89D-FFE1FAA10EE0" 
      codebase="OfficeControlx64.cab#version=6,0,1,0" width="100%" height="500">
      <param name="Toolbars" value="-1">
      <param name="BorderStyle" value="1">
      <param name="Titlebar" value="0">
      <param name="MenuBar" value="-1">
      <param name="ProductCaption" value="中国电子科技集团第二十九研究所"> 
      <param name="ProductKey" value="E240F4E59E48F9BE776699C8297EC0F5483D6DDD">
      <SPAN STYLE="color:red">该网页需要控件浏览.浏览器无法装载所需要的文档控件.请检查浏览器选项中的安全设置.</SPAN>
    </object>
  </div>
</template>

<script>
import { downloadFile } from '@/api/file'

export default {
  name: 'OfficePreview',
  components: {},
  props: {
    baseId: String,
    categoryId: String,
    attachId: String
  },
  data () {
    return {
      officeUrl: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    ntkGenObj () {
      // document.write(`<object id="office-preview"
      // classid="clsid:C9BC4DFF-4248-4a3c-8A49-63A7D317F404"`)
      // document.write(`codebase="OfficeControl.cab#version=4,0,0,6"
      // width="100%" height="100%">`)
      // document.write('<param name="Toolbars" value="-1">')
      // document.write('<param name="BorderStyle" value="1">')
      // document.write('<param name="Titlebar" value="0">')
      // document.write('<param name="MenuBar" value="-1">')
      // document.write(`<span style="color:red">不能装载NTKO Office文档控件</span>`)
      // document.write('</object>')
    }
  },
  created () {},
  async mounted () {
    try {
      const file = await downloadFile({
        baseId: this.baseId,
        categoryId: this.categoryId,
        attachId: this.attachId
      })
      this.officeUrl = URL.createObjectURL(new Blob([ file ]))
    } catch (error) {
      this.$error(error)
      return
    }
    this.ntkGenObj()
    const ntkoobj = document.getElementById("office-preview")
    console.log(ntkoobj)
    //  const ntkoobj = document.getElementById("office-preview")
     if (null === ntkoobj) {
       this.$error('NTKO Office文档控件未能正确装载')
       return
     }
    //  ntkoobj.BeginOpenFromURL(this.officeUrl)
  }
}
</script>

<style lang="less" scoped></style>
