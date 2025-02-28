const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware to parse JSON bodies
app.use(express.json());

// Create a simple GET endpoint
app.get('/', (req, res) => {
  res.send('Hello, hii!');
});

// Create a simple POST endpoint
app.post('/data', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}` });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
