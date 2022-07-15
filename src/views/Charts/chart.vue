<template>
  <div style="text-align: center">
    <el-select
      v-model="subject"
      placeholder="选择科目"
      class="filter-item"
      style="margin: 20px auto 20px;"
      @change="handleFilter"
    >
      <el-option v-for="item in ChartCategoryList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select v-model="valueGrade" placeholder="请选择">
      <el-option
        v-for="item in grade"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <v-chart :option="options" style="height: 440px;width: 100%;margin: auto" autoresize :loading="load" />
  </div>
</template>

<style>
body {
  overscroll-behavior-x: auto;
}
</style>
<script>
import { chartListStudent } from '@/api/student'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      myCharts: {},
      load: true,
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        xAxis: {
          type: 'category',
          axisPointer: {
            type: 'shadow'
          }
          // data: ['100以上', '90-100', '80-90', '70-80', '60-70', '50-60', '40-50', '0-40']
        },
        legend: {},
        yAxis: [
          {
            type: 'value',
            name: '人',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'line', yAxisIndex: 1 }],
        dataset: {
          dimensions: ['分数段', '一班', '二班', '三班', '四班', '全级'],
          source: []
        }
      },
      subject: 'Chinese',
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
      valueClass: '1',
      categoryList: [],
      list: [],
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
      ]
    }
  },
  computed: {
    ...mapState({ views: state => state.tagsView })
  },
  mounted() {
    this.getList()
    console.log('views', this.views)
  },
  methods: {
    getList() {
      chartListStudent([this.subject, this.valueGrade]).then(response => {
        console.log(response)
        const { list } = response.data
        const Class = ['一班', '二班', '三班', '四班', '全级']
        const result = ['100以上', '90-100', '80-90', '70-80', '60-70', '50-60', '40-50', '0-40']
        /*eslint-disable*/
        for (let i = 0; i < 8; i++) {
          let source = []
          source[0] = result[i]
          for (let j = 0; j < 5; j++) {
            source[j + 1] = list[i][Class[j]]
          }
          // console.log('source', source)
          this.options.dataset.source.push(source)
        }
        this.load=false
        // console.log(this.options.dataset.source)
        // console.log('subject', this.subject)
      })
    },
    handleFilter() {
      this.options.dataset.source.length=0
      this.getList()
      this.load = false
      this.echarts.loading=true
      // console.log('subject', this.subject)
    }
  }
}
</script>
<!--        // list[0][xName] = '100以上'-->
<!--// list[1][xName] = '90-100'-->
<!--// list[2][xName] = '80-90'-->
<!--// list[3][xName] = '70-80'-->
<!--// list[4][xName] = '60-70'-->
<!--// list[5][xName] = '50-60'-->
<!--// list[6][xName] = '40-50'-->
<!--// list[7][xName] = '0-40'-->
<!--// this.chartData.rows = list-->
<!--// this.options.dataset.source.push(list)-->
<!--// console.log('list', list[0][Class[0]])-->
<!--chartExtend: {-->
<!--legend: {-->
<!--selected: {-->
<!--'一班': true,-->
<!--'二班': true,-->
<!--'三班': true,-->
<!--'四班': true,-->
<!--'全级': false-->
<!--}-->
<!--}-->
<!--},-->
<!--chartSetting: {-->
<!--yAxisName: ['人数'],-->
<!--xAxisName: ['分数段'],-->
<!--showLine: ['全级', 'line']-->
<!--},-->
