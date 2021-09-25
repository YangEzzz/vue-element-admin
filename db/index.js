/*eslint-disable*/
const mysql = require('mysql')
const config = require('./config')
const {debug} = require("../utils/constant");

function connect() {
  return mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
    multipleStatements: true
  })
}

function querySql(sql) {
  const conn = connect()
  debug && console.log(sql)
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, (err, results) => {
        if (err) {
          debug && console.log('查询失败，原因:' + JSON.stringify(err))
          reject(err)
        } else {
          debug && console.log('查询成功', JSON.stringify(results))
          resolve(results)
        }
      })
    } catch (e) {
      reject(e)
    } finally {
      conn.end()
    }
  })
}

function queryOne(sql){
  return new Promise((resolve,reject)=>{
    querySql(sql).then(results=>{
      if(results && results.length>0){
        resolve(results[0])
      }else{
        resolve(null)
      }
    }).catch(err=>{
      reject(err)
    })
  })
}

let isObject = (value) => {
  return value != null && (typeof value == 'object' || typeof value == 'function')
}

function insert(model, tableName){
  const modelData=model.data
  // console.log('md',modelData)
  return new Promise((resolve, reject) => {
    if (!(modelData instanceof Array) || modelData.length===0) {
      reject(new Error('插入数据库失败，插入数据非对象'))
    } else {
      const keys = []
      const values = []
      // for(let item of modelData){
      //   Object.keys(item).forEach(key => {
      //     if (item.hasOwnProperty(key)) {
      //       keys.push(`\`${key}\``)
      //       values.push(`'${model[key]}'`)
      //     }
      //   })
      // }
      Object.keys(modelData[0]).forEach(key => {
        if (modelData[0].hasOwnProperty(key)) {
          keys.push(`\`${key}\``)
          values.push(`'${modelData[0][key]}'`)
        }
      })
      if (keys.length > 0 && values.length > 0) {
        let sql = `INSERT INTO \`${tableName}\`(`
        const keysString = keys.join(',')
        const valuesString = values.join(',')
        sql = `${sql}${keysString}) VALUES (${valuesString})`
        debug && console.log(sql)
        const conn = connect()
        try {
          conn.query(sql, (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          })
        } catch (e) {
          reject(e)
        } finally {
          conn.end()
        }
      } else {
        reject(new Error('SQL解析失败'))
      }
    }
  })
}

function and(where, k, v){
  if(where==='where'){
    return `${where} \`${k}\`='${v}'`
  }else {
    return `${where} and \`${k}\`='${v}'`
  }
}

function andLike(where, k, v){
  if(where==='where'){
    return `${where} \`${k}\` like '%${v}%'`
  }else {
    return `${where} and \`${k}\` like '%${v}%'`
  }
}

module.exports = {
  querySql,
  queryOne,
  and,
  andLike,
  insert
}

