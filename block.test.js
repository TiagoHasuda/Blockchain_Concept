const Block = require('./block.js')

describe('Block', () => {
    let data, lastBlock, block

    beforeEach(() => {
        data = 'index.html'
        lastBlock = Block.genesis()
        block = Block.mineBlock(lastBlock, data)
    })

    it('Sets `data` to match input', () => {
        expect(block.data).toEqual(data)
    })

    it('Sets `lastHash` to match the hash of the last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash)
    })
})
