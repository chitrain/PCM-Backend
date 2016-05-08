/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import Sequelize from 'sequelize'
import { sequelize } from './sql'

const Room = sequelize.define('room', {
  roomNo: {
    type: Sequelize.STRING
  },
  opacity: {
    type: Sequelize.INTEGER
  }
})

;(async function() {
  await Room.sync({force: true})
  Room.create({roomNo: 'A101', opacity: 50})
  Room.create({roomNo: 'A102', opacity: 60})
  Room.create({roomNo: 'A103', opacity: 40})
  Room.create({roomNo: 'A104', opacity: 50})
  Room.create({roomNo: 'A105', opacity: 60})
  Room.create({roomNo: 'A106', opacity: 90})
})()

export default class {

  static model = Room

  constructor() {

  }

  /**
   * get a room by roomNo
   * @param roomNo {String}
   * @return {Promise}
   */ 
  static get(roomNo) {
    let query = {
      where: { roomNo }
    }

    return Room.findOne(query)
  }

  /**
   * get a room by roomNo
   * @param roomNo {String}
   * @param opacity {Number}
   * @return {Promise}
   */ 
  static create(roomNo, opacity) {
    console.log(roomNo, opacity)
    return Room.create({ roomNo, opacity })
  }
  static create(email, name, password) {
    return Admin.create({ email, name, password })
  }
}