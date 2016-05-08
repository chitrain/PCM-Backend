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
})


;(async function() {
  User.sync({force: true})
})()


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
   * @return {Promise}
   */
  static get(email) {
    let query = {
      where: { email }
    }
    // User.findAll actually return a Promise,
    // so we can use `await` syntax
    return User.findOne(query)
  }
  
  /**
   * create a new user and
   * insert into db
   * @param email, name, password {String}
   * @return {Promise}
   */
  static create(email, name, password) {
    return User.create({ email, name, password })
  }
  
}