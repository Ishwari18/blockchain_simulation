mod blockchain;

use blockchain::Blockchain;

fn main() {
    let mut my_blockchain = Blockchain::new(7); // Can set difficulty level here
    println!("Creating the blockchain...");

    my_blockchain.add_block("Transaction 1: Alice pays Bob 10 coins".to_string());
    my_blockchain.add_block("Transaction 2: Bob pays Charlie 5 coins".to_string());

    println!("Blockchain: {:?}", my_blockchain);

    println!("Is blockchain valid? {}", my_blockchain.is_chain_valid());

    // Tamper with the chain
    println!("Tampering with the blockchain...");
    my_blockchain.chain[1].transactions = "Tampered Transaction".to_string();
    println!("Is blockchain valid? {}", my_blockchain.is_chain_valid());
}
