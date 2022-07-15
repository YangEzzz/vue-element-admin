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

async function getCategory(grade) {
  console.log(grade)
  const sql = `select distinct Class from student where Grade = ${grade['0']}`
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
    grade,
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
  grade && (where = db.and(where, 'Grade', grade))
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
  console.log('sqlTest',booksql,grade)
  return { list, count: count[0].count, page, pageSize }
}

async function getSum(){
  return await db.querySql('select count(*) from studentresult')
}

async function listRankStudent(query) {
  console.log('qqqqqq',query)
  const {
    category,
    subject,
    grade,
    page = 1,
    pageSize = 20
  } = query
  const offset = (page-1)*pageSize
  let studentSql = `select StudentId,Name,Grade,Class,${subject},RANK() over(ORDER BY ${subject} desc) as Ranks FROM studentresult`
  let where = 'where Name is not null'
  // Name && (where = db.andLike(where, 'Name', Name))
  // StudentId && (where = db.and(where, 'StudentId', StudentId))
   category && (where = db.and(where, 'Class', category))
  grade && (where = db.and(where, 'Grade', grade))
  if (where !== 'where') {
    studentSql = `${studentSql} ${where}`
  }
  // if (sort) {
  //   const symbol = sort[0]
  //   const column = sort.slice(1, sort.length)
  //   const order = symbol === '+' ? 'asc' : 'desc'
  //   booksql = `${booksql} order by \`${column}\` ${order}`
  // }
  let countSql = `select count(*) as count from studentresult`
  if (where !== 'where'){
    countSql = `${countSql} ${where}`
  }
  const count = await db.querySql(countSql)
  studentSql = `${studentSql} limit ${pageSize} offset ${offset}`
  const list = await db.querySql(studentSql)
  console.log('sqlTestRank',studentSql)
  // console.log('sqlTestRank',list)
  return { list, count: count[0].count, page, pageSize }
}

async function chartListStudent(query) {
  const q=Object.keys(query)[0]
  const subject = query[q]
  // console.log('11',subject)
  let range=['100 and 150', '90 and 100', '80 and 90', '70 and 80', '60 and 70', '50 and 60', '40 and 50', '0 and 40']
  let studentSql1 = `SELECT * FROM (( SELECT count( ${subject} ) AS '一班' FROM studentresult WHERE ${subject} BETWEEN `
  let studentSql2 = ` and Class=1) AS a1,( SELECT count( ${subject} ) AS '二班' FROM studentresult WHERE ${subject} BETWEEN `
  let studentSql3=` and Class=2) AS a2,(SELECT count( ${subject} ) AS '三班' FROM studentresult WHERE ${subject} BETWEEN `
  let studentSql4=` and Class=3) AS a3,(SELECT count( ${subject} ) AS '四班' FROM studentresult WHERE ${subject} BETWEEN `
  let studentSql5=` and Class=4) AS a4,(SELECT count( ${subject} ) AS '全级' FROM studentresult WHERE ${subject} BETWEEN `
  let studentSql6=`) AS a5)`
  const list = []
  for(const item of range){
    let booksqlTotal=`${studentSql1}${item}${studentSql2}${item}${studentSql3}${item}${studentSql4}${item}${studentSql5}${item}${studentSql6}`
    // console.log('sqlTestNight',booksqlTotal)
    list.push((await db.querySql(booksqlTotal))[0])
  }
   // console.log('list',list)// list是一个数组，数组中的每一个元素是一个对象，对象里是查询出来的键值对
  return { list }
}

async function passRateStudent(query) {
  console.log(query)
  const classes=query['classes']
  const subject=query['subject']
  const grade=query['grade']
  let good
  let pass
  if(subject==='Total') {
    if(grade==='3') {
      good = 608
      pass = 456
    }
    else if(grade==='2'){
      good = 528
      pass=396
    }
    else if(grade==='1'){
      good = 448
      pass=336
    }
  }
  else{
    good=(subject==='Chinese'||subject==='Math'||subject==='English')?96:80
    pass=(subject==='Chinese'||subject==='Math'||subject==='English')?72:60
  }
  console.log(subject,classes,good,grade)
  let studentSqlGood=``
  let studentSqlPass=``
  let studentSqlNot=``
  // noinspection EqualityComparisonWithCoercionJS
  if(classes===""){
    studentSqlGood=`select count(*) as Good from studentresult where ${subject} >= ${good} and Grade=${grade} and TestTime=1`
    studentSqlPass=`select count(*) as Pass from studentresult where ${subject} < ${good} and Grade=${grade} and ${subject} >=${pass} and TestTime=1`
    studentSqlNot=`select count(*) as NotPass from studentresult where ${subject} < ${pass} and Grade=${grade} and TestTime=1`
  }
  else{
    studentSqlGood=`select count(*) as Good from studentresult where ${subject} >= ${good} and Grade=${grade} and Class=${classes} and TestTime=1`
    studentSqlPass=`select count(*) as Pass from studentresult where ${subject} < ${good} and ${subject} >=${pass} and Grade=${grade} and Class=${classes} and TestTime=1`
    studentSqlNot=`select count(*) as NotPass from studentresult where ${subject} < ${pass} and Grade=${grade} and Class=${classes} and TestTime=1`
  }
  console.log(studentSqlGood,studentSqlPass,studentSqlNot)
  // const studentSql=`select concat((select count(*) from \`result\` where Math >= 60 and TestTime=1)/(select count(*) from \`result\` where TestTime=1 and Math is not null)*100,'%') as Math`
  const passResultGood = await db.querySql(studentSqlGood)
  const passResultPass = await db.querySql(studentSqlPass)
  const passResultNot = await db.querySql(studentSqlNot)
  console.log([passResultGood[0],passResultPass[0],passResultNot[0]])
  return { ...passResultGood[0], ...passResultPass[0], ...passResultNot[0] }
//  选择班级与科目显示饼状图
//  饼状图含有及格，优秀，不及格人数，
}

