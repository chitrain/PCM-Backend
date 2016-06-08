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
 * @param min {number}
 * @param max {number}
 */
const genAmount = (min, max) => {
  let range = max - min
  let rand = Math.random()
  let num = min + Math.round(rand * range)
  return num
}

const genRooms = () => {
  let res = []
  let buildings = ['A', 'B', 'C', 'D', 'E']
  let floors = [1, 2, 3, 4, 5, 6]
  let rooms = ['01', '02', '03', '04', '05', '06', '07']
  
  for (let b in buildings)
    for (let f in floors)
      for (let r in rooms)
        res.push({roomNo: buildings[b] + floors[f] + rooms[r], capacity: genAmount(40,100)})
  
  return res
}

/**
 * clean up database when developing.
 * create some mock data.
 */
export const cleanup = function() {
  Record.model.belongsTo(User.model, {as: 'applier', foreignKey: 'applierId'})
  Record.model.belongsTo(Room.model, {as: 'room', foreignKey: 'roomId'})

  sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
  .then(() => sequelize.sync({force: true}))
  .then(() => sequelize.query('SET FOREIGN_KEY_CHECKS = 1'))
  .then(() => {
    hash('123456').then((hashPwd) => {
      return Admin.model.create({email: 'im_yujie@foxmail.com', name: 'Yujie', password: hashPwd})
    })
    let rooms = genRooms()

    for (let room in rooms) {
      Room.model.create(rooms[room])
    }
    return Room.model.create({roomNo: 'E108', capacity: 90})
  })
  .then(() => {
    console.log('finish init database...')
  })
}
