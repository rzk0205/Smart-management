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
      :data="list"
      v-loading="loading"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="label" label="展示名称"> </el-table-column>
      <el-table-column prop="name" label="文件名称"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column prop="component" label="前端component">
      </el-table-column>
      <el-table-column prop="perms" label="唯一标识"> </el-table-column>
      <el-table-column prop="icon" label="图标"> </el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.type === 2">按钮</el-tag>
          <el-tag v-if="scope.row.type === 1">菜单</el-tag>
          <el-tag type="success" v-if="scope.row.type === 0">目录</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="注册时间"> </el-table-column>
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

          <el-button type="danger" size="mini" plain>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <!-- 弹出框 -->
    <el-dialog
      :title="EditStatus ? '编辑菜单' : '新增菜单'"
      :visible.sync="dialogFormVisible"
      :show-close="false"
      width="30%"
      center
    >
      <el-form
        :model="AddForm"
        :rules="Addrules"
        ref="AddruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类型" prop="type">
          <el-select v-model="AddForm.type" placeholder="请选择类型">
            <el-option label="目录" value="0"></el-option>
            <el-option label="菜单" value="1"></el-option>
            <el-option label="按钮" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="父级菜单" prop="type">
          <el-select v-model="AddForm.parentId" placeholder="请选择类型">
            <el-option label="一级菜单" value="0"></el-option>
            <el-option label="ed" value="1"></el-option>
            <el-option label="控制台" value="2"></el-option>
            <el-option label="系统管理" value="3"></el-option>
            <el-option label="|-玛卡巴卡" value="4"></el-option>
            <el-option label="|-1111" value="5"></el-option>
            <el-option label="|-菜单管理" value="6"></el-option>
            <el-option label="|-角色管理" value="7"></el-option>
            <el-option label="|-用户管理" value="8"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展示名称" prop="label">
          <el-input
            v-model="AddForm.label"
            placeholder="请输入展示名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="文件名称">
          <el-input
            v-model="AddForm.name"
            placeholder="请输入文件名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="AddForm.icon" placeholder="请输入图标"></el-input>
        </el-form-item>
        <el-form-item label="component" prop="component">
          <el-input
            v-model="AddForm.component"
            placeholder="请输入component"
          ></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="AddForm.path" placeholder="请输入路径"></el-input>
        </el-form-item>
        <el-form-item label="唯一标识" prop="perms">
          <el-input
            v-model="AddForm.perms"
            placeholder="请输入唯一标识"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="AddForm.status">
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
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb.vue'
import MenusApi from '../../api/menus'
export default {
  data() {
    return {
      // 页面请求渲染数据
      tableList: {
        current: 1,
        size: 10,
        username: ''
      },
      EditStatus: false,
      loading: false,
      list: [],
      total: 0,
      dialogFormVisible: false,
      editId: '',
      AddForm: {
        type: '',
        parentId: '0',
        label: '',
        component: '',
        icon: '',
        perms: '',
        status: 1,
        children: []
      },
      Addrules: {
        label: [{ required: true, message: '请输入展示名称', trigger: 'blur' }],
        parentId: [
          { required: true, message: '请输入父级菜单', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入文件名称', trigger: 'blur' }],
        type: [{ required: true, message: '请输入类型', trigger: 'change' }],
        component: [
          { required: true, message: '请输入component', trigger: 'change' }
        ],
        perms: [
          { required: true, message: '请输入唯一标识', trigger: 'change' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
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
        const response = await MenusApi.getMenuList(this.tableList)
        this.list = response
        this.total = response.total
        console.log(response)
      } catch (e) {
        console.log(e)
      }
      this.loading = false
    },
    // 编辑添加功能
    async addUserData() {
      if (this.EditStatus === false) {
        this.dialogFormVisible = false
        await MenusApi.addMenusList(this.AddForm)
        this.$notify({
          title: '提示',
          message: '添加成功',
          type: 'success'
        })
        this.handleGetRoleList()
      } else {
        this.dialogFormVisible = false
        this.AddForm.status = Number(this.AddForm.status)
        await MenusApi.UpdateMenuList({ ...this.AddForm, ...this.editId })
        this.$notify({
          title: '提示',
          message: '更新成功',
          type: 'success'
        })
        this.handleGetRoleList()
        this.AddForm = {}
        this.AddForm.status = 1
      }
    },
    /**
     * 编辑功能回显
     */
    async handleEdit(id) {
      this.EditStatus = true
      const response = await MenusApi.EditMenus(id)
      // response.status = String(response.status)
      this.dialogVisible = true
      this.AddForm = response
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
      this.dialogFormVisible = false
      this.form = {}

      this.form.status = 1
    }
  },
  created() {
    this.handleGetRoleList()
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
  margin-bottom: 15px;
  // width: 100%;
  position: relative;
}
.addBtn {
  position: absolute;
  top: 0;
  right: 20px;
}
</style>
