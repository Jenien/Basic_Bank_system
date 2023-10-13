const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createNasabah = async (req, res, next) => {
    try {
        const { NamaNasabah } = req.body;
        const nasabah = await prisma.nasabah.create({
            data: {
                NamaNasabah,
            }
        });
        res.status(200).json({
            status: true,
            message: 'Nasabah sukses di bikin',
            data: nasabah
        });
    } catch (error) {
        next(error);
    }
};

const getNasabahList = async (req, res, next) => {
    try {
        const nasabahList = await prisma.nasabah.findMany();

        res.status(200).json({
            status: true,
            message: 'Nasabah di temukan',
            data: nasabahList
        });
    } catch (error) {
        next(error);
    }
};


const getNasabah = async (req, res, next) => {
    try {
        const { id } = req.params;
        const nasabah = await prisma.nasabah.findUnique({
            where: {
                NasabahID: parseInt(id),
            }
        });

        if (!nasabah) {
            return res.status(404).json({
                status: false,
                message: 'Nasabah tidak di temukan',
                data: null
            });
        }

        const akunBank = await prisma.akun_bank.findFirst({
            where: {
                NasabahID: parseInt(id),
            }
        });

        res.status(200).json({
            status: true,
            message: 'Nasabah detail di temukan',
            data: {
                NasabahID: nasabah.NasabahID,
                NamaNasabah: nasabah.NamaNasabah,
                SaldoAwal: akunBank ? akunBank.Saldo : null
            }
        });
    } catch (error) {
        next(error);
    }
};

const updateNasabah = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { NamaNasabah } = req.body;

        const updatedNasabah = await prisma.nasabah.update({
            where: {
                NasabahID: parseInt(id)
            },
            data: {
                NamaNasabah
            }
        });

        res.status(200).json({
            status: true,
            message: 'Nasabah sukses di apdet',
            data: updatedNasabah
        });
    } catch (error) {
        next(error);
    }
};

const deleteNasabah = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Pastikan tidak ada Akun Bank yang terkait dengan Nasabah , hapus akun bank dahulu
        const akunBankTerhubung = await prisma.akun_bank.findFirst({
            where: {
                NasabahID: parseInt(id)
            }
        });

        if (akunBankTerhubung) {
            return res.status(400).json({
                status: false,
                message: 'Tidak bisa haus nasabah, hapus dulu akun bank nya Akun Bank',
                data: null
            });
        }

        // Hapus Nasabah
        await prisma.nasabah.delete({
            where: {
                NasabahID: parseInt(id)
            }
        });

        res.status(200).json({
            status: true,
            message: 'Nasabah berhasil di hapus',
            data: null
        });
    } catch (error) {
        next(error);
    }

};

module.exports = { createNasabah, getNasabahList, getNasabah, updateNasabah, deleteNasabah };