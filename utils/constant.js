// eslint-disable-next-line no-unused-vars
const { env } = require('./env')
// eslint-disable-next-line no-unused-vars
const UPLOAD_PATH = env === 'dev' ? 'F:/nginx-1.21.1/upload/resultData'
  : '/root/upload/resultdata'
const UPLOAD_URL = env === 'dev' ? 'http://127.0.0.1:8089/resultData'
  : 'http://127.0.0.1:8089/upload/resultData'

module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 0,
  CODE_TOKEN_EXPIRED: -2,
  debug: true,
  PWD_SALT: 'YangEzzz',
  PRIVATE_KEY: 'YangEzzz',
  JWT_EXPIRED: 60 * 60 * 24,
  UPLOAD_PATH,
  UPLOAD_URL,
  MIME_TYPE_EXCEL: 'application/vnd.ms-excel'
}
