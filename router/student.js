const express = require('express')
const Result = require('../models/Result')
const studentService = require('../services/student')
const boom = require('boom')
const { UPLOAD_PATH } = require('../utils/constant')
const multer = require('multer')

const router = express.Router()

router.post('/upload', multer({ dest: `${UPLOAD_PATH}/student` }).single('file'), function(req, res, next) {
  if (!req.file || req.file.length === 0) {
    new Result('上传表格失败').fail(res)
  } else {
    new Result('上传表格成功').success(res)
  }
})

router.get('/category', function(req, res, next) {
  studentService.getCategory().then(category => {
    new Result(category, '获取分类成功').success(res)
  }).catch(err => {
    next(boom.badImplementation(err))
  })
})

module.exports = router
