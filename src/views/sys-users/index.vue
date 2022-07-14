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
          v-model="tableList.username"
          class="input-with-select"
          clearable
          @clear="search"
        >
        </el-input>
        <el-button type="success" icon="el-icon-search" @click="search"
          >查询</el-button
        >
      </div>
      <div class="addBtn">
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click="
            formList = {}
            dialogFormVisible = true
            EditStatus = false
          "
          >新增</el-button
        >
      </div>
    </div>
    <el-table
      ref="singleTable"
      :data="list"
      border
      highlight-current-row
      style="width: 100%; margin-top: 15px"
      v-loading="loading"
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
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            plain
            @click="
              handleEdit(scope.row.id)
              dialogFormVisible = true
            "
            >编辑</el-button
          >
          <el-button
            type="warning"
            size="mini"
            @click="handleOpenRoleDialog(scope.row)"
            plain
            >分配角色</el-button
          >
          <el-button type="danger" size="mini" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog
      class="dialog"
      :title="EditStatus ? '编辑用户' : '新增用户'"
      width="30%"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      center
    >
      <el-form :model="form" ref="tableForm" :rules="rulesForm">
        <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
          <el-avatar :size="50" :src="form.avatar"></el-avatar>
        </el-form-item>
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            v-model="form.username"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            v-model="form.password"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input
            v-model="form.email"
            autocomplete="off"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel">取 消</el-button>
        <el-button type="primary" @click="addUserData">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableList.current"
        :page-sizes="[10, 20, 50, 80]"
        :page-size="tableList.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      width="30%"
      center
      title="分配角色"
      :visible.sync="roleDialogFormVisible"
    >
      <el-form
        :model="roleForm"
        :rules="roleRules"
        ref="roleDialogForm"
        label-width="60px"
      >
        <el-form-item label="角色" prop="roleId">
          <el-select
            style="width: 100%"
            multiple
            v-model="roleForm.roleId"
            placeholder="请选择角色"
          >
            <el-option
              v-for="(item, index) in roleList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmitRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import UsersApi from '@/api/layoutUser'
import RoleApi from '../../api/roles'
export default {
  data() {
    return {
      // 页面请求渲染数据
      tableList: {
        current: 1,
        size: 10,
        username: ''
      },
      // 后台返回的页面数据
      list: [],
      EditStatus: false,
      // 总条数
      total: 0,
      loading: false,
      // 弹出框状态
      dialogFormVisible: false,
      /**
       * 表单数据
       */
      form: {
        avatar:
          'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg',
        username: '',
        password: '',
        email: '',
        status: '1'
      },
      editId: '',
      formLabelWidth: '70px',
      // 分配角色数据
      roleId: '',
      roleForm: {
        roleId: []
      },
      roleList: [],
      roleDialogFormVisible: false,

      // 规则校验
      rulesForm: {
        avatar: [{ required: true, message: '请添加头像', trigger: 'blur' }],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        status: [{ required: true, message: '请选择一个状态', trigger: 'blur' }]
      },
      roleRules: {
        roleId: [{ required: true, message: '请选择角色', trigger: 'change' }]
      }
    }
  },
  computed: {
    isAdd() {
      return this.form.id ? false : true
    }
  },
  methods: {
    /**
     * 获取用户
     */
    async getUserListData() {
      try {
        this.loading = true
        const res = await UsersApi.getUserList(this.tableList)
        this.list = res.records
        this.total = res.total
      } catch (error) {}
      this.loading = false
    },
    /**
     * 添加、编辑用户信息
     */
    async addUserData() {
      if (this.EditStatus === false) {
        this.dialogFormVisible = false
        await UsersApi.addUser(this.form)
        this.getUserListData()
        this.$notify({
          title: '提示',
          message: '添加成功',
          type: 'success'
        })
      } else {
        this.dialogFormVisible = false
        console.log(1)
        this.form.status = Number(this.form.status)
        console.log(2)

        await UsersApi.editUpdate({ ...this.form, ...this.editId })
        console.log(3)
        this.getUserListData()
        this.form = {}
        this.form.avatar =
          'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg'
        this.form.status = '1'
      }
    },
    handleSizeChange(val) {
      this.tableList.size = val
      this.getUserListData()
    },
    handleCurrentChange(val) {
      this.tableList.current = val
      this.getUserListData()
    },
    search() {
      this.getUserListData()
    },
    /**
     * 编辑功能回显
     */
    async handleEdit(id) {
      this.EditStatus = true
      const response = await UsersApi.EditUser(id)
      // response.status = String(response.status)
      this.dialogVisible = true
      this.form = response
      this.editId = id
    },
    /**
     * 取消事件
     */
    Cancel() {
      this.dialogFormVisible = false
      this.form = {}
      this.form.avatar =
        'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5a307996-a7f5-483d-a6f1-6ea9944b0d18/94d8e009-b183-4d54-a389-724181af5362.jpg'
      this.form.status = 1
    },
    /**
     * 初始化角色列表
     * @param val
     */
    async handleGetRoleList() {
      try {
        const data = { current: this.current, size: this.size }
        const response = await RoleApi.getRoleList(data)
        this.roleList = response.records
        console.log(response)
      } catch (e) {
        console.log(e)
      }
    },
    // 分配角色
    handleOpenRoleDialog(row) {
      this.roleForm.roleId = []
      this.roleDialogFormVisible = true
      row.roles.forEach((item) => {
        this.roleForm.roleId.push(item.id)
      })
      this.roleId = row.id
      console.log(this.roleForm.roleId)
    },
    handleSubmitRole() {
      this.$refs.roleDialogForm.validate(async (valid) => {
        if (valid) {
          const response = await RoleApi.updateRole(
            this.roleId,
            this.roleForm.roleId
          )
          this.roleDialogFormVisible = false
          this.$notify({ title: '提示', message: '更新成功', type: 'success' })
          // this.handleGetUserList()
          this.getUserListData()
          console.log(response)
        }
      })
    }
  },
  components: {
    Breadcrumb
  },
  created() {
    this.getUserListData()
    this.handleGetRoleList()
    console.log(this.isAdd)
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
.pagination {
  margin-top: 10px;
}
</style>
