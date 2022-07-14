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
            >分配角色</el-button
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
    </div>
  </div>
</template>
<script>
import RolesApi from '../../api/roles'
import Breadcrumb from '@/components/Breadcrumb.vue'
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
      total: 0,
      loading: false
    }
  },
  components: {
    Breadcrumb
  },
  methods: {
    async handleGetRoleList() {
      try {
        this.loadin = true
        const data = { current: this.current, size: this.size }
        const response = await RolesApi.getRoleList(data)
        this.list = response.records
        this.total = response.total
        console.log(response)
      } catch (e) {
        console.log(e)
      }
      this.loading = false
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
  // width: 100%;
  position: relative;
}
.addBtn {
  position: absolute;
  top: 0;
  right: 20px;
}
</style>
