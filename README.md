# TdcoinJS (tdcoinjs-lib)
[![Build Status](https://travis-ci.org/tdcoinjs/tdcoinjs-lib.png?branch=master)](https://travis-ci.org/tdcoinjs/tdcoinjs-lib)
[![NPM](https://img.shields.io/npm/v/tdcoinjs-lib.svg)](https://www.npmjs.org/package/tdcoinjs-lib)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A javascript Tdcoin library for node.js and browsers. Written in TypeScript, but committing the JS files to verify.

Released under the terms of the [MIT LICENSE](LICENSE).

## Should I use this in production?
If you are thinking of using the *master* branch of this library in production, **stop**.
Master is not stable; it is our development branch, and [only tagged releases may be classified as stable](https://github.com/tdcoinjs/tdcoinjs-lib/tags).


## Can I trust this code?
> Don't trust. Verify.

We recommend every user of this library and the [tdcoinjs](https://github.com/tdcoinjs) ecosystem audit and verify any underlying code for its validity and suitability,  including reviewing any and all of your project's dependencies.

Mistakes and bugs happen, but with your help in resolving and reporting [issues](https://github.com/tdcoinjs/tdcoinjs-lib/issues), together we can produce open source software that is:

- Easy to audit and verify,
- Tested, with test coverage >95%,
- Advanced and feature rich,
- Standardized, using [prettier](https://github.com/prettier/prettier) and Node `Buffer`'s throughout, and
- Friendly, with a strong and helpful community, ready to answer questions.


## Documentation
Presently,  we do not have any formal documentation other than our [examples](#examples), please [ask for help](https://github.com/tdcoinjs/tdcoinjs-lib/issues/new) if our examples aren't enough to guide you.


## Installation
``` bash
npm install tdcoinjs-lib
```

Typically we support the [Node Maintenance LTS version](https://github.com/nodejs/Release).
If in doubt, see the [.travis.yml](.travis.yml) for what versions are used by our continuous integration tests.

**WARNING**: We presently don't provide any tooling to verify that the release on `npm` matches GitHub.  As such, you should verify anything downloaded by `npm` against your own verified copy.


## Usage
Crypto is hard.

When working with private keys, the random number generator is fundamentally one of the most important parts of any software you write.
For random number generation, we *default* to the [`randombytes`](https://github.com/crypto-browserify/randombytes) module, which uses [`window.crypto.getRandomValues`](https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues) in the browser, or Node js' [`crypto.randomBytes`](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback), depending on your build system.
Although this default is ~OK, there is no simple way to detect if the underlying RNG provided is good enough, or if it is **catastrophically bad**.
You should always verify this yourself to your own standards.

This library uses [tiny-secp256k1](https://github.com/tdcoinjs/tiny-secp256k1), which uses [RFC6979](https://tools.ietf.org/html/rfc6979) to help prevent `k` re-use and exploitation.
Unfortunately, this isn't a silver bullet.
Often, Javascript itself is working against us by bypassing these counter-measures.

Problems in [`Buffer (UInt8Array)`](https://github.com/feross/buffer), for example, can trivially result in **catastrophic fund loss** without any warning.
It can do this through undermining your random number generation, accidentally producing a [duplicate `k` value](https://www.nilsschneider.net/2013/01/28/recovering-tdcoin-private-keys.html), sending Tdcoin to a malformed output script, or any of a million different ways.
Running tests in your target environment is important and a recommended step to verify continuously.

Finally, **adhere to best practice**.
We are not an authorative source of best practice, but, at the very least:

* [Don't re-use addresses](https://en.tdcoin.it/wiki/Address_reuse).
* Don't share BIP32 extended public keys ('xpubs'). [They are a liability](https://tdcoin.stackexchange.com/questions/56916/derivation-of-parent-private-key-from-non-hardened-child), and it only takes 1 misplaced private key (or a buggy implementation!) and you are vulnerable to **catastrophic fund loss**.
* [Don't use `Math.random`](https://security.stackexchange.com/questions/181580/why-is-math-random-not-designed-to-be-cryptographically-secure) - in any way - don't.
* Enforce that users always verify (manually) a freshly-decoded human-readable version of their intended transaction before broadcast.
* Don't *ask* users to generate mnemonics, or 'brain wallets',  humans are terrible random number generators.
* Lastly, if you can, use [Typescript](https://www.typescriptlang.org/) or similar.


### Browser
The recommended method of using `tdcoinjs-lib` in your browser is through [Browserify](https://github.com/substack/node-browserify).
If you're familiar with how to use browserify, ignore this and carry on, otherwise, it is recommended to read the tutorial at https://browserify.org/.

**NOTE**: We use Node Maintenance LTS features, if you need strict ES5, use [`--transform babelify`](https://github.com/babel/babelify) in conjunction with your `browserify` step (using an [`es2015`](https://babeljs.io/docs/plugins/preset-es2015/) preset).

**WARNING**: iOS devices have [problems](https://github.com/feross/buffer/issues/136), use atleast [buffer@5.0.5](https://github.com/feross/buffer/pull/155) or greater,  and enforce the test suites (for `Buffer`, and any other dependency) pass before use.

### Typescript or VSCode users
Type declarations for Typescript are included in this library. Normal installation should include all the needed type information.

## Examples
The below examples are implemented as integration tests, they should be very easy to understand.
Otherwise, pull requests are appreciated.
Some examples interact (via HTTPS) with a 3rd Party Blockchain Provider (3PBP).

- [Generate a random address](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/addresses.spec.ts)
- [Import an address via WIF](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/addresses.spec.ts)
- [Generate a 2-of-3 P2SH multisig address](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/addresses.spec.ts)
- [Generate a SegWit address](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/addresses.spec.ts)
- [Generate a SegWit P2SH address](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/addresses.spec.ts)
- [Generate a SegWit 3-of-4 multisig address](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/addresses.spec.ts)
- [Generate a SegWit 2-of-2 P2SH multisig address](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/addresses.spec.ts)
- [Support the retrieval of transactions for an address (3rd party blockchain)](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/addresses.spec.ts)
- [Generate a Testnet address](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/addresses.spec.ts)
- [Generate a Litecoin address](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/addresses.spec.ts)
- [Create a 1-to-1 Transaction](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/transactions.spec.ts)
- [Create (and broadcast via 3PBP) a typical Transaction](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/transactions.spec.ts)
- [Create (and broadcast via 3PBP) a Transaction with an OP\_RETURN output](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/transactions.spec.ts)
- [Create (and broadcast via 3PBP) a Transaction with a 2-of-4 P2SH(multisig) input](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/transactions.spec.ts)
- [Create (and broadcast via 3PBP) a Transaction with a SegWit P2SH(P2WPKH) input](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/transactions.spec.ts)
- [Create (and broadcast via 3PBP) a Transaction with a SegWit P2WPKH input](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/transactions.spec.ts)
- [Create (and broadcast via 3PBP) a Transaction with a SegWit P2PK input](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/transactions.spec.ts)
- [Create (and broadcast via 3PBP) a Transaction with a SegWit 3-of-4 P2SH(P2WSH(multisig)) input](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/transactions.spec.ts)
- [Create (and broadcast via 3PBP) a Transaction and sign with an HDSigner interface (bip32)](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/transactions.spec.ts)
- [Import a BIP32 testnet xpriv and export to WIF](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/bip32.spec.ts)
- [Export a BIP32 xpriv, then import it](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/bip32.spec.ts)
- [Export a BIP32 xpub](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/bip32.spec.ts)
- [Create a BIP32, tdcoin, account 0, external address](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/bip32.spec.ts)
- [Create a BIP44, tdcoin, account 0, external address](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/bip32.spec.ts)
- [Create a BIP49, tdcoin testnet, account 0, external address](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/bip32.spec.ts)
- [Use BIP39 to generate BIP32 addresses](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/bip32.spec.ts)
- [Create (and broadcast via 3PBP) a Transaction where Alice can redeem the output after the expiry (in the past)](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/cltv.spec.ts)
- [Create (and broadcast via 3PBP) a Transaction where Alice can redeem the output after the expiry (in the future)](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/cltv.spec.ts)
- [Create (and broadcast via 3PBP) a Transaction where Alice and Bob can redeem the output at any time](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/cltv.spec.ts)
- [Create (but fail to broadcast via 3PBP) a Transaction where Alice attempts to redeem before the expiry](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/cltv.spec.ts)
- [Create (and broadcast via 3PBP) a Transaction where Alice can redeem the output after the expiry (in the future) (simple CHECKSEQUENCEVERIFY)](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/csv.spec.ts)
- [Create (but fail to broadcast via 3PBP) a Transaction where Alice attempts to redeem before the expiry (simple CHECKSEQUENCEVERIFY)](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/csv.spec.ts)
- [Create (and broadcast via 3PBP) a Transaction where Bob and Charles can send (complex CHECKSEQUENCEVERIFY)](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/csv.spec.ts)
- [Create (and broadcast via 3PBP) a Transaction where Alice (mediator) and Bob can send after 2 blocks (complex CHECKSEQUENCEVERIFY)](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/csv.spec.ts)
- [Create (and broadcast via 3PBP) a Transaction where Alice (mediator) can send after 5 blocks (complex CHECKSEQUENCEVERIFY)](https://github.com/tdcoinjs/tdcoinjs-lib/blob/master/test/integration/csv.spec.ts)

If you have a use case that you feel could be listed here, please [ask for it](https://github.com/tdcoinjs/tdcoinjs-lib/issues/new)!


## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md).


### Running the test suite

``` bash
npm test
npm run-script coverage
```

## Complementing Libraries
- [BIP21](https://github.com/tdcoinjs/bip21) - A BIP21 compatible URL encoding library
- [BIP38](https://github.com/tdcoinjs/bip38) - Passphrase-protected private keys
- [BIP39](https://github.com/tdcoinjs/bip39) - Mnemonic generation for deterministic keys
- [BIP32-Utils](https://github.com/tdcoinjs/bip32-utils) - A set of utilities for working with BIP32
- [BIP66](https://github.com/tdcoinjs/bip66) - Strict DER signature decoding
- [BIP68](https://github.com/tdcoinjs/bip68) - Relative lock-time encoding library
- [BIP69](https://github.com/tdcoinjs/bip69) - Lexicographical Indexing of Transaction Inputs and Outputs
- [Base58](https://github.com/cryptocoinjs/bs58) - Base58 encoding/decoding
- [Base58 Check](https://github.com/tdcoinjs/bs58check) - Base58 check encoding/decoding
- [Bech32](https://github.com/tdcoinjs/bech32) - A BIP173 compliant Bech32 encoding library
- [coinselect](https://github.com/tdcoinjs/coinselect) - A fee-optimizing, transaction input selection module for tdcoinjs-lib.
- [merkle-lib](https://github.com/tdcoinjs/merkle-lib) - A performance conscious library for merkle root and tree calculations.
- [minimaldata](https://github.com/tdcoinjs/minimaldata) - A module to check tdcoin policy: SCRIPT_VERIFY_MINIMALDATA


## Alternatives
- [BCoin](https://github.com/indutny/bcoin)
- [Bitcore](https://github.com/bitpay/bitcore)
- [Cryptocoin](https://github.com/cryptocoinjs/cryptocoin)


## LICENSE [MIT](LICENSE)
