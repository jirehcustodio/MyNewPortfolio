// Script to generate more products for the ModernShop catalog
// This will add products to reach 50 items per category

const generateMoreProducts = () => {
  const electronicsProducts = [
    // More Electronics (IDs 12-56)
    {
      id: 12,
      name: "USB-C Hub 7-in-1",
      price: 49.99,
      category: "Electronics",
      brand: "ConnectPro",
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop"
    },
    {
      id: 13,
      name: "LED Ring Light",
      price: 89.99,
      category: "Electronics", 
      brand: "StudioLight",
      image: "https://images.unsplash.com/photo-1626315869436-598b3e351ab3?w=500&h=500&fit=crop"
    },
    {
      id: 14,
      name: "Portable Power Bank 20000mAh",
      price: 39.99,
      category: "Electronics",
      brand: "PowerMax",
      image: "https://images.unsplash.com/photo-1609592842510-b1b68b4d82c9?w=500&h=500&fit=crop"
    },
    {
      id: 15,
      name: "Laptop Stand Adjustable",
      price: 59.99,
      category: "Electronics",
      brand: "ErgoDesk",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"
    },
    {
      id: 16,
      name: "Smart Home Security Camera",
      price: 129.99,
      category: "Electronics",
      brand: "SecureTech",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"
    },
    // Continue with more products...
  ];

  const clothingProducts = [
    // More Clothing (IDs 58-106) 
    {
      id: 58,
      name: "Slim Fit Jeans",
      price: 79.99,
      category: "Clothing",
      brand: "DenimCraft",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop"
    },
    {
      id: 59,
      name: "Knit Sweater",
      price: 69.99,
      category: "Clothing",
      brand: "CozyWear",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop"
    },
    {
      id: 60,
      name: "Running Shoes",
      price: 119.99,
      category: "Clothing",
      brand: "SportStep",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop"
    },
    // Continue with more clothing...
  ];

  const accessoriesProducts = [
    // More Accessories (IDs 108-156)
    {
      id: 108,
      name: "Leather Wallet",
      price: 45.99,
      category: "Accessories",
      brand: "LeatherCraft",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop"
    },
    {
      id: 109,
      name: "Sunglasses Aviator",
      price: 89.99,
      category: "Accessories",
      brand: "SunStyle",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop"
    },
    {
      id: 110,
      name: "Crossbody Bag",
      price: 59.99,
      category: "Accessories",
      brand: "UrbanCarry",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop"
    },
    // Continue with more accessories...
  ];

  return [...electronicsProducts, ...clothingProducts, ...accessoriesProducts];
};

// This script helps generate the structure for adding more products
console.log("Use this structure to add more products to the productData.ts file");