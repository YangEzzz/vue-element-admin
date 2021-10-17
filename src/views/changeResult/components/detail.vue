<template>
  <div>
    <el-form>
      <sticky :class-name="'sub-navbar'">
        <el-button v-if="!isEdit" @click.prevent.stop="showGuide">显示帮助</el-button>
        <el-button
          v-loading="loading"
          type="success"
          style="margin-left: 10px"
          class="submit-btn"
          @click="submitForm"
        >
          {{ isEdit ? '编辑成绩' : '提交成绩' }}
        </el-button>
      </sticky>
      <div class="detail-container">
        <el-row>
          <Warning :is-edit="true" :is-data="isData" />
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
        <div class="foresee">表格预览</div>
        <el-table :data="tableObject" class="form-item" border highlight-current-row style="width: 100%;margin-top:0">
          <el-table-column v-for="item in tableHeader" :key="item" :prop="item" :label="item" align="center" :render-header="labelHead" />
        </el-table>
      </div>
    </el-form>

  </div>
</template>

<script>
import Sticky from '@/components/Sticky'
import Warning from '@/views/changeResult/components/Warning'
import ExcelUpload from '@/../src/components/ExcelUpload/index'
import { createStudent, updateStudent } from '@/api/student'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from '@/views/changeResult/components/steps'
export default {
  components: { Warning, Sticky, ExcelUpload },
  props: {
    isEdit: Boolean,
    isData: Boolean
  },
  data() {
    return {
      driver: null,
      // itemChinese: [
      //   '年级',
      //   '班级',
      //   '座号',
      //   '姓名',
      //   '语文',
      //   '数学',
      //   '英语',
      //   '物理',
      //   '化学',
      //   '生物',
      //   '地理',
      //   '体育',
      //   '综合',
      //   '总分',
      //   '考试次数'
      // ],
      disabled: '',
      loading: false,
      tableObject: [],
      tableHeader: [],
      fileList: []
    }
  },
  created() {
    console.log(this.$route.params)
  },
  mounted() {
    this.driver = new Driver({
      nextBtnText: '下一个',
      prevBtnText: '上一个',
      closeBtnText: '关闭',
      doneBtnText: '完成'
    })
  },
  methods: {
    labelHead(h, { column }) {
      const l = column.label.length
      const f = 16 // 每个字大小，其实是每个字的比例值，大概会比字体大小差不多大一点，
      column.minWidth = f * l // 字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度
      // 然后将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
      return h('div', { class: 'table-head', style: { width: '100%' }}, [column.label])
    },
    onUploadSuccess(data) {
      if (this.tableObject !== Array) {
        this.tableObject = []
      }
      this.tableHeader = data.header
      this.tableObject = Object.values(data.tableData)
      // console.log('onUploadSuccess', this.tableObject instanceof Array, this.tableObject)
    },
    setDefault() {
      this.tableObject = []
      this.tableHeader = []
    },
    onUploadRemove() {
      this.setDefault()
    },
    showGuide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    },
    submitForm() {
      this.loading = true
      const student = this.tableObject
      if (!this.isEdit) {
        createStudent(student).then(response => {
          const { msg } = response
          this.$notify({
            title: '操作成功',
            message: msg,
            type: 'success',
            duration: 2000
          })
          this.loading = false
        }).catch(reason => {
          this.loading = false
        })
      } else {
        updateStudent(student).then(response => {
          console.log(response)
        }).catch(reason => {
          this.loading = false
          console.log(this.isEdit)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-container {
  padding: 40px 50px 20px;
}
.foresee {
  margin-top: 10px;
  margin-bottom: 0px;
  text-align: center;
  border: 1px solid #E7E4E4FC ;
  border-bottom-style: none;
  padding-top: 5px;
  padding-bottom: 5px;
}
.table-head{
  font-size:14px!important;//设置固定的字体大小
}
</style>
