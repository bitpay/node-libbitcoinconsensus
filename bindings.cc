#include <node.h>
#include <node_buffer.h>
#include <bitcoinconsensus.h>

using namespace v8;

void VerifyScript(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  if (!node::Buffer::HasInstance(args[0])) {
    isolate->ThrowException(Exception::TypeError(
                              String::NewFromUtf8(isolate, "First argument should be a Buffer.")));
    return;
  }

  if (!node::Buffer::HasInstance(args[1])) {
    isolate->ThrowException(Exception::TypeError(
                              String::NewFromUtf8(isolate, "Second argument should be a Buffer.")));
    return;
  }

  unsigned char *scriptPubKey = (unsigned char *) node::Buffer::Data(args[0]);
  unsigned int scriptPubKeyLen = (unsigned int) node::Buffer::Length(args[0]);

  const unsigned char *txTo = (unsigned char *) node::Buffer::Data(args[1]);
  unsigned int txToLen = (unsigned int)node::Buffer::Length(args[1]);

  unsigned int nIn = args[2]->NumberValue();
  unsigned int flags = args[3]->NumberValue();

  bitcoinconsensus_error* err;

  int valid = bitcoinconsensus_verify_script(
    scriptPubKey, scriptPubKeyLen, txTo, txToLen, nIn, flags, err
  );

  args.GetReturnValue().Set(valid);

}

void Version(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  unsigned int version = bitcoinconsensus_version();
  Local<Number> num = Number::New(isolate, version);

  args.GetReturnValue().Set(num);
}

void init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "verifyScript", VerifyScript);
  NODE_SET_METHOD(exports, "version", Version);
}

NODE_MODULE(addon, init)
