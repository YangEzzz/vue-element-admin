<template>
  <el-form>
    <sticky :class-name="'sub-navbar'">
      <el-button v-if="!isEdit" @click="showGuide">显示帮助</el-button>
      <el-button
        v-loading="loading"
        type="success"
        style="margin-left: 10px"
        @click="submitForm"
      >
        {{ isEdit ? '编辑电子书' : '提交电子书' }}
      </el-button>
      <div class="changeContainer">
        <Warning :is-edit="false" style="text-align: left" />
        姓名:<el-input v-model="updateKey.Name" type="text" disabled />
        年级:<el-input v-model="updateKey.Grade" type="number" disabled />
        班级:<el-input v-model="updateKey.Class" type="number" disabled />
        座号:<el-input v-model="updateKey.StudentId" type="number" disabled />
        <br>
        语文:<el-input v-model="updateKey.Chinese" type="number" />
        数学:<el-input v-model="updateKey.Math" type="number" />
        英语:<el-input v-model="updateKey.English" type="number" />
        物理:<el-input v-model="updateKey.Physical" type="number" />
        <br>
        化学:<el-input v-model="updateKey.Chemistry" type="number" />
        历史:<el-input v-model="updateKey.History" type="number" />
        道法:<el-input v-model="updateKey.Politics" type="number" />
        生物:<el-input v-model="updateKey.Biology" type="number" />
        <br>
        地理:<el-input v-model="updateKey.Geographic" type="number" />
        体育:<el-input v-model="updateKey.Sport" type="number" />
        综合:<el-input v-model="updateKey.Composite" type="number" />
        总分:<el-input v-model="updateKey.Total" type="number" />
        <br>
        考试次数:<el-input v-model="updateKey.TestTime" type="number" />
      </div>
    </sticky>
  </el-form>
</template>

<script>
import Sticky from '@/components/Sticky'
import Warning from '@/views/changeResult/components/Warning'
import { updateStudent } from '@/api/student'
export default {
  name: 'ChangeDetail',
  components: {
    Sticky,
    Warning
  },
  props: {
    isEdit: Boolean
  },
  data() {
    return {
      updateKey: {
        StudentId: '',
        Grade: '',
        Class: '',
        Name: '',
        Chinese: '',
        Math: '',
        English: '',
        Physical: '',
        Chemistry: '',
        History: '',
        Politics: '',
        Biology: '',
        Geographic: '',
        Sport: '',
        Composite: '',
        Total: '',
        TestTime: ''
      }
    }
  },
  methods: {
    submitForm() {
      updateStudent(this.updateKey)
    },
    showGuide() {
      console.log('showGuide')
    }
  }
}
</script>

<style lang="scss" scoped>
.changeContainer {
  margin: auto;
  text-align: left;
  padding: 40px 50px 20px;
}
.changeContainer .el-input {
  margin-right: 10px;
  width: 100px;
}
</style>
