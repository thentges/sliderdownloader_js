class EmptyFileError extends Error {
    constructor(message) {
        super(message)
        this.name = "EmptyFileError"
    }
}

module.exports = EmptyFileError
