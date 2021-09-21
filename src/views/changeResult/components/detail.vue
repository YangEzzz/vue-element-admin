<template>
  <div>
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
        <div class="foresee">表格预览</div>
        <el-table :data="tableObject" border highlight-current-row style="width: 100%;margin-top:0px">
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
export default {
  components: { Warning, Sticky, ExcelUpload },
  props: {
    isEdit: Boolean
  },
  data() {
    return {
      itemChinese: [
        '年级',
        '班级',
        '座号',
        '姓名',
        '语文',
        '数学',
        '英语',
        '物理',
        '化学',
        '生物',
        '地理',
        '体育',
        '综合',
        '总分',
        '考试次数'
      ],
      disabled: '',
      loading: false,
      tableObject: [],
      tableHeader: [],
      fileList: []
    }
  },
  methods: {
    labelHead(h, { column, item }) {
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
      console.log('onUploadSuccess', this.tableObject instanceof Array, this.tableObject)
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
