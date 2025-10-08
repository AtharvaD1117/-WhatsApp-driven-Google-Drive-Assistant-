require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { handleCommand } = require('./drive');
const { startOAuth, oauthCallback } = require('./oauth');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pendingUploads = {};

// Twilio Webhook — receives WhatsApp messages
app.post('/webhook', async (req, res) => {
  try {
    console.log('Webhook payload:', req.body);

    const from = req.body?.From || req.body?.from || '';
    const body = (req.body?.Body || req.body?.body || '').trim();
    const mediaUrls = [];

    Object.keys(req.body || {}).forEach(key => {
      const match = key.match(/^MediaUrl(\d+)$/);
      if (match) mediaUrls.push(req.body[key]);
    });

    const safeBody = body || '';

    // store media temporarily
    if (mediaUrls.length > 0) {
      pendingUploads[from] = mediaUrls;
      console.log(`Stored ${mediaUrls.length} media file(s) for ${from}`);
    }

    const reply = await handleCommand({
      from: from,
      body: safeBody,
      media: mediaUrls.length > 0 ? mediaUrls : pendingUploads[from] || [],
    });

    if (safeBody.toUpperCase().startsWith('UPLOAD')) {
      delete pendingUploads[from];
    }

    res.send('<Response><Message>' + reply + '</Message></Response>');
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).send('error');
  }
});

// Google OAuth Routes
app.get('/auth', startOAuth);
app.get('/oauth2callback', oauthCallback);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
