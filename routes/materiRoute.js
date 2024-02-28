const express = require("express");
const router = express.Router();
const materiController = require("../controllers/materiController");

// Middleware untuk pengunggahan file
const uploadFile = require("../controllers/materiController").uploadFile;

// Rute untuk membuat materi baru
router.post("/api/v1/materi/", uploadFile, materiController.createMateri);

// Rute untuk mendapatkan semua materi
router.get("/api/v1/materi/", materiController.getAllMateri);

// Rute untuk mendapatkan satu materi berdasarkan ID
router.get("/api/v1/materi/:id", materiController.getOneMateri);

// Rute untuk memperbarui materi berdasarkan ID
router.put("/api/v1/materi/:id", uploadFile, materiController.updateMateri);

// Rute untuk menghapus materi berdasarkan ID
router.delete("/api/v1/materi/:id", materiController.deleteMateri);

module.exports = router;
