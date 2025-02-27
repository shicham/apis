// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb")
const uri = process.env.MONGODB_URI
const options = {};
dotenv.config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // For parsing JSON bodies
console.log(process.env.DATABASE_URL)
// MongoDB connection setup

//mongoose.connect(process.env.DATABASE_URL)
//.then(() => console.log("MongoDB connected"))
//.catch((err) => console.error("Error connecting to MongoDB:", err));

// Define a simple model for Wishlist
const Wishlist = mongoose.model("Wishlist", new mongoose.Schema({
  product: String,
  userId: String,
}));

// POST: Add product to wishlist
app.post("/api/wishlist", async (req, res) => {
  const { userId, product } = req.body;
  
  try {
    /**
    const wishlistItem = new Wishlist({ userId, product });
    await wishlistItem.save();
    res.status(201).json(wishlistItem);
 */
    const mongoClient = await (new MongoClient(uri,options))
  .connect();
  console.log("just connected")

  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).json({ error: error });
  }
});

app.get("/api/wishlist/", async (req, res) => {
  
    try {
      res.json({wishlistItems:"11sssswishlistItemsss", url:process.env.DATABASE_URL});
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
