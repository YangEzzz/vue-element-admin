<template>
  <div>
    <el-carousel indicator-position="inside" height="525px">
      <el-carousel-item v-for="(item,index) in homePic" :key="index">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<!--<template>-->
<!--  <div class="dashboard-editor-container">-->
<!--    <github-corner class="github-corner" />-->

<!--    <panel-group @handleSetLineChartData="handleSetLineChartData" />-->

<!--    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
<!--      <line-chart :chart-data="lineChartData" />-->
<!--    </el-row>-->

<!--    <el-row :gutter="32">-->
<!--      <el-col :xs="24" :sm="24" :lg="8">-->
<!--        <div class="chart-wrapper">-->
<!--          <raddar-chart />-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :xs="24" :sm="24" :lg="8">-->
<!--        <div class="chart-wrapper">-->
<!--          <pie-chart />-->
<!--        </div>-->
<!--      </el-col>-->
<!--      <el-col :xs="24" :sm="24" :lg="8">-->
<!--        <div class="chart-wrapper">-->
<!--          <bar-chart />-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-row>-->

<!--    <el-row :gutter="8">-->
<!--      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">-->
<!--        <transaction-table />-->
<!--      </el-col>-->
<!--      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
<!--        <todo-list />-->
<!--      </el-col>-->
<!--      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
<!--        <box-card />-->
<!--      </el-col>-->
<!--    </el-row>-->
<!--  </div>-->
<!--</template>-->

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DashboardEditor',
  data() {
    return {
      visitPerson: 0,
      homePic: [],
      student: 0
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  mounted() {
    this.test()
    this.pic()
    console.log(this.name, this.roles[0], this.avatar)
  },
  methods: {
    test() {
      const caution = false
      function setCookie(name, value, expires, path, domain, secure) {
        const curCookie = name + '=' + escape(value) +
          ((expires) ? ';expires=' + expires.toGMTString() : '') +
          ((path) ? '; path=' + path : '') +
          ((domain) ? '; domain=' + domain : '') +
          ((secure) ? ';secure' : '')
        if (!caution || (name + '=' + escape(value)).length <= 4000) {
          document.cookie = curCookie
        } else if (confirm('Cookie exceeds 4KB and will be cut!')) {
          document.cookie = curCookie
        }
      }
      function getCookie(name) {
        const prefix = name + '='
        const cookieStartIndex = document.cookie.indexOf(prefix)
        if (cookieStartIndex === -1) {
          return null
        }
        let cookieEndIndex = document.cookie.indexOf(';', cookieStartIndex + prefix.length)
        if (cookieEndIndex === -1) {
          cookieEndIndex = document.cookie.length
        }
        return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex))
      }
      function fixDate(date) {
        const base = new Date(0)
        const skew = base.getTime()
        if (skew > 0) {
          date.setTime(date.getTime() - skew)
        }
      }

      const now = new Date()
      fixDate(now)
      now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000)
      let visits = getCookie('counter')
      if (!visits) { visits = 1 } else { visits = parseInt(visits) + 1 }
      setCookie('counter', visits, now)
      this.visitPerson = visits
    },
    pic() {
      this.homePic.push(`您的身份为：${this.roles[0] === 'editor' ? '查看者' : '管理员'}`)
      this.homePic.push(`学生总数：${this.student}`)
      this.homePic.push(`访问总量：${this.visitPerson}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: black;
  font-size: 48px;
  opacity: 0.75;
  line-height: 525px;
  margin: auto;
  text-align: center;
  text-shadow:
    0 1px 0 #c0c0c0,
    0 2px 0 #b0b0b0,
    0 3px 0 #a0a0a0,
    0 4px 0 #1a1919,
    0 5px 10px rgba(0, 0, 0, 0.6);
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
