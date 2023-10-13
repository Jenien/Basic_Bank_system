const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAkunBank = async (req, res, next) => {
    try {
        const { NasabahID, Saldo } = req.body;
        const akunBank = await prisma.akun_bank.create({
            data: {
                Saldo,
                Nasabah: {
                    connect: {
                        NasabahID
                    }
                }
            }
        });

        res.status(200).json({
            status: true,
            message: 'Akun Bank created successfully',
            data: akunBank
        });
    } catch (error) {
        next(error);
    }
};
const getAkunBankList = async (req, res, next) => {
    try {
        const akunBankList = await prisma.akun_bank.findMany({
        });

        res.status(200).json({
            status: true,
            message: 'Akun Bank list found',
            data: akunBankList
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

const getAkunBankDetail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const akunBank = await prisma.akun_bank.findUnique({
            where: {
                AkunID: parseInt(id)
            }
        });

        if (!akunBank) {
            return res.status(404).json({
                status: false,
                message: 'Akun Bank not found',
                data: null
            });
        }

        res.status(200).json({
            status: true,
            message: 'Akun Bank detail found',
            data: akunBank
        });
    } catch (error) {
        next(error);
    }
};

const updateAkunBank = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { Saldo } = req.body;

        const updatedAkunBank = await prisma.akun_bank.update({
            where: {
                AkunID: parseInt(id)
            },
            data: {
                Saldo
            }
        });

        res.status(200).json({
            status: true,
            message: 'Akun Bank updated successfully',
            data: updatedAkunBank
        });
    } catch (error) {
        next(error);
    }
};

const deleteAkunBank = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Pastikan tidak ada Transaksi yang terkait dengan Akun Bank, hapus transaksi dahulu
        const transaksiTerhubung = await prisma.transaksi.findFirst({
            where: {
                AkunID: parseInt(id)
            }
        });

        if (transaksiTerhubung) {
            return res.status(400).json({
                status: false,
                message: 'Cannot delete Akun Bank with linked Transaksi',
                data: null
            });
        }

        // Hapus Akun Bank
        await prisma.akun_bank.delete({
            where: {
                AkunID: parseInt(id)
            }
        });

        res.status(200).json({
            status: true,
            message: 'Akun Bank deleted successfully',
            data: null
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createAkunBank,
    getAkunBankList,
    getAkunBankDetail,
    updateAkunBank,
    deleteAkunBank
};
