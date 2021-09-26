<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.Name"
        placeholder="学生姓名"
        style="width: 200px"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-input
        v-model="listQuery.StudentId"
        placeholder="座号"
        style="width: 200px"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
      />
      <el-select
        v-model="listQuery.category"
        placeholder="选择班级"
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
        显示年级
      </el-checkbox>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column
        label="座号"
        prop="StudentId"
        sortable="custom"
        align="center"
        width="80"
      />
      <el-table-column
        label="名字"
        width="100"
        align="center"
      >
        <template slot-scope="{row:{NameWrapper}}">
          <span v-html="NameWrapper" />
        </template>
      </el-table-column>
      <el-table-column
        v-if="showNumber"
        label="年级"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{Grade}}">
          <span>{{ Grade }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="班级"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{Class}}">
          <span>{{ Class }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="语文"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{Chinese}}">
          <span>{{ Chinese }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="数学"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{Math}}">
          <span>{{ Math }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="英语"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{English}}">
          <span>{{ English }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="物理"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{Physical}}">
          <span>{{ Physical }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="化学"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{Chemistry}}">
          <span>{{ Chemistry }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="历史"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{History}}">
          <span>{{ History }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="道法"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{Politics}}">
          <span>{{ Politics }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="生物"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{Biology}}">
          <span>{{ Biology }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="地理"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{Geographic}}">
          <span>{{ Geographic }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="体育"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{Sport}}">
          <span>{{ Sport }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="综合"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{Composite}}">
          <span>{{ Composite }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="总分"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{Total}}">
          <span>{{ Total }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="考试次数"
        width="70"
        align="center"
      >
        <template slot-scope="{row:{TestTime}}">
          <span>{{ TestTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="50"
        fixed="right"
      >
        <template slot-scope="{ row }">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(row)"
          />
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from '../../components/Pagination/index'
import waves from '@/directive/waves/waves'
import { getCategory, listStudent } from '@/api/student'

export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listLoading: true,
      listQuery: {},
      showNumber: false,
      categoryList: [],
      tableKey: 0,
      list: [],
      total: 0
    }
  },
  created() {
    this.parseQuery()
  },
  mounted() {
    this.getList()
    this.getCategoryList()
  },
  methods: {
    parseQuery() {
      const listQuery = {
        page: 1,
        pageSize: 20,
        sort: '+StudentId'
      }
      this.listQuery = { ...listQuery, ...this.listQuery }
    },
    sortChange(data) {
      console.log('sortChange', data)
      const { prop, order } = data
      this.sortBy(prop, order)
    },
    sortBy(prop, order) {
      if (order === 'ascending') {
        this.listQuery.sort = `+${prop}`
      } else {
        this.listQuery.sort = `-${prop}`
      }
      this.handleFilter()
    },
    wrapperKeyWord(k, v) {
      function highlight(value) {
        return `<span style="color: #1890ff">${value}</span>`
      }
      if (!this.listQuery[k]) {
        return v
      } else {
        return v.replace(new RegExp(this.listQuery[k], 'ig'), v => highlight(v))
      }
    },
    getList() {
      this.listLoading = true
      listStudent(this.listQuery).then(response => {
        const { list, count } = response.data
        this.list = list
        this.total = count
        this.listLoading = false
        this.list.forEach(student => {
          student.NameWrapper = this.wrapperKeyWord('Name', student.Name)
        })
      })
    },
    getCategoryList() {
      getCategory().then(response => {
        this.categoryList = response.data
        console.log(this.categoryList)
      })
    },
    handleFilter() {
      console.log('handleFilter', this.listQuery)
      this.getList()
    },
    handleCreate() {
      this.$router.push('/changeResult/create')
    },
    handleUpdate(row) {
      const getKeyFromValue = (object, value) => {
        for (const ob in object) {
          // eslint-disable-next-line no-prototype-builtins
          if (Object.hasOwnProperty(ob)) {
            if (object[ob] === value) { return ob }
          }
        }
      }
      const id = getKeyFromValue(row, 'StudentId')
      console.log('rowTest', id)
      this.$router.push(`/changeResult/change`)
    },
    changeShowNumber() {
      // eslint-disable-next-line no-undef
      this.showNumber = value
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
