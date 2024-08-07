import "dotenv/config"
import pg from "pg"

const pgPool = new pg.Pool({
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB,
})

export const connect_db = () => {
    pgPool.query('SELECT 1')
        .then(() => {
            console.log('PostgreSQL database connected')
        }).catch((err) => {
            console.error('Error connecting to PostgreSQL database:', err)
        })
}

export default pgPool