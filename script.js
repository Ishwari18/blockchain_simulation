const blockchainElement = document.getElementById('blockchain');
const transactionsInput = document.getElementById('transactions');
const validationResultElement = document.getElementById('validationResult');

document.getElementById('refresh').addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/blockchain');
    const blockchain = await response.json();
    blockchainElement.textContent = JSON.stringify(blockchain, null, 2);
});

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
    alert(result.message || 'Block added successfully');
    transactionsInput.value = '';
});

document.getElementById('validate').addEventListener('click', async () => {
    const response = await fetch('http://localhost:3000/isValid');
    const result = await response.json();
    validationResultElement.textContent = result.isValid
        ? 'The blockchain is valid!'
        : 'The blockchain is invalid!';
});


document.getElementById('tamperBlock').addEventListener('click', async () => {
    const blockIndex = parseInt(document.getElementById('blockIndex').value, 10);
    const newTransactions = document.getElementById('newTransactions').value.trim();

    if (isNaN(blockIndex) || !newTransactions) {
        alert('Please provide a valid block index and transactions.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/tamperBlock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ index: blockIndex, newTransactions }),
        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById('tamperResult').textContent = result.isValid
                ? 'Blockchain is still valid (unexpected behavior).'
                : 'Blockchain has been tampered and is invalid!';
            blockchainElement.textContent = JSON.stringify(result.chain, null, 2);
        } else {
            alert(result.error);
        }
    } catch (err) {
        console.error('Error tampering with the blockchain:', err);
    }
});