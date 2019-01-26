class EmptyFileError extends Error {
    constructor(message) {
        super(message)
        this.name = "EmptyFileError"
        console.log(`[OVER] NO TRACK TO DOWNLOAD`)
    }
}

module.exports = EmptyFileError
