/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import Admin from '../models/admin'
import { encrypt, validate } from '../utils/crypt'

Admin.create('im_yujie@foxmail.com', 'Yujie', '123')

/**
 * handler of login
 * method: POST
 * body: email=xxx&password=xxx
 */
export const adminLoginHandler = async function (req, res) {
  let { email, password } = req.body
  
  let admin = await Admin.get(email)
  let userPwd = user[0].dateValues.password
  
  let isRight = await validate(password, userPwd)
  if (!isRight) {
    res.json({error: 1, message: '密码错误'})
    return
  }
  
  res.cookie('email', email, {signed: true})
  res.json({error: 0, message: ''})
}