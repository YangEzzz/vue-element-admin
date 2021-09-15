<template>
  <div class="upload-container">
    <el-upload
      :action="action"
      :headers="headers"
      :multiple="false"
      :limit="1"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :on-error="onError"
      :file-list="fileList"
      :on-exceed="onExceed"
      :disabled="disabled"
      drag
      show-file-list
      accept=".xlsx,.xls"
      class="image-upload"
    >
      <!--      :limit="limitNum"-->
      <!--      :auto-upload="false"-->
      <!--      accept=".xlsx"-->
      <!--      :before-upload="beforeUploadFile"-->
      <!--      :on-change="fileChange"-->
      <!--      :on-exceed="exceedFile"-->
      <!--      :on-success="handleSuccess"-->
      <!--      :on-error="handleError"-->
      <!--      :file-list="fileList"-->
      <i class="el-icon-upload" />
      <div v-if="fileList.length === 0" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div v-else class="el-upload__text">图书已上传</div>
      <div slot="tip" class="el-upload__tip">只能上传xlsx或xls文件</div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      action: `${process.env.VUE_APP_BASE_API}/student/upload`
    }
  },
  computed: {
    headers() {
      return {
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  methods: {
    beforeUpload(file) {
      this.$emit('beforeUpload', file)
    },
    onSuccess(response, file) {
      // console.log(response, file)
      const { code, msg } = response
      if (code === 0) {
        this.$message({
          message: msg,
          type: 'success'
        })
        this.$emit('onSuccess', file)
      } else {
        this.$message({
          message: (msg && `上传失败，失败原因：${msg}`) || '上传失败',
          type: 'error'
        })
        this.$emit('onError', file)
      }
    },
    onError(err) {
      const errMsg = err.message && JSON.parse(err.message)
      this.$message({
        message: (errMsg && errMsg.msg && `上传失败，失败原因：${errMsg.msg}`) || '上传失败',
        type: 'error'
      })
      this.$emit('onError', err)
    },
    onRemove() {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.$emit('onRemove')
    },
    onExceed() {
      this.$message({
        message: '每次只能上传一个成绩表格',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>

</style>
