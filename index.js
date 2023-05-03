import express from 'express'
import exphbs from 'express-handlebars'
import path from 'path'
import cve from 'commonjs-variables-for-esmodules'
import logger from 'morgan'
import fs from 'fs'
import http from 'http'
import https from 'https'
import helmet from 'helmet'
import nocache from 'nocache'
import compression from 'compression'

import indexRouter from './routes/index.js'
import payMessageRouter from './routes/payMessage.js'
import { errorHandler } from './middlewares/error.js'
import { redirectToHttps } from './middlewares/redirectToHttps.js'

// import { placeholder } from './middlewares/placeholder.js'
const { __dirname } = cve(import.meta)

//Certificates
const isProd = process.env.NODE_ENV === 'prod'
const keyPath = path.join(__dirname, 'certs', isProd ? 'prod.key' : 'localhost.key')
const certPath = path.join(__dirname, 'certs', isProd ? 'prod.crt' : 'localhost.crt')
const key = fs.readFileSync(keyPath)
const cert = fs.readFileSync(certPath)

//App
const app = express()
const httpPort = process.env.HTTP_PORT || 3000
const httpsPort = process.env.HTTPS_PORT || 3001

//Engine
app.set('view engine', '.hbs')
app.engine(
	'.hbs',
	exphbs({
		extname: '.hbs',
		defaultLayout: 'mainLayout',
		layoutsDir: path.join(__dirname, 'views', 'layouts'),
		partialsDir: path.join(__dirname, 'views', 'partials'),
	})
)

//Middlewares
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
	helmet({
		contentSecurityPolicy: {
			useDefaults: true,
			directives: {
				'script-src': [
					"'self' 'unsafe-eval' 'unsafe-inline'",
					'https://unpkg.com/',
					'https://mc.yandex.ru/',
				],
				'script-src-elem': [
					"'self' 'unsafe-inline'",
					'https://mc.yandex.ru/',
					'https://unpkg.com/',
				],
				'connect-src': [
					"'self'",
					'https://mc.yandex.ru/',
					'http://localhost:3333/',
					'https://localhost:3333/',
					'http://apirbx.com/',
					'https://apirbx.com/',
				],
				'script-src-attr': ["'unsafe-inline'"],
			},
		},
	})
)
app.use(nocache())

//Routes
app.use('/', indexRouter)
app.use(payMessageRouter)
app.use(errorHandler)
// app.use(placeholder)
app.use(compression())

//Servers
const httpServer = http.createServer(redirectToHttps)
const httpsServer = https.createServer({ cert, key }, app)

httpServer.listen(httpPort, () => {
	console.log(`HTTP SERVER RUNNING ON PORT ${httpPort}`)
})
httpsServer.listen(httpsPort, () => {
	console.log(`HTTPS SERVER RUNNING ON PORT ${httpsPort}`)
	console.log(`SERVER START ${isProd ? 'PRODUCTION' : 'DEVELOPMENT'} ENVIRONMENT`)
})
