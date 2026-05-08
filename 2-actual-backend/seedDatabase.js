require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const fs = require('fs').promises;

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Generate random product data
const generateProducts = () => {

  // ========== MEN'S PRODUCTS (15 products) ==========
  const menProducts = [
    {
      id: "men_001",
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=500&fit=crop",
      company: "Nike",
      item_name: "Men's Running Shoes",
      original_price: 5999,
      current_price: 3599,
      discount_percentage: 40,
      return_period: 30,
      delivery_date: "2 days",
      rating: { stars: 4.5, count: 1200 },
      category: "men",
      gender: "men",
      tags: ["shoes", "sports", "running"]
    },
    {
      id: "men_002",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=500&fit=crop",
      company: "Allen Solly",
      item_name: "Men's Formal Shirt",
      original_price: 1999,
      current_price: 1199,
      discount_percentage: 40,
      return_period: 14,
      delivery_date: "3 days",
      rating: { stars: 4.3, count: 850 },
      category: "men",
      gender: "men",
      tags: ["shirt", "formal", "office"]
    },
    {
      id: "men_003",
      image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=500&fit=crop",
      company: "Levi's",
      item_name: "Men's Blue Jeans",
      original_price: 2999,
      current_price: 1999,
      discount_percentage: 33,
      return_period: 30,
      delivery_date: "4 days",
      rating: { stars: 4.4, count: 2100 },
      category: "men",
      gender: "men",
      tags: ["jeans", "denim", "casual"]
    },
    {
      id: "men_004",
      image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=400&h=500&fit=crop",
      company: "Puma",
      item_name: "Men's Sports T-shirt",
      original_price: 1299,
      current_price: 899,
      discount_percentage: 31,
      return_period: 14,
      delivery_date: "2 days",
      rating: { stars: 4.2, count: 1500 },
      category: "men",
      gender: "men",
      tags: ["tshirt", "sports", "casual"]
    },
    {
      id: "men_005",
      image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=400&h=500&fit=crop",
      company: "Adidas",
      item_name: "Men's Track Pants",
      original_price: 2499,
      current_price: 1749,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "3 days",
      rating: { stars: 4.1, count: 980 },
      category: "men",
      gender: "men",
      tags: ["pants", "sports", "gym"]
    },
    {
      id: "men_006",
      image: "https://images.unsplash.com/photo-1536766820879-059fec98ec0a?w=400&h=500&fit=crop",
      company: "Ray-Ban",
      item_name: "Men's Sunglasses",
      original_price: 5999,
      current_price: 4199,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "5 days",
      rating: { stars: 4.7, count: 650 },
      category: "men",
      gender: "men",
      tags: ["sunglasses", "accessories"]
    },
    {
      id: "men_007",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=500&fit=crop",
      company: "Casio",
      item_name: "Men's Digital Watch",
      original_price: 8999,
      current_price: 6299,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "7 days",
      rating: { stars: 4.6, count: 1200 },
      category: "men",
      gender: "men",
      tags: ["watch", "accessories"]
    },
    {
      id: "men_008",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
      company: "Skechers",
      item_name: "Men's Casual Shoes",
      original_price: 3999,
      current_price: 2799,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "4 days",
      rating: { stars: 4.3, count: 890 },
      category: "men",
      gender: "men",
      tags: ["shoes", "casual"]
    },
    {
      id: "men_009",
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop",
      company: "Peter England",
      item_name: "Men's Blazer",
      original_price: 5999,
      current_price: 4199,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "6 days",
      rating: { stars: 4.4, count: 540 },
      category: "men",
      gender: "men",
      tags: ["blazer", "formal"]
    },
    {
      id: "men_010",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop",
      company: "Jockey",
      item_name: "Men's Briefs (Pack of 3)",
      original_price: 999,
      current_price: 699,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "2 days",
      rating: { stars: 4.5, count: 2100 },
      category: "men",
      gender: "men",
      tags: ["innerwear"]
    },
    {
      id: "men_011",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
      company: "The North Face",
      item_name: "Men's Winter Jacket",
      original_price: 8999,
      current_price: 6299,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "8 days",
      rating: { stars: 4.6, count: 780 },
      category: "men",
      gender: "men",
      tags: ["jacket", "winter"]
    },
    {
      id: "men_012",
      image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400&h=500&fit=crop",
      company: "Reebok",
      item_name: "Men's Gym Shorts",
      original_price: 1999,
      current_price: 1399,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "3 days",
      rating: { stars: 4.2, count: 1250 },
      category: "men",
      gender: "men",
      tags: ["shorts", "gym"]
    },
    {
      id: "men_013",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
      company: "Woodland",
      item_name: "Men's Hiking Shoes",
      original_price: 4999,
      current_price: 3499,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "5 days",
      rating: { stars: 4.5, count: 920 },
      category: "men",
      gender: "men",
      tags: ["shoes", "hiking"]
    },
    {
      id: "men_014",
      image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=400&h=500&fit=crop",
      company: "Tommy Hilfiger",
      item_name: "Men's Polo T-shirt",
      original_price: 2999,
      current_price: 2099,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "4 days",
      rating: { stars: 4.3, count: 1650 },
      category: "men",
      gender: "men",
      tags: ["tshirt", "polo"]
    },
    {
      id: "men_015",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=500&fit=crop",
      company: "Fastrack",
      item_name: "Men's Leather Shoes",
      original_price: 1299,
      current_price: 909,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "3 days",
      rating: { stars: 4.4, count: 2100 },
      category: "men",
      gender: "men",
      tags: ["belt", "accessories"]
    }
  ];

  // ========== WOMEN'S PRODUCTS (15 products) ==========
  const womenProducts = [
    {
      id: "women_001",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop",
      company: "Zara",
      item_name: "Women's Summer Dress",
      original_price: 3999,
      current_price: 2799,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "3 days",
      rating: { stars: 4.5, count: 1850 },
      category: "women",
      gender: "women",
      tags: ["dress", "summer"]
    },
    {
      id: "women_002",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
      company: "Mango",
      item_name: "Women's Handbag",
      original_price: 4999,
      current_price: 3499,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "4 days",
      rating: { stars: 4.6, count: 1250 },
      category: "women",
      gender: "women",
      tags: ["handbag", "accessories"]
    },
    {
      id: "women_003",
      image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=400&h=500&fit=crop",
      company: "H&M",
      item_name: "Women's Jeans",
      original_price: 2999,
      current_price: 2099,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "5 days",
      rating: { stars: 4.3, count: 2300 },
      category: "women",
      gender: "women",
      tags: ["jeans", "denim"]
    },
    {
      id: "women_004",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=500&fit=crop",
      company: "Forever 21",
      item_name: "Women's Top",
      original_price: 1599,
      current_price: 1119,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "2 days",
      rating: { stars: 4.2, count: 1800 },
      category: "women",
      gender: "women",
      tags: ["top", "casual"]
    },
    {
      id: "women_005",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=500&fit=crop",
      company: "Nike",
      item_name: "Women's Sports Shoes",
      original_price: 5499,
      current_price: 3849,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "3 days",
      rating: { stars: 4.7, count: 1450 },
      category: "women",
      gender: "women",
      tags: ["shoes", "sports"]
    },
    {
      id: "women_006",
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&h=500&fit=crop",
      company: "Puma",
      item_name: "Women's Track Pants",
      original_price: 2299,
      current_price: 1609,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "3 days",
      rating: { stars: 4.1, count: 950 },
      category: "women",
      gender: "women",
      tags: ["pants", "sports"]
    },
    {
      id: "women_007",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
      company: "Ray-Ban",
      item_name: "Women's Sunglasses",
      original_price: 4999,
      current_price: 3499,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "5 days",
      rating: { stars: 4.6, count: 820 },
      category: "women",
      gender: "women",
      tags: ["sunglasses", "accessories"]
    },
    {
      id: "women_008",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=500&fit=crop",
      company: "Michael Kors",
      item_name: "Women's Watch",
      original_price: 12999,
      current_price: 9099,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "7 days",
      rating: { stars: 4.8, count: 650 },
      category: "women",
      gender: "women",
      tags: ["watch", "accessories"]
    },
    {
      id: "women_009",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      company: "Marks & Spencer",
      item_name: "Women's Winter Coat",
      original_price: 7999,
      current_price: 5599,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "6 days",
      rating: { stars: 4.4, count: 720 },
      category: "women",
      gender: "women",
      tags: ["coat", "winter"]
    },
    {
      id: "women_010",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
      company: "Skechers",
      item_name: "Women's Casual Shoes",
      original_price: 3499,
      current_price: 2449,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "4 days",
      rating: { stars: 4.3, count: 1150 },
      category: "women",
      gender: "women",
      tags: ["shoes", "casual"]
    },
    {
      id: "women_011",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop",
      company: "Jockey",
      item_name: "Women's Lingerie Set",
      original_price: 1499,
      current_price: 1049,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "2 days",
      rating: { stars: 4.5, count: 1950 },
      category: "women",
      gender: "women",
      tags: ["lingerie", "innerwear"]
    },
    {
      id: "women_012",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
      company: "Allen Solly",
      item_name: "Women's Formal Shirt",
      original_price: 2499,
      current_price: 1749,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "4 days",
      rating: { stars: 4.2, count: 880 },
      category: "women",
      gender: "women",
      tags: ["shirt", "formal"]
    },
    {
      id: "women_013",
      image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=500&fit=crop",
      company: "Adidas",
      item_name: "Women's Sports Bra",
      original_price: 1999,
      current_price: 1399,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "3 days",
      rating: { stars: 4.6, count: 1650 },
      category: "women",
      gender: "women",
      tags: ["bra", "sports"]
    },
    {
      id: "women_014",
      image: "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=400&h=500&fit=crop",
      company: "Levi's",
      item_name: "Women's Denim Jacket",
      original_price: 4999,
      current_price: 3499,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "5 days",
      rating: { stars: 4.4, count: 920 },
      category: "women",
      gender: "women",
      tags: ["jacket", "denim"]
    },
    {
      id: "women_015",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
      company: "Mango",
      item_name: "Women's Handbag",
      original_price: 5999,
      current_price: 4199,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "6 days",
      rating: { stars: 4.7, count: 750 },
      category: "women",
      gender: "women",
      tags: ["handbag", "accessories"]
    }
  ];

  // ========== KIDS PRODUCTS (10 products) ==========
  const kidsProducts = [
    {
      id: "kids_001",
      image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=500&fit=crop",
      company: "Carter's",
      item_name: "Kids T-shirt Pack (3 pcs)",
      original_price: 1499,
      current_price: 1049,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "3 days",
      rating: { stars: 4.5, count: 1250 },
      category: "kids",
      gender: "unisex",
      tags: ["tshirt", "pack"]
    },
    {
      id: "kids_002",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
      company: "Disney",
      item_name: "Kids Marvel T-shirt",
      original_price: 899,
      current_price: 629,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "2 days",
      rating: { stars: 4.7, count: 1850 },
      category: "kids",
      gender: "boys",
      tags: ["tshirt", "marvel"]
    },
    {
      id: "kids_003",
      image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&h=500&fit=crop",
      company: "Barbie",
      item_name: "Girls Princess Dress",
      original_price: 1999,
      current_price: 1399,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "4 days",
      rating: { stars: 4.6, count: 950 },
      category: "kids",
      gender: "girls",
      tags: ["dress", "princess"]
    },
    {
      id: "kids_004",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&h=500&fit=crop",
      company: "Nike",
      item_name: "Kids Running Shoes",
      original_price: 2999,
      current_price: 2099,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "5 days",
      rating: { stars: 4.4, count: 820 },
      category: "kids",
      gender: "unisex",
      tags: ["shoes", "sports"]
    },
    {
      id: "kids_006",
      image: "https://images.unsplash.com/photo-1562778612-e1e0cda9915c?w=400&h=500&fit=crop",
      company: "H&M",
      item_name: "Kids Winter Jacket",
      original_price: 2999,
      current_price: 2099,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "6 days",
      rating: { stars: 4.5, count: 520 },
      category: "kids",
      gender: "unisex",
      tags: ["jacket", "winter"]
    },
    {
      id: "kids_007",
      image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop",
      company: "Puma",
      item_name: "Kids Track Pants",
      original_price: 1599,
      current_price: 1119,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "3 days",
      rating: { stars: 4.2, count: 780 },
      category: "kids",
      gender: "unisex",
      tags: ["pants", "sports"]
    },
    {
      id: "kids_008",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=500&fit=crop",
      company: "Disney",
      item_name: "Kids Frozen Backpack",
      original_price: 1299,
      current_price: 909,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "5 days",
      rating: { stars: 4.8, count: 1250 },
      category: "kids",
      gender: "girls",
      tags: ["backpack", "frozen"]
    },
    {
      id: "kids_009",
      image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400&h=500&fit=crop",
      company: "Adidas",
      item_name: "Kids Sports T-shirt",
      original_price: 999,
      current_price: 699,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "2 days",
      rating: { stars: 4.3, count: 950 },
      category: "kids",
      gender: "unisex",
      tags: ["tshirt", "sports"]
    },
    {
      id: "kids_010",
      image: "https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=400&h=500&fit=crop",
      company: "Carter's",
      item_name: "Kids Romper Set",
      original_price: 1499,
      current_price: 1049,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "4 days",
      rating: { stars: 4.6, count: 680 },
      category: "kids",
      gender: "unisex",
      tags: ["romper", "set"]
    }
  ];

  // ========== HOME & LIVING PRODUCTS (10 products) ==========
  const homeProducts = [
    {
      id: "home_001",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop",
      company: "HomeTown",
      item_name: "Cotton Bedsheet Set",
      original_price: 2999,
      current_price: 2099,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "7 days",
      rating: { stars: 4.5, count: 1250 },
      category: "home-living",
      gender: "unisex",
      tags: ["bedsheet", "bedding"]
    },
    {
      id: "home_002",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop",
      company: "IKEA",
      item_name: "Study Table",
      original_price: 7999,
      current_price: 5599,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "10 days",
      rating: { stars: 4.7, count: 850 },
      category: "home-living",
      gender: "unisex",
      tags: ["furniture", "table"]
    },
    {
      id: "home_003",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=500&fit=crop",
      company: "Nilkamal",
      item_name: "Plastic Chair (Set of 2)",
      original_price: 1999,
      current_price: 1399,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "5 days",
      rating: { stars: 4.3, count: 1250 },
      category: "home-living",
      gender: "unisex",
      tags: ["chair", "furniture"]
    },
    {
      id: "home_004",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=500&fit=crop",
      company: "Milton",
      item_name: "Water Bottle Set",
      original_price: 999,
      current_price: 699,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "3 days",
      rating: { stars: 4.6, count: 2100 },
      category: "home-living",
      gender: "unisex",
      tags: ["bottle", "kitchen"]
    },
    {
      id: "home_005",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=500&fit=crop",
      company: "Sleepwell",
      item_name: "Memory Foam Pillow",
      original_price: 1999,
      current_price: 1399,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "6 days",
      rating: { stars: 4.4, count: 950 },
      category: "home-living",
      gender: "unisex",
      tags: ["pillow", "bedding"]
    },
    {
      id: "home_006",
      image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=500&fit=crop",
      company: "Bombay Dyeing",
      item_name: "Cotton Towel Set",
      original_price: 1499,
      current_price: 1049,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "4 days",
      rating: { stars: 4.5, count: 1250 },
      category: "home-living",
      gender: "unisex",
      tags: ["towel", "bath"]
    },
    {
      id: "home_007",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop",
      company: "Godrej",
      item_name: "Steel Storage Cabinet",
      original_price: 8999,
      current_price: 6299,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "12 days",
      rating: { stars: 4.6, count: 650 },
      category: "home-living",
      gender: "unisex",
      tags: ["cabinet", "storage"]
    },
    {
      id: "home_008",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop",
      company: "Cello",
      item_name: "Dinner Set (24 pcs)",
      original_price: 2999,
      current_price: 2099,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "8 days",
      rating: { stars: 4.7, count: 850 },
      category: "home-living",
      gender: "unisex",
      tags: ["dinner set", "kitchen"]
    },
    {
      id: "home_009",
      image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400&h=500&fit=crop",
      company: "Philips",
      item_name: "LED Bulb (Pack of 4)",
      original_price: 799,
      current_price: 559,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "2 days",
      rating: { stars: 4.8, count: 3250 },
      category: "home-living",
      gender: "unisex",
      tags: ["bulb", "lighting"]
    },
    {
      id: "home_010",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=500&fit=crop",
      company: "Havells",
      item_name: "Electric Kettle",
      original_price: 1999,
      current_price: 1399,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "5 days",
      rating: { stars: 4.5, count: 1850 },
      category: "home-living",
      gender: "unisex",
      tags: ["kettle", "kitchen"]
    }
  ];

  // ========== BEAUTY PRODUCTS (10 products) ==========
  const beautyProducts = [
    {
      id: "beauty_001",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
      company: "Lakme",
      item_name: "Foundation Makeup Kit",
      original_price: 1499,
      current_price: 1049,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "4 days",
      rating: { stars: 4.5, count: 2250 },
      category: "beauty",
      gender: "women",
      tags: ["makeup", "foundation"]
    },
    {
      id: "beauty_002",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=500&fit=crop",
      company: "Maybelline",
      item_name: "Lipstick Set (3 shades)",
      original_price: 999,
      current_price: 699,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "3 days",
      rating: { stars: 4.7, count: 1850 },
      category: "beauty",
      gender: "women",
      tags: ["lipstick", "makeup"]
    },
    {
      id: "beauty_003",
      image: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?w=400&h=500&fit=crop",
      company: "Nivea",
      item_name: "Men's Face Wash",
      original_price: 299,
      current_price: 209,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "2 days",
      rating: { stars: 4.6, count: 4250 },
      category: "beauty",
      gender: "men",
      tags: ["facewash", "skincare"]
    },
    {
      id: "beauty_004",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=500&fit=crop",
      company: "L'Oreal",
      item_name: "Hair Color Kit",
      original_price: 499,
      current_price: 349,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "5 days",
      rating: { stars: 4.4, count: 1950 },
      category: "beauty",
      gender: "unisex",
      tags: ["haircolor", "haircare"]
    },
    {
      id: "beauty_005",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?w=400&h=500&fit=crop",
      company: "Garnier",
      item_name: "Face Cream",
      original_price: 399,
      current_price: 279,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "3 days",
      rating: { stars: 4.5, count: 2850 },
      category: "beauty",
      gender: "unisex",
      tags: ["cream", "skincare"]
    },
    {
      id: "beauty_006",
      image: "https://images.pexels.com/photos/3993467/pexels-photo-3993467.jpeg?w=400&h=500&fit=crop",
      company: "Dove",
      item_name: "Body Wash",
      original_price: 349,
      current_price: 244,
      discount_percentage: 30,
      return_period: 14,
      delivery_date: "2 days",
      rating: { stars: 4.8, count: 5250 },
      category: "beauty",
      gender: "unisex",
      tags: ["bodywash", "bath"]
    },
  ];

  // ========== STUDIO PRODUCTS (10 products) ==========
  const studioProducts = [
    {
      id: "studio_001",
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=500&fit=crop",
      company: "Myntra Studio",
      item_name: "Exclusive Designer Dress",
      original_price: 5999,
      current_price: 4199,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "8 days",
      rating: { stars: 4.8, count: 250 },
      category: "studio",
      gender: "women",
      tags: ["exclusive", "designer"]
    },
    {
      id: "studio_002",
      image: "https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?w=400&h=500&fit=crop",
      company: "Myntra Studio",
      item_name: "Limited Edition Jacket",
      original_price: 7999,
      current_price: 5599,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "10 days",
      rating: { stars: 4.9, count: 180 },
      category: "studio",
      gender: "men",
      tags: ["limited", "premium"]
    },
    {
      id: "studio_003",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
      company: "Myntra Studio",
      item_name: "Handcrafted Jewelry Set",
      original_price: 2999,
      current_price: 2099,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "7 days",
      rating: { stars: 4.7, count: 320 },
      category: "studio",
      gender: "women",
      tags: ["handcrafted", "jewelry"]
    },
    {
      id: "studio_004",
      image: "https://images.pexels.com/photos/1852382/pexels-photo-1852382.jpeg?w=400&h=500&fit=crop",
      company: "Myntra Studio",
      item_name: "Premium Leather Bag",
      original_price: 9999,
      current_price: 6999,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "12 days",
      rating: { stars: 4.8, count: 150 },
      category: "studio",
      gender: "women",
      tags: ["leather", "premium"]
    },
    {
      id: "studio_005",
      image: "https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?w=400&h=500&fit=crop",
      company: "Myntra Studio",
      item_name: "Artisanal Home Decor",
      original_price: 4999,
      current_price: 3499,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "9 days",
      rating: { stars: 4.6, count: 280 },
      category: "studio",
      gender: "unisex",
      tags: ["artisanal", "homedecor"]
    },
    {
      id: "studio_006",
      image: "https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?w=400&h=500&fit=crop",
      company: "Myntra Studio",
      item_name: "Boutique Saree",
      original_price: 8999,
      current_price: 6299,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "15 days",
      rating: { stars: 4.9, count: 120 },
      category: "studio",
      gender: "women",
      tags: ["boutique", "saree"]
    },
    {
      id: "studio_007",
      image: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?w=400&h=500&fit=crop",
      company: "Myntra Studio",
      item_name: "Custom Fit Suit",
      original_price: 12999,
      current_price: 9099,
      discount_percentage: 30,
      return_period: 30,
      delivery_date: "14 days",
      rating: { stars: 4.8, count: 95 },
      category: "studio",
      gender: "men",
      tags: ["custom", "suit"]
    },
  ];

  // Combine all products
  const allProducts = [
    ...menProducts,
    ...womenProducts,
    ...kidsProducts,
    ...homeProducts,
    ...beautyProducts,
    ...studioProducts
  ];

  return allProducts;
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Product.deleteMany({});
    console.log('🗑️  Existing products cleared');
    
    // Generate products
    const products = generateProducts();
    
    // Insert into database
    await Product.insertMany(products);
    
    console.log(`✅ ${products.length} products seeded successfully!`);
    
    // Show counts by category
    const counts = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    
    console.log('\n📊 Products by Category:');
    counts.forEach(item => {
      console.log(`   ${item._id}: ${item.count} products`);
    });
    
    // Show total counts
    console.log(`\n📈 Total Products: ${products.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();