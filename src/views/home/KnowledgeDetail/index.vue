<template>
  <div class="container">
    <tool-bar :baseData="knowledge.baseData" />
    <KnowledgeTabs :id="id" :knowledge="knowledge" :editType="editType" />
  </div>
</template>

<script>
import ToolBar from './components/ToolBar'
import KnowledgeTabs from './KnowledgeTabs'
import { getModelAndData } from '@/api/knowledgeData'
import { handleGetKnowledgeModelAndDataResponse } from '@/utils/responseHelper'

export default {
  name: 'KnowledgeDetail',
  components: {
    ToolBar,
    KnowledgeTabs
  },
  props: {
    id: String
  },
  data () {
    return {
      knowledge: {
        baseData: {}
      },
      editType: undefined
    }
  },
  mounted () {
    const { editType } = this.$route.query
    this.editType = parseInt(editType)
    getModelAndData({ id: this.id }).then(res => {
      this.knowledge = handleGetKnowledgeModelAndDataResponse(res.content)
    })
  }
}
</script>

<style scoped>
.container {
  margin: 40px 5px;
}
</style>
