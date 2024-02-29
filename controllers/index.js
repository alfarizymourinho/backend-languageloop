const authController = require('./authController');
const userController = require('./userController');
const quizController = require('./quizController');
const materiController = require('./materiController');

module.exports = {
    auth: authController,
    user: userController,
    quiz: quizController,
    materiController: materiController,
};