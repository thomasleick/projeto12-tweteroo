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



// Start
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});