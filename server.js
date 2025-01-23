const express = require('express');
const cors = require('cors');
const { Blockchain, Block } = require('./blockchain');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize the blockchain
const blockchain = new Blockchain();

// API Routes
app.get('/blockchain', (req, res) => {
    res.json(blockchain.chain);
});

app.post('/addBlock', (req, res) => {
    const { transactions } = req.body;
    if (!transactions) {
        return res.status(400).json({ error: 'Transactions are required' });
    }
    try {
        const newBlock = new Block(
            blockchain.chain.length,
            new Date().toISOString(),
            transactions
        );
        blockchain.addBlock(newBlock);
        res.json({ message: 'Block added successfully', newBlock });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add block' });
    }
});

app.get('/isValid', (req, res) => {
    const isValid = blockchain.isChainValid();
    res.json({ isValid });
});

app.post('/tamperBlock', (req, res) => {
    const { index, newTransactions } = req.body;

    if (typeof index !== 'number' || typeof newTransactions !== 'string') {
        return res.status(400).json({ error: 'Invalid request. Provide a valid block index and transaction string.' });
    }

    try {
        blockchain.tamperBlock(index, newTransactions);
        const isValid = blockchain.isChainValid();
        res.json({
            message: `Block ${index} has been tampered.`,
            isValid,
            chain: blockchain.chain,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
