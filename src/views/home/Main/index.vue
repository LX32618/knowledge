<template>
  <div>
    <knowledge-catalog></knowledge-catalog>
    <div>
      <el-button @click="open">新建流程</el-button>
      <div class="home-content">
        <home-knowledge-list></home-knowledge-list>
        <div class="right-area">
          <home-person-center></home-person-center>
          <home-history></home-history>
        </div>
      </div>
    </div>
    <!-- <el-dialog :visible.sync="show">
      <iframe src="/fms-basic/processDesignerController.do?init&oper=create##" width="100%" height="900px" frameborder="0"></iframe>
    </el-dialog> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import KnowledgeCatalog from './components/KnowledgeCatalog'
import HomeKnowledgeList from './components/KnowledgeListWrapper'
import HomePersonCenter from './components/PersonCenter'
import HomeHistory from './components/History'

export default {
  name: 'HomePage',
  components: {
    KnowledgeCatalog,
    HomeKnowledgeList,
    HomePersonCenter,
    HomeHistory
  },
  data () {
    return {
      show: true
    }
  },
  methods: {
    open () {
      window.open('http://glaway.soft.net/fms-basic/processDesignerController.do?init&oper=create##')
    }
  }
}
</script>

<style scoped>
.home-content {
  width: 1200px;
  height: auto;
  margin: 40px auto;
}
.right-area {
  width: 346px;
  float: right;
}
</style>
