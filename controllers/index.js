const authController = require('./authController');
const userController = require('./userController');
const quizController = require('./quizController');

module.exports = {
    auth: authController,
    user: userController,
    quiz: quizController,
};