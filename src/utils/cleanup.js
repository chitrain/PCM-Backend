/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import { sequelize } from '../models/sql'
import Record from '../models/record'
import Admin from '../models/admin'
import Room from '../models/room'
import User from '../models/user'
import { encrypt as hash } from './crypt'

/**
 * clean up database when developing.
 * create some mock data.
 */
export const cleanup = function() {
  Record.model.belongsTo(User.model, {foreignKey: 'applierId'})
  Record.model.belongsTo(Room.model, {foreignKey: 'roomId'})

  sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  .then(() => sequelize.sync({force: true}))
  .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
  .then(() => {
    hash('123456').then((hashPwd) => {
      return Admin.model.create({email: 'im_yujie@foxmail.com', name: 'Yujie', password: hashPwd})
    })
    Room.model.create({roomNo: 'A101', capacity: 50})
    Room.model.create({roomNo: 'A102', capacity: 60})
    Room.model.create({roomNo: 'A103', capacity: 40})
    Room.model.create({roomNo: 'A104', capacity: 50})
    Room.model.create({roomNo: 'A105', capacity: 60})
    return Room.model.create({roomNo: 'A106', capacity: 90})
  })
  .then(() => {
    console.log('finish init database...')
  })
}
