<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button @click="showCategorys" type="text" size="medium">一级分类</el-button>
      <i class="el-icon-arrow-right defineicon" v-if="parentId!=='0'"></i>
      <span class="definename">{{parentName}}</span>
      <el-button
        style="float: right; padding: 7px"
        type="primary"
        icon="el-icon-plus"
        @click="addCategory"
      >添加</el-button>
    </div>
    <div>
      <el-table :data="tableList" border style="width: 100%" v-loading="loading">
        <el-table-column type="index" width="50" label="Id" v-if="parentId!=='0'"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click="showDialog = 2" type="text" size="medium">修改分类名称</el-button>
            <el-button
              @click="showSubCategory(scope.row)"
              type="text"
              size="medium"
              v-if="parentId=='0'"
            >查看子分类</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          @current-change="currentChange"
          :total="total"
          hide-on-single-page
          :page-size="pageSize"
        ></el-pagination>
      </div>
    </div>
  </el-card>
</template>

<script>
import { reqCategorys, reqAddCategory, reqUpdateCategory } from 'api'
import { Message } from 'element-ui'

export default {
  data() {
    return {
      tableData: [],
      categorys: [],  // 缓存一级分类数据
      parentId: '0', // 分类ID
      parentName: '', // 分类名称
      total: 0,
      pageSize: 2,
      currentPage: 1,
      loading: false,
      showDialog: 0, // 0 都不显示；1 显示addDialog；2 显示updateDialog
      dialogFormVisible: false,
      addFormData: {},
    }
  },
  computed: {
    tableList() {
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
  },
  mounted() {
    this.getCategorys(this.parentId)
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    addCategory() {
      this.showDialog = 1
      const { categorys, parentId, parentName } = this
      this.addFormData = { categorys, parentId, parentName }
    },
    showCategorys() {
      this.parentId = '0'
      this.parentName = ''
      this.tableData = this.categorys
    },
    showSubCategory(row) {
      this.parentId = row._id
      this.parentName = row.name
      this.getCategorys(this.parentId)
    },
    currentChange(currentPage) {
      this.currentPage = currentPage
    },
    async getCategorys(parentId) {
      this.loading = true
      const result = await reqCategorys(parentId)
      if (result.status === 0) {
        if (parentId === '0') {
          this.categorys = result.data
        }
        this.tableData = result.data
        this.total = this.tableData.length
        this.loading = false
      } else {
        Message.error('查询数据失败')
      }
    },
  },
}
</script>

<style lang="less">
.box-card {
  height: 100%;
  .block {
    float: right;
  }
  .defineicon {
    margin: 5px;
  }
  .definename {
    color: #606266;
    font-size: 14px;
  }
}
</style>
