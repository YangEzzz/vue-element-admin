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
  console.log('sqlTest',where)
  return { list, count: count[0].count, page, pageSize }
}

async function chartListStudent(query) {
  console.log(query)
  const {
  } = query
  let range=['100 and 150', '90 and 100', '80 and 90', '70 and 80', '60 and 70', '50 and 60', '40 and 50', '0 and 40']
  let booksql = 'select count(Chinese) as `语文` from studentresult where Chinese between '
  let studentsql1 = 'SELECT * FROM (( SELECT count( Chinese ) AS `语文` FROM studentresult WHERE Chinese BETWEEN '
  let studentsql2 = ') AS a1,( SELECT count( Math ) AS `数学` FROM studentresult WHERE Math BETWEEN '
  let studentsql3=') AS a2,(SELECT count( English ) AS `英语` FROM studentresult WHERE English BETWEEN '
  let studentsql4=') AS a3,(SELECT count( Physical ) AS `物理` FROM studentresult WHERE Physical BETWEEN '
  let studentsql5=') AS a4,(SELECT count( Chemistry ) AS `化学` FROM studentresult WHERE Chemistry BETWEEN '
  let studentsql6=') AS a5,(SELECT count( History ) AS `历史` FROM studentresult WHERE History BETWEEN '
  let studentsql7=') AS a6,(SELECT count( Politics ) AS `道法` FROM studentresult WHERE Politics BETWEEN '
  let studentsql8=') AS a7,(SELECT count( Biology ) AS `生物` FROM studentresult WHERE Biology BETWEEN '
  let studentsql9=') AS a8,(SELECT count( Geographic ) AS `地理` FROM studentresult WHERE Geographic BETWEEN '
  let studentsql12=') AS a11)'
  const list = []
  for(const item of range){
    let booksqlTotal=`${studentsql1}${item}${studentsql2}${item}${studentsql3}${item}${studentsql4}${item}${studentsql5}${item}${studentsql6}${item}${studentsql7}${item}${studentsql8}${item}${studentsql9}${item}${studentsql12}`
    console.log('sqltestnight',booksqlTotal)
    list.push((await db.querySql(booksqlTotal))[0])
  }
  console.log('list',list)// list是一个数组，数组中的每一个元素是一个对象，对象里是查询出来的键值对
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
//testData
// booksql = 'select count(Chinese) as `语文` from studentresult where Chinese between 90 and 100'
// list.push((await db.querySql(booksql))[0])
// booksql = 'select count(Chinese) as `语文` from studentresult where Chinese between 80 and 90'
// list.push((await db.querySql(booksql))[0])
// booksql = 'select count(Chinese) as `语文` from studentresult where Chinese between 70 and 80'
// list.push((await db.querySql(booksql))[0])
// booksql = 'select count(Chinese) as `语文` from studentresult where Chinese between 60 and 70'
// list.push((await db.querySql(booksql))[0])
// booksql = 'select count(Chinese) as `语文` from studentresult where Chinese between 50 and 60'
// list.push((await db.querySql(booksql))[0])
// booksql = 'select count(Chinese) as `语文` from studentresult where Chinese between 40 and 50'
// list.push((await db.querySql(booksql))[0])
// booksql = 'select count(Chinese) as `语文` from studentresult where Chinese between 0 and 40'
// list.push((await db.querySql(booksql))[0])
