const fs = require('fs');
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
MONGO_URI = mongodb+srv://josefr:BytMig123@bitcoininfo.6gdhrq4.mongodb.net/bitcoininfo?retryWrites=true&w=majority&appName=Bitcoininfo
ACCESS_TOKEN_SECRET=${ACCESS_TOKEN_SECRET}
REFRESH_TOKEN_SECRET=${REFRESH_TOKEN_SECRET}
`;

const envFilePath = '../../.env';

fs.writeFileSync(envFilePath, envContent);

/*
 run (node generateSecrets.js) in the terminal to generate secrets and write them to the .env file in the root directory of the project
 make sure to be in the correct directory when running the command(secrets-management)
*/

console.log('Secrets generated and written to .env file');
