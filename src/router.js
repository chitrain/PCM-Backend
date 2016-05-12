/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import { Router } from 'express'
import multer from 'multer'

import { registerHandler, loginHandler,
         logoutHandler, changePasswordHandler } from './controllers/UserManage'
import { applyHandler, getRecordHandler } from './controllers/ApplyRoom'
import { approveHandler } from './controllers/ApproveRecord'
import { adminLoginHandler, adminLogoutHandler } from './controllers/AdminManage'

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './tempStore'),
  filename: (req, file, cb) => {
    let ff = file.originalname.split('.')
    let current = Date.now()
    cb(null, `${file.fieldname}-${current}.${ff[ff.length-1]}`)
  }
})

export const upload = multer({storage})
export const router = Router()

router.use((req, res, next) => {
  let url = req.originalUrl
  
  // admin
  if (url.indexOf('admin') > -1) {
    if (url.indexOf('login') > -1) {
      next()
      return
    }
    if (req.session.admin) {
      next()
      return
    }
    res.json({error: 1, msg: '没有权限'})
  }
  
  // user
  if (req.session.user) {
    next()
  } else {
    if (url.indexOf('login') > -1 || url.indexOf('register') > -1) {
      next()
    } else {
      res.json({error: 1, msg: '尚未登录'})
    }
  }
})


router.get('/', (req, res) => res.json({msg: 'index'}))

/**
 * route to User Manage
 */
router.post('/register', registerHandler)
router.post('/login', loginHandler)
router.get('/logout', logoutHandler)
router.post('/password', changePasswordHandler)

/**
 * route to apply
 */
router.post('/record', upload.single('file'), (req, res, next) => {
  applyHandler(req, res)
})

router.post('/record', applyHandler)

router.get('/record', getRecordHandler)

/**
 * route to approve
 */
router.post('/admin/record/:recordID', approveHandler)

/**
 * route to admin
 */
router.post('/admin/login', adminLoginHandler)
router.post('/admin/logout', adminLogoutHandler)
