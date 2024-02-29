const express = require('express');
const router = express.Router();
const materiController = require("../controllers/materiController");

// Endpoint untuk menambahkan materi baru
router.post('/api/v1/materi/', materiController.create);

// Endpoint untuk menampilkan semua materi
router.get('/api/v1/materi/', materiController.findAll);

// Endpoint untuk menampilkan detail materi berdasarkan ID
router.get('/api/v1/materi/:id', materiController.findOne);

// Endpoint untuk mengupdate materi berdasarkan ID
router.put('/api/v1/materi/:id', materiController.update);

// Endpoint untuk menghapus materi berdasarkan ID
router.delete('/api/v1/materi/:id', materiController.delete);

module.exports = router;
