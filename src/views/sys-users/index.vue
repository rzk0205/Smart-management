<template>
  <div>
    <div>
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="search">
      <div>用户名</div>
      <div>
        <el-input
          placeholder="请输入内容"
          v-model="input3"
          class="input-with-select"
        >
        </el-input>
        <el-button type="success" icon="el-icon-search">查询</el-button>
      </div>
      <div class="addBtn">
        <el-button type="primary" icon="el-icon-edit">新增</el-button>
      </div>
    </div>
    <el-table
      ref="singleTable"
      :data="list"
      border
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%; margin-top: 15px"
      :loading="loading"
    >
      <el-table-column align="center" type="index" width="50" label="序号">
      </el-table-column>
      <el-table-column
        align="center"
        property="username"
        label="用户名"
        width="100"
      >
      </el-table-column>
      <el-table-column align="center" property="name" label="头像" width="100">
        <template slot-scope="scope">
          <div class="block">
            <el-avatar :size="50" :src="scope.row.avatar"></el-avatar>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" property="roles" label="角色" width="150">
        <template slot-scope="scope">
          <el-tag
            v-for="(item, index) in scope.row.roles"
            :key="index"
            type="success"
            >{{ item.name }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column align="center" property="email" label="邮箱" width="150">
      </el-table-column>
      <el-table-column
        align="center"
        property="createTime"
        label="注册时间"
        width="150"
      >
      </el-table-column>
      <el-table-column
        align="center"
        property="address"
        label="状态"
        width="120"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="250">
        <template>
          <el-button type="success" size="mini" plain>编辑</el-button>
          <el-button type="warning" size="mini" plain>分配角色</el-button>
          <el-button type="danger" size="mini" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog
      class="dialog"
      title="新增角色"
      :visible.sync="dialogFormVisible"
      center
    >
      <el-form :model="form">
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.description"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import UsersApi from '@/api/layoutUser'
export default {
  data() {
    return {
      input3: '',
      tableList: {
        current: '1',
        size: '10'
      },
      list: [],
      loading: false,
      dialogFormVisible: true,
      form: {
        username: '',
        password: '',
        description: ''
      },
      formLabelWidth: '50px'
    }
  },
  methods: {
    async getUserListData() {
      try {
        this.loading = true
        const res = await UsersApi.getUserList(this.tableList)
        this.list = res.records
      } catch (error) {}
      this.loading = false
    }
  },
  computed: {},
  components: {
    Breadcrumb
  },
  created() {
    this.getUserListData()
  }
}
</script>
<style lang="scss" scoped>
.input-with-select {
  margin-right: 15px;
  width: 300px;
  margin-left: 10px;
}
.el-select .el-input {
  width: 130px;
}
.search {
  display: flex;
  height: 40px;
  line-height: 40px;
  // width: 100%;
  position: relative;
}
.addBtn {
  position: absolute;
  top: 0;
  right: 20px;
}
.el-input__inner {
  width: 150px;
}
</style>
