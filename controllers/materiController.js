const { Materi } = require("../database/models"); // Menggunakan object destructuring untuk langsung mengambil model Quiz dari database
const bcrypt = require("bcryptjs");

// CREATE: Menambahkan data ke dalam tabel Materi
exports.create = (req, res) => {
    const materi = {
        jenjang: req.body.jenjang,
        tanggal: req.body.tanggal,
        judul: req.body.judul,
        isi: req.body.isi,
        materi: req.body.materi, // Materi sebagai data biner
    };

    Materi.create(materi)
        .then((data) => {
            res.json({
                message: "Data materi berhasil ditambahkan!",
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Maaf, data materi tidak dapat ditambahkan.",
                data: null,
            });
        });
};

// READ: Mengambil semua data materi dari database
exports.findAll = (req, res) => {
    Materi.findAll()
        .then((materis) => {
            res.json({
                message: "Data materi berhasil diambil.",
                data: materis,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Terjadi kesalahan saat mengambil data materi.",
                data: null,
            });
        });
};

// UPDATE: Mengubah data sesuai dengan ID yang diberikan
exports.update = (req, res) => {
    const id = req.params.id;

    const materiData = {
        jenjang: req.body.jenjang,
        tanggal: req.body.tanggal,
        judul: req.body.judul,
        isi: req.body.isi,
        materi: req.body.materi, // Materi sebagai data biner
    };

    Materi.update(materiData, { where: { id } })
        .then((num) => {
            if (num == 1) {
                res.json({
                    message: "Data materi berhasil diperbarui.",
                    data: materiData,
                });
            } else {
                res.json({
                    message: `Tidak dapat memperbarui data materi dengan ID=${id}. Barangkali materi tidak ditemukan atau req.body kosong!`,
                    data: materiData,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Terjadi kesalahan saat memperbarui data materi.",
                data: null,
            });
        });
};

// DELETE: Menghapus data sesuai dengan ID yang diberikan
exports.delete = (req, res) => {
    const id = req.params.id;
    Materi.destroy({ where: { id } })
        .then((num) => {
            if (num == 1) {
                res.json({
                    message: "Data materi berhasil dihapus.",
                    data: req.body,
                });
            } else {
                res.json({
                    message: `Tidak dapat menghapus data materi dengan ID=${id}. Barangkali materi tidak ditemukan!`,
                    data: req.body,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Terjadi kesalahan saat menghapus data materi.",
                data: null,
            });
        });
};

// BONUS ===> Mengambil data sesuai dengan ID yang diberikan
exports.findOne = (req, res) => {
    const id = req.params.id;
    Materi.findByPk(id)
        .then((materi) => {
            if (materi) {
                res.json({
                    message: "Data materi berhasil ditemukan.",
                    data: materi,
                });
            } else {
                res.json({
                    message: `Data materi dengan ID=${id} tidak ditemukan.`,
                    data: null,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Terjadi kesalahan saat mengambil data materi.",
                data: null,
            });
        });
};
