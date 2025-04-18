import { sql } from "./client.ts";
import { fakerPT_BR as faker } from "@faker-js/faker"

await sql`DROP TABLE IF EXISTS products`

await sql`
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price_in_cents INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
`

await sql`TRUNCATE TABLE products`

const productsToInsert = Array.from({ length: 10_000 }).map((_, i) => {
    return {
    name : faker.commerce.productName(),
    description : faker.commerce.productDescription(),
    price_in_cents : Math.floor(Math.random() * 100_000),
}
})

await sql`INSERT INTO products ${sql(productsToInsert)}`

await sql.end()