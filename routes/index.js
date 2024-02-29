const express = require('express')
const auth = require('./authRoute')
const user = require('./userRoute')
const quiz = require('./quizRoute')
const materi = require('./materiRoute')
const komentar = require('./komentarRoute')
const router = express.Router()

router.get(`/api/v1/`, (_req, res) => {
    res.json({
        "message": "Selamat datang di LANGUAGELOOP"
    })
})

router.use(auth)
router.use(user)
router.use(quiz)
router.use(materi)
router.use(komentar)

module.exports = router;