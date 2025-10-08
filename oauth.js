const { google } = require('googleapis');
const { saveToken } = require('./drive');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.BASE_URL + '/oauth2callback'
);

const SCOPES = ['https://www.googleapis.com/auth/drive'];

function startOAuth(req, res) {
  const phone = req.query.phone;
  if (!phone) return res.status(400).send('Missing phone number');

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    state: phone
  });

  res.redirect(url);
}

async function oauthCallback(req, res) {
  const code = req.query.code;
  const phone = req.query.state;

  if (!code || !phone) return res.status(400).send('Missing code or phone');

  try {
    const { tokens } = await oauth2Client.getToken(code);
    await saveToken(phone, tokens);
    res.send("✅ Authentication successful! Return to WhatsApp and try again.");
  } catch (err) {
    console.error("OAuth error:", err);
    res.status(500).send("Failed to authenticate.");
  }
}

module.exports = { startOAuth, oauthCallback };
