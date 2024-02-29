const express = require('express');
const router = require('express').Router();
const komentarController = require("../controllers/komentarController");

// Endpoint untuk membuat komentar baru
router.post('/api/v1/komentar/', komentarController.create);

// Endpoint untuk menampilkan semua komentar
router.get('/api/v1/komentar/', komentarController.findAll);

// Endpoint untuk menampilkan detail komentar berdasarkan ID
router.get('/api/v1/komentar/:id', komentarController.findOne);

// Endpoint untuk mengupdate komentar berdasarkan ID
router.put('/api/v1/komentar/:id', komentarController.update);

// Endpoint untuk menghapus komentar berdasarkan ID
router.delete('/api/v1/komentar/:id', komentarController.delete);

module.exports = router;
