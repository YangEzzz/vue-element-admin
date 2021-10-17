<template>
  <div>
    <Warning v-show="!isData" :is-edit="true" :is-data="isData" />
    <ChangeDetail :is-edit="true" />
  </div>
</template>
<script>
import ChangeDetail from '@/views/changeResult/components/ChangeDetail'
import Warning from '@/views/changeResult/components/Warning'
export default {
  components: { Warning, ChangeDetail },
  data() {
    return {
      isData: true
    }
  },
  mounted() {
    console.log(this.$route.query.Student)
    if (!this.$route.query.Student) {
      this.isData = false
      this.$message.error('请在个人成绩中选择要修改的学生')
    }
  }
}
</script>
