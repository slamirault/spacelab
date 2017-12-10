const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const expressValidator = require('express-validator')
const HighScoreService = require('../services/highScore-service')
const cookieParser = require('cookie-parser')

router.get('/', async(req, res, next) => {
    res.send(await HighScoreService.findAll())
})

router.post('/game', async(req, res, next) => {
    res.render('gameboard', { name: req.param('name') })
})

//*************** */

router.get('/all', async(req, res, next) => {
    const scores = await HighScoreService.findAll()
    res.render('highScore-list', { scores })
})

router.get('/:id', async(req, res, next) => {
        const highScore = await HighScoreService.find(req.params.id)

        res.render('highScore-detail', { highScore })
    })
    //************ NEW */
router.get('/:id/json', async(req, res, next) => {
        const highScore = await HighScoreService.find(req.params.id)
        if (!highScore) res.status(404)
        res.send(highScore)
    })
    //********** NEW */

router.post('/:highScoreId/team', async(req, res, next) => {
    const highScore = await HighScoreService.find(req.params.highScoreId)
    const target = await HighScoreService.find(req.body.targetId)
    highScore.team.addToSet(target) //it is mongodb directed, this way the records become unique, each ID is only listed once
    target.team.addToSet(highScore)
    await target.save()
    const updatedHighScore = await highScore.save()
    res.send(updatedHighScore)
})


router.post('/', async(req, res, next) => {
        const highScore = await HighScoreService.add(req.body)
        console.log("got nickname", req.body)
       // res.send(highScore)
        res.render('highScore-detail', { highScore })
    })
    //****************************************** */
router.delete('/:id', async(req, res, next) => {
    await HighScoreService.del(req.params.id)

    res.send('ok!')
})

module.exports = router