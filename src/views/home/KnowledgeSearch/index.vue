<template>
  <div>
    <home-header :isCategoriesLoading="isLoading"></home-header>
  </div>
</template>

<script>
import HomeHeader from '../components/Header'

export default {
  name: 'Search',
  components: {
    HomeHeader
  },
  props: {
    query: [Object, String]
  },
  data () {
    return {
      isLoading: false
    }
  }
}
</script>