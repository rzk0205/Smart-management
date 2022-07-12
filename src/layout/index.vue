<template>
  <el-container>
    <el-aside width="200px">
      <AppAside></AppAside>
    </el-aside>
    <el-container>
      <el-header>
        <AppHeader></AppHeader>
      </el-header>
      <el-main>
        <AppMain></AppMain>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AppAside from './AppAside/index.vue'
import AppHeader from './AppHeader/index.vue'
import AppMain from './AppMain/index.vue'
export default {
  name: 'index',
  components: { AppAside, AppHeader, AppMain }
}
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: $header-bg-color;
  color: #333;
  line-height: 60px;
}

.el-aside {
  background-color: $aside-bg-color;
  color: #333;
}

.el-main {
  background-color: $main-bg-color;
  color: #333;
}
</style>
