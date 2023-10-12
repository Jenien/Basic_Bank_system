const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getPagination } = require('../../helpers');

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
            message: 'Nasabah created successfully',
            data: nasabah
        });
    } catch (error) {
        next(error);
    }
};

const getNasabahList = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const nasabahList = await prisma.nasabah.findMany({
            skip: offset,
            take: limit,
        });
        const count = await prisma.nasabah.count();
        const pagination = getPagination(req, count, page, limit);

        res.status(200).json({
            status: true,
            message: 'Nasabah list found',
            data: nasabahList,
            pagination
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
                NasabahID: parseInt(id)
            }
        });

        if (!nasabah) {
            return res.status(404).json({
                status: false,
                message: 'Nasabah not found',
                data: null
            });
        }

        res.status(200).json({
            status: true,
            message: 'Nasabah detail found',
            data: nasabah
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
            message: 'Nasabah updated successfully',
            data: updatedNasabah
        });
    } catch (error) {
        next(error);
    }
};

const deleteNasabah = async (req, res, next) => {
    try {
        const { id } = req.params;

        await prisma.nasabah.delete({
            where: {
                NasabahID: parseInt(id)
            }
        });

        res.status(200).json({
            status: true,
            message: 'Nasabah deleted successfully',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createNasabah, getNasabahList, getNasabah, updateNasabah, deleteNasabah };