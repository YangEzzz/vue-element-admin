const db = require('../db')
const Student = require('../models/Student')
// function exists(book) {
//   const { title, author, publisher } = book
//   const sql = `select * from book where title='${title}' and author='${author}' and publisher='${publisher}'`
//   return db.queryOne(sql)
// }
function insertStudent(student) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async(resolve, reject) => {
    try {
      if (student instanceof Student) {
        // console.log('test3', Object.values(student.data[0]))
        await db.insert(student, 'result')
        resolve()
      } else {
        reject(new Error('添加的表格不合法'))
      }
    } catch (e) {
      reject(e)
    }
  })
}
async function getCategory() {
  const sql = 'select distinct Class from category'
  const result = await db.querySql(sql)
  const categoryList = []
  result.forEach(item => {
    categoryList.push({
      label: item.Class, // 显示在下拉列表中的
      value: item.Class,
      num: item.Class// 查询时使用的
    })
  })
  return categoryList
}
/*eslint-disable*/
async function listStudent(query) {
  console.log(query)
  const {
    category,
    Name,
    sort,
    StudentId,
    page = 1,
    pageSize = 20
  } = query
  const offset = (page-1)*pageSize
  let booksql = 'select * from studentresult'
  let where = 'where Name is not null'
  Name && (where = db.andLike(where, 'Name', Name))
  StudentId && (where = db.and(where, 'StudentId', StudentId))
  category && (where = db.and(where, 'Class', category))
  if (where !== 'where') {
    booksql = `${booksql} ${where}`
  }
  if (sort) {
    const symbol = sort[0]
    const column = sort.slice(1, sort.length)
    const order = symbol === '+' ? 'asc' : 'desc'
    booksql = `${booksql} order by \`${column}\` ${order}`
  }
  let countSql = `select count(*) as count from studentresult`
  if (where !== 'where'){
    countSql = `${countSql} ${where}`
  }
  const count = await db.querySql(countSql)
  booksql = `${booksql} limit ${pageSize} offset ${offset}`
  const list = await db.querySql(booksql)
  console.log('sqltest',where)
  return { list, count: count[0].count, page, pageSize }
}

async function chartListStudent(query) {
  console.log(query)
  const {
  } = query
  let booksql = 'select Chinese,Name,Math from studentresultcharttest where Name is not null'
  const list = await db.querySql(booksql)
  return { list }
}

async function updateStudent(updateKey){

}

module.exports = {
  getCategory,
  listStudent,
  insertStudent,
  updateStudent,
  chartListStudent
}
