SYNOPSIS [![Build Status](https://travis-ci.org/bitpay/libbitcoinconsensus.js.svg?branch=master)](https://github.com/bitpay/libbitcoinconsensus.js)
===

This module provides native bindings to Bitcoin's [libbitcoinconsensus](https://github.com/bitcoin/bitcoin) functions.   
This library is experimental, so use at your own risk.

INSTALL
===

##### from npm

`npm install libbitcoinconsensus`   
Note: you will need to have g++/llvm installed first   

##### from git
```bash
git clone git@github.com:bitpay/libbitcoinconsensus.js.git
cd libbitcoinconsensus.js
git submodule init
git submodule update
npm install
```


NOTE: if you get multiple deprecation warnings on Mac OS X, fear not, you are using Apple's built-in libraries, all should work fine ;) 

USAGE
===
```javascript

'use strict';

var bitcoinconsensus = require('./build/Release/bitcoinconsensus.node');

var version = bitcoinconsensus.version();
console.log(version);

var txTo = new Buffer('01000000015884e5db9de218238671572340b207ee85b628074e7e467096c267266baf77a4000000006a4730440220340f35055aceb14250e4954b23743332f671eb803263f363d1d7272f1d487209022037a0eaf7cb73897ba9069fc538e7275c5ae188e934ae47ca4a70453b64fc836401210234257444bd3aead2b851bda4288d60abe34095a2a8d49aff1d4d19773d22b32cffffffff01a0860100000000001976a9147821c0a3768aa9d1a37e16cf76002aef5373f1a888ac00000000', 'hex');
console.log(txTo);

var scriptPubKey = new Buffer('76a9144621d47f08fcb1e6be0b91144202de7a186deade88ac', 'hex');

console.log(scriptPubKey);

var valid = bitcoinconsensus.verifyScript(scriptPubKey, txTo, 0);

console.log(valid);

var txTo = new Buffer('01000000015884e5db9de218238671572340b207ee85b628074e7e467096c267266baf77a4000000006a4730440220340f35055aceb14250e4954b23743332f671eb803263f363d1d7272f1d487209022037a0eaf7cb73897ba9069fc538e7275c5ae188e934ae47ca4a70453b64fc836401210234257444bd3aead2b851bda4288d60abe34095a2a8d49aff1d4d19773d22b32cffffffff01a0860100000000001976a9147821c0a3768aa9d1a37e16cf76002aef5373f1a888ac00000000', 'hex');

console.log(txTo);

var scriptPubKey = new Buffer('76a9147821c0a3768aa9d1a37e16cf76002aef5373f1a888ac', 'hex');

var valid = bitcoinconsensus.verifyScript(scriptPubKey, txTo, 0);

console.log(valid);

```
API
===

bitconconsensus.version() 
-----------------------------
Get the version of the libbitcoinconsensus library

**Parameters**

none

**Returns**: String representing the version of the library. 

bitcoinconsensus.verifyScript(scriptPubKey, txTo, nIn, flags)
-----------------------------
Verify the script according to the buffers sent in (scriptPubKey)

**Parameters**
* scriptPubKey - `Buffer`
* txTo -  `Buffer`
* nInt - `integer`
* flags - `integer`

**Returns**: integer representing whether the script was valid (1) or not valid (0). 

**Throws**: String exception when an exception is handled by the native library.  

TEST
===
run `npm test`

LICENSE
-----------------------------
MIT
