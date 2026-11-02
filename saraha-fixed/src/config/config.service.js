import { config } from "dotenv"
import { fileURLToPath } from "node:url"

const env = process.env.NODE_ENV || "development"
const envFilePath = fileURLToPath(new URL(`../.env.${env}`, import.meta.url))

config({ path: envFilePath, quiet: true })

export default {
    port: Number(process.env.PORT),
    DB_URI: process.env.DB_URI,
    SALT: Number(process.env.SALT),
    ENC_KEY: process.env.ENC_KEY,
    ENC_IV_LENGTH: Number(process.env.ENC_IV_LENGTH),
    ENC_ALGO: process.env.ENC_ALGO
}
