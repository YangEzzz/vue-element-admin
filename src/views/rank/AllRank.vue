<template>
  <div class="app-container" style="width: 100%;text-align: center">
    <div class="filter-container" style="display: inline-block;align-items: center">
      <el-select
        v-model="listQuery.subject"
        placeholder="选择科目"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option v-for="item in rankCategoryList" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="valueGrade" clearable class="filter-item" placeholder="请选择" @change="handleFilter();handleChange()">
        <el-option
          v-for="item in grade"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
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
      style="margin: 0 auto"
    >
      <el-table-column
        label="排名"
        align="center"
      >
        <template slot-scope="{ row:{Ranks} }">
          <span>{{ Ranks }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="座号"
        align="center"
        prop="StudentId"
      />
      <el-table-column
        label="名字"
        align="center"
      >
        <template slot-scope="{row:{Name}}">
          <span>{{ Name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showNumber"
        label="年级"
        align="center"
      >
        <template slot-scope="{row:{Grade}}">
          <span>{{ Grade }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="班级"
        align="center"
      >
        <template slot-scope="{row:{Class}}">
          <span>{{ Class }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="Boolean(Object.keys(list[0]).includes('Chinese'))"
        label="语文"
        align="center"
      >
        <template slot-scope="{row:{Chinese}}">
          <span>{{ Chinese }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="Boolean(Object.keys(list[0]).includes('Math'))"
        label="数学"
        align="center"
      >
        <template slot-scope="{row:{Math}}">
          <span>{{ Math }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="Boolean(Object.keys(list[0]).includes('English'))"
        label="英语"
        align="center"
      >
        <template slot-scope="{row:{English}}">
          <span>{{ English }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="Boolean(Object.keys(list[0]).includes('Physical'))"
        label="物理"
        align="center"
      >
        <template slot-scope="{row:{Physical}}">
          <span>{{ Physical }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="Boolean(Object.keys(list[0]).includes('Chemistry'))"
        label="化学"
        align="center"
      >
        <template slot-scope="{row:{Chemistry}}">
          <span>{{ Chemistry }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="Boolean(Object.keys(list[0]).includes('History'))"
        label="历史"
        align="center"
      >
        <template slot-scope="{row:{History}}">
          <span>{{ History }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="Boolean(Object.keys(list[0]).includes('Politics'))"
        label="道法"
        align="center"
      >
        <template slot-scope="{row:{Politics}}">
          <span>{{ Politics }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="Boolean(Object.keys(list[0]).includes('Biology'))"
        label="生物"
        align="center"
      >
        <template slot-scope="{row:{Biology}}">
          <span>{{ Biology }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="Boolean(Object.keys(list[0]).includes('Geographic'))"
        label="地理"
        align="center"
      >
        <template slot-scope="{row:{Geographic}}">
          <span>{{ Geographic }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="Boolean(Object.keys(list[0]).includes('Sport'))"
        label="体育"
        align="center"
      >
        <template slot-scope="{row:{Sport}}">
          <span>{{ Sport }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="Boolean(Object.keys(list[0]).includes('Composite'))"
        label="综合"
        align="center"
      >
        <template slot-scope="{row:{Composite}}">
          <span>{{ Composite }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="Boolean(Object.keys(list[0]).includes('Total'))"
        label="总分"
        align="center"
      >
        <template slot-scope="{row:{Total}}">
          <span>{{ Total }}</span>
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
import { getCategory, listRankStudent } from '@/api/student'

export default {
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      rankSubject: { subject: 'Chinese' },
      grade: [{
        value: '1',
        label: '初一'
      }, {
        value: '2',
        label: '初二'
      }, {
        value: '3',
        label: '初三'
      }],
      valueGrade: '1',
      rankCategoryList: [{
        value: 'Chinese',
        label: '语文'
      }, {
        value: 'Math',
        label: '数学'
      }, {
        value: 'English',
        label: '英语'
      }, {
        value: 'Physical',
        label: '物理'
      }, {
        value: 'Chemistry',
        label: '化学'
      }, {
        value: 'History',
        label: '历史'
      }, {
        value: 'Politics',
        label: '道法'
      }, {
        value: 'Biology',
        label: '生物'
      }, {
        value: 'Geographic',
        label: '地理'
      }, {
        value: 'Sport',
        label: '体育'
      }, {
        value: 'Composite',
        label: '综合'
      }, {
        value: 'Total',
        label: '总分'
      }],
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
    this.getCategoryList(this.valueGrade)
  },
  methods: {
    parseQuery() {
      const listQuery = {
        page: 1,
        pageSize: 20
      }
      this.listQuery = { ...listQuery, ...this.listQuery, ...this.rankSubject }
    },
    handleChange() {
      this.listQuery.category = null
    },
    // wrapperKeyWord(k, v) {
    //   function highlight(value) {
    //     return `<span style="color: #1890ff">${value}</span>`
    //   }
    //   if (!this.listQuery[k]) {
    //     return v
    //   } else {
    //     return v.replace(new RegExp(this.listQuery[k], 'ig'), v => highlight(v))
    //   }
    // },
    getList() {
      this.listLoading = true
      this.listQuery.grade = this.valueGrade
      listRankStudent(this.listQuery).then(response => {
        const { list, count } = response.data
        this.list = list
        this.total = count
        this.listLoading = false
        // console.log('list')
        // this.list.forEach(student => {
        //   student.NameWrapper = this.wrapperKeyWord('Name', student.Name)
        // })
      })
    },
    getCategoryList(grade) {
      getCategory(grade).then(response => {
        this.categoryList = response.data
        console.log(this.categoryList)
      })
    },
    handleFilter() {
      console.log('handleFilter', this.listQuery, this.rankSubject)
      this.getList()
      this.getCategoryList(this.valueGrade)
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
