<template>
  <div>
    <div class="roleText1">
      <span v-for="item in roles" :key="item" style="line-height: 150px" class="pan-info-roles">你的角色是：{{ item }}</span>
    </div>
    <div class="roleText2">
      <span style="line-height: 150px">功能介绍</span>
    </div>
    <div id="footer">
      <ul>
        <li>
          @2021 YangEzzz.All rights Reserved
        </li>
      </ul>
    </div>
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
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import { mapGetters } from 'vuex'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}/*eslint-disable*/
export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  data() {
    return {
      currentRole: 'adminDashboard',
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.roleText1 {
  border: #8887 outset 3px ;
  border-radius: 5px;
  text-align: center;
  position: absolute;
  left: 20%;
  top: 20px;
  height: 150px;
  width: 200px;
}
.roleText1:hover {
  box-shadow: 6px 6px 5px #8888;
}

.roleText2 {
  border: #8887 outset 3px ;
  border-radius: 5px;
  text-align: center;
  position: absolute;
  right: 20%;
  top: 20px;
  height: 150px;
  width: 200px;
}
.roleText2:hover {
  box-shadow: 6px 6px 5px #8888;
}
#footer {
  clear: both;
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 1px;
}
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
