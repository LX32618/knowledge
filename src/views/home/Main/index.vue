<template>
  <div>
    <knowledge-catalog></knowledge-catalog>
    <div>
      <div class="home-content">
        <home-knowledge-list></home-knowledge-list>
        <div class="right-area">
          <home-person-center></home-person-center>
          <home-history></home-history>
        </div>
      </div>
    </div>
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
