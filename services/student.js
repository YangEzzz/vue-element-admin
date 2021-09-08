const db = require("../db");



// function exists(book) {
//   const { title, author, publisher } = book
//   const sql = `select * from book where title='${title}' and author='${author}' and publisher='${publisher}'`
//   return db.queryOne(sql)
// }

async function getCategory(){
  const sql='select * from category order by StudentId asc'
  const result = await db.querySql(sql)
  const categoryList=[]
  result.forEach(item=>{
    categoryList.push({
      label: item.Name,
      value: item.value,
      num: item.num
    })
  })
  return categoryList
}

module.exports={
  getCategory
}
