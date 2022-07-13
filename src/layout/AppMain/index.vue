<template>
  <div>
    <div class="main-box">
      <div class="main-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',

  created() {
    // console.log(this.$route.matched)
  }
}
</script>
<style lang="scss" scoped>
.main-box {
  height: 100%;
  background-color: #fff;
}
.main-content {
  padding: 20px;
}
</style>
