export interface DbInterface {
    customers: (limit: number, offset: number) => Promise<Object>,
    customerById: (id: number) => Promise<Object>,
    searchCustomer: (term: string) => Promise<Object>,
    employees: (limit: number, offset: number) => Promise<Object>,
    employeeWithRecipient: (id: number) => Promise<Object>,
    suppliers: (limit: number, offset: number) => Promise<Object>,
    supplierById: (id: number) => Promise<Object>,
    products: (limit: number, offset: number) => Promise<Object>,
    productsWithSupplier: (id: number) => Promise<Object>,
    searchProduct: (term: string) => Promise<Object>,
    ordersWithDetails: (limit: number, offset: number) => Promise<Object>,
    orderWithDetails: (id: number) => Promise<Object>,
    orderWithDetailsAndProducts: (id: number) => Promise<Object>,
}


