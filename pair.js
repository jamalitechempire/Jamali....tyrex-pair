const { makeid } = require('./gen-id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    delay, 
    Browsers, 
    makeCacheableSignalKeyStore 
} = require('@whiskeysockets/baileys');

const { upload } = require('./mega');

// ==================== JAMALI TECH MD CONFIGURATION ====================
const BOT_NAME = 'JAMALI TECH MD';
const OWNER_NUMBER = '255784062158';
const CHANNEL_LINK = 'https://whatsapp.com/channel/0029VbC7AgJK5cD71vGIpO3h';
const REPO_LINK = 'https://github.com/jamalitechempire/Jamali-tech-bot';
const BOT_LOGO = 'https://i.ibb.co/XfYqpkmm/be2de0bd1b96.jpg';
const PAIRING_CODE_NAME = 'JAMALITZ';
const NEWSLETTER_JID = '120363402325089913@newsletter';

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;

    async function JAMALI_TECH_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        
        try {
            const items = ["JAMALI TECH", "Chrome", "Firefox", "Edge", "Brave", "Opera"];
            const randomItem = items[Math.floor(Math.random() * items.length)];
            
            let sock = makeWASocket({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                generateHighQualityLinkPreview: true,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                syncFullHistory: false,
                browser: Browsers.macOS(randomItem)
            });
            
            if (!sock.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await sock.requestPairingCode(num, PAIRING_CODE_NAME);
                if (!res.headersSent) await res.send({ code });
            }
            
            sock.ev.on('creds.update', saveCreds);
            
            sock.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection == "open") {
                    await delay(3000);
                    let rf = __dirname + `/temp/${id}/creds.json`;

                    function generateJAMALI_ID() {
                        const prefix = "JAMALI";
                        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        let jamaliID = prefix;
                        for (let i = prefix.length; i < 22; i++) {
                            jamaliID += characters.charAt(Math.floor(Math.random() * characters.length));
                        }
                        return jamaliID;
                    }
                    
                    const jamaliID = generateJAMALI_ID();

                    try {
                        const mega_url = await upload(fs.createReadStream(rf), `${sock.user.id}.json`);
                        const string_session = mega_url.replace('https://mega.nz/file/', '');
                        let session_code = "jamali~" + string_session;
                        
                        let code = await sock.sendMessage(sock.user.id, { text: session_code });
                        
                        // ===== Message with BOX for JAMALI TECH MD =====
                        let desc = `╔══════════════════════════════════════════════════════╗
║                    JAMALI TECH MD                    ║
║              PREMIUM WHATSAPP BOT                    ║
╚══════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────┐
│  ✅ SESSION GENERATED SUCCESSFULLY                   │
├─────────────────────────────────────────────────────┤
│  🔑 Session ID: Sent above
│  ⚠️ Do not share this code with anyone!
│  🔒 Keep this code safe and secure
│  ⏰ Valid for 24 hours only
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  📋 SAFETY RULES                                     │
├─────────────────────────────────────────────────────┤
│  • Never share your session ID
│  • Use only on trusted devices
│  • Logout after use on shared devices
│  • Contact owner if compromised
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  📢 OFFICIAL CHANNEL                                 │
├─────────────────────────────────────────────────────┤
│  🔗 ${CHANNEL_LINK}
│  📌 Follow for updates and support
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  💻 GITHUB REPOSITORY                                │
├─────────────────────────────────────────────────────┤
│  🔗 ${REPO_LINK}
│  ⭐ Star & Fork the repo!
│  🔄 Contribute to the project
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  👑 OWNER CONTACT                                    │
├─────────────────────────────────────────────────────┤
│  📞 WhatsApp: wa.me/${OWNER_NUMBER}
│  💬 For support and inquiries
└─────────────────────────────────────────────────────┘

> *♱♱♱♱♱ POWERED BY JAMALI TECH EMPIRE ♱♱♱♱♱*`;

                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: BOT_NAME,
                                    body: `© ${BOT_NAME}`,
                                    thumbnailUrl: BOT_LOGO,
                                    thumbnailWidth: 64,
                                    thumbnailHeight: 64,
                                    sourceUrl: CHANNEL_LINK,
                                    mediaUrl: BOT_LOGO,
                                    showAdAttribution: true,
                                    renderLargerThumbnail: false,
                                    previewType: 'PHOTO',
                                    mediaType: 1
                                },
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: NEWSLETTER_JID,
                                    newsletterName: `✨ ${BOT_NAME} ✨`,
                                    serverMessageId: Math.floor(Math.random() * 1000000)
                                },
                                isForwarded: true,
                                forwardingScore: 999
                            }
                        }, { quoted: code });

                    } catch (e) {
                        let ddd = await sock.sendMessage(sock.user.id, { text: e.toString() });
                        
                        let desc = `╔══════════════════════════════════════════════════════╗
║                    JAMALI TECH MD                    ║
║              PREMIUM WHATSAPP BOT                    ║
╚══════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────┐
│  ⚠️ SESSION WARNING                                  │
├─────────────────────────────────────────────────────┤
│  🔑 Session ID: Sent above
│  ⚠️ Do not share this code with anyone!
│  🔒 Keep this code safe and secure
│  ⏰ Valid for 24 hours only
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  📋 SAFETY RULES                                     │
├─────────────────────────────────────────────────────┤
│  • Never share your session ID
│  • Use only on trusted devices
│  • Logout after use on shared devices
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  📢 OFFICIAL CHANNEL                                 │
├─────────────────────────────────────────────────────┤
│  🔗 ${CHANNEL_LINK}
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  💻 GITHUB REPOSITORY                                │
├─────────────────────────────────────────────────────┤
│  🔗 ${REPO_LINK}
│  ⭐ Star & Fork the repo!
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  👑 OWNER CONTACT                                    │
├─────────────────────────────────────────────────────┤
│  📞 WhatsApp: wa.me/${OWNER_NUMBER}
└─────────────────────────────────────────────────────┘

> *♱♱♱♱♱ POWERED BY JAMALI TECH EMPIRE ♱♱♱♱♱*`;

                        await sock.sendMessage(sock.user.id, {
                            text: desc,
                            contextInfo: {
                                externalAdReply: {
                                    title: BOT_NAME,
                                    body: `© ${BOT_NAME}`,
                                    thumbnailUrl: BOT_LOGO,
                                    thumbnailWidth: 64,
                                    thumbnailHeight: 64,
                                    sourceUrl: CHANNEL_LINK,
                                    mediaUrl: BOT_LOGO,
                                    showAdAttribution: true,
                                    renderLargerThumbnail: false,
                                    previewType: 'PHOTO',
                                    mediaType: 1
                                },
                                forwardedNewsletterMessageInfo: {
                                    newsletterJid: NEWSLETTER_JID,
                                    newsletterName: `✨ ${BOT_NAME} ✨`,
                                    serverMessageId: Math.floor(Math.random() * 1000000)
                                },
                                isForwarded: true,
                                forwardingScore: 999
                            }
                        }, { quoted: ddd });
                    }

                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} 🔥 ${BOT_NAME} Session Connected ✅`);
                    await delay(10);
                    process.exit();

                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    JAMALI_TECH_PAIR_CODE();
                }
            });
            
        } catch (err) {
            console.log(`⚠️ ${BOT_NAME} Connection failed — Restarting service...`);
            await removeFile('./temp/' + id);
            if (!res.headersSent) await res.send({ code: `❗ ${BOT_NAME} Service Unavailable` });
        }
    }

    return await JAMALI_TECH_PAIR_CODE();
});

module.exports = router;
