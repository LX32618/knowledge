<template>
  <el-row>
    <el-col :span="2">
      <div
        class="version-item"
        :style="{
          color: item === currentVersion ? '#4385f4' : '#000'
        }"
        v-for="(item, index) of versoionList"
        :key="index">
        <i class="el-icon-document"></i>
        <span class="item-name" @click="switchVersion(item)">V{{ item }}</span>
      </div>
    </el-col>
    <el-col :span="22">
      <KnowledgeTabs ref="knowledgeTabs" :id="id" isHistory />
    </el-col>
  </el-row>
</template>

<script>
import KnowledgeTabs from './KnowledgeTabs'
import { getKnowledgeVersions } from '@/api/knowledgeVersion'

export default {
  name: 'HistoryVersion',
  components: {
    KnowledgeTabs
  },
  props: {
    id: String
  },
  data () {
    return {
      currentVersion: 1,
      versoionList: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    switchVersion (ver) {
      this.currentVersion = ver
      this.$refs.knowledgeTabs.update(this.currentVersion)
    }
  },
  created () {},
  async mounted () {
    const { content } = await getKnowledgeVersions(this.id)
    this.versoionList = content.map(item => item.VER || item.ver).reverse()
    this.currentVersion = content[0].VER || content[0].ver
    this.$refs.knowledgeTabs.update(this.currentVersion)
  }
}
</script>

<style lang="less" scoped>
.version-item {
  margin-top: 10px;
  text-align: center;
  .item-name {
    margin-left: 2px;
    cursor: pointer;
  }
}
</style>
