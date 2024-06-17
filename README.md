# Azure Open AI Retrieval Augmented Generation

This is based off Microsoft's sample cookbook https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/openai/openai/samples/cookbook/bringYourOwnData/ under MIT licence.

## Dependencies

- Azure Open AI model (eg GPT-4)
- Azure AI Search
- Storage account (optional see below)

## Environment settings

Please copy sample.env to a .env file and fill in your Azure Open AI / Search api details

## Run

node ./index.js

## Blob storage

You can upload the files in the 'testblobfiles' directory to a blob storage container and specify in the sample.env settings fields prefixed STORAGE_ to use data from there instead of the hotels.json file.