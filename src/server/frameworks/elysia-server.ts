import { Elysia, t } from 'elysia'
import { DbInterface } from '../db-interface'

export function createElysiaServer(db: DbInterface) {

    const app = new Elysia()
        .model({
            many: t.Object({
                limit: t.Numeric(),
                offset: t.Numeric()
            }),
            pk: t.Object({
                id: t.Numeric()
            }),
            term: t.Object({
                term: t.String()
            }),
        })
        .get("/customers", async ({ query: { limit, offset } }) => await db.customers(limit, offset), { query: "many" })

        .get("/customer-by-id", async ({ query: { id } }) => await db.customerById(id), { query: "pk" })

        .get("/search-customer", async ({ query: { term } }) => await db.searchCustomer(term), { query: "term" })

        .get("/employees", async ({ query: { limit, offset } }) => await db.employees(limit, offset), { query: "many" })
        
        .get("/employee-with-recipient", async ({ query: { id } }) => await db.employeeWithRecipient(id), { query: "pk" })
        
        .get("/suppliers", async ({ query: { limit, offset } }) => await db.suppliers(limit, offset), { query: "many" })
        
        .get("/supplier-by-id", async ({ query: { id } }) => await db.supplierById(id), { query: "pk" })
        
        .get("/products", async ({ query: { limit, offset } }) => await db.products(limit, offset), { query: "many" })
        
        .get("/product-with-supplier", async ({ query: { id } }) => await db.productsWithSupplier(id), { query: "pk" })
        
        .get("/search-product", async ({ query: { term } }) => await db.searchProduct(term), { query: "term" })
        
        .get("/orders-with-details", async ({ query: { limit, offset } }) => await db.ordersWithDetails(limit, offset), { query: "many" })
        
        .get("/order-with-details", async ({ query: { id } }) => await db.orderWithDetails(id), { query: "pk" })
        
        .get("/order-with-details-and-products", async ({ query: { id } }) => await db.orderWithDetailsAndProducts(id), { query: "pk" })

        return app
}

