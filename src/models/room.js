/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import Sequelize from 'sequelize'
import { sequelize } from './sql'

const Room = sequelize.define('user', {
  roomNo: {
    type: Sequelize.STRING
  },
  opacity: {
    type: Sequelize.INTEGER
  }
}, {
    freezeTableName: true
  })


export default class {

  static model = Room

  constructor() {

  }

  static get(roomNo) {
    let query = {
      where: { roomNo }
    }

    return Room.findAll(query)
  }

  static async create(roomNo, opacity) {
    await Room.sync({ force: true })
    return Room.create({ roomNo, opacity })
  }
}