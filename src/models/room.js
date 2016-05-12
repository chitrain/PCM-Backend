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
  capacity: {
    type: Sequelize.INTEGER
  }
})

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
   * @param capacity {Number}
   * @return {Promise}
   */ 
  static create(roomNo, capacity) {
    console.log(roomNo, capacity)
    return Room.create({ roomNo, capacity })
  }
}