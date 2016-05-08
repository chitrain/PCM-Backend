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
  roomNo: {
    type: Sequelize.STRING,
    references: {
      model: Room.model,
      key: 'roomNo'
    }
  },
  applier: {
    type: Sequelize.STRING,
    references: {
      model: User.model,
      key: 'email'
    }
  },
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
  }
})

export default class {
  static model = Record
  
  constructor() {}
  
  static create(roomNo, applier, startTime, endTime, unit, scale, attachment) {
    Record.create({ roomNo, applier, startTime, endTime, unit, scale, attachment, status: 0})
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
  
  static getByRoomNo(roomNo) {
    let query = {
      where: {
        roomNo
      }
    }
    
    return Record.findAll(query)
  }
  
  static get(recordID) {
    let query = {
      where: {id: recordID}
    }
    
    return Record.findAll(query)
  }
}