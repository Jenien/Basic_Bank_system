const express = require('express');
const router = express.Router();
const { 
    createNasabah, 
    getNasabahList, 
    getNasabah, 
    updateNasabah, 
    deleteNasabah
} = require('../handler/v1/nasabah');

const { 
    createAkunBank, 
    getAkunBankList, 
    getAkunBankDetail, 
    updateAkunBank, 
    deleteAkunBank
} = require('../handler/v1/akun_bank');

const { 
    createTransaksi, 
    getTransaksiList, 
    getTransaksiDetail, 
    updateTransaksi, 
    deleteTransaksi
} = require('../handler/v1/transaksi');

router.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'Challenge ke 4 jeni riska fatihatul mariam',
        data: null
    });
});

// Endpoint untuk Nasabah
router.post('/nasabah', createNasabah); // Menambahkan Nasabah Baru
router.get('/nasabah', getNasabahList); // Menampilkan Daftar Nasabah
router.get('/nasabah/:id', getNasabah); // Menampilkan Detail Informasi Nasabah
router.put('/nasabah/:id', updateNasabah); // Mengupdate Informasi Nasabah
router.delete('/nasabah/:id', deleteNasabah); // Menghapus Nasabah

// Endpoint untuk Akun Bank
router.post('/akun', createAkunBank); // Menambahkan Akun Baru
router.get('/akun', getAkunBankList); // Menampilkan Daftar Akun
router.get('/akun/:id', getAkunBankDetail); // Menampilkan Detail Akun
router.put('/akun/:id', updateAkunBank); // Mengupdate Informasi Akun
router.delete('/akun/:id', deleteAkunBank); // Menghapus Akun

// Endpoint untuk Transaksi
router.post('/transaksi', createTransaksi); // Mengirimkan Uang
router.get('/transaksi', getTransaksiList); // Menampilkan Daftar Transaksi
router.get('/transaksi/:id', getTransaksiDetail); // Menampilkan Detail Transaksi
router.put('/transaksi/:id', updateTransaksi); // Mengupdate Informasi Transaksi
router.delete('/transaksi/:id', deleteTransaksi); // Menghapus Transaksi

module.exports = router;