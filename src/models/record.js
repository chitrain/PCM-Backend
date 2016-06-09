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
  date: {
    type: Sequelize.DATEONLY
  },
  startTime: {
    type: Sequelize.TIME
  },
  endTime: {
    type: Sequelize.TIME
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
}, {
  getterMethods: {
    startDate: function() {
      var dateStr = `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`
      return dateStr + ' ' + this.startTime + ' +0800'
    },
    endDate: function() {
      var dateStr = `${this.date.getFullYear()}-${this.date.getMonth() + 1}-${this.date.getDate()}`
      return dateStr + ' ' + this.endTime + ' +0800'
    }
  }
})

export default class {
  static model = Record
  
  constructor() {}
  
  static async create(roomNo, applier, date, startTime, endTime, unit, scale, attachment) {
    let user = await User.get(applier)
    let room = await Room.get(roomNo)
    let record = await Record.create({
      date,
      startTime,
      endTime,
      unit,
      scale,
      attachment,
      status: 0
    })
    try {
      await record.setApplier(user)
    } catch (err) {
      console.error(err)
    }
    await record.save()
    await record.setRoom(room)
    await record.save()
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
  
  static async getAllRecords() {
    return Record.findAll()
  }
}