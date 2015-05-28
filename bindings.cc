#include <node.h>
#include <node_buffer.h>
#include <nan.h>
#include <bitcoinconsensus.h>

using namespace v8;

NAN_METHOD(VerifyScript) {
  NanScope();

  if (!node::Buffer::HasInstance(args[0])) {
    return NanThrowTypeError("First argument should be a Buffer.");
  }

  if (!node::Buffer::HasInstance(args[1])) {
    return NanThrowTypeError("Second argument should be a Buffer.");
  }
  
  unsigned char *scriptPubKey = (unsigned char *) node::Buffer::Data(args[0]);
  unsigned int scriptPubKeyLen = (unsigned int) node::Buffer::Length(args[0]);

  const unsigned char *txTo = (unsigned char *) node::Buffer::Data(args[1]);
  unsigned int txToLen = (unsigned int)node::Buffer::Length(args[1]);

  unsigned int nIn = args[2]->NumberValue();
  unsigned int flags = args[3]->NumberValue();

  bitcoinconsensus_error* err;
  err = 0;

  int valid = bitcoinconsensus_verify_script(scriptPubKey, scriptPubKeyLen, txTo, txToLen, nIn, flags, err);

  if (!valid && err) {
    NanThrowError("The transaction was not valid");
  }

  NanReturnValue(NanNew<Number>(valid));


}

NAN_METHOD(Version) {
  NanScope();

  unsigned int version = bitcoinconsensus_version();

  NanReturnValue(NanNew<Number>(version));
}

void init(Handle<Object> exports) {
  exports->Set(NanNew<String>("verifyScript"),
               NanNew<FunctionTemplate>(VerifyScript)->GetFunction());

  exports->Set(NanNew<String>("version"),
               NanNew<FunctionTemplate>(Version)->GetFunction());
}

NODE_MODULE(addon, init)
