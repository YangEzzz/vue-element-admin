<template>
  <div>
    <aside v-show="isEdit">
      当表格过大时，将鼠标置于表格内，按住shift滑动鼠标滚轮即可查看超出页面的内容  帮助详细内容  帮助详细内容  帮助详细内容  帮助详细内容  帮助详细内容  帮助详细内容  帮助详细内容
    </aside>
    <aside v-show="!isEdit">
      请修改内容
    </aside>
  </div>
</template>
<script>
export default {
  props: {
    isEdit: Boolean
  }
}
</script>

