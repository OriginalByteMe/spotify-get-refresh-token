require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:3000/callback';
const SCOPE = ['user-read-currently-playing', 'user-top-read', 'user-read-recently-played', 'user-library-read']; // Add scopes as needed

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in a .env file');
  process.exit(1);
}

app.get('/', (req, res) => {
  res.send(`
    <h1>Spotify Token Generator</h1>
    <a href="/login">Click here to authorize</a>
  `);
});

app.get('/login', (req, res) => {
  const redirectUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${SCOPE.join('%20')}&redirect_uri=${REDIRECT_URI}&show_dialog=true`;
  res.redirect(redirectUrl);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code;
  
  try {
    // Get initial tokens
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: CLIENT_ID,
          password: CLIENT_SECRET,
        },
      }
    );
    
    const { access_token, refresh_token, expires_in } = tokenResponse.data;
    
    res.send(`
      <h1>Success!</h1>
      <p>Here is your refresh token (save this somewhere secure):</p>
      <pre>${refresh_token}</pre>
      <p>Access token (expires in ${expires_in} seconds):</p>
      <pre>${access_token}</pre>
    `);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).send(`Error: ${error.message}`);
  }
});

app.listen(3000, () => {
  console.log('Server running at http://127.0.0.1:3000');
  console.log('IMPORTANT: Make sure to add exactly "http://127.0.0.1:3000/callback" to your Redirect URIs in the Spotify Developer Dashboard');
});
