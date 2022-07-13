<template>
  <div class="main">
    <el-breadcrumb
      v-if="this.$route.path !== '/'"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: '/sys/users' }"
        v-for="(item, index) in bread"
        :key="index"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
    <el-divider></el-divider>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {}
  },
  methods: {},
  computed: {
    bread() {
      return this.$route.matched
    }
  }
}
</script>
<style scoped lang="scss">
.main {
  background-color: #fff;
}
.el-breadcrumb {
  padding: 20px 20px 0 20px;
}
.container {
  padding: 0 20px 20px 20px;
}
