#[derive(Debug)]
struct Blockchain {
    chain: Vec<Block>,
    difficulty: usize,
}

impl Blockchain {
    fn new(difficulty: usize) -> Self {
        let mut blockchain = Blockchain {
            chain: Vec::new(),
            difficulty,
        };
        blockchain.chain.push(Block::new(0, "Genesis Block".to_string(), "0".to_string()));
        blockchain
    }

    fn add_block(&mut self, transactions: String) {
        let latest_block = self.chain.last().unwrap();
        let mut new_block = Block::new(self.chain.len() as u32, transactions, latest_block.hash.clone());
        new_block.mine_block(self.difficulty);
        self.chain.push(new_block);
    }

    fn is_chain_valid(&self) -> bool {
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
