/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import { agent } from 'supertest'
import should from 'should'
import CONFIG from '../config'

let server = agent(CONFIG.url)

export const ApproveRecordTest = () => {
  it('admin login should success', (done) => {
    server
      .post('/admin/login')
      .type('form')
      .send({
        email: 'im_yujie@foxmail.com',
        password: '123456'
      })
      .expect(200, {
        error: 0,
        msg: '登录成功'
      }, done)
  })
  
  // it('approve a record should fail', (done) => {
  //   server
  //     .post('/record/')
  // })
}