const Block = require('./block')

const genesisBlock = Block.genesis()
const firstBlock = Block.mineBlock(genesisBlock, ['$500'])
console.log(firstBlock.toString())
