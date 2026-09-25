const express = require('express');
const app = express();

const encryptedFlag = [38, 46, 37, 39, 93, 64, 59, 54, 52, 93, 56, 57, 50, 93, 54, 63, 58, 93, 59, 64, 52, 93, 69, 57, 58];

function decrypt(arr, key) {
    return arr.map(code => String.fromCharCode(code ^ key)).join('');
}

app.get('/', (req, res) => {
    res.send(`<h2>MegaCorp Vault Gateway</h2><p>Access the secure endpoint at <code>/vault</code> with proper authorization headers.</p>`);
});

app.get('/vault', (req, res) => {
    const authHeader = req.headers['x-access-token'];

    if (authHeader === "MegaCorp-Secure-Vault-2026") {
        const realFlag = decrypt(encryptedFlag, 42);
        res.send(`<h2>🟢 ACCESS GRANTED</h2><p>Flag: ${realFlag}</p>`);
    } else {
        res.status(403).send(`<h2>🔴 403 FORBIDDEN</h2><p>Invalid or missing X-Access-Token header.</p>`);
    }
});

// Penting untuk Vercel Serverless: Ekspor modul app
module.exports = app;