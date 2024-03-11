function customers(limit: number = 10, offset: number = 0): string {
    return `
        query customers { 
            customers(limit: ${limit}, offset: ${offset}) { 
                id 
                phone 
                postal_code 
                region 
                address 
                city 
                company_name 
                contact_name 
                country 
                fax 
                contact_title 
            } 
        }`;
}

function customers_by_id(id: number = 10): string {
    return `
        query customers_by_id { 
            customers_by_pk(id: ${id}) { 
                id 
                phone 
                postal_code 
                region 
                address 
                city 
                company_name 
                contact_name 
                country 
                fax 
                contact_title 
            } 
        }`;
}

function customers_search(_similar: string = "%Knorr%"): string {
    return `
        query customers_search { 
            customers(where: {company_name: {_like: "${_similar}"}}) { 
                address 
                city 
                company_name 
                contact_name 
                contact_title 
                country 
                id 
                fax 
            } 
        }`;
}

function employees(limit: number = 10, offset: number = 0): string {
    return `
        query employees { 
            employees(limit: ${limit}, offset: ${offset}) { 
                address 
                birth_date 
                city 
                country 
                extension 
                first_name 
                hire_date 
                home_phone 
                id 
                last_name 
                notes 
                postal_code 
                recipient_id 
                title 
                title_of_courtesy 
            } 
        }`;
}

function employee_with_recipient(id: number = 10): string {
    return `
        query employee_with_recipient { 
            employees_by_pk(id: ${id}) { 
                address 
                birth_date 
                city 
                country 
                first_name 
                hire_date 
                home_phone 
                id 
                last_name 
                notes 
                postal_code 
                title 
                title_of_courtesy 
                recipient_id 
                extension 
                employee { 
                    address 
                    birth_date 
                    city 
                    country 
                    extension 
                    first_name 
                    hire_date 
                    home_phone 
                    id 
                    last_name 
                    notes 
                    postal_code 
                    recipient_id 
                    title 
                    title_of_courtesy 
                } 
            } 
        }`;
}

function suppliers(limit: number = 10, offset: number = 0): string {
    return `
        query suppliers { 
            suppliers(limit: ${limit}, offset: ${offset}) { 
                id 
                address 
                city 
                company_name 
                contact_name 
                contact_title 
                country 
                phone 
                postal_code 
                region 
            } 
        }`;
}

function suppliers_by_id(id: number = 10): string {
    return `
        query suppliers_by_id { 
            suppliers_by_pk(id: ${id}) { 
                id 
                address 
                city 
                company_name 
                contact_name 
                contact_title 
                country 
                phone 
                postal_code 
                region 
            } 
        }`;
}

function products(limit: number = 10, offset: number = 0): string {
    return `
        query products { 
            products(limit: ${limit}, offset: ${offset}) { 
                id 
                name 
                discontinued 
                unit_price 
                units_in_stock 
                units_on_order 
                supplier_id 
                reorder_level 
                qt_per_unit 
            } 
        }`;
}

function product_with_suppliers(id: number = 10): string {
    return `
        query product_with_suppliers { 
            products_by_pk(id: ${id}) { 
                id 
                name 
                discontinued 
                unit_price 
                units_in_stock 
                units_on_order 
                supplier_id 
                reorder_level 
                qt_per_unit 
                supplier { 
                    address 
                    city 
                    company_name 
                    contact_name 
                    contact_title 
                    country 
                    id 
                    phone 
                    postal_code 
                    region 
                } 
            } 
        }`;
}

function product_search(_similar: string = "%Casper%"): string {
    return `
        query product_search { 
            products(where: {name: {_like: "${_similar}"}}) { 
                id 
                name 
                discontinued 
                unit_price 
                units_in_stock 
                units_on_order 
                supplier_id 
                reorder_level 
                qt_per_unit 
            } 
        }`;
}

function orders_with_details(limit: number = 10, offset: number = 0): string {
    return `
        query orders_with_details { 
            orders(limit: ${limit}, offset: ${offset}) { 
                id 
                shipped_date 
                ship_name 
                ship_city 
                ship_country 
                order_details_aggregate { 
                    aggregate { 
                        sum { 
                            quantity 
                            unit_price 
                        } 
                        count 
                    } 
                } 
            } 
        }`;
}

function order_with_details(id: number = 10): string {
    return `
        query order_with_details { 
            orders_by_pk(id: ${id}) { 
                id 
                shipped_date 
                ship_name 
                ship_city 
                ship_country 
                order_details_aggregate { 
                    aggregate { 
                        sum { 
                            quantity 
                            unit_price 
                        } 
                        count 
                    } 
                } 
            } 
        }`;
}

function order_with_details_and_products(id: number = 10): string {
    return `
        query order_with_details_and_products { 
            orders_by_pk(id: ${id}) { 
                customer_id 
                employee_id 
                id 
                freight 
                order_date 
                required_date 
                ship_city 
                ship_name 
                ship_country 
                ship_postal_code 
                ship_region 
                ship_via 
                shipped_date 
                order_details { 
                    discount 
                    order_id 
                    product { 
                        discontinued 
                        id 
                        name 
                        qt_per_unit 
                        reorder_level 
                        supplier_id 
                        unit_price 
                        units_in_stock 
                        units_on_order 
                    } 
                    product_id 
                    quantity 
                    unit_price 
                } 
            } 
        }`;
}


export {customers, customers_by_id, customers_search, employee_with_recipient, employees, product_search, product_with_suppliers, products, suppliers, suppliers_by_id, order_with_details, order_with_details_and_products, orders_with_details}