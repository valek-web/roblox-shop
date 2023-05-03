export const redirectToHttps = (req, res) => {
    res.writeHead(301, {
        Location: process.env.DOMAIN + req.url,
    })
    res.end()
}
