use sha2::{Sha256, Digest};
use chrono::Utc;

#[derive(Debug)]
pub struct Block {
    pub index: u32,
    pub timestamp: String,
    pub transactions: String,
    pub previous_hash: String,
    pub hash: String,
    pub nonce: u64,
}

impl Block {
    pub fn new(index: u32, transactions: String, previous_hash: String) -> Self {
        let timestamp = Utc::now().to_string();
        let mut block = Block {
            index,
            timestamp,
            transactions,
            previous_hash,
            hash: String::new(),
            nonce: 0,
        };
        block.hash = block.calculate_hash();
        block
    }

    pub fn calculate_hash(&self) -> String {
        let data = format!(
            "{}{}{}{}{}",
            self.index, self.timestamp, self.transactions, self.previous_hash, self.nonce
        );
        let mut hasher = Sha256::new();
        hasher.update(data);
        format!("{:x}", hasher.finalize())
    }

    pub fn mine_block(&mut self, difficulty: usize) {
        let target = "0".repeat(difficulty);
        while &self.hash[..difficulty] != target {
            self.nonce += 1;
            self.hash = self.calculate_hash();
        }
        println!("Block mined: {}", self.hash);
    }
}

#[derive(Debug)]
pub struct Blockchain {
    pub chain: Vec<Block>,
    difficulty: usize,
}

impl Blockchain {
    pub fn new(difficulty: usize) -> Self {
        let mut blockchain = Blockchain {
            chain: Vec::new(),
            difficulty,
        };
        blockchain.chain.push(Block::new(0, "Genesis Block".to_string(), "0".to_string()));
        blockchain
    }

    pub fn add_block(&mut self, transactions: String) {
        let latest_block = self.chain.last().unwrap();
        let mut new_block = Block::new(self.chain.len() as u32, transactions, latest_block.hash.clone());
        new_block.mine_block(self.difficulty);
        self.chain.push(new_block);
    }

    pub fn is_chain_valid(&self) -> bool {
        for i in 1..self.chain.len() {
            let current = &self.chain[i];
            let previous = &self.chain[i - 1];

            if current.hash != current.calculate_hash() {
                return false;
            }
            if current.previous_hash != previous.hash {
                return false;
            }
        }
        true
    }
}
