const { Quiz } = require("../database/models"); // Menggunakan object destructuring untuk langsung mengambil model Quiz dari database
const bcrypt = require("bcryptjs");

exports.submitAnswer = (req, res) => {
    const { questionId, selectedAnswer } = req.body;

    if (!questionId || !selectedAnswer) {
        return res.status(400).json({
            message: "Invalid request. Please provide both questionId and selectedAnswer.",
            data: null
        });
    }

    Quiz.findByPk(questionId)
        .then((question) => {
            if (!question) {
                console.log("Pertanyaan tidak ditemukan.");
                return res.status(404).json({
                    message: "Pertanyaan tidak ditemukan.",
                    data: null
                });
            }

            // Validasi jawaban
            let correctAnswer = "";
            switch (selectedAnswer) {
                case "a":
                    correctAnswer = question.opsia;
                    break;
                case "b":
                    correctAnswer = question.opsib;
                    break;
                case "c":
                    correctAnswer = question.opsic;
                    break;
                case "d":
                    correctAnswer = question.opsid;
                    break;
                default:
                    correctAnswer = "";
            }

            console.log("Selected Answer:", selectedAnswer);
            console.log("Correct Answer:", correctAnswer);
            console.log("Question ID:", questionId);
            console.log("Question opsibenar:", question.opsibenar);

            if (correctAnswer === question.opsibenar) {
                return res.json({
                    message: "Jawaban Anda benar!",
                    data: question
                });
            } else {
                return res.json({
                    message: "Jawaban Anda salah. Coba lagi!",
                    data: null
                });
            }
        })
        .catch((err) => {
            console.log("Error:", err);
            return res.status(500).json({
                message: err.message || "Terjadi kesalahan saat memproses jawaban.",
                data: null
            });
        });
};




// CREATE: untuk menambahkan data ke dalam tabel quiz
exports.create = (req, res) => {
    const { pertanyaan, opsibenar, opsia, opsib, opsic, opsid } = req.body; // Menggunakan object destructuring untuk mengambil properti pertanyaan dan opsibenar dari req.body
    const quiz = {
        pertanyaan: pertanyaan,
        opsibenar: opsibenar,
        opsia: opsia,
        opsib: opsib,
        opsic: opsic,
        opsid: opsid,
        // Tambah properti lain jika perlu
    };

    // Proses menyimpan ke dalam database
    Quiz.create(quiz).then((data) => {
        res.json({
            message: "Pertanyaan berhasil ditambahkan!",
            data: data,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Maaf pertanyaan tidak dapat ditambahkan",
            data: null,
        });
    });
};

// READ: menampilkan atau mengambil semua data sesuai model dari database
exports.findAll = (req, res) => {
    Quiz.findAll().then((quizzes) => {
        res.json({
            message: "Data pertanyaan berhasil diambil.",
            data: quizzes,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat mengambil data pertanyaan.",
            data: null,
        });
    });
};

// UPDATE: Merubah data sesuai dengan id yang dikirimkan sebagai params 
exports.update = (req, res) => {
    const id = req.params.id;

    const { pertanyaan, opsibenar, opsia, opsib, opsic, opsid } = req.body; // Menggunakan object destructuring untuk mengambil properti pertanyaan dan opsibenar dari req.body
    const quizData = {
        pertanyaan: pertanyaan,
        opsibenar: opsibenar,
        opsia: opsia,
        opsib: opsib,
        opsic: opsic,
        opsid: opsid,
        // Tambah field lain jika perlu
    };

    Quiz.update(quizData, {
        where: { id },
    }).then((num) => {
        if (num == 1) {
            res.json({
                message: "Pertanyaan berhasil diperbarui",
                data: quizData,
            });
        } else {
            res.json({
                message: `Tidak dapat memperbarui pertanyaan dengan id=${id}. Mungkin pertanyaan tidak ditemukan atau req.body kosong!`,
                data: quizData,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat memperbarui pertanyaan.",
            data: null,
        });
    });
};

// DELETE: Menghapus data sesuai id yang dikirimkan
exports.delete = (req, res) => {
    const id = req.params.id;
    Quiz.destroy({
        where: { id },
    }).then((num) => {
        if (num == 1) {
            res.json({
                message: "Pertanyaan berhasil dihapus",
                data: req.body,
            });
        } else {
            res.json({
                message: `Tidak dapat menghapus pertanyaan dengan id=${id}. Mungkin pertanyaan tidak ditemukan!`,
                data: req.body,
            });
        }
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat menghapus pertanyaan.",
            data: null,
        });
    });
};

// BONUS ===> Mengambil data sesuai id yang dikirimkan
exports.findOne = (req, res) => {
    Quiz.findByPk(req.params.id).then((quiz) => {
        res.json({
            message: "Pertanyaan berhasil ditemukan",
            data: quiz,
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message || "Terjadi kesalahan saat mengambil pertanyaan.",
            data: null,
        });
    });
};
