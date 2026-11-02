const mainException = ({ message = "Internal server error", cause = 500 }) => {
    throw new Error(message, { cause })
}

export const notFoundException = (message) => {
    mainException({ message, cause: 404 })
}

export const unauthorizedException = (message) => {
    mainException({ message, cause: 401 })
}

export const conflictException = (message) => {
    mainException({ message, cause: 409 })
}

export const forbiddenException = (message) => {
    mainException({ message, cause: 403 })
}

export const badRequestException = (message) => {
    mainException({ message, cause: 400 })
}
