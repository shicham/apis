// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // For parsing JSON bodies
console.log(process.env.DATABASE_URL)
// MongoDB connection setup
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("Error connecting to MongoDB:", err));

// Define a simple model for Wishlist
const Wishlist = mongoose.model("Wishlist", new mongoose.Schema({
  product: String,
  userId: String,
}));

// POST: Add product to wishlist
app.post("/api/wishlist", async (req, res) => {
  const { userId, product } = req.body;

  try {
    const wishlistItem = new Wishlist({ userId, product });
    await wishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).json({ error: "Failed to add product to wishlist" });
  }
});

app.get("/api/wishlist/", async (req, res) => {
  
    try {
      res.json({wishlistItems:"11sssswishlistItems", url:process.env.DATABASE_URL});
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      res.status(500).json({ error: "Failed to fetch wishlist" });
    }
  });
// GET: Get all wishlist items for a user
app.get("/api/wishlist/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlistItems = await Wishlist.find({ userId });
    res.json(wishlistItems);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
