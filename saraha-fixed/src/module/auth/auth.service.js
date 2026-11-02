import { userModel } from "../../database/model/index.js"
import {
    conflictException,
    notFoundException,
    myHash,
    myCompare,
    encryption,
    HashEnum
} from "../../common/index.js"

const sanitize = (user) => {
    const obj = user.toJSON()
    delete obj.password
    return obj
}

export const signup = async (data) => {
    const exists = await userModel.findOne({ email: data.email })
    if (exists) conflictException("user already exists")

    data.password = await myHash({ plainText: data.password, lib: HashEnum.argon })
    data.phone = encryption(data.phone)

    const user = await userModel.create(data)
    return sanitize(user)
}

export const login = async ({ email, password }) => {
    const user = await userModel.findOne({ email })
    if (!user) notFoundException("user not found")

    const matchPassword = await myCompare({
        plainText: password,
        encrypted: user.password,
        lib: HashEnum.argon
    })
    if (!matchPassword) notFoundException("user not found")

    return sanitize(user)
}
