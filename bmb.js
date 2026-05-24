const express = require('express');
const app = express();
__path = process.cwd()
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8000;
let server = require('./qr'),
    code = require('./pair');
require('events').EventEmitter.defaultMaxListeners = 500;

// ==================== JAMALI TECH MD CONFIGURATION ====================
const BOT_NAME = 'JAMALI TECH MD';
const BOT_VERSION = '2.0.0';
const OWNER_NUMBER = '255784062158';
const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbC7AgJK5cD71vGIpO3h';
const REPO_LINK = 'https://github.com/jamalitechempire/Jamali-tech-bot';

// ==================== MIDDLEWARE ====================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ==================== ROUTES ====================
app.use('/server', server);
app.use('/code', code);

// QR Page
app.use('/qr', async (req, res, next) => {
    res.sendFile(__path + '/qr.html');
});

// Pair Page
app.use('/pair', async (req, res, next) => {
    res.sendFile(__path + '/pair.html');
});

// Main Page
app.use('/', async (req, res, next) => {
    res.sendFile(__path + '/main.html');
});

// ==================== HEALTH CHECK ====================
app.get('/health', (req, res) => {
    res.json({
        status: 'active',
        bot: BOT_NAME,
        version: BOT_VERSION,
        owner: OWNER_NUMBER,
        channel: CHANNEL_LINK,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// ==================== BOT INFO API ====================
app.get('/api/info', (req, res) => {
    res.json({
        name: BOT_NAME,
        version: BOT_VERSION,
        owner: OWNER_NUMBER,
        channel: CHANNEL_LINK,
        repo: REPO_LINK,
        pairingCode: 'JAMALITZ'
    });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║                    JAMALI TECH MD SERVER                     ║
║                    PREMIUM WHATSAPP BOT                      ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   🚀 Server running on: http://localhost:${PORT}               ║
║   🔗 QR Page: http://localhost:${PORT}/qr                      ║
║   🔑 Pair Page: http://localhost:${PORT}/pair                  ║
║   🏠 Main Page: http://localhost:${PORT}/                      ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   🤖 Bot Name: ${BOT_NAME}                                     ║
║   🔢 Version: ${BOT_VERSION}                                   ║
║   👑 Owner: ${OWNER_NUMBER}                                    ║
║   🔑 Pairing Code: JAMALITZ                                   ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   📢 Channel: ${CHANNEL_LINK}                                  ║
║   📦 Repo: ${REPO_LINK}                                        ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║   ⚡ POWERED BY JAMALI TECH EMPIRE                            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
