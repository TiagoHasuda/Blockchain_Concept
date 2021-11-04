const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
    }

    toString() {
        return `Block = 
            Timestamp = ${this.timestamp}
            LastHash = ${this.lastHash.substring(0, 10)}
            Hash = ${this.hash.substring(0, 10)}
            Data = ${this.data}`
    }

    static genesis() {
        return new this('Genesis time', '----------', '4789234H2G' , [])
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now().toString()
        const lastHash = lastBlock.hash
        const hash = this.hash(timestamp, lastHash, data)

        return new this(timestamp, lastHash, hash, data)
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString()
    }

    static blockHash(block) {
        return this.hash(block.timestamp, block.lastHash, block.data)
    }
}

module.exports = Block
