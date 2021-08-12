const proxyquire = require("proxyquire");
const { expect } = require("chai");
const awsSDKclientS3Mock = require("./mocks/awsSDKclientS3.mock");
const awsS3Service = proxyquire("../../src/services/awsS3.service.js", {
  "@aws-sdk/client-s3": awsSDKclientS3Mock,
});

describe("When getContactStats method is called", function () {
  it("Should return the mapped stats object and call send method from S3Client class", async function () {
    const response = await awsS3Service.getContactStats();
    expect(response).to.be.deep.eq({
      totalContactoClientes: "250",
      motivoReclamo: "25,",
      motivoGarantia: "10,",
      motivoDuda: "100,",
      motivoCompra: "100,",
      motivoFelicitaciones: "7,",
      motivoCambio: "8,",
      hash: "2f941516446dce09bc2841da60bf811f",
    });
    expect(awsSDKclientS3Mock.s3ClienSendtStub.called).to.be.true
  });

  it("Should return an error when file not exists", async function () {
      try {
          const response = await awsS3Service.getContactStats("data1.txt");
      } catch (error) {
          expect(error.message).eq("File not exists");
      }
  });
});
