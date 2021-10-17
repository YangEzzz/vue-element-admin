const steps = [
  {
    element: '.el-upload-dragger',
    popover: {
      title: '上传成绩',
      description: '点击上传成绩excel文件',
      position: 'bottom'
    }
  },
  {
    element: '.form-item',
    popover: {
      title: 'excel文件内容',
      description: '在此处检查您上传的excel文件是否正确及正确显示，若不符合要求请修改excel文件后上传',
      position: 'top'
    }
  },
  {
    element: '.submit-btn',
    popover: {
      title: '提交信息',
      description: '将成绩保存到后台',
      position: 'left'
    }
  }
]

export default steps
