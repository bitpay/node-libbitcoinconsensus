var assert = require('assert');
var benchmark = require('benchmark');
var bitcoinconsensus = require('../');
var bitcore = require('bitcore');
var async = require('async');

var maxTime = 10;

console.log('Benchmarking Script Validation with "libbitcoinconsensus" vs "bitcore"');
console.log('----------------------------------------------------------------------');

async.series([
  function(next) {

    var txTo = new Buffer('01000000015884e5db9de218238671572340b207ee85b628074e7e467096c267266baf77a4000000006a4730440220340f35055aceb14250e4954b23743332f671eb803263f363d1d7272f1d487209022037a0eaf7cb73897ba9069fc538e7275c5ae188e934ae47ca4a70453b64fc836401210234257444bd3aead2b851bda4288d60abe34095a2a8d49aff1d4d19773d22b32cffffffff01a0860100000000001976a9147821c0a3768aa9d1a37e16cf76002aef5373f1a888ac00000000', 'hex');

    var scriptSig = new Buffer('473044022078200132c79b4484fa9fe7d890a4dac551f29e82d39fa92aa8b1f7486720666f02200b98c3cb9c6e76498d87fc5b3141b697782b2c3eec7b155d36fee6a7ea7393b901210228c64544740c51b9bd37df5bb9cdf79391398f32a030cbe9cc74e55098fea945', 'hex');
    var scriptPubKey = new Buffer('76a9144621d47f08fcb1e6be0b91144202de7a186deade88ac', 'hex');

    var valid = bitcoinconsensus.verifyScript(scriptPubKey, txTo, 0);
    assert.equal(valid, true);

    var pk = bitcore.Script.fromBuffer(scriptPubKey);
    var ss = bitcore.Script.fromBuffer(scriptSig);
    var tx = bitcore.Transaction().fromBuffer(txTo);
    bitcore.Script.Interpreter().verify(ss, pk, tx, 0);
    assert.equal(valid, true);

    function newData() {
      var privateKey = new bitcore.PrivateKey();
      var publicKey = privateKey.publicKey;
      var fromAddress = publicKey.toAddress();
      var toAddress = 'mrU9pEmAx26HcbKVrABvgL7AwA5fjNFoDc';
      var scriptPubKey = bitcore.Script.buildPublicKeyHashOut(fromAddress);
      var utxo = {
        address: fromAddress,
        txId: 'a477af6b2667c29670467e4e0728b685ee07b240235771862318e29ddbe58458',
        outputIndex: 0,
        script: scriptPubKey,
        satoshis: 100000
      };
      var tx = new bitcore.Transaction()
        .from(utxo)
        .to(toAddress, 100000)
        .sign(privateKey);

      var inputIndex = 0;
      var signature = tx.getSignatures(privateKey)[inputIndex].signature;
      var scriptSig = bitcore.Script.buildPublicKeyHashIn(publicKey, signature);

      return {
        scriptPubKey: scriptPubKey,
        scriptSig: scriptSig,
        tx: tx
      };
    }

    var fixtures = [];

    console.log('Generating random benchmarking transactions');
    for (var i = 0; i < 500; i++) {
      var data = newData();
      fixtures.push(data);
    }

    console.log('Starting');

    var a = 0;

    function libbitcoinconsensusVerify() {
      if (a >= 500) {
        a = 0;
      }
      var data = fixtures[a++];
      var scriptPubKey = data.scriptPubKey.toBuffer();
      var txTo = data.tx.toBuffer();
      bitcoinconsensus.verifyScript(scriptPubKey, txTo, 0);
    }

    var b = 0;

    function bitcoreVerify() {
      if (b >= 500) {
        b = 0;
      }
      var data = fixtures[b++];
      bitcore.Script.Interpreter().verify(data.scriptSig, data.scriptPubKey, data.tx, 0);
    }

    // #verifyScript
    var suite = new benchmark.Suite();
    suite.add('bitcore', bitcoreVerify, { maxTime: maxTime });
    suite.add('libbitcoinconsensus', libbitcoinconsensusVerify, { maxTime: maxTime });
    suite
      .on('cycle', function(event) {
        console.log(String(event.target));
      })
      .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
        console.log('----------------------------------------------------------------------');
        next();
      })
      .run();
  }
], function(err) {
  console.log('Finished');
});
