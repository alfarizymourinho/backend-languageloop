const express = require('express');
const router = express.Router();
const balasanController = require("../controllers/balasanController");

// Endpoint untuk membuat balasan baru untuk komentar tertentu
router.post('/api/v1/komentar/:komentarId/balasan', balasanController.create);

// Endpoint untuk mendapatkan semua balasan untuk komentar tertentu
router.get('/api/v1/komentar/:komentarId/balasan', balasanController.findAll);

// Endpoint untuk mendapatkan balasan tertentu berdasarkan ID
router.get('/api/v1/balasan/:id', balasanController.findOne);

// Endpoint untuk mengupdate balasan tertentu berdasarkan ID
router.put('/api/v1/balasan/:id', balasanController.update);

// Endpoint untuk menghapus balasan tertentu berdasarkan ID
router.delete('/api/v1/balasan/:id', balasanController.delete);

module.exports = router;
