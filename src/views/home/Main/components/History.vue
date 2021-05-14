<template>
  <div>
    <div class="history-title-wrapper">
      <span class="history-title">
        <i class="fa fa-bookmark"></i>
        历史足迹
      </span>
      <div class="history-list">
        <div
          class="history-item"
          v-for="(item, index) of footPrints"
          :key="item.KNOWLEDGEID">
          <span class="item-index">{{ index + 1 }}</span>
          <span class="item-name" @click="handleItemClick(item.KNOWLEDGEID)">{{ item.NAME }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getFootprints } from '@/api/sysLogServer'
import { openNewWindows } from '@/utils/html'

export default {
  name: 'HomeHistory',
  data () {
    return {
      footPrints: []
    }
  },
  methods: {
    handleItemClick (id) {
      openNewWindows(this.$router, `/KnowledgeDetail/${id}`)
    }
  },
  mounted () {
    getFootprints().then(res => {
      this.footPrints = res.content
    })
  }
}
</script>

<style lang="less" scoped>
.history-title-wrapper {
  width: 100%;
  height: 48px;
  margin-top: 20px;
  background: rgb(248, 248, 248);
}
.history-title {
  line-height: 48px;
  font-size: 20px;
  color: #4385f4;
  margin-left: 10px;
}
.history-list {
  .history-item {
    margin-top: 15px;
    .item-index {
      display: inline-block;
      background: #59676b;
      color: #fff;
      width: 20px;
      line-height: 18px;
      text-align: center;
      margin-right: 10px;
    }
    .item-name {
      width: 220px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
    }
  }
}
</style>