/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import Sequelize from 'sequelize'
import { sequelize } from './sql'

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true
})

/**
 * wrapper of user class
 */
export default class {
  
  static model = User
  
  constructor() {
    
  }
  
  /**
   * get a user from database
   * @param email {String}
   * @returns {Promise}
   */
  static get(email) {
    let query = {
      where: { email }
    }
    
    // User.findAll actually return a Promise,
    // so we can use `await` syntax
    return User.findAll(query)
  }
  
  /**
   * create a new user and
   * insert into db
   * @param email, name, password {String}
   * @returns {Promise}
   */
  static async create(email, name, password) {
    await User.sync({force: true})
    return User.create({ email, name, password })
  }
  
}