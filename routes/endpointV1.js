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
router.post('/nasabah', createNasabah); 
router.get('/nasabah', getNasabahList); 
router.get('/nasabah/:id', getNasabah); 
router.put('/nasabah/:id', updateNasabah); 
router.delete('/nasabah/:id', deleteNasabah);

// Endpoint untuk Akun Bank
router.post('/akun', createAkunBank);
router.get('/akun', getAkunBankList); 
router.get('/akun/:id', getAkunBankDetail); 
router.put('/akun/:id', updateAkunBank); 
router.delete('/akun/:id', deleteAkunBank); 

// Endpoint untuk Transaksi
router.post('/transaksi', createTransaksi); 
router.get('/transaksi', getTransaksiList); 
router.get('/transaksi/:id', getTransaksiDetail); 
router.put('/transaksi/:id', updateTransaksi); 
router.delete('/transaksi/:id', deleteTransaksi); 

module.exports = router;