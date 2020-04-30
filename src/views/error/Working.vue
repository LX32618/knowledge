<template>
  <div class="container">
    <div class="img-wrapper">
      <img
        class="img"
        src="@/assets/img/error/construction.png"
        alt="页面施工中"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Working'
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
