address treasury{

    
    module treasury{

        // use std::vector;
        use std::coin::{
                Self, 
                // CoinStore,
                // Coin,
                register,
                transfer,
                is_account_registered
                // balance
            };
        use std::signer::address_of;
        // use std::string;

        struct CoinType has key {}

        public fun withdrawCoin<CoinType>(root: &signer, account: &signer, amount: u64){
            if (!is_account_registered<CoinType>(address_of(account))) register<CoinType>(account);
            let account_addr: address = address_of(account);
            transfer<CoinType>(
                root,
                account_addr,
                amount
            );
        }

        public fun depositCoin<CoinType>(root: &signer, account: &signer, amount: u64){
            // Register coin at this address
            // Register checks if coin is already registered at address and creates a CoinStore with 0 coin at the address
            if (!is_account_registered<CoinType>(address_of(root))) register<CoinType>(root);
            // Now that coin is registered and CoinStore is created, withdraw coins from signer
            let root_addr: address = address_of(root);
            transfer<CoinType>(
                account,
                root_addr,
                amount
            );
        }

        #[test_only]
        use aptos_framework::account::create_account_for_test;
        #[test_only]
        use aptos_framework::coin::{
            balance
        };     
        #[test_only]
        use aptos_framework::managed_coin;
        #[test_only]
        use std::debug;
        #[test_only]
        struct FakeMoneyA {}
        #[test_only]
        struct FakeMoneyB {}

        #[test(root = @treasury, account = @0x2)]
        public entry fun run_it_up(root: &signer, account: &signer){

            // let test: u64 = 10;
            // debug::print<u64>(&test);

            managed_coin::initialize<FakeMoneyA>(root, b"FakeMoneyA", b"FAKEA", 8, false);
            managed_coin::initialize<FakeMoneyB>(root, b"FakeMoneyB", b"FAKEB", 8, false);


            let account_addr = address_of(account);
            let root_addr = address_of(root);
            create_account_for_test(account_addr);
            create_account_for_test(root_addr);

            coin::register<FakeMoneyA>(account);
            managed_coin::mint<FakeMoneyA>(root, address_of(account), 500);
            coin::register<FakeMoneyB>(account);
            managed_coin::mint<FakeMoneyB>(root, address_of(account), 500);

            debug::print<u64>(&balance<FakeMoneyA>(account_addr));
            debug::print<u64>(&balance<FakeMoneyB>(account_addr));
            // debug::print<u64>(&balance<FakeMoneyB>(root_addr));
            depositCoin<FakeMoneyA>(root, account, 120);
            debug::print<u64>(&balance<FakeMoneyA>(root_addr));
            debug::print<u64>(&balance<FakeMoneyA>(account_addr));
            withdrawCoin<FakeMoneyA>(root, account, 60);
            debug::print<u64>(&balance<FakeMoneyA>(root_addr));
            debug::print<u64>(&balance<FakeMoneyA>(account_addr));
            // assert!(balance<FakeMoney>(account_addr) == 100, 4);
        }

    }
}

// Create function to check for different coinstores 
// Create function to register a new coin