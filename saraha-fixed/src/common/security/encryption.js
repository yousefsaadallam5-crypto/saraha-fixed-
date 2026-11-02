import crypto from "node:crypto"
import configService from "../../config/config.service.js"

const { ENC_KEY, ENC_IV_LENGTH, ENC_ALGO } = configService
const key = Buffer.from(ENC_KEY || "", "hex")

if (key.length !== 32) {
    throw new Error("ENC_KEY must be a 64-character hex string (32 bytes) for aes-256-cbc")
}

export const encryption = (plaintext) => {
    const iv = crypto.randomBytes(ENC_IV_LENGTH)
    const cipher = crypto.createCipheriv(ENC_ALGO, key, iv)
    let result = cipher.update(plaintext, "utf-8", "hex")
    result += cipher.final("hex")
    return `${iv.toString("hex")}::${result}`
}

export const decryption = (cypherText) => {
    const [hexIV, encrypted] = cypherText.split("::")
    const iv = Buffer.from(hexIV, "hex")
    const decipher = crypto.createDecipheriv(ENC_ALGO, key, iv)
    let result = decipher.update(encrypted, "hex", "utf-8")
    result += decipher.final("utf-8")
    return result
}
