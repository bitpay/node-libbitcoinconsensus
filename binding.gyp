{
  "targets": [
    {
      "target_name": "bitcoinconsensus",
      "sources": [
        "./bindings.cc",
        "./bitcoin/src/script/bitcoinconsensus.cpp",
        "./bitcoin/src/script/bitcoinconsensus.h",
        "./bitcoin/src/script/interpreter.cpp",
        "./bitcoin/src/script/interpreter.h",
        "./bitcoin/src/script/script.cpp",
        "./bitcoin/src/script/script.h",
        "./bitcoin/src/pubkey.cpp",
        "./bitcoin/src/pubkey.h",
        "./bitcoin/src/hash.cpp",
        "./bitcoin/src/hash.h",
        "./bitcoin/src/primitives/transaction.cpp",
        "./bitcoin/src/primitives/transaction.h",
        "./bitcoin/src/ecwrapper.cpp",
        "./bitcoin/src/ecwrapper.h",
        "./bitcoin/src/eccryptoverify.cpp",
        "./bitcoin/src/eccryptoverify.h",
        "./bitcoin/src/utilstrencodings.cpp",
        "./bitcoin/src/utilstrencodings.h",
        "./bitcoin/src/uint256.cpp",
        "./bitcoin/src/uint256.h",
        "./bitcoin/src/crypto/hmac_sha512.cpp", 
        "./bitcoin/src/crypto/hmac_sha512.h", 
        "./bitcoin/src/crypto/rfc6979_hmac_sha256.cpp", 
        "./bitcoin/src/crypto/rfc6979_hmac_sha256.h", 
        "./bitcoin/src/crypto/ripemd160.cpp",
        "./bitcoin/src/crypto/ripemd160.h",
        "./bitcoin/src/crypto/sha1.cpp",
        "./bitcoin/src/crypto/sha1.h",
        "./bitcoin/src/crypto/sha256.cpp",
        "./bitcoin/src/crypto/sha256.h",
        "./bitcoin/src/crypto/sha512.cpp",
        "./bitcoin/src/crypto/sha512.h"
      ],
      'conditions': [
        ['OS=="mac"', {
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
          }
        }],
      ],
     'cflags_cc': [
       '-std=c++11',
       '-fexceptions'
      ],
      "include_dirs" : [
        ".",
        "./bitcoin/src",
        "<!(node -e \"require('nan')\")"
      ],
    }
  ]
}
