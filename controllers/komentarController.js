const db = require("../database/models");
const Komentar = db.Komentar;
const bcrypt = require("bcryptjs");

// CREATE: Menambahkan komentar baru
exports.create = (req, res) => {
    const { name, email, isi } = req.body;

    const komentarData = {
        name: name,
        email: email,
        isi: isi
    };

    Komentar.create(komentarData)
        .then((komentar) => {
            res.status(201).json({
                message: "Komentar berhasil dibuat.",
                data: komentar,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Gagal membuat komentar.",
                data: null,
            });
        });
};

// READ: Mendapatkan semua komentar
exports.findAll = (req, res) => {
    Komentar.findAll()
        .then((komentars) => {
            res.json({
                message: "Daftar komentar berhasil didapatkan.",
                data: komentars,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Gagal mendapatkan komentar.",
                data: null,
            });
        });
};

// UPDATE: Mengubah komentar berdasarkan ID
exports.update = (req, res) => {
    const id = req.params.id;
    const { name, email, isi } = req.body;

    const updatedKomentarData = {
        name: name,
        email: email,
        isi: isi
    };

    Komentar.update(updatedKomentarData, { where: { id } })
        .then((num) => {
            if (num == 1) {
                res.json({
                    message: "Komentar berhasil diupdate.",
                    data: updatedKomentarData,
                });
            } else {
                res.json({
                    message: `Gagal mengupdate komentar dengan id=${id}.`,
                    data: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Gagal mengupdate komentar.",
                data: null,
            });
        });
};

// DELETE: Menghapus komentar berdasarkan ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Komentar.destroy({ where: { id } })
        .then((num) => {
            if (num == 1) {
                res.json({
                    message: "Komentar berhasil dihapus.",
                    data: null, // Menghapus komentar, sehingga data tidak perlu direspon
                });
            } else {
                res.json({
                    message: `Gagal menghapus komentar dengan id=${id}.`,
                    data: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Gagal menghapus komentar.",
                data: null,
            });
        });
};

// BONUS: Mendapatkan komentar berdasarkan ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Komentar.findByPk(id)
        .then((komentar) => {
            if (komentar) {
                res.json({
                    message: "Komentar berhasil ditemukan.",
                    data: komentar,
                });
            } else {
                res.json({
                    message: `Komentar dengan id=${id} tidak ditemukan.`,
                    data: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Gagal mendapatkan komentar.",
                data: null,
            });
        });
};
