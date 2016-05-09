/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import { sequelize } from '../models/sql'
import Record from '../models/record'
import Admin from '../models/admin'
import Room from '../models/room'
import User from '../models/user'

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
    Admin.model.create({email: 'im_yujie@foxmail.com', name: 'Yujie', password: '123'})
    Room.model.create({roomNo: 'A101', opacity: 50})
    Room.model.create({roomNo: 'A102', opacity: 60})
    Room.model.create({roomNo: 'A103', opacity: 40})
    Room.model.create({roomNo: 'A104', opacity: 50})
    Room.model.create({roomNo: 'A105', opacity: 60})
    return Room.model.create({roomNo: 'A106', opacity: 90})
  })
  .then(() => {
    console.log('finish init database...')
  })
}
