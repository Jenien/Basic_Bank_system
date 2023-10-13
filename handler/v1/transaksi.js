const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTransaksi = async (req, res, next) => {
    try {
        const { AkunID, JenisTransaksi, Jumlah } = req.body;

        const akun = await prisma.akun_bank.findUnique({
            where: {
                AkunID
            }
        });

        if (!akun) {
            return res.status(404).json({
                status: false,
                message: 'Akun not found',
                data: null
            });
        }

        let newSaldo;

        if (JenisTransaksi === 'withdraw') {
            newSaldo = akun.Saldo - Jumlah;
        } else if (JenisTransaksi === 'deposit') {
            newSaldo = akun.Saldo + Jumlah;
        } else {
            return res.status(400).json({
                status: false,
                message: 'Invalid JenisTransaksi'
            });
        }

        const transaksi = await prisma.transaksi.create({
            data: {
                JenisTransaksi,
                Jumlah,
                Akun_bank: {
                    connect: {
                        AkunID
                    }
                }
            }
        });

        await prisma.akun_bank.update({
            where: {
                AkunID
            },
            data: {
                Saldo: newSaldo
            }
        });

        res.status(200).json({
            status: true,
            message: 'Transaksi created successfully',
            data: transaksi
        });
    } catch (error) {
        next(error);
    }
};

const getTransaksiList = async (req, res, next) => {
    try {
        const transaksiList = await prisma.transaksi.findMany();

        res.status(200).json({
            status: true,
            message: 'Transaksi list found',
            data: transaksiList
        });
    } catch (error) {
        next(error);
    }
};

const getTransaksiDetail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const transaksi = await prisma.transaksi.findUnique({
            where: {
                TransaksiID: parseInt(id)
            },
            include: {
                Akun_bank: true
            }
        });

        if (!transaksi) {
            return res.status(404).json({
                status: false,
                message: 'Transaksi not found',
                data: null
            });
        }

        res.status(200).json({
            status: true,
            message: 'Transaksi detail found',
            data: transaksi
        });
    } catch (error) {
        next(error);
    }
};

const updateTransaksi = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { JenisTransaksi, Jumlah } = req.body;

        const updatedTransaksi = await prisma.transaksi.update({
            where: {
                TransaksiID: parseInt(id)
            },
            data: {
                JenisTransaksi,
                Jumlah
            }
        });

        res.status(200).json({
            status: true,
            message: 'Transaksi updated successfully',
            data: updatedTransaksi
        });
    } catch (error) {
        next(error);
    }
};

const deleteTransaksi = async (req, res, next) => {
    try {
        const { id } = req.params;

        await prisma.transaksi.delete({
            where: {
                TransaksiID: parseInt(id)
            }
        });

        res.status(200).json({
            status: true,
            message: 'Transaksi deleted successfully',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createTransaksi, getTransaksiList, getTransaksiDetail, updateTransaksi, deleteTransaksi };