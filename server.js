const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 5000;

//const SellerProfile = require('../pages/SellerProfile');

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Product model
const Product = mongoose.model("Product", new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
}));

const SellerProfile = mongoose.model("SellerProfile", new mongoose.Schema({
  name: String,
  shopName: String,
  address: String,
  phone: String,
}));

// Order model (keep sellerId for now if needed for filtering)
const Order = mongoose.model("Order", new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  shopperName: String,
  quantity: Number,
  address: String,
  status: { type: String, default: "Pending" },
  orderDate: { type: Date, default: Date.now },
}));

const ShopperProfileSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
});

// --- API Routes ---

// Create product
app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file.filename;
    const product = new Product({ name, price, image });
    await product.save();
    res.json({ message: "Product uploaded", product });
  } catch (err) {
    console.error("Error uploading product:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Fetch failed" });
  }
});

// Delete product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deleted = await Product.findByIdAndDelete(productId);

    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// Create order
app.post("/api/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Order placement failed" });
  }
});

// Get orders for seller (this still uses sellerId to support future use)
app.get("/api/orders/seller/:sellerId", async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.params.sellerId }).populate('productId');
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Fetch orders failed" });
  }
});

// Save or update seller profile (no sellerId involved)
app.post("/api/seller/profile", async (req, res) => {
  try {
    const existingProfile = await SellerProfile.findOne();
    if (existingProfile) {
      existingProfile.name = req.body.name;
      existingProfile.shopName = req.body.shopName;
      existingProfile.address = req.body.address;
      existingProfile.phone = req.body.phone;
      await existingProfile.save();
      res.status(200).json({ message: "Profile updated", profile: existingProfile });
    } else {
      const newProfile = new SellerProfile(req.body);
      await newProfile.save();
      res.status(201).json({ message: "Profile created", profile: newProfile });
    }
  } catch (err) {
    console.error("Error saving profile:", err);
    res.status(500).json({ error: "Profile save failed" });
  }
});

// Get seller profile
app.get('/api/seller/profile', async (req, res) => {
  try {
    const profile = await SellerProfile.findOne();
    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).send({ message: 'Server Error' });
  }
});

const ShopperProfile = mongoose.model('ShopperProfile', ShopperProfileSchema);

// GET shopper profile
app.get('/api/shopper/profile', async (req, res) => {
  try {
    const profile = await ShopperProfile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch shopper profile' });
  }
});

// POST (create or update) shopper profile
app.post('/api/shopper/profile', async (req, res) => {
  try {
    let profile = await ShopperProfile.findOne();
    if (profile) {
      profile.set(req.body);
      await profile.save();
    } else {
      profile = await ShopperProfile.create(req.body);
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save shopper profile' });
  }
});

// Create a new order
app.post("/api/shopper/order", async (req, res) => {
  const { productId, shopperName, quantity, address } = req.body;

  try {
    // Save order
    const order = new Order({ productId, shopperName, quantity, address });
    await order.save();

    // Optional: Increment product order count (can add to product model later)
    // const product = await Product.findById(productId);
    // product.orderCount = (product.orderCount || 0) + 1;
    // await product.save();

    res.status(201).send(order);
  } catch (err) {
    res.status(500).send({ error: "Failed to place order." });
  }
});

// Get all orders
app.get("/api/shopper/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("productId");
    res.json(orders);
  } catch (err) {
    res.status(500).send("Error fetching orders");
  }
});

const CartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  shopperName: String,
  quantity: { type: Number, default: 1 },
  addedDate: { type: Date, default: Date.now },
});

const CartItem = mongoose.model("CartItem", CartItemSchema);

app.get("/api/shopper/cart", async (req, res) => {
  try {
    const items = await CartItem.find().populate('productId');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});
app.post("/api/shopper/cart", async (req, res) => {
  const { productId, shopperName } = req.body;
  try {
    const item = new CartItem({ productId, shopperName });
    await item.save();
    res.json({ message: "Added to cart", item });
  } catch (err) {
    res.status(500).json({ error: "Add to cart failed" });
  }
});
app.delete("/api/shopper/cart/clear", async (req, res) => {
  try {
    await CartItem.deleteMany();
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
});


// Connect to DB and start server
mongoose
  .connect("mongodb://127.0.0.1:27017/bazaar")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
