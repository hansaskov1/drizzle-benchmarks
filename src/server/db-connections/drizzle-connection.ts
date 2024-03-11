import { alias } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Pool } from "pg";
import { eq, ilike, placeholder, sql, asc } from "drizzle-orm";
import {
  customers,
  details,
  employees,
  orders,
  products,
  suppliers,
} from "./schema";
import "dotenv/config";
import { DbInterface } from "../db-interface";

const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 32, min: 32 });
const db = drizzle(pool, { schema });

const p1 = db
  .select()
  .from(customers)
  .limit(placeholder("limit"))
  .offset(placeholder("offset"))
  .prepare("p1");

const p2 = db
  .select()
  .from(customers)
  .where(eq(customers.id, placeholder("id")))
  .prepare("p2");

const p3 = db
  .select()
  .from(customers)
  .where(ilike(customers.companyName, placeholder("term")))
  .prepare("p3");

const p4 = db
  .select()
  .from(employees)
  .limit(placeholder("limit"))
  .offset(placeholder("offset"))
  .prepare("p4");

const e1 = alias(employees, "recipient");
const p5 = db
  .select()
  .from(employees)
  .where(eq(employees.id, placeholder("id")))
  .leftJoin(e1, eq(employees.id, e1.recipientId))
  .prepare("p5");

const p6 = db
  .select()
  .from(suppliers)
  .limit(placeholder("limit"))
  .offset(placeholder("offset"))
  .prepare("p6");

const p7 = db
  .select()
  .from(suppliers)
  .where(eq(suppliers.id, placeholder("id")))
  .prepare("p7");

const p8 = db
  .select()
  .from(products)
  .limit(placeholder("limit"))
  .offset(placeholder("offset"))
  .prepare("p8");

const p9 = db
  .select()
  .from(products)
  .leftJoin(suppliers, eq(products.supplierId, suppliers.id))
  .where(eq(products.id, placeholder("id")))
  .prepare("p9");

const p10 = db
  .select()
  .from(products)
  .where(ilike(products.name, placeholder("term")))
  .prepare("p10");

const p11 = db
  .select({
    id: orders.id,
    shippedDate: orders.shippedDate,
    shipName: orders.shipName,
    shipCity: orders.shipCity,
    shipCountry: orders.shipCountry,
    productsCount: sql`count(${details.productId})`.as<number>(),
    quantitySum: sql`sum(${details.quantity})`.as<number>(),
    totalPrice:
      sql`sum(${details.quantity} * ${details.unitPrice})`.as<number>(),
  })
  .from(orders)
  .leftJoin(details, eq(orders.id, details.orderId))
  .groupBy(orders.id)
  .orderBy(asc(orders.id))
  .limit(placeholder("limit"))
  .offset(placeholder("offset"))
  .prepare("p11");

const p12 = db
  .select({
    id: orders.id,
    shippedDate: orders.shippedDate,
    shipName: orders.shipName,
    shipCity: orders.shipCity,
    shipCountry: orders.shipCountry,
    productsCount: sql`count(${details.productId})`.as<number>(),
    quantitySum: sql<number>`sum(${details.quantity})`,
    totalPrice:
      sql`sum(${details.quantity} * ${details.unitPrice})`.as<number>(),
  })
  .from(orders)
  .leftJoin(details, eq(orders.id, details.orderId))
  .where(eq(orders.id, placeholder("id")))
  .groupBy(orders.id)
  .orderBy(asc(orders.id))
  .prepare("p12");

const p13 = db
  .select()
  .from(orders)
  .leftJoin(details, eq(orders.id, details.orderId))
  .leftJoin(products, eq(details.productId, products.id))
  .where(eq(orders.id, placeholder("orderId")))
  .prepare("p13");


export const drizzleDB: DbInterface = {
    customers: async (limit, offset) => {    
        const result = await p1.execute({ limit, offset });
        return result;
    },
    customerById: async (id) => {
        const result = await p2.execute({ id });
        return result;
    },
    searchCustomer: async (term) => {
        const result = await p3.execute({ term });
        return result;
    },

    employees: async (limit, offset) => {
        const result = await p4.execute({ limit, offset });
        return result;
    },

    employeeWithRecipient: async (id) => {
        const result = await p5.execute({ id });
        return result;
    },

    suppliers: async (limit, offset) => {
        const result = await p6.execute({ limit, offset });
        return result;
    },

    supplierById: async (id) => {
        const result = await p7.execute({ id });
        return result;
    },

    products: async (limit, offset) => {
        const result = await p8.execute({ limit, offset });
        return result;
    },

    productsWithSupplier: async (id) => {
        const result = await p9.execute({ id });
        return result;
    },

    searchProduct: async (term) => {
        const result = await p10.execute({ term });
        return result;
    },

    ordersWithDetails: async (limit, offset) => {
        const result = await p11.execute({ limit, offset });
        return result;
    },

    orderWithDetails: async (id) => {
        const result = await p12.execute({ id });
        return result;
    },

    orderWithDetailsAndProducts: async (orderId) => {
        const result = await p13.execute({ orderId });
        return result;
    }
}

