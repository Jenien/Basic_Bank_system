const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTransaksi = async (req, res, next) => {
    try {
        const { AkunID, JenisTransaksi, Jumlah } = req.body;
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
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const transaksiList = await prisma.transaksi.findMany({
            skip: offset,
            take: limit,
        });
        const count = await prisma.transaksi.count();
        const pagination = getPagination(req, count, page, limit);

        res.status(200).json({
            status: true,
            message: 'Transaksi list found',
            data: transaksiList,
            pagination
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