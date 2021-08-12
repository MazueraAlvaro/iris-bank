const { S3Client, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const getS3Client = function () {
  return new S3Client({
    credentials: {
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      accessKeyId: process.env.ACCESS_KEY_ID,
    },
    region: process.env.AWS_REGION,
  });
};

const getContactStatsFile = async function () {
  const s3Client = getS3Client();
  const params = {
    Bucket: "fdr-developer-test-22122020",
    Key: "data.txt",
  };
  const command = new GetObjectCommand(params);
  return s3Client.send(command);
};

/**
 *
 * @returns {String}
 */
const getContactStats = async function () {
  const file = await getContactStatsFile();
  const contentPromise = new Promise((resolve, reject) => {
    const chunks = [];
    file.Body.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    file.Body.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    file.Body.on("error", (err) => reject(err));
  });
  return mapStats(await contentPromise);
};

/**
 *
 * @param {String} content
 */
const mapStats = function (content) {
  const entries = content.split("\n").map((value) => value.split("="));
  return Object.fromEntries(entries);
};

const deleteStats = function () {
  const s3Client = getS3Client();
  const params = {
    Bucket: "fdr-developer-test-22122020",
    Key: "data.txt",
  };
  const command = new DeleteObjectCommand(params);
  return s3Client.send(command);
};

module.exports = { getContactStats, deleteStats };
