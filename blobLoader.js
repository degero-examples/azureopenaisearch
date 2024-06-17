
const { BlobServiceClient } = require("@azure/storage-blob");

require("dotenv").config();

const account = process.env.STORAGE_NAME || "";
const sas = process.env.STORAGE_SAS || "";
const container = process.env.STORAGE_CONTAINER || "";

async function streamToText(readable) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}

// Get data for indexing from blob storage
async function getBlobArray() {
  const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net?${sas}`);
  const containerClient = blobServiceClient.getContainerClient(container);

  let results = [];

  for await (const blob of containerClient.listBlobsFlat()) {
    const blobClient = containerClient.getBlockBlobClient(blob.name);
    const downloadBlockBlobResponse = await blobClient.download(0);

    const jsonContent = await streamToText(downloadBlockBlobResponse.readableStreamBody)

    // Parse the JSON content.
    const jsonData = JSON.parse(jsonContent);

    results.push(jsonData)

  }

  console.log('data: ' + JSON.stringify(results));

  return results;
}

module.exports = { getBlobArray };