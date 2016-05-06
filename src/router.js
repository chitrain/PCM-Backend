/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import { Router } from 'express'
import { registerHandler, loginHandler,
         logoutHandler, changePasswordHandler } from './controllers/UserManage'
import { applyHandler, getRecordHandler } from './controllers/ApplyRoom'

export const router = Router()

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
router.post('/record', applyHandler)
router.get('/record', getRecordHandler)

