<template>
  <div class="container">
    <div class="img-wrapper">
      <img class="img" src="@/assets/img/error/404.jpg" alt="404" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
.img-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -200px 0 0 -300px;
}
.img {
  width: 600px;
  height: 400px;
}
</style>
