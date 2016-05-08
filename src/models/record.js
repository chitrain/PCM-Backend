/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import Sequelize from 'sequelize'
import moment from 'moment'

import User from './user'
import Room from './room'
import { sequelize } from './sql'

/**
 * status: 0-pending | 1-passed | 2-rejected
 */
const Record = sequelize.define('record', {
  startTime: {
    type: Sequelize.DATE
  },
  endTime: {
    type: Sequelize.DATE
  },
  unit: {
    type: Sequelize.STRING
  },
  scale: {
    type: Sequelize.INTEGER
  },
  attachment: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.INTEGER
  },
  applierId: {
    type: Sequelize.INTEGER,
    references: {
      model: User.model,
      key: 'id'
    }
  },
  roomId: {
    type: Sequelize.INTEGER,
    references: {
      model: Room.model,
      key: 'id'
    }
  }
})

;(async function() {
  Record.belongsTo(User.model, {foreignKey: 'applierId'})
  Record.belongsTo(Room.model, {foreignKey: 'roomId'})
  Record.sync({force: true})
})()

export default class {
  static model = Record
  
  constructor() {}
  
  static async create(roomNo, applier, startTime, endTime, unit, scale, attachment) {
    let user = await User.get(applier)
    let room = await Room.get(roomNo)
    let record = await Record.create({
      startTime,
      endTime,
      unit,
      scale,
      attachment,
      status: 0
    })
    try {
      await record.setUser(user)
    } catch (err) {
      console.error(err)
    }
    await record.save()
    await record.setRoom(room)
    await record.save()
    console.log('set finish..........')
    return record.save()
  }
  
  static getByApplier(applier) {
    let query = {
      where: {
        applier
      }
    }
    
    return Record.findAll(query)
  }
  
  static getByStartTime(startTime) {
    let query = {
      where: {
        startTime
      }
    }
    
    return Record.findAll(query)
  }
  
  static getByEndTime(endTime) {
    let query = {
      where: {
        endTime
      }
    }
    
    return Record.findAll(query)
  }
  
  static async getByRoomNo(roomNo) {
    let room = await Room.get(roomNo)
    let query = {
      where: {
        roomId: room.id
      }
    }
    
    return Record.findAll(query)
  }
  
  static get(recordID) {
    let query = {
      where: {id: recordID}
    }
    
    return Record.findOne(query)
  }
}