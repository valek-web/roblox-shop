import { Router } from 'express'
const router = Router()

router.get('/successful', (req, res) => {
    res.render('successful', {
        title: 'Покупка Успешно Совершена',
        layout: 'helpLayout',
    })
})

router.get('/failed', (req, res) => {
    res.render('failed', {
        title: 'Не удалось совершить покупку',
        layout: 'helpLayout',
    })
})

export default router
