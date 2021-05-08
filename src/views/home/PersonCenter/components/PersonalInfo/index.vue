<template>
  <div class="info-wrapper">
    <el-avatar icon="el-icon-user-solid" :size="150"></el-avatar>
    <div class="user-name">{{ userInfo.realName }}</div>
    <!-- <div class="user-info">
      <i class="el-icon-phone"></i> {{ userInfo.phone }}
    </div>
    <div class="user-info">
      <i class="el-icon-message"></i> {{ userInfo.email }}
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PersonalInfo',
  data () {
    return {
      headUrl: require('../../../../../assets/img/home/head.jpg'),
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
.info-wrapper {
  margin-top: 180px;
  text-align: center;
  color: black;
}
.user-name {
  margin: 25px;
  font-size: 20px;
  font-weight: bold;
}
.user-info {
  margin: 20px;
  font-size: 16px;
}
.el-avatar {
  font-size: 70px;
}
</style>
