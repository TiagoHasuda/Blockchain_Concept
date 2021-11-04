const Block = require('./block')
const Blockchain = require('./blockchain')

describe('Blockchain', () => {
    let bc, bc2

    beforeEach(() => {
        bc = new Blockchain()
        bc2 = new Blockchain()
    })

    it('Starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis())
    })

    it('Adds a new block', () => {
        const data = 'arquivo.pdf'
        bc.addBlock(data)

        expect(bc.chain[bc.chain.length - 1].data).toEqual(data)
    })

    it('Validates a chain', () => {
        bc.addBlock('$500')
        expect(bc.isValidChain(bc.chain)).toBe(true)
    })

    it('Invalidates a chain with a corrupt genesis block', () => {
        bc.chain[0].data = '$0'
        expect(bc.isValidChain(bc.chain)).toBe(false)
    })

    it('Invalidates a chain with a corrupt block', () => {
        bc.addBlock('$1000')
        bc.chain[1].data = '$500'
        expect(bc.isValidChain(bc.chain)).toBe(false)
    })

    it('Replaces the chain with a valid chain', () => {
        bc2.addBlock('$600')
        bc.replaceChain(bc2.chain)
        expect(bc.chain).toEqual(bc2.chain)
    })

    it('Does not replace the chain with one of less or equal length', () => {
        bc.addBlock('$500')
        bc.replaceChain(bc2.chain)
        expect(bc.chain).not.toEqual(bc2.chain)
    })
})
