<template>
  <div>
    <el-form v-show="isData">
      <aside>
        当表格过大时，将鼠标置于表格内，按住shift滑动鼠标滚轮即可查看超出页面的内容  帮助详细内容  帮助详细内容  帮助详细内容  帮助详细内容  帮助详细内容  帮助详细内容  帮助详细内容
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

