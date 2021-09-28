<template>
  <div>
    <ve-histogram
      :data="chartData"
    />
  </div>
</template>
<script>
import { chartListStudent } from '@/api/student'

export default {
  data() {
    return {
      list: [],
      chartData: {
        columns: ['Name', 'Chinese', 'Math'],
        rows: []
        // [
        //   { '成绩': 123, '日期': '1月1日' },
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
      chartListStudent(this.listQuery).then(response => {
        const { list } = response.data
        this.chartData.rows = list
        console.log(this.chartData.rows)
      })
    }
  }
}
</script>
