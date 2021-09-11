// eslint-disable-next-line no-unused-vars
const { env } = require('./env')
// eslint-disable-next-line no-unused-vars
const UPLOAD_PATH = env === 'dev' ? 'F:/nginx-1.21.1/upload/resultData'
  : '/root/upload/resultdata'

module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 0,
  CODE_TOKEN_EXPIRED: -2,
  debug: true,
  PWD_SALT: 'YangEzzz',
  PRIVATE_KEY: 'YangEzzz',
  JWT_EXPIRED: 60 * 60,
  UPLOAD_PATH
}
