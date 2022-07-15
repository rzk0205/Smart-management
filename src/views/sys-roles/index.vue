<template>
  <div>
    <div>
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="search">
      <div>角色名</div>
      <div>
        <el-input
          placeholder="请输入内容"
          v-model="tableList.name"
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

      <el-table-column align="center" property="name" label="角色" width="120">
      </el-table-column>
      <el-table-column align="center" property="code" label="编码" width="150">
      </el-table-column>
      <el-table-column
        align="center"
        property="remark"
        label="描述"
        width="170"
      >
      </el-table-column>

      <el-table-column
        align="center"
        property="status"
        label="状态"
        width="150"
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
      <el-table-column
        align="center"
        property="createTime"
        label="创建时间"
        width="170"
      >
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
            >分配权限</el-button
          >
          <el-button type="danger" size="mini" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      <el-dialog
        class="dialog"
        :title="EditStatus ? '编辑用户' : '新增用户'"
        width="30%"
        :visible.sync="dialogFormVisible"
        :show-close="false"
        center
      >
        <el-form :model="form" ref="tableForm" :rules="rulesForm">
          <el-form-item
            label="用户名"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="编码" :label-width="formLabelWidth" prop="code">
            <el-input
              v-model="form.code"
              autocomplete="off"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="描述"
            :label-width="formLabelWidth"
            prop="remark"
          >
            <el-input
              type="textarea"
              :rows="2"
              v-model="form.remark"
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
      <!-- 弹出框 -->
      <el-dialog
        class="dialog"
        :title="'分' + rolesData.code + '配权限'"
        width="30%"
        :visible.sync="dialogFormVisiblerole"
        :show-close="false"
        center
      >
        <el-form>
          <el-form-item label="权限" :label-width="formLabelWidth">
            <el-tree
              :data="treeData"
              show-checkbox
              ref="tree"
              node-key="id"
              default-expand-all
              :default-checked-keys="rolesData.menuIds"
              :props="defaultProps"
            >
            </el-tree>
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
          <el-button type="primary" @click="updataRoleData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import RolesApi from '../../api/roles'
import Breadcrumb from '@/components/Breadcrumb.vue'
import MenusApi from '../../api/menus'
export default {
  data() {
    return {
      EditStatus: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 页面请求渲染数据
      tableList: {
        current: 1,
        size: 10,
        name: ''
      },
      dialogFormVisiblerole: false,
      // 后台返回的页面数据
      list: [],
      total: 0,
      loading: false,
      dialogFormVisible: false,
      /**
       * 表单数据
       */
      form: {
        name: '',
        code: '',
        remark: '',
        status: 1
      },
      editId: '',
      treeData: [],
      rolesData: [],
      roleId: '',
      formLabelWidth: '70px',
      rulesForm: {
        name: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
        code: [{ required: true, message: '请输入编码', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        status: [{ required: true, message: '请选择一个状态', trigger: 'blur' }]
      }
    }
  },
  components: {
    Breadcrumb
  },
  methods: {
    async handleGetRoleList() {
      try {
        this.loading = true
        const response = await RolesApi.getRoleList(this.tableList)
        this.list = response.records
        this.total = response.total
        console.log(response)
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    },
    // 获取树形数据
    async getTreeData() {
      const res = await MenusApi.getMenuList(this.tableList)
      this.treeData = res
      console.log(res)
    },
    async handleOpenRoleDialog(row) {
      this.roleId = row.id
      this.dialogFormVisiblerole = true
      const res = await RolesApi.setRolesInfo(row.id)
      this.rolesData = res
      console.log(this.rolesData)
      console.log(res)
    },
    async updataRoleData() {
      const res = await RolesApi.updataRolePerm(
        this.roleId,
        this.$refs.tree.getCheckedKeys()
      )
      console.log(res)
      this.$notify({
        title: '提示',
        message: '分配成功',
        type: 'success'
      })
      this.dialogFormVisiblerole = false
    },
    // 编辑添加功能
    async addUserData() {
      if (this.EditStatus === false) {
        this.dialogFormVisible = false
        await RolesApi.addRolesList(this.form)
        this.$notify({
          title: '提示',
          message: '添加成功',
          type: 'success'
        })
        this.handleGetRoleList()
      } else {
        this.dialogFormVisible = false
        this.form.status = Number(this.form.status)
        await RolesApi.UpdateRolerList({ ...this.form, ...this.editId })
        this.$notify({
          title: '提示',
          message: '更新成功',
          type: 'success'
        })
        this.handleGetRoleList()
        this.form = {}
        this.form.status = 1
      }
    },
    /**
     * 编辑功能回显
     */
    async handleEdit(id) {
      this.EditStatus = true
      this.dialogVisible = true
      const response = await RolesApi.EditRolesr(id)
      // response.status = String(response.status)

      this.form = response
      this.editId = id
    },
    handleSizeChange(val) {
      this.tableList.size = val
      this.handleGetRoleList()
    },
    handleCurrentChange(val) {
      this.tableList.current = val
      this.handleGetRoleList()
    },
    search() {
      this.handleGetRoleList()
    },
    Cancel() {
      this.rolesData = []
      this.dialogFormVisiblerole = false
    }
  },
  created() {
    this.handleGetRoleList()
    this.getTreeData()
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
</style>
