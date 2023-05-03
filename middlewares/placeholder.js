export const placeholder = (req, res, next) => {
    res.status(200).render('placeholder', {
        layout: 'mainLayout',
    })
}
