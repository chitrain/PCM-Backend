/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import { agent } from 'supertest'
import should from 'should'
import CONFIG from '../config'

let server = agent(CONFIG.url)

export const ApplyRoomTest = () => {
  it('login should success', (done) => {
    server
      .post('/login')
      .type('form')
      .send({
        email: 'im_yujie@foxmail.com',
        password: '654321'
      })
      .expect('set-cookie', /connect\.sid/g)
      .expect(200, {
        error: 0,
        msg: '登录成功'
      }, done)
  })
  
  it('apply room should success', (done) => {
    server
      .post('/record')
      .field('startTime', '2016-05-08 12:00')
      .field('endTime', '2016-05-08 15:00')
      .field('roomNo', 'A101')
      .field('unit', '呵呵哒')
      .field('scale', '40')
      .attach('file', '../testData/neipei.docx')
      .expect(200, {
        error: 0,
        msg: '申请成功'
      }, done)
  })
  
  it('get record should success', (done) => {
    server
      .get('/record')
      .query({roomNo: 'A101'})
      .expect(200, {
        error: 0,
        message: '成功'
      }, done)
  })
}