function updateStudent(updateKey){
  const id=updateKey["StudentId"]
  const Chinese=updateKey["Chinese"]
  const Math=updateKey["Math"]
  const English=updateKey["English"]
  const Physical=updateKey["Physical"]
  const Chemistry=updateKey["Chemistry"]
  const History=updateKey["History"]
  const Politics=updateKey["Politics"]
  const Biology=updateKey["Biology"]
  const Geographic=updateKey["Geographic"]
  const Sport=updateKey["Sport"]
  const Composite=updateKey["Composite"]
  let studentSql = `update result set Chinese = ${Chinese}, Math=${Math}, English=${English}, Physical=${Physical}, Chemistry=${Chemistry}, History=${History}, Politics=${Politics}, Biology=${Biology}, Geographic=${Geographic}, Sport=${Sport}, Composite=${Composite} where StudentId = ${id} `
  // console.log(studentSql)
  return new Promise(async (resolve) => {
    await db.querySql(studentSql)
    resolve()
  }).catch(reason => {
    reject(reason)
  })
}

async function advantage(list){
  const {subject,classNum,gradeNum}=list
  const subjectAll=['Chinese','Math','English','Politics','History','Physical','Chemistry']
  let resultAll=[]
  let resultSqlAll=[]
  console.log('sqlList', classNum, gradeNum)
  if(classNum===""){
    resultSqlAll=subjectAll.map((subject1)=>{
      return `SELECT sum(${subject1})/count(${subject1}) as advantage FROM studentresult where grade=${gradeNum};`
    })
  }
  else
    resultSqlAll=subjectAll.map((subject1)=>{
      return `SELECT sum(${subject1})/count(${subject1}) as advantage FROM studentresult where class=${classNum} and grade=${gradeNum};`
    })
  console.log(resultSqlAll)
  for(let i=0;i<resultSqlAll.length;i++){
    resultAll.push((await db.querySql(resultSqlAll[i]))[0])
  }
  console.log(resultAll)
  // let advantageSql = `SELECT sum(${subject})/count(${subject}) as advantage FROM studentresult where class=${classNum} and grade=${gradeNum};`
  return resultAll

}

module.exports = {
  getCategory,
  listStudent,
  insertStudent,
  updateStudent,
  chartListStudent,
  listRankStudent,
  passRateStudent,
  advantage,
  getSum
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
// SELECT * FROM ((SELECT count( Chinese ) AS `一班` FROM studentresult WHERE Chinese BETWEEN 80 and 90 and Class=1) AS a1,(SELECT count( Chinese ) AS `二班` FROM studentresult WHERE Chinese BETWEEN 80 and 90 and Class=2) AS a2,(SELECT count( Chinese ) AS `三班` FROM studentresult WHERE Chinese BETWEEN 80 and 90 and Class=3) AS a3,(SELECT count( Chinese ) AS `四班` FROM studentresult WHERE Chinese BETWEEN 80 and 90 and Class=4) AS a4)
// let studentSql1 = 'SELECT * FROM (( SELECT count( Chinese ) AS `语文` FROM studentresult WHERE Chinese BETWEEN '
// let studentSql2 = ') AS a1,( SELECT count( Math ) AS `数学` FROM studentresult WHERE Math BETWEEN '
// let studentSql3=') AS a2,(SELECT count( English ) AS `英语` FROM studentresult WHERE English BETWEEN '
// let studentSql4=') AS a3,(SELECT count( Physical ) AS `物理` FROM studentresult WHERE Physical BETWEEN '
// let studentSql5=') AS a4,(SELECT count( Chemistry ) AS `化学` FROM studentresult WHERE Chemistry BETWEEN '
// let studentSql6=') AS a5,(SELECT count( History ) AS `历史` FROM studentresult WHERE History BETWEEN '
// let studentSql7=') AS a6,(SELECT count( Politics ) AS `道法` FROM studentresult WHERE Politics BETWEEN '
// let studentSql8=') AS a7,(SELECT count( Biology ) AS `生物` FROM studentresult WHERE Biology BETWEEN '
// let studentSql9=') AS a8,(SELECT count( Geographic ) AS `地理` FROM studentresult WHERE Geographic BETWEEN '
// let studentSql12=') AS a11)'
