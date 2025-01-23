# Blockchain Simulation Project

This project is a simple blockchain simulation built with **Node.js** and **Express**. It simulates adding and tampering with blocks in a blockchain, and includes a frontend that displays the blockchain as cards. Each block can be tampered with, and the validity of the blockchain can be checked via a simple API.

## Project Structure
The project consists of three main parts:
1. **Backend (Node.js and Express)**: A server that manages the blockchain, adds blocks, validates the chain, and allows tampering with blocks.
2. **Frontend (HTML, CSS, JavaScript)**: A simple interface to interact with the blockchain, add blocks, tamper with blocks, and validate the blockchain.
3. **Blockchain Logic**: Written in JavaScript, handles the creation of blocks, the chain, and hash generation.

## Features
- **Add a Block**: Add transactions to the blockchain.
- **Tamper with a Block**: Modify the contents of a specific block and check if the blockchain becomes invalid.
- **Validate Blockchain**: Check the integrity of the entire blockchain.
- **Dynamic Blockchain View**: Blockchain blocks are displayed as cards in rows, with more rows added as blocks are added.

## Prerequisites
Before you begin, make sure you have the following installed:
- **Node.js**: Version 14 or higher
- **npm** (Node Package Manager): Installed with Node.js

You can verify your installations by running:
```bash
node -v
npm -v



