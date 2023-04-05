const express = require('express');

const app = express();
const connectedUsers = [];
const tweets = [];

app.use(express.json());

// ROTAS
app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    return res.status(400).json({ error: 'username and avatar are required' });
  }
  if (typeof username !== 'string' || typeof avatar !== 'string') {
    return res.status(400).json({ error: 'username and avatar must be strings' });
  }

  res.status(201).json({ message: "OK" });
  connectedUsers.push({username: username, avatar: avatar});
});

app.post('/tweets', (req, res) => {
  let username = req.body.username || req.header('user');
  const { tweet } = req.body;
  
  if (!username || !tweet) {
    return res.status(400).json({ error: 'username and tweet are required' });
  }
  if (typeof username !== 'string' || typeof tweet !== 'string') {
    return res.status(400).json({ error: 'username and avatar must be strings' });
  }

  if (!connectedUsers.some(user => user.username === username)) {
    return res.status(401).json({ error: 'UNAUTHORIZED' });
  }
  res.status(201).json({ message: 'Tweet created successfully' });
  tweets.push({username: username, tweet: tweet})
});

app.get('/tweets', (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the value of page from query string, default to 1
  if (page < 1) {
    return res.status(400).json({ error: 'Informe uma página válida!' });
  }
  const tweetsForPage = fetchTweetsFromDataSource(page)
  const tweetsWithAvatar = tweetsForPage.map(tweet => {
    const userAvatar = getAvatar(tweet.username)
    return {username: tweet.username, avatar: userAvatar, tweet: tweet.tweet}
  })
  res.json(tweetsWithAvatar);
});

app.get('/tweets/:username', (req, res) => {
  const { username } = req.params;
  const userTweets = tweetsFromUser(username);
  const tweetsWithAvatar = userTweets.map(tweet => {
    const userAvatar = getAvatar(tweet.username)
    return {username: tweet.username, avatar: userAvatar, tweet: tweet.tweet}
  })
  res.json(tweetsWithAvatar);
});

function fetchTweetsFromDataSource(page) {
  const tweetsPerPage = 10;
  const startIndex = Math.max(tweets.length - (page * tweetsPerPage), 0);
  const endIndex = Math.max(tweets.length - ((page - 1) * tweetsPerPage), 0);
  return tweets.slice(startIndex, endIndex).reverse();
}

  function getAvatar(username) {
    const userFind = connectedUsers.find(user => user.username === username);
  
    if (userFind) {
      return userFind.avatar;
    }
  
    return null;
  }

  function tweetsFromUser(username) {
    const userTweets = tweets.filter(tweet => tweet.username === username);
    return userTweets;
  }

// Start
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});