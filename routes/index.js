const express = require('express')
const auth = require('./authRoute')
const user = require('./userRoute')
const quiz = require('./quizRoute')
const router = express.Router()

router.get(`/api/v1/`, (_req, res) => {
    res.json({
        "message": "Hai kids"
    })
})

router.use(auth)
router.use(user)
router.use(quiz)

module.exports = router;