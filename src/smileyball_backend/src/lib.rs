use ic_cdk::query;
use candid::{Principal, CandidType};
use ic_cdk::caller;
use serde::{Deserialize, Serialize};
use crc32fast::Hasher;
use hex::encode;

#[derive(CandidType, Deserialize, Serialize, Clone)]
pub struct Subaccount(pub [u8; 32]);

impl Subaccount {
    pub fn new(principal: &Principal) -> Self {
        let mut subaccount = [0u8; 32];
        let principal_bytes = principal.as_slice();
        subaccount[..principal_bytes.len()].copy_from_slice(principal_bytes);
        Subaccount(subaccount)
    }
}

#[derive(CandidType, Deserialize, Serialize, Clone)]
pub struct AccountIdentifier {
    pub principal: Principal,
    pub subaccount: Subaccount,
}

impl AccountIdentifier {
    pub fn new(principal: &Principal, subaccount: &Subaccount) -> Self {
        AccountIdentifier {
            principal: *principal,
            subaccount: subaccount.clone(),
        }
    }

    pub fn to_bytes(&self) -> Vec<u8> {
        let mut bytes = Vec::new();
        bytes.extend_from_slice(self.principal.as_slice());
        bytes.extend_from_slice(&self.subaccount.0);
        bytes
    }
}

#[query]
pub fn whoami() -> Principal {
    caller()
}

#[query]
pub fn id_to_account() -> AccountIdentifier {
    let principal = caller();
    let subaccount = Subaccount::new(&principal);
    AccountIdentifier::new(&principal, &subaccount)
}

#[query]
pub fn account_to_text() -> String {
    let account_id = id_to_account();
    to_text(&account_id)
}

pub fn to_text(account_id: &AccountIdentifier) -> String {
    let account_bytes = account_id.to_bytes();

    let slice_length = account_bytes.len().min(56);
    let mut hasher = Hasher::new();
    hasher.update(&account_bytes[..slice_length]);
    let crc32 = hasher.finalize();

    let mut result = Vec::new();
    result.extend_from_slice(&crc32.to_le_bytes());
    result.extend_from_slice(&account_bytes);

    encode(result)
}

// Enable Candid export
ic_cdk::export_candid!();
