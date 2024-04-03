/* 
   fs module helps you work with files and directories in your computer. It lets you do things like read files,
   write to files, create new files, delete files, and manage directories. 
   It's like a toolbox full of tools for handling files and folders in your code.
*/
const fs = require('fs');

/*
   The crypto module helps you work with cryptography, which is all about securing information.
   It provides tools for creating and verifying digital signatures, encrypting and decrypting data,
   and generating random numbers. It's like a set of tools for keeping information safe and secure in your code.
*/
const crypto = require('crypto');

require('dotenv').config();

// Generate a random secret of specified length (in bytes)
function generateSecret(length) {
    return crypto.randomBytes(length).toString('hex');
}

// Generate secrets
const ACCESS_TOKEN_SECRET = generateSecret(32); // 256 bits
const REFRESH_TOKEN_SECRET = generateSecret(32); // 256 bits

// Write secrets to .env file
const envContent =
`
PORT=9999
MONGO_URI=mongodb+srv://josefr:BytMig123@bitcoininfo.6gdhrq4.mongodb.net/bitcoininfo?retryWrites=true&w=majority&appName=Bitcoininfo
ACCESS_TOKEN_SECRET=${ACCESS_TOKEN_SECRET}
REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET}
`;

// Filepath for where the .env file should be written
const envFilePath = '../../.env';

// Write content to .env file
fs.writeFileSync(envFilePath, envContent);

// !!! IMPORTANT !!!
/*
Run (node generateSecrets.js) in the terminal to generate the secrets and write them to the .env file in the root directory of the project.
Make sure to be in the correct directory when running the command (secrets-management).
*/

console.log('Secrets generated and written to .env file');
