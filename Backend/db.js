import pg from "pg"
import { PG_PASSWORD } from "./config.js"

const { Client } = pg

const PgClient = new Client({
  host: "localhost",
  user: "postgres",
  database: "OLA",
  port: 5432,
  password: PG_PASSWORD,
})

export default PgClient
