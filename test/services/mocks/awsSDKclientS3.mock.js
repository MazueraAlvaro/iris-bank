const sinon = require("sinon");
const mockedStream = new require("stream").Readable();
mockedStream._read = function () {};
class S3Client {
  send(...args) {
    return s3ClienSendtStub(...args);
  }
}
class GetObjectCommand {
  constructor(params) {
    this.params = params;
  }
}
class DeleteObjectCommand {}

const s3ClienSendtStub = sinon.stub();

setTimeout(() => {
  mockedStream.emit(
    "data",
    `totalContactoClientes=250
motivoReclamo=25,
motivoGarantia=10,
motivoDuda=100,
motivoCompra=100,
motivoFelicitaciones=7,
motivoCambio=8,
hash=2f941516446dce09bc2841da60bf811f`
  );
  mockedStream.emit("end");
}, 2000);

s3ClienSendtStub
  .withArgs(
    new GetObjectCommand({
      Bucket: "fdr-developer-test-22122020",
      Key: "data.txt",
    })
  )
  .resolves({ Body: mockedStream });

s3ClienSendtStub
  .withArgs(
    new GetObjectCommand({
      Bucket: "fdr-developer-test-22122020",
      Key: "data1.txt",
    })
  )
  .rejects(new Error("File not exists"));

module.exports = { S3Client, GetObjectCommand, DeleteObjectCommand, s3ClienSendtStub };
