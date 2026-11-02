import bcrypt from "bcrypt"
import argon2 from "argon2"
import configService from "../../config/config.service.js"
import { HashEnum } from "../enums/index.js"

export const myHash = async ({ plainText, minor = "b", lib = HashEnum.bcrypt }) => {
    switch (lib) {
        case HashEnum.bcrypt: {
            const salt = await bcrypt.genSalt(configService.SALT, minor)
            return await bcrypt.hash(plainText, salt)
        }
        case HashEnum.argon:
            return await argon2.hash(plainText)
        default:
            throw new Error("Unsupported hash library")
    }
}

export const myCompare = async ({ plainText, encrypted, lib = HashEnum.bcrypt }) => {
    switch (lib) {
        case HashEnum.bcrypt:
            return await bcrypt.compare(plainText, encrypted)
        case HashEnum.argon:
            return await argon2.verify(encrypted, plainText)
        default:
            throw new Error("Unsupported hash library")
    }
}
