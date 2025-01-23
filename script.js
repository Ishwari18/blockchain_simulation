const blockchainContainer = document.getElementById('blockchain-container');
const transactionsInput = document.getElementById('transactions');
const validationResultElement = document.getElementById('validationResult');

// Function to render blockchain as cards
function renderBlockchain(blockchain) {
    blockchainContainer.innerHTML = ''; // Clear existing blocks
    blockchain.forEach(block => {
        const blockCard = document.createElement('div');
        blockCard.classList.add('block-card');
        blockCard.innerHTML = `
            <div class="block-header">Block #${block.index}</div>
            <div><strong>Timestamp:</strong> ${block.timestamp}</div>
            <div><strong>Transactions:</strong> ${block.transactions}</div>
            <div><strong>Hash:</strong> ${block.hash.slice(0, 20)}...</div>
            <div><strong>Previous Hash:</strong> ${block.previousHash.slice(0, 20)}...</div>
        `;
        blockchainContainer.appendChild(blockCard);
    });
}

// Fetch and display blockchain
async function fetchBlockchain() {
    const response = await fetch('http://localhost:3000/blockchain');
    const blockchain = await response.json();
    renderBlockchain(blockchain);
}

// Add a new block
document.getElementById('addBlock').addEventListener('click', async () => {
    const transactions = transactionsInput.value.trim();
    if (!transactions) {
        alert('Please enter transactions');
        return;
    }
    const response = await fetch('http://localhost:3000/addBlock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transactions }),
    });
    const result = await response.json();
    if (response.ok) {
        alert(result.message);
        fetchBlockchain();
        transactionsInput.value = '';
    } else {
        alert(result.error);
    }
});

// Tamper with a block
document.getElementById('tamperBlock').addEventListener('click', async () => {
    const blockIndex = parseInt(document.getElementById('blockIndex').value, 10);
    const newTransactions = document.getElementById('newTransactions').value.trim();

    if (isNaN(blockIndex) || !newTransactions) {
        alert('Please provide a valid block index and transactions.');
        return;
    }

    const response = await fetch('http://localhost:3000/tamperBlock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ index: blockIndex, newTransactions }),
    });
    const result = await response.json();
    if (response.ok) {
        alert('Block tampered successfully!');
        fetchBlockchain();
    } else {
        alert(result.error);
    }
});

// Validate the blockchain
document.getElementById('validate').addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/isValid');
    const result = await response.json();
    validationResultElement.textContent = result.isValid
        ? 'The blockchain is valid!'
        : 'The blockchain is invalid!';
});

// Fetch blockchain on page load
fetchBlockchain();
