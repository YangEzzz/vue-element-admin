const express = require('express')
const Result = require('../models/Result')
const studentService=require('../services/student')
const boom =require('boom')

const router = express.Router()



router.get('/category', function (req,res,next){
  studentService.getCategory().then(category=>{
    new Result(category,'获取分类成功').success(res)
  }).catch(err=>{
    next(boom.badImplementation(err))
  })
})

module.exports = router
