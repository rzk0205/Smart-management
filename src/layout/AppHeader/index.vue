<template>
  <div>
    <div class="left">
      <el-button
        @click="handleCollapseMenu"
        size="mini"
        type="text"
        :icon="
          $store.getters.isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'
        "
      ></el-button>
      <div class="tags-view">
        <TagsView></TagsView>
      </div>
    </div>
    <div class="right">
      <div class="right-tool-tip">
        <el-tooltip
          class="full"
          effect="dark"
          content="全屏"
          placement="bottom"
        >
          <i class="el-icon-rank hand white" style="font-size: 25px"></i>
        </el-tooltip>
        <el-tooltip effect="dark" content="关闭全部标签" placement="bottom">
          <i
            class="el-icon-circle-close hand white"
            style="font-size: 25px"
          ></i>
        </el-tooltip>
      </div>
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
import TagsView from '../../components/TagsView.vue'
export default {
  name: 'index',
  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  components: {
    TagsView
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
      alert('个人设置')
    },
    handleLogout() {
      try {
        this.$confirm('你确定要退出登陆吗?', '提示', {
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
    },
    handleCollapseMenu() {
      this.$store.dispatch('menu/setCollapse')
    }
  }
}
</script>
<style lang="scss" scoped>
.left {
  float: left;
  display: flex;
  align-items: center;

  .el-button {
    font-size: 25px;
    color: #fff;
  }
}
// .right {
//   display: flex;
//   height: 60px;
// }
.avatarImg {
  height: 60px;
  width: 45px;
  padding-top: 10px;
  box-sizing: border-box;
}
.right {
  float: right;
  display: flex;
  align-items: center;
  height: 100%;
  .right-tool-tip {
    height: 100%;
    display: flex;
    align-items: center;
    .full {
      margin-right: 20px;
      // 旋转
      transform: rotate(20deg);
      -webkit-transform: rotate(20deg);
      /*兼容-webkit-引擎浏览器*/
      -moz-transform: rotate(20deg);
      /*兼容-moz-引擎浏览器*/
    }
  }

  .el-dropdown {
    margin-left: 15px;
    height: 100%;
    .el-dropdown-link {
      color: #fff;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
