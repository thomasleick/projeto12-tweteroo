// Import required modules
import express from 'express';

// Create an Express app
const app = express();

// Define routes and handlers
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});