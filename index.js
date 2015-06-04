'use strict';

var bitcoinconsensus = require('./build/Release/bitcoinconsensus.node');
module.exports = {};
module.exports.verifyScript = bitcoinconsensus.verifyScript;
module.exports.version = bitcoinconsensus.version;
module.exports.FLAGS = {
  SCRIPT_VERIFY_NONE: 0,
  SCRIPT_VERIFY_P2SH: (1 << 0),
  SCRIPT_VERIFY_DERSIG: (1 << 2)
};
module.exports.ERRORS = [
  "OK",
  "TX_INDEX",
  "TX_SIZE_MISMATCH",
  "TX_DESERIALIZE"
];
