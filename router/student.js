const express = require('express')
const Result = require('../models/Result')
const studentService = require('../services/student')
const boom = require('boom')
const { UPLOAD_PATH } = require('../utils/constant')
const multer = require('multer')
const Student = require('../models/Student')
// const { decoded } = require('../utils')

const router = express.Router()

router.post('/upload',
  multer({ dest: `${UPLOAD_PATH}/student` }).single('file'), function(req, res, next) {
    if (!req.file || req.file.length === 0) {
      new Result('上传表格失败').fail(res)
    } else {
      // eslint-disable-next-line no-unused-vars
      const student = new Student(req.file)
      student.parse()
        .then(student => {
          new Result(student, '上传表格成功').success(res)
        }).catch(err => {
          console.log('/student/upload', err)
          next(boom.badImplementation(err))
          student.reset()
        })
    }
  })

router.post('/create', function(req, res, next) {
  // console.log('test', req.body)
  // const decode = decoded(req)
  // if (decode && decode.username) {
  //   req.body.username = decode.username
  // }
  const student = new Student(null, req.body)
  console.log('student')
  studentService.insertStudent(student).then(() => {
    new Result('添加成绩成功').success(res)
  }).catch(err => {
    next(boom.badImplementation(err))
  })
})

router.get('/category', function(req, res, next) {
  studentService.getCategory().then(category => {
    new Result(category, '获取分类成功').success(res)
  }).catch(err => {
    next(boom.badImplementation(err))
  })
})

router.get('/list', function(
  req,
  res, next) {
  studentService.listStudent(req.query)
    .then(({ list, count, page, pageSize }) => {
      new Result({ list, count, page: +page, pageSize: +pageSize }, '获取成绩列表成功').success(res)
    }).catch(err => {
      next(boom.badImplementation(err))
    })
})

router.get('/listRank', function(
  req,
  res, next) {
  studentService.listRankStudent(req.query)
    .then(({ list, count, page, pageSize }) => {
      new Result({ list, count, page: +page, pageSize: +pageSize }, '获取成绩列表成功').success(res)
    }).catch(err => {
      next(boom.badImplementation(err))
    })
})

router.get('/chartList', function(
  req,
  res, next) {
  studentService.chartListStudent(req.query)
    .then(({ list }) => {
      console.log('req', req.query)
      new Result({ list }, '获取成绩列表成功').success(res)
    }).catch(err => {
      next(boom.badImplementation(err))
    })
})

router.post('/update', function(
  req,
  res, next) {
  studentService.updateStudent(req.body).then(() => {
    new Result('修改成绩成功').success(res)
  }).catch(err => {
    next(boom.badImplementation(err))
  })
})

router.get('/pass', function(req, res, next) {
  studentService.passRateStudent(req.query)
    .then((passResult) => {
      // console.log('result', passResult)
      new Result(passResult, '及格率获取成功').success(res)
    }).catch(err => {
      next(boom.badImplementation(err))
    })
})

module.exports = router
