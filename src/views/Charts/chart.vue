<template>
  <div>
    <el-select
      v-model="subject"
      placeholder="选择科目"
      class="filter-item"
      @change="handleFilter"
    >
      <el-option v-for="item in ChartCategoryList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <ve-histogram
      :data="chartData"
      :settings="chartSetting"
      :extend="chartExtend"
    />
    <v-chart :options="options" style="width: 600px;height:400px;" />
  </div>
</template>
<script>
import { chartListStudent } from '@/api/student'

export default {
  data() {
    return {
      options: {
        xAxis: {
          data: ['100以上', '90-100', '80-90', '70-80', '60-70', '50-60', '40-50', '0-40']
        },
        legend: {},
        yAxis: {},
        series: {}
      },
      chartExtend: {
        legend: {
          selected: {
            '一班': true,
            '二班': true,
            '三班': true,
            '四班': true,
            '全级': false
          }
        }
      },
      chartSetting: {
        yAxisName: ['人数'],
        xAxisName: ['分数段'],
        showLine: ['全级', 'line']
      },
      subject: 'Chinese',
      ChartCategoryList: [{
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
      }
      ],
      // , {
      //   value: 'Sport',
      //   label: '体育'
      // }, {
      //   value: 'Composite',
      //   label: '综合'
      // }, {
      //   value: 'Total',
      //   label: '总分'
      // }
      list: [],
      chartData: {
        column: ['分数段', '语文', '数学', '英语', '物理', '化学', '历史', '道法', '生物', '地理'],
        columns: ['分数段', '一班', '二班', '三班', '四班', '全级'],
        rows: []
        // [
        //   { '日期': '1月2日', '成绩': 1223 },
        //   { '日期': '1月3日', '成绩': 2123 },
        //   { '日期': '1月4日', '成绩': 4123 },
        //   { '日期': '1月5日', '成绩': 3123 },
        //   { '日期': '1月6日', '成绩': 7123 }
        // ]
      }
      // data: {
      //   xAxis: {
      //     type: 'category'
      //   },
      //   yAxis: {},
      //   series: [{
      //     type: 'line',
      //     data: [100, 200, 300]
      //   }]
      // }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      chartListStudent(this.subject).then(response => {
        console.log(response.data)
        const xName = '分数段'
        const { list } = response.data
        list[0][xName] = '100以上'
        list[1][xName] = '90-100'
        list[2][xName] = '80-90'
        list[3][xName] = '70-80'
        list[4][xName] = '60-70'
        list[5][xName] = '50-60'
        list[6][xName] = '40-50'
        list[7][xName] = '0-40'
        this.chartData.rows = list
        console.log(list)
        console.log('subject', this.subject)
      })
    },
    handleFilter() {
      this.getList()
      console.log('subject', this.subject)
    }
  }
}
</script>
