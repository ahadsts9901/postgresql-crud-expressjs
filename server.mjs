import "dotenv/config"
import express, { json } from "express"
import morgan from "morgan"
import { connect_db } from "./config/db.config.mjs"

import postRoutes from "./routes/main.mjs"

const app = express()

app.use(json())
app.use(morgan('dev'))
connect_db()

app.use('/api/v1', postRoutes)

const PORT = process.env.PORT || 5002

app.listen(PORT, () => console.log(`server running on port: ${PORT}`))