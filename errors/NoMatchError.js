class NoMatchError extends Error {
    constructor(message) {
        super(message)
        this.name = "NoMatchError"
    }
}

module.exports = NoMatchError
