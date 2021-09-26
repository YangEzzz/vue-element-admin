/*eslint-disable*/
const { MIME_TYPE_EXCEL, UPLOAD_URL, UPLOAD_PATH } =require('../utils/constant')
const fs=require('fs')
const xlsx=require('xlsx')
class Student {
  constructor(file, data) {
    if (file) {
      this.createStudentFromFile(file)
    } else {
      this.createStudentFromData(data)
    }
  }

  createStudentFromFile(file) {
    const {
      destination,
      filename,
      mimetype = MIME_TYPE_EXCEL,
      path,
      originalname
    } = file
    const suffix = mimetype === MIME_TYPE_EXCEL ? '.xlsx' : ''
    const oldExcelPath = path
    const excelPath = `${destination}/${filename}${suffix}`
    const url = `${UPLOAD_URL}/student/${filename}${suffix}`
    if(fs.existsSync(oldExcelPath) && !fs.existsSync(excelPath)) {
      fs.renameSync(oldExcelPath,excelPath)
    }
    this.fileName= filename //文件名
    this.path = `/student/${filename}${suffix}` //相对路径
    this.filePath = this.path
    this.url = url
    this.originalname = originalname
  }

  createStudentFromData(data) {
    this.data=data
    //   this[i].StudentId=item.StudentId
    //   this.Grade=data.Grade
    //   this.Class=data.Class
    //   this.Name=data.name
    //   this.Chinese=data.Chinese
    //   this.Math=data.Math
    //   this.English=data.English
    //   this.Physical=data.Physical
    //   this.Chemistry=data.Chemistry
    //   this.History=data.History
    //   this.Politics=data.Politics
    //   this.Biology=data.Biology
    //   this.Geographic=data.Geographic
    //   this.Sport=data.Sport
    //   this.Composite=data.Composite
    //   this.Total=data.Total
    //   this.TestTime=data.TestTime
    // }
    console.log('test2')
  }

  getHeaderRow(sheet) {
    const headers = []
    const range = xlsx.utils.decode_range(sheet['!ref'])
    let C
    const R = range.s.r
    /* start in the first row */
    for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
      const cell = sheet[xlsx.utils.encode_cell({ c: C, r: R })]
      /* find the cell in the first row */
      let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
      if (cell && cell.t) hdr = xlsx.utils.format_cell(cell)
      headers.push(hdr)
    }
    return headers
  }

  parse() {
    return new Promise((resolve,reject) => {
      const excelPath = `${UPLOAD_PATH}${this.filePath}`
      if(!fs.existsSync(excelPath)){
        reject(new Error('表格路径不存在'))
      }
      const workexcel = xlsx.readFile(excelPath)
      const sheetNames = workexcel.SheetNames
      const sheet1=workexcel.Sheets[sheetNames[0]]
      const sheet2JSONOpts = {
        /** Default value for null/undefined values */
        defval: ''//给defval赋值为空的字符串
      }
      const header = this.getHeaderRow(sheet1)
      const data=xlsx.utils.sheet_to_json(sheet1, sheet2JSONOpts)
      this.header=header
      this.tableData=data
      //console.log(data)
      resolve(this)
    })

  }
}

module.exports = Student
