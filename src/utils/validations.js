export const isEmpty = (data) => {
    return data.trim().length == 0
}

export const isNumber = (data) => {
    return !isNaN(data)
}

export const isString = (data) => {
    return typeof data == 'string'
}

export const isNotString = (data) => {
    return typeof data == !'string'
}

export const isNotValidString = (data) => {
    const pattern = /^[a-zA-Z0-9_.@-\s]+$/
    return !pattern.test(data.trim())
}

export const isNotImage = (file) =>{
    return file && !file.type.startsWith('image/')
}

export const isNotVideo = (file) => {
    return file && !file.type.startsWith('video/')
}

export const isNotValidFileType = (file, allowedTypes = []) => {
    const fileType = file.type
    return !allowedTypes.includes(fileType)
}

export const isValidFileSize = (file, maxSize) => {
    const sizeInMd = file.size / (1024 * 1024)
    return sizeInMd <= maxSize
}