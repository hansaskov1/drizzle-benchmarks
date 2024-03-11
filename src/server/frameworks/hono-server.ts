import { Hono } from "hono";
import { DbInterface } from "../db-interface";

export function createHonoServer(db: DbInterface) {
    const app = new Hono();

    app.get("/customers", async (c) => {
        const limit = Number(c.req.query("limit")!);
        const offset = Number(c.req.query("offset")!);

        const result = await db.customers(limit, offset);

        return c.json(result);
    });

    app.get("/customer-by-id", async (c) => {
        const id = Number(c.req.query("id")!);
        const result = await db.customerById(id);

        return c.json(result);
    });

    app.get("/search-customer", async (c) => {
        const term = c.req.query("term")!;
        const result = await db.searchCustomer(term);

        return c.json(result);
    });

    app.get("/employees", async (c) => {
        const limit = Number(c.req.query("limit")!);
        const offset = Number(c.req.query("offset")!);
        const result = await db.employees(limit, offset);

        return c.json(result);
    });

    app.get("/employee-with-recipient", async (c) => {
        const id = Number(c.req.query("id")!);
        const result = await db.employeeWithRecipient(id);

        return c.json(result);
    });

    app.get("/suppliers", async (c) => {
        const limit = Number(c.req.query("limit")!);
        const offset = Number(c.req.query("offset")!);
        const result = await db.suppliers(limit, offset);

        return c.json(result);
    });

    app.get("/supplier-by-id", async (c) => {
        const id = Number(c.req.query("id")!);
        const result = await db.supplierById(id);

        return c.json(result);
    });

    app.get("/products", async (c) => {
        const limit = Number(c.req.query("limit")!);
        const offset = Number(c.req.query("offset")!);
        const result = await db.products(limit, offset);

        return c.json(result);
    });

    app.get("/product-with-supplier", async (c) => {
        const id = Number(c.req.query("id")!);
        const result = await db.productsWithSupplier(id);

        return c.json(result);
    })

    app.get("/search-product", async (c) => {
        const term = c.req.query("term")!;
        const result = await db.searchProduct(term);

        return c.json(result);
    })

    app.get("/orders-with-details", async (c) => {
        const limit = Number(c.req.query("limit")!);
        const offset = Number(c.req.query("offset")!);
        const result = await db.ordersWithDetails(limit, offset);

        return c.json(result);
    })

    app.get("/order-with-details", async (c) => {
        const id = Number(c.req.query("id")!);
        const result = await db.orderWithDetails(id);

        return c.json(result);
    })

    app.get("/order-with-details-and-products", async (c) => {
        const id = Number(c.req.query("id")!);
        const result = await db.orderWithDetailsAndProducts(id);

        return c.json(result);
    })

    return app
}
