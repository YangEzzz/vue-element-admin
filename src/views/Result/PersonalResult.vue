<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="学生姓名"
        style="width: 200px"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-input
        v-model="listQuery.title"
        placeholder="座号"
        style="width: 200px"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
<!--      <el-select-->
<!--        v-model="listQuery.category"-->
<!--        placeholder="班级"-->
<!--        clearable-->
<!--        class="filter-item"-->
<!--        @change="handleFilter"-->
<!--      >-->
<!--        <el-option-->
<!--          v-for="item in categoryList"-->
<!--          :key="item.value"-->
<!--          :label="item.label"-->
<!--          :value="item.value"-->
<!--        />-->
<!--        <el-option value="1">11</el-option>-->
<!--        <el-option value="2">22</el-option>-->
<!--        <el-option value="3">33</el-option>-->
<!--      </el-select>-->
      <el-select
        v-model="listQuery.category"
        placeholder="分类"
        clearable
        class="filter-item"
        @change="handleFilter"
      >
        <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.num" />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 10px"
        @click="handleFilter"

      >
        查询
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-edit"
        style="margin-left: 5px"
        @click="handleCreate"
      >
        新增
      </el-button>
      <el-checkbox
        v-model="showNumber"
        class="filter-item"
        style="margin-left: 5px"
        @change="changeShowNumber"
      >
        显示座号
      </el-checkbox>
    </div>
    <el-table/>
    <pagination
     :total="0"
    />
  </div>
</template>

<script>
import Pagination from '../../components/Pagination/index'
import waves from "@/directive/waves/waves";
import {getCategory} from "@/api/student";

export default {
  components: { Pagination },
  directives: {waves},
  data() {
    return {
      listQuery: {},
      showNumber:false,
      categoryList:[]
    }
  },
  mounted() {
    this.getCategoryList()
  }
  ,
  methods: {
    getCategoryList() {
      getCategory().then(response => {
        this.categoryList = response.data
      })
    },
    handleFilter() {
      console.log('handleFilter', this.listQuery)
    },
    handleCreate() {
      this.$router.push('/changeResult/change')
    },
    changeShowNumber() {
      this.showNumber=value
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
