<template>
  <div>
    <el-form v-show="isData" style="margin-bottom: 10px;">
      <aside>
        <b>请按照下面的样例在excel中输入好表头后填入对应信息，格式正确才能够正确上传</b>
        <br>
        当表格列数过多时，将鼠标置于表格内，按住shift滑动鼠标滚轮即可查看超出页面的内容
        <br>
        <div style="float: left;margin-top: 15px;margin-right: 10px">
          点击查看样例excel文件→
        </div>
        <el-image style="height: 50px;width: 50px" :src="require('@/assets/dataSample.png')" :preview-src-list="[require('@/assets/dataSample.png')]" />
      </aside>
    </el-form>
    <el-form v-show="!isData">
      <div>
        请去个人成绩选择要修改的学生
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    isEdit: Boolean,
    isData: Boolean
  }
}
</script>

