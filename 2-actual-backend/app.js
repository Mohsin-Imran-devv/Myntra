const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");
const Product = require("./models/Product");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/products/category/:category", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
// Studio products route add karein
app.get("/api/products/category/studio", async (req, res) => {
  try {
    const products = await Product.find({ category: "studio" }).sort({
      createdAt: -1,
    });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
app.get("/items", async (req, res) => {
  try {
    const products = await Product.find();
    // Old route for compatibility
    res.json({ items: [products] });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
