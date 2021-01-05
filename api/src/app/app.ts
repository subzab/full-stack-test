import { Application, Request, Response } from 'express'
const express = require('express')
import createError = require('http-errors')
import * as path from 'path'
import cookieParser = require('cookie-parser')
import logger = require('morgan')
import indexRouter from '../routes/index'
import shopRouter from '../routes/shop'
import itemRouter from '../routes/item'

const app: Application = express()

app.use(express.json())
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  )
  next()
})
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(logger('dev') as any)

app.use('/', indexRouter)
app.use('/shops', shopRouter)
app.use('/items', itemRouter)

// catch 404 and forward to error handler
app.use(function (_req: Request, _res: Response, next) {
  next(createError(404))
})

// error handler
app.use(function (err: any, req: Request, res: Response, _next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
