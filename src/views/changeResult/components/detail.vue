<template>
  <el-form ref="postForm" :model="postForm">
    <sticky :class-name="'sub-navbar'">
      <el-button v-if="!isEdit" @click="showGuide">显示帮助</el-button>
      <el-button
        v-loading="loading"
        type="success"
        style="margin-left: 10px"
        @click="submitForm"
      >
        {{ isEdit ? '编辑电子书' : '显示电子书' }}
      </el-button>
    </sticky>
    <div class="detail-container">
      <el-row>
        <Warning />
        <el-col :span="24">
          <ExcelUpload
            :file-list="fileList"
            :disabled="isEdit"
            @onSuccess="onUploadSuccess"
            @onRemove="onUploadRemove"
          />
        </el-col>
        <el-col :span="24" />
      </el-row>
    </div>
  </el-form>
</template>

<script>
import Sticky from '@/components/Sticky'
import Warning from '@/views/changeResult/components/Warning'
import ExcelUpload from '@/../src/components/ExcelUpload/index'
export default {
  components: { Warning, Sticky, ExcelUpload },
  props: {
    isEdit: Boolean
  },
  data() {
    return {
      // eslint-disable-next-line no-undef
      disabled,
      loading: false,
      postForm: {
      },
      fileList: []
    }
  },
  methods: {
    onUploadSuccess() {
      console.log('onUploadSuccess')
    },
    onUploadRemove() {
      console.log('onUploadRemove')
    },
    showGuide() {
      console.log('show guide')
    },
    submitForm() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 1000)
      console.log('wwww')
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
  padding: 40px 50px 20px;
}
</style>
