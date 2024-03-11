
import { DbInterface } from "../db-interface";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const prismaDB: DbInterface = {
    customers: async (limit, offset) => {
        return await prisma.customer.findMany({
            take: limit,
            skip: offset,
        });
    },
    customerById: async (id) => {
        const result = await prisma.customer.findFirst({
            where: {
                id: id
            }
        });

        return result!;
    },

    searchCustomer: async (term) => {
        const result = await prisma.customer.findMany({
            where: {
                companyName: {
                    search: `${term}:*`
                }
            }
        });

        return result;
    },

    employees: async (limit, offset) => {
        const result = await prisma.employee.findMany({
            take: limit,
            skip: offset
        });

        return result;
    },

    employeeWithRecipient: async (id) => {
        const result = await prisma.employee.findUnique({
            where: { id },
            include: {
                recipient: true
            }
        });

        return [result];
    },

    suppliers: async (limit, offset) => {
        const result = await prisma.supplier.findMany({
            take: limit,
            skip: offset
        });

        return result;
    },

    supplierById: async (id) => {
        const result = await prisma.supplier.findFirst({
            where: { id }
        });

        return result!;
    },

    products: async (limit, offset) => {
        const result = await prisma.product.findMany({
            take: limit,
            skip: offset
        });

        return result;
    },

    productsWithSupplier: async (id) => {
        const result = await prisma.product.findUnique({
            where: { id },
            include: {
                supplier: true
            }
        });

        return result!;
    },

    searchProduct: async (term) => {
        const result = await prisma.product.findMany({
            where: {
                name: {
                    search: `${term}:*`
                }
            }
        });

        return result;
    },

    ordersWithDetails: async (limit, offset) => {
        const res = await prisma.order.findMany({
            include: {
                details: true,
            },
            take: limit,
            skip: offset,
            orderBy: {
                id: "asc",
            }
        });


        const result = res.map((item) => {
            return {
                id: item.id,
                shippedDate: item.shippedDate,
                shipName: item.shipName,
                shipCity: item.shipCity,
                shipCountry: item.shipCountry,
                productsCount: item.details.length,
                quantitySum: item.details.reduce(
                    (sum, deteil) => (sum += +deteil.quantity),
                    0
                ),
                totalPrice: item.details.reduce(
                    (sum, deteil) => (sum += +deteil.quantity * +deteil.unitPrice),
                    0
                ),
            };
        })

        return result;

    },

    orderWithDetails: async (id) => {
        const res = await prisma.order.findMany({
            include: {
                details: true,
            },
            where: {
                id
            },
        });

        const result = res.map((item) => {
            return {
                id: item.id,
                shippedDate: item.shippedDate,
                shipName: item.shipName,
                shipCity: item.shipCity,
                shipCountry: item.shipCountry,
                productsCount: item.details.length,
                quantitySum: item.details.reduce(
                    (sum, detail) => (sum += detail.quantity),
                    0
                ),
                totalPrice: item.details.reduce(
                    (sum, detail) => (sum += detail.quantity * detail.unitPrice),
                    0
                ),
            };
        });

        return (result);
    },

    orderWithDetailsAndProducts: async (id) => {
        const result = await prisma.order.findMany({
            where: { id },
            include: {
                details: {
                    include: {
                        product: true
                    }
                }
            }
        });

        return result;
    },
}