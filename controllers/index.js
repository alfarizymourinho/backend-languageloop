const authController = require('./authController');
const userController = require('./userController');
const quizController = require('./quizController');
const komentarController = require('./komentarController');
const balasanController = require('./balasanController');


module.exports = {
    auth: authController,
    user: userController,
    quiz: quizController,
    komentar: komentarController,
    balasan: balasanController,

};