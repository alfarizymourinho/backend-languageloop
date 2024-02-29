const db = require("../models");
 // Menggunakan model dari Sequelize

// Mendapatkan model Materi dari Sequelize
const Materi = db.Materi;

const multer = require("multer");

// Konfigurasi multer untuk menyimpan file di direktori tertentu
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/materi/"); // Simpan file di folder "uploads/materi/"
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Gunakan nama asli file
    }
});

const upload = multer({ storage: storage });

// List jenjang yang diizinkan
const allowedJenjang = ["Pemula", "Suhu", "Sepuh"];

// CREATE
exports.createMateri = (req, res) => {
    const jenjang = req.body.jenjang;
    // Validasi jenjang
    if (!allowedJenjang.includes(jenjang)) {
        return res.status(400).json({
            message: "Jenjang tidak valid. Jenjang harus berupa 'Pemula', 'Suhu', atau 'Sepuh'.",
            data: null
        });
    }

    const newData = {
        jenjang: jenjang,
        tanggal: req.body.tanggal,
        judul: req.body.judul,
        isi: req.body.isi,
        file: req.file.path // Menggunakan path file yang diunggah
    };

    // Menyimpan data materi ke dalam database menggunakan model Materi
    Materi.create(newData)
        .then((data) => {
            res.json({
                message: "Materi successfully created.",
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Error creating materi.",
                data: null,
            });
        });
};

// READ
exports.getAllMateri = (req, res) => {
    // Mengambil semua data materi dari database menggunakan model Materi
    Materi.findAll()
        .then((data) => {
            res.json({
                message: "Materi retrieved successfully.",
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Error retrieving materi.",
                data: null,
            });
        });
};

// UPDATE
exports.updateMateri = (req, res) => {
    const id = req.params.id;
    const jenjang = req.body.jenjang;
    // Validasi jenjang
    if (!allowedJenjang.includes(jenjang)) {
        return res.status(400).json({
            message: "Jenjang tidak valid. Jenjang harus berupa 'Pemula', 'Suhu', atau 'Sepuh'.",
            data: null
        });
    }

    const updatedData = {
        jenjang: jenjang,
        tanggal: req.body.tanggal,
        judul: req.body.judul,
        isi: req.body.isi,
        file: req.file.path // Menggunakan path file yang diunggah
    };

    // Mengupdate data materi dalam database menggunakan model Materi
    Materi.update(updatedData, {
        where: { id },
    })
        .then((num) => {
            if (num == 1) {
                res.json({
                    message: "Materi updated successfully.",
                    data: updatedData,
                });
            } else {
                res.json({
                    message: `Cannot update materi with id=${id}. Maybe materi was not found or req.body is empty!`,
                    data: updatedData,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Error updating materi.",
                data: null,
            });
        });
};

// DELETE
exports.deleteMateri = (req, res) => {
    const id = req.params.id;
    // Menghapus data materi dari database menggunakan model Materi
    Materi.destroy({
        where: { id },
    })
        .then((num) => {
            if (num == 1) {
                res.json({
                    message: "Materi deleted successfully.",
                    data: req.body,
                });
            } else {
                res.json({
                    message: `Cannot delete materi with id=${id}. Maybe materi was not found!`,
                    data: req.body,
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Error deleting materi.",
                data: null,
            });
        });
};

// BONUS - FIND ONE
exports.getOneMateri = (req, res) => {
    // Mendapatkan satu data materi berdasarkan ID dari database menggunakan model Materi
    Materi.findByPk(req.params.id)
        .then((data) => {
            res.json({
                message: "Materi retrieved successfully.",
                data: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message || "Error retrieving materi.",
                data: null,
            });
        });
};

// Middleware untuk menangani pengunggahan file
exports.uploadFile = upload.single("file"); // "file" adalah nama field pada form untuk pengunggahan file
