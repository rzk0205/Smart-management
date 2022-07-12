<template>
  <div>
    <div class="left">left</div>
    <div class="right">
      <div class="avatarImg">
        <el-avatar :size="40" :src="userInfo.avatar" />
      </div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userInfo.username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="home">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case 'home':
          this.handleToHome()
          break
        case 'logout':
          this.handleLogout()
          break
      }
    },
    handleToHome() {
      this.$router.push('/')
    },
    handleLogout() {
      try {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(async () => {
            this.$notify({
              title: '提示',
              message: '正在退出...',
              type: 'success'
            })
            const res = await this.$store.dispatch('user/logout')
            if (!res) return

            this.$router.push('/login')
          })
          .catch(() => {
            console.log('取消了')
          })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.left {
  float: left;
}
.right {
  float: right;
  display: flex;
  height: 60px;
}
.avatarImg {
  height: 60px;
  width: 45px;
  padding-top: 10px;
  box-sizing: border-box;
}
</style>
