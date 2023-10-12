const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getPagination } = require('../../helpers');

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
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const akunBankList = await prisma.akun_bank.findMany({
            skip: offset,
            take: limit,
        });
        const count = await prisma.akun_bank.count();
        const pagination = getPagination(req, count, page, limit);

        res.status(200).json({
            status: true,
            message: 'Akun Bank list found',
            data: akunBankList,
            pagination
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

 module.exports = { createAkunBank, getAkunBankList, getAkunBankDetail, updateAkunBank, deleteAkunBank };