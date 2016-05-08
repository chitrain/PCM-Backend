/**
 * @author Yujie Li
 * @email im_yujie@foxmail.com
 */

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { router } from './router'

export const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser('**this is a cookie secret**'))

// load router
app.use('/', router)

app.listen(3001, () => {
  console.log('server listening at port 3000...')
})
