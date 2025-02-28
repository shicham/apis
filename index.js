const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware to parse JSON bodies
app.use(express.json());

// Create a simple GET endpoint
app.get('/', (req, res) => {
  res.send('Hello, Worlds!');
});

// Create a simple POST endpoint
app.post('/data', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}` });
});
app.post('/api/wishlist', async (req, res) => {
    const { userId, product } = req.body;
  
    try {
      const wishlistItem = await prisma.wishlist.create({
        data: {
          userId: userId,
          product: product,
        },
      });
      res.status(201).json(wishlistItem);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      res.status(500).json({ error: "Failed to add product to wishlist" });
    }
  });
  app.get('/api/wishlist/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const wishlistItems = await prisma.wishlist.findMany({
        where: {
          userId: parseInt(userId),
        },
      });
      res.json(wishlistItems);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      res.status(500).json({ error: "Failed to fetch wishlist" });
    }
  });
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
