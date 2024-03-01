const db = require("../database/models");
const Balasan = db.Balasan; // Menggunakan model Balasan yang telah didefinisikan
const Komentar = db.Komentar; // Menggunakan model Komentar yang telah didefinisikan
const bcrypt = require("bcryptjs");

// CREATE: Menambahkan balasan untuk komentar
exports.create = (req, res) => {
    const { isi } = req.body;
    const komentarId = req.params.komentarId; // Mendapatkan id komentar dari parameter URL

    // Membuat objek data balasan
    const balasanData = {
        isi: isi,
        komentarId: komentarId // Menyimpan id komentar sebagai foreign key
    };

    Balasan.create(balasanData)
        .then((balasan) => {
            res.status(201).json({
                message: "Balasan berhasil dibuat.",
                data: balasan,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Gagal membuat balasan.",
                data: null,
            });
        });
};

// READ: Mendapatkan semua balasan untuk suatu komentar
exports.findAll = (req, res) => {
    const komentarId = req.params.komentarId; // Mendapatkan id komentar dari parameter URL

    // Mencari semua balasan untuk komentar dengan id yang sesuai
    Balasan.findAll({ where: { komentarId: komentarId } })
        .then((balasans) => {
            res.json({
                message: "Daftar balasan berhasil didapatkan.",
                data: balasans,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Gagal mendapatkan balasan.",
                data: null,
            });
        });
};

// UPDATE: Mengubah balasan berdasarkan ID
exports.update = (req, res) => {
    const id = req.params.id;
    const { isi } = req.body;

    const updatedBalasanData = {
        isi: isi
    };

    Balasan.update(updatedBalasanData, { where: { id } })
        .then((num) => {
            if (num == 1) {
                res.json({
                    message: "Balasan berhasil diupdate.",
                    data: updatedBalasanData,
                });
            } else {
                res.json({
                    message: `Gagal mengupdate balasan dengan id=${id}.`,
                    data: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Gagal mengupdate balasan.",
                data: null,
            });
        });
};

// DELETE: Menghapus balasan berdasarkan ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Balasan.destroy({ where: { id } })
        .then((num) => {
            if (num == 1) {
                res.json({
                    message: "Balasan berhasil dihapus.",
                    data: null,
                });
            } else {
                res.json({
                    message: `Gagal menghapus balasan dengan id=${id}.`,
                    data: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Gagal menghapus balasan.",
                data: null,
            });
        });
};

// BONUS: Mendapatkan balasan berdasarkan ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Balasan.findByPk(id)
        .then((balasan) => {
            if (balasan) {
                res.json({
                    message: "Balasan berhasil ditemukan.",
                    data: balasan,
                });
            } else {
                res.json({
                    message: `Balasan dengan id=${id} tidak ditemukan.`,
                    data: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Gagal mendapatkan balasan.",
                data: null,
            });
        });
};
