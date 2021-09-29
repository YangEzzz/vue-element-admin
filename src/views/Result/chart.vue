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
        columns: ['分数段', '人数'],
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
        console.log(list)
        list[0]['分数段'] = '100以上'
        list[1]['分数段'] = '90-100'
        list[2]['分数段'] = '80-90'
        list[3]['分数段'] = '70-80'
        list[4]['分数段'] = '60-70'
        list[5]['分数段'] = '50-60'
        list[6]['分数段'] = '40-50'
        list[7]['分数段'] = '0-40'
        this.chartData.rows = list
        console.log(this.chartData.rows)
      })
    }
  }
}
</script>
