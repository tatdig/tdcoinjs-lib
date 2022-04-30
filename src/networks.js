'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.tdcoin = {
  messagePrefix: '\x17Tdcoin Signed Message:\n',  
  bech32: 'tc',
  bip32: {
    public: 0x0488b21e, //{0x04, 0x88, 0xB2, 0x1E}
    private: 0x0488ade4, //{0x04, 0x88, 0xAD, 0xE4}
  },
  pubKeyHash: 0x41, //65
  scriptHash: 0x52, //82
  wif: 0x6b, //107
};
exports.regtest = {
  messagePrefix: '\x17Tdcoin Signed Message:\n',
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
  messagePrefix: '\x17Tdcoin Signed Message:\n',
  bech32: 'tt',
  bip32: {
    public: 0x043587cf,
    private: 0x04358394,
  },
  pubKeyHash: 0x6f,
  scriptHash: 0x44,
  wif: 0xef,
};
