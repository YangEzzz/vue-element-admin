<template>
  <div class="container" style="margin: auto">
    <div class="selectContainer">
      <el-select v-model="valueGrade" placeholder="请选择" style="margin-right: 10px;" @change="handleChange2();handleChange()">
        <el-option
          v-for="item in grade"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select v-model="valueClass" clearable placeholder="请选择班级" @change="handleChange">
        <el-option
          v-for="item in categoryList"
          :key="item.value"
          :label="item.label"
          :value="item.num"
        />
      </el-select>
    </div>
    <div class="cardContainer" style="margin-top: 100px;">
      <el-card
        v-for="(item,index) in SubjectNameTrue"
        :key="index"
        shadow="hover"
        style="margin-right: 10px;width: 80px"
      >
        {{ item }}
      </el-card>
    </div>
    <div class="cardContainer">
      <el-card
        v-for="(item,index) in advantage"
        :key="index"
        shadow="hover"
        style="margin-right: 10px;width: 80px"
      >
        {{ item }}
      </el-card>
    </div>
  </div>
</template>
<script>
import { advantageResult, getCategory } from '@/api/student'

export default {
  data() {
    return {
      SubjectName: ['语文', '数学', '英语', '道法', '历史', '物理', '化学'],
      SubjectNameTrue: [],
      advantage: [],
      listQuery: { subject: 'Chinese',
        classNum: 1,
        gradeNum: 1 },
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
      valueClass: '',
      categoryList: []
    }
  },
  mounted() {
    this.getAdr()
    this.getCategoryList(this.valueGrade)
  },
  methods: {
    getAdr() {
      this.listQuery.gradeNum = this.valueGrade
      this.listQuery.classNum = this.valueClass
      advantageResult(this.listQuery).then(response => {
        console.log(response.data)
        const resultAll = response.data
        // const { advantage } = resultAll[0]
        this.advantage = resultAll.filter(item =>
          item.advantage !== null
        )
        this.advantage = this.advantage.map(item =>
          Number.parseFloat(item.advantage).toFixed(2)
        )
        this.SubjectNameTrue = this.SubjectName.slice(0, this.advantage.length)
        console.log(this.SubjectNameTrue)
      })
    },
    handleChange() {
      this.getAdr()
      this.getCategoryList(this.valueGrade)
    },
    handleChange2() {
      this.valueClass = ''
    },
    getCategoryList(grade) {
      getCategory(grade).then(response => {
        this.categoryList = response.data
        // console.log(this.categoryList)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .cardContainer {
    display: flex;
    margin-top: 20px;
  }
  .selectContainer {
    display: flex;
    margin-top: 20px;
  }
  .container {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
