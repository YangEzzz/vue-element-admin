<template>
  <div style="height: 90%">
    <el-select
      v-model="subject"
      placeholder="选择科目"
      class="filter-item"
      style="width:20%;height: auto;margin-left: 20px;margin-top: 20px;z-index: 1"
      @change="handleFilter"
    >
      <el-option v-for="item in ChartCategoryList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select
      v-model="category"
      placeholder="选择班级"
      clearable
      class="filter-item"
      style="width:20%;display: block;margin-left: 20px;margin-top: 20px;z-index: 1;"
      @change="handleFilter"
    >
      <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-select
      v-model="valueGrade"
      style="width:20%;display: block;margin-left: 20px;margin-top: 20px;z-index: 1;"
      class="filter-item"
      placeholder="请选择"
      @change="handleFilter();handleChange()"
    >
      <el-option
        v-for="item in grade"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <v-chart :option="option" style="height: 430px;width: 100%;position:absolute;bottom: 50px;z-index: 0" autoresize :loading="load" />
  </div>
</template>
<script>
import { getCategory, passRate } from '@/api/student'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      GoodRate: '',
      PassRate: '',
      NotPassRate: '',
      load: true,
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
      categoryList: [],
      valueGrade: '1',
      category: '',
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
      }, {
        value: 'Total',
        label: '总分'
      }
      ],
      subject: 'Chinese',
      classes: '1',
      ClassList: [{
        value: '1',
        label: '一班'
      }, {
        value: '2',
        label: '二班'
      }, {
        value: '3',
        label: '三班'
      }, {
        value: '4',
        label: '四班'
      }, {
        value: '5', label: '全级'
      }],
      option: {
        title: {
          text: '',
          left: 'center',
          top: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          selectedMode: false,
          orient: 'vertical',
          // left: 'right',
          right: '5%'
        },
        series: [
          {
            stillShowZeroSum: false,
            name: 'Access From',
            type: 'pie',
            radius: ['60%', '80%'],
            label: {
              normal: {
                formatter: function(e) {
                  const data = e.data
                  if (data.value === 0) {
                    data.labelLine.show = false
                    data.label.show = false
                  }
                }
              }
            },
            data: [
              { value: 0, name: '优秀人数', label: { show: true }, labelLine: { show: true }},
              { value: 0, name: '及格人数', label: { show: true }, labelLine: { show: true }},
              { value: 0, name: '不及格人数', label: { show: true }, labelLine: { show: true }}
            ]
            // emphasis: {
            //   itemStyle: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //   }
            // }
          }
        ]
      }
    }
  },
  computed: {
    ...mapState({ views: state => state.tagsView })
  },
  mounted() {
    this.getPassRate()
    this.getCategoryList(this.valueGrade)
    console.log('views', this.views)
  },
  methods: {
    handleChange() {
      this.category = ''
    },
    handleFilter() {
      this.getPassRate()
      this.getCategoryList(this.valueGrade)
    },
    getCategoryList(grade) {
      getCategory(grade).then(response => {
        this.categoryList = response.data
        console.log(this.categoryList)
      })
    },
    getPassRate() {
      const cl = this.category
      const sub = this.subject
      const grade = this.valueGrade
      passRate({ classes: cl, subject: sub, grade: grade }).then(response => {
        const passResult = response.data
        const {
          Good,
          Pass,
          NotPass
        } = passResult
        console.log(passResult)
        this.option.series[0].data[0].value = parseInt(Good)
        this.option.series[0].data[1].value = parseInt(Pass)
        this.option.series[0].data[2].value = parseInt(NotPass)
        const sum = Good + Pass + NotPass
        this.GoodRate = (Good / sum * 100).toFixed(2) + '%'
        this.PassRate = (Pass / sum * 100).toFixed(2) + '%'
        this.NotPassRate = (NotPass / sum * 100).toFixed(2) + '%'
        // this.option.series.data.push()
        this.option.title.text = `及格率:${this.PassRate}\n\n 优秀率:${this.GoodRate}\n\n 不及格率:${this.NotPassRate}`
        this.load = false
        console.log(this.option.series[0].data)
        console.log('res', Good, Pass, NotPass)
        // this.number1 = passResult[this.subject]
      })
    }
  }
}
</script>
