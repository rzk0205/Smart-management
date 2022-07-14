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
// import Breadcrumb from '@/components/Breadcrumb.vue'
export default {
  name: 'index',
  // components: {
  //   Breadcrumb
  // },
  created() {}
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
