const { querySql, queryOne } = require('../db')
/*eslint-disable*/
function login(username, password) {
  return querySql(`select * from admin_user where username='${username}' and password='${password}'`)
}

function  findUser(username){
  return queryOne(`select id, username,role from admin_user where username='${username}'`)
}

module.exports = {
  login,
  findUser
}
