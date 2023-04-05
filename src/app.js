const express = require('express');

const app = express();
let connectedUsers = [];
let tweets = [];

app.use(express.json());

// ROTAS
app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    return res.status(400).json({ error: 'username and avatar are required' });
  }
  res.status(201).json({ message: "OK" });
  connectedUsers.push(username);
});
app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;
  
  if (!username || !tweet) {
    return res.status(400).json({ error: 'username and tweet are required' });
  }

  if (!connectedUsers.includes(username)) {
    return res.status(401).json({ error: 'UNAUTHORIZED' });
  }
  res.status(201).json({ message: 'Tweet created successfully' });
  tweets.push(tweet)
});


// Start
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});