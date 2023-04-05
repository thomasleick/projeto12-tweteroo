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
  res.status(201).json({ message: "OK" });
  connectedUsers.push({username: username, avatar: avatar});
});

app.post('/tweets', (req, res) => {
  const { username, tweet } = req.body;
  
  if (!username || !tweet) {
    return res.status(400).json({ error: 'username and tweet are required' });
  }

  if (!connectedUsers.some(user => user.username === username)) {
    return res.status(401).json({ error: 'UNAUTHORIZED' });
  }
  res.status(201).json({ message: 'Tweet created successfully' });
  tweets.push({username: username, tweet: tweet})
});

app.get('/tweets', (req, res) => {
  const lastTweets = fetchTweetsFromDataSource(tweets);
  console.log(lastTweets)
  const tweetsWithAvatar = lastTweets.map(tweet => {
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

function fetchTweetsFromDataSource(tweets) {
  if (tweets.length >= 10)
    return tweets.slice(-10);
  if (tweets.length === 0)
    return [];
  return tweets;
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