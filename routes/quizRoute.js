const express = require('express');
const router = require('express').Router();
const quizController = require("../controllers/quizController");

// Endpoint untuk membuat quiz baru
router.post('/api/v1/quiz/', quizController.create);

// Endpoint untuk menampilkan semua quiz
router.get('/api/v1/quiz/', quizController.findAll);

// Endpoint untuk menampilkan detail quiz berdasarkan ID
router.get('/api/v1/quiz/:id', quizController.findOne);

// Endpoint untuk mengupdate quiz berdasarkan ID
router.put('/api/v1/quiz/:id', quizController.update);

// Endpoint untuk menghapus quiz berdasarkan ID
router.delete('/api/v1/quiz/:id', quizController.delete);

// Endpoint untuk menjawab pertanyaan
router.post('/api/v1/quiz/answer', quizController.submitAnswer);

module.exports = router;
