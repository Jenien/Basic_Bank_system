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
            message: 'Akun Bank sukses di bikin',
            data: akunBank
        });
    } catch (error) {
        next(error);
    }
};
const getAkunBankList = async (req, res, next) => {
    try {
        const akunBankList = await prisma.akun_bank.findMany({
            include: {
                Nasabah: true
            }
        });

        const formattedAkunBankList = akunBankList.map(item => ({
            AkunID: item.AkunID,
            Saldo: item.Saldo,
            NasabahID: item.NasabahID,
            NamaNasabah: item.Nasabah.NamaNasabah
        }));

        res.status(200).json({
            status: true,
            message: 'Akun Bank di temukan',
            data: formattedAkunBankList
        });
    } catch (error) {
        next(error);
    }
};

const getAkunBankDetail = async (req, res, next) => {
    try {
        const { id } = req.params;
        const akunBank = await prisma.akun_bank.findUnique({
            where: {
                AkunID: parseInt(id),
            },
            include: {
                Nasabah: true // Mengambil informasi nasabah terkait
            }
        });

        if (!akunBank) {
            return res.status(404).json({
                status: false,
                message: 'Akun Bank tidak di temukan',
                data: null
            });
        }

        res.status(200).json({
            status: true,
            message: 'Akun Bank detail di temukan',
            data: {
                AkunID: akunBank.AkunID,
                Saldo: akunBank.Saldo,
                Nasabah: {
                    NasabahID: akunBank.Nasabah.NasabahID,
                    NamaNasabah: akunBank.Nasabah.NamaNasabah
                }
            }
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
            message: 'Akun Bank sukses di apdet',
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
                message: 'Tidak bisa haus akun bank, hapus dulu transaksi Transaksi',
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
            message: 'Akun Bank berhasil di hapus',
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
