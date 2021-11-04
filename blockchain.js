const Block = require("./block")

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()]
    }

    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length - 1], data)
        this.chain.push(block)
        return block
    }

    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
            return false
        for (let i = 1; i < chain.length; i++) {
            const block = chain[i]
            const lastBlock = chain[i - 1]
            if (block.lastHash !== lastBlock.hash) return false
            if (Block.blockHash(block) !== block.hash) return false
        }
        return true
    }

    replaceChain(newChain) {
        if (
            !this.isValidChain(newChain) ||
            this.chain.length >= newChain.length
        )
            return
        this.chain = newChain
    }
}

module.exports = Blockchain
