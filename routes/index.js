import https from 'https'
import axios from 'axios'
import { Router } from 'express'
const router = Router()

const isDev = process.env.NODE_ENV === 'dev'

const instance = axios.create()
instance.interceptors.request.use((req) => {
	if (isDev) {
		req.httpsAgent = new https.Agent({ rejectUnauthorized: false })
	}
	return req
})

const info = async () => {
	try {
		// const baseURL = isDev ? 'https://localhost:3333' : 'https://apirbx.com'
		const baseURL = 'https://apirbx.com'

		const response = await instance.get(baseURL + '/system/rate')
		return response.data
	} catch (error) {
		console.error(error)
		return {}
	}
}

router.get('/', async (req, res) => {
	let data = await info()
	res.render('index', data)
})

export default router
