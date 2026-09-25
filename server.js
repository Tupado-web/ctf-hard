const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;

// Flag terenkripsi XOR dengan key = 42
// Asli: FLAG{hard_core_rev_and_web}
const encryptedFlag = [38, 46, 37, 39, 93, 64, 59, 54, 52, 93, 56, 57, 50, 93, 54, 63, 58, 93, 59, 64, 52, 93, 69, 57, 58];

function decrypt(arr, key) {
    return arr.map(code => String.fromCharCode(code ^ key)).join('');
}

app.get('/vault', (req, res) => {
    const authHeader = req.headers['x-access-token'];

    if (authHeader === "MegaCorp-Secure-Vault-2026") {
        const realFlag = decrypt(encryptedFlag, 42);
        res.send(`
            <div style="font-family: Arial, sans-serif; padding: 40px; max-width: 600px; margin: auto; background: #111; color: #00ffcc; border-radius: 8px;">
                <h2>🟢 ACCESS GRANTED - VAULT 0 UNLOCKED</h2>
                <p>Incredible work. You bypassed the gateway security.</p>
                <hr style="border-color: #00ffcc;">
                <p><b>Flag:</b> ${realFlag}</p>
            </div>
        `);
    } else {
        res.status(403).send(`
            <div style="font-family: Arial, sans-serif; padding: 40px; max-width: 600px; margin: auto; background: #111; color: #ff3333; border-radius: 8px;">
                <h2>🔴 403 FORBIDDEN - GATEWAY BLOCKED</h2>
                <p>Invalid or missing <code>X-Access-Token</code> header.</p>
                <p>Hint: Analyze the client utility script/executable to recover the hidden communication token!</p>
            </div>
        `);
    }
});

app.listen(PORT, () => console.log(`Vault server running on port ${PORT}`));