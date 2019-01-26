class NoMatchError extends Error {
    constructor(message) {
        super(message)
        this.name = "NoMatchError"
        console.log(`[ERROR] ${message}`)
    }
}

module.exports = NoMatchError
