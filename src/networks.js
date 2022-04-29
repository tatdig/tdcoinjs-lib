'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.tdcoin = {
  messagePrefix: '\x18Tdcoin Signed Message:\n',
  bech32: 'tc',
  bip32: {
    public: 0x0488b21e,
    private: 0x0488ade4,
  },
  pubKeyHash: 0x41,
  scriptHash: 0x52,
  wif: 0x6B,
};
exports.regtest = {
  messagePrefix: '\x18Tdcoin Signed Message:\n',
  bech32: 'tdrt',
  bip32: {
    public: 0x043587cf,
    private: 0x04358394,
  },
  pubKeyHash: 0x6f,
  scriptHash: 0x5a,
  wif: 0xef,
};
exports.testnet = {
  messagePrefix: '\x18Tdcoin Signed Message:\n',
  bech32: 'tt',
  bip32: {
    public: 0x043587cf,
    private: 0x04358394,
  },
  pubKeyHash: 0x6f,
  scriptHash: 0x44,
  wif: 0xef,
};
