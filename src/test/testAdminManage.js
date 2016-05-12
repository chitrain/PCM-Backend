/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import { agent } from 'supertest'
import should from 'should'
import CONFIG from '../config'

let server = agent(CONFIG.url)

export const AdminManageTest = () => {
  
  // user does not exist
  it('admin login should fail', (done) => {
    server
      .post('/admin/login')
      .field('email', 'im@foxmail.com')
      .field('paddword', '123456')
      .expect(200, {
        error: 1,
        msg: '用户不存在'
      }, done)
  })
  
  // wrong password
  it('admin login should fail', (done) => {
    server
      .post('/admin/login')
      .field('email', 'im_yujie@foxmail.com')
      .field('paddword', '12345')
      .expect(200, {
        error: 1,
        msg: '密码错误'
      }, done)
  })
  
  // pass
  it('admin login should success', (done) => {
    server
      .post('/admin/login')
      .field('email', 'im_yujie@foxmail.com')
      .field('password', '123456')
      .expect(200, {
        error: 0,
        msg: '登录成功'
      }, done)
  })
  
  // pass
  it('admin logout should success', (done) => {
    server
      .get('/admin/logout')
      .expect(200, {
        error: 0,
        msg: '退出成功'
      })
  })
}