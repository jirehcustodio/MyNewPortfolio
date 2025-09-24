// Comprehensive product data for ModernShop

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  stock: number;
}

export interface ProductSize {
  id: string;
  name: string;
  available: boolean;
}

export interface DeliveryOption {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
}

export interface WarrantyInfo {
  duration: string;
  coverage: string[];
  returnPolicy: string;
}

export interface StoreInfo {
  name: string;
  rating: number;
  totalReviews: number;
  status: "Online" | "Offline" | "Busy";
  joinedDate: string;
  location: string;
  responseTime: string;
  chatResponse: number;
}

export interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  images?: string[];
  verified: boolean;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  pricePhp: number;
  originalPricePhp: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  brand: string;
  description: string;
  features: string[];
  specifications: { [key: string]: string };
  variants: ProductVariant[];
  sizes: ProductSize[];
  deliveryOptions: DeliveryOption[];
  warranty: WarrantyInfo;
  store: StoreInfo;
  reviewsList: Review[];
  tags: string[];
  stock: number;
  sku: string;
}

const USD_TO_PHP = 56.5; // Current exchange rate (approximate)

// Helper function to generate review data
const generateReviews = (count: number): Review[] => {
  const names = ["Maria Santos", "Juan Dela Cruz", "Sarah Kim", "Miguel Torres", "Lisa Chen", "Carlos Rodriguez", "Anna Reyes", "David Martinez", "Elena Gonzalez", "Mark Johnson", "Rachel Wong", "Alex Rivera", "Sofia Mercado"];
  const avatars = [
    "https://images.unsplash.com/photo-1494790108755-2616b412f2d3?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=150&h=150&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  ];
  const comments = [
    "Excellent quality and fast delivery!",
    "Great value for money, highly recommended.",
    "Perfect fit and great material quality.",
    "Exactly as described, very satisfied.",
    "Good product but shipping took longer than expected.",
    "Amazing features and user-friendly design.",
    "Would definitely buy again!",
    "Quality exceeded my expectations.",
    "Great customer service and product quality.",
    "Perfect for daily use, very durable."
  ];

  return Array.from({ length: Math.min(count, 5) }, (_, i) => ({
    id: i + 1,
    user: names[i % names.length],
    avatar: avatars[i % avatars.length],
    rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    comment: comments[i % comments.length],
    helpful: Math.floor(Math.random() * 50) + 5,
    verified: Math.random() > 0.2
  }));
};

export const productsData: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    originalPrice: 129.99,
    pricePhp: Math.round(99.99 * USD_TO_PHP),
    originalPricePhp: Math.round(129.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop", // Black headphones
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop", // White headphones
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop", // Side view
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop"  // Detail shot
    ],
    rating: 4.8,
    reviews: 342,
    category: "Electronics",
    brand: "SoundMax Pro",
    description: "Experience premium sound quality with our latest wireless Bluetooth headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day listening.",
    features: [
      "Active Noise Cancellation (ANC)",
      "30-hour battery life",
      "Quick charge (5 min = 3 hours)",
      "Premium comfort design",
      "High-quality 40mm drivers",
      "Built-in microphone with crystal clear calls",
      "Touch controls",
      "Foldable design for portability"
    ],
    specifications: {
      "Driver Size": "40mm Dynamic",
      "Frequency Response": "20Hz - 20kHz",
      "Battery Life": "30 hours (ANC off), 25 hours (ANC on)",
      "Charging Time": "2 hours",
      "Quick Charge": "5 minutes = 3 hours",
      "Bluetooth Version": "5.3",
      "Bluetooth Range": "10 meters",
      "Weight": "250g",
      "Impedance": "32 ohms",
      "Sensitivity": "105dB",
      "Microphone": "Built-in with noise reduction",
      "Controls": "Touch and voice assistant",
      "Compatibility": "iOS, Android, Windows, Mac"
    },
    variants: [
      { id: "black", name: "Midnight Black", price: 99.99, originalPrice: 129.99, stock: 15 },
      { id: "white", name: "Pearl White", price: 104.99, originalPrice: 134.99, stock: 8 },
      { id: "blue", name: "Ocean Blue", price: 109.99, originalPrice: 139.99, stock: 12 }
    ],
    sizes: [],
    deliveryOptions: [
      { id: "standard", name: "Standard Delivery", price: 5.99, duration: "5-7 business days", description: "Regular shipping via courier" },
      { id: "express", name: "Express Delivery", price: 12.99, duration: "2-3 business days", description: "Fast shipping with tracking" },
      { id: "overnight", name: "Overnight Delivery", price: 24.99, duration: "Next business day", description: "Priority overnight shipping" },
      { id: "pickup", name: "Store Pickup", price: 0, duration: "Ready in 2 hours", description: "Pick up from our store location" }
    ],
    warranty: {
      duration: "2 years",
      coverage: ["Manufacturing defects", "Battery performance", "Bluetooth connectivity issues", "Audio quality problems"],
      returnPolicy: "30-day money-back guarantee"
    },
    store: {
      name: "TechHub Electronics",
      rating: 4.9,
      totalReviews: 2847,
      status: "Online",
      joinedDate: "2019",
      location: "Manila, Philippines",
      responseTime: "Within 1 hour",
      chatResponse: 98
    },
    reviewsList: [
      {
        id: 1,
        user: "Maria Santos",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b412f2d3?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        date: "2025-09-20",
        comment: "Amazing sound quality! The noise cancellation works perfectly for my daily commute. Battery life is excellent and the quick charge feature is a lifesaver.",
        helpful: 23,
        verified: true,
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"]
      },
      {
        id: 2,
        user: "Juan Dela Cruz",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        rating: 4,
        date: "2025-09-18",
        comment: "Great headphones for the price. Comfortable for long listening sessions. Only minor issue is the touch controls can be a bit sensitive.",
        helpful: 15,
        verified: true
      },
      {
        id: 3,
        user: "Anna Reyes",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        date: "2025-09-15",
        comment: "Perfect for work from home setup. Crystal clear call quality and the ANC really helps with concentration. Highly recommended!",
        helpful: 31,
        verified: true
      }
    ],
    tags: ["wireless", "bluetooth", "noise-cancelling", "premium", "long-battery"],
    stock: 35,
    sku: "SMP-WBH-001"
  },
  {
    id: 2,
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    pricePhp: Math.round(29.99 * USD_TO_PHP),
    originalPricePhp: Math.round(39.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f37f4fc3?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&h=500&fit=crop"
    ],
    rating: 4.6,
    reviews: 156,
    category: "Clothing",
    brand: "ComfortWear",
    description: "Crafted from 100% premium organic cotton, this t-shirt offers unmatched comfort and style. Perfect for casual wear or layering, with a modern fit that flatters all body types.",
    features: [
      "100% Organic Cotton",
      "Pre-shrunk fabric",
      "Reinforced shoulder seams",
      "Tagless design for comfort",
      "Modern slim fit",
      "Colorfast dyes",
      "Machine washable",
      "Eco-friendly production"
    ],
    specifications: {
      "Material": "100% Organic Cotton",
      "Weight": "180 GSM",
      "Fit": "Modern Slim Fit",
      "Neck Style": "Crew Neck",
      "Sleeve Type": "Short Sleeve",
      "Care Instructions": "Machine wash cold, tumble dry low",
      "Origin": "Made in Philippines",
      "Certification": "GOTS Certified Organic",
      "Shrinkage": "Pre-shrunk, minimal shrinkage"
    },
    variants: [
      { id: "white", name: "Classic White", price: 29.99, originalPrice: 39.99, stock: 25 },
      { id: "black", name: "Deep Black", price: 29.99, originalPrice: 39.99, stock: 30 },
      { id: "navy", name: "Navy Blue", price: 32.99, originalPrice: 42.99, stock: 20 },
      { id: "gray", name: "Heather Gray", price: 29.99, originalPrice: 39.99, stock: 18 }
    ],
    sizes: [
      { id: "xs", name: "XS", available: true },
      { id: "s", name: "S", available: true },
      { id: "m", name: "M", available: true },
      { id: "l", name: "L", available: true },
      { id: "xl", name: "XL", available: true },
      { id: "xxl", name: "XXL", available: false }
    ],
    deliveryOptions: [
      { id: "standard", name: "Standard Delivery", price: 3.99, duration: "3-5 business days", description: "Regular shipping via courier" },
      { id: "express", name: "Express Delivery", price: 8.99, duration: "1-2 business days", description: "Fast shipping with tracking" },
      { id: "pickup", name: "Store Pickup", price: 0, duration: "Ready in 1 hour", description: "Pick up from our store location" }
    ],
    warranty: {
      duration: "6 months",
      coverage: ["Color fading", "Fabric defects", "Stitching issues"],
      returnPolicy: "30-day exchange/return policy"
    },
    store: {
      name: "Fashion Forward PH",
      rating: 4.7,
      totalReviews: 1523,
      status: "Online",
      joinedDate: "2020",
      location: "Cebu City, Philippines",
      responseTime: "Within 30 minutes",
      chatResponse: 95
    },
    reviewsList: [
      {
        id: 1,
        user: "Sarah Kim",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        date: "2025-09-22",
        comment: "Love the fit and quality! The cotton is so soft and the color hasn't faded after multiple washes. Will definitely order more colors.",
        helpful: 12,
        verified: true
      },
      {
        id: 2,
        user: "Miguel Torres",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4,
        date: "2025-09-19",
        comment: "Good quality shirt for the price. Fits true to size. The fabric feels premium and comfortable for daily wear.",
        helpful: 8,
        verified: true
      }
    ],
    tags: ["cotton", "organic", "comfortable", "casual", "eco-friendly"],
    stock: 93,
    sku: "CW-CT-002"
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 199.99,
    originalPrice: 249.99,
    pricePhp: Math.round(199.99 * USD_TO_PHP),
    originalPricePhp: Math.round(249.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=500&fit=crop"
    ],
    rating: 4.9,
    reviews: 428,
    category: "Electronics",
    brand: "FitTech Pro",
    description: "Advanced fitness tracking meets smart connectivity. Monitor your health 24/7 with heart rate, sleep tracking, GPS, and over 100 workout modes. Water-resistant design perfect for all activities.",
    features: [
      "24/7 Heart Rate Monitoring",
      "GPS Built-in",
      "100+ Workout Modes",
      "Sleep Quality Analysis",
      "Blood Oxygen Monitoring",
      "Stress Level Tracking",
      "Smart Notifications",
      "7-day Battery Life",
      "5ATM Water Resistance",
      "Always-on Display"
    ],
    specifications: {
      "Display": "1.4-inch AMOLED",
      "Resolution": "454 x 454 pixels",
      "Battery Life": "7 days typical use",
      "Water Resistance": "5ATM (50 meters)",
      "GPS": "Built-in GPS + GLONASS",
      "Sensors": "Heart rate, SpO2, Accelerometer, Gyroscope, Compass",
      "Connectivity": "Bluetooth 5.2, Wi-Fi",
      "Compatibility": "iOS 12.0+, Android 6.0+",
      "Storage": "4GB",
      "Charging": "Magnetic charging dock",
      "Weight": "45g (without strap)",
      "Dimensions": "45.9 x 45.9 x 10.7mm"
    },
    variants: [
      { id: "black", name: "Midnight Black", price: 199.99, originalPrice: 249.99, stock: 22 },
      { id: "silver", name: "Silver Aluminum", price: 209.99, originalPrice: 259.99, stock: 18 },
      { id: "gold", name: "Rose Gold", price: 219.99, originalPrice: 269.99, stock: 15 }
    ],
    sizes: [
      { id: "38mm", name: "38mm", available: true },
      { id: "42mm", name: "42mm", available: true },
      { id: "45mm", name: "45mm", available: true }
    ],
    deliveryOptions: [
      { id: "standard", name: "Standard Delivery", price: 7.99, duration: "4-6 business days", description: "Regular shipping with insurance" },
      { id: "express", name: "Express Delivery", price: 15.99, duration: "2-3 business days", description: "Fast shipping with tracking" },
      { id: "overnight", name: "Overnight Delivery", price: 29.99, duration: "Next business day", description: "Priority overnight shipping" },
      { id: "pickup", name: "Store Pickup", price: 0, duration: "Ready in 3 hours", description: "Pick up from our store location" }
    ],
    warranty: {
      duration: "2 years",
      coverage: ["Hardware defects", "Battery performance", "Water damage", "Software issues", "Sensor accuracy"],
      returnPolicy: "30-day money-back guarantee"
    },
    store: {
      name: "Gadget Zone PH",
      rating: 4.8,
      totalReviews: 3241,
      status: "Online",
      joinedDate: "2018",
      location: "Makati City, Philippines",
      responseTime: "Within 15 minutes",
      chatResponse: 97
    },
    reviewsList: [
      {
        id: 1,
        user: "Carlos Rodriguez",
        avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        date: "2025-09-21",
        comment: "Best fitness watch I've owned! Accurate heart rate monitoring and GPS tracking. Battery easily lasts a week. The health insights are incredibly detailed.",
        helpful: 45,
        verified: true,
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"]
      },
      {
        id: 2,
        user: "Lisa Chen",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        date: "2025-09-17",
        comment: "Love the always-on display and water resistance. Perfect for swimming and tracking workouts. The app ecosystem is excellent too!",
        helpful: 32,
        verified: true
      }
    ],
    tags: ["fitness", "smartwatch", "GPS", "health", "waterproof"],
    stock: 55,
    sku: "FTP-SW-003"
  },
  {
    id: 4,
    name: "Leather Messenger Bag",
    price: 79.99,
    originalPrice: 99.99,
    pricePhp: Math.round(79.99 * USD_TO_PHP),
    originalPricePhp: Math.round(99.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop"
    ],
    rating: 4.7,
    reviews: 89,
    category: "Accessories",
    brand: "Heritage Leather Co.",
    description: "Handcrafted from premium full-grain leather, this messenger bag combines timeless style with modern functionality. Perfect for professionals, students, or anyone who appreciates quality craftsmanship.",
    features: [
      "Full-grain leather construction",
      "Laptop compartment (fits up to 15\")",
      "Multiple organization pockets",
      "Adjustable shoulder strap",
      "Magnetic snap closures",
      "Interior laptop sleeve",
      "Pen holders and card slots",
      "Lifetime craftsmanship guarantee"
    ],
    specifications: {
      "Material": "Full-grain buffalo leather",
      "Dimensions": "15\" x 11\" x 4\"",
      "Laptop Compatibility": "Up to 15-inch laptops",
      "Weight": "2.1 lbs (950g)",
      "Strap": "Adjustable 28\"-52\" shoulder strap",
      "Hardware": "Antique brass buckles and rivets",
      "Interior": "Cotton canvas lining",
      "Pockets": "2 main compartments, 4 interior pockets",
      "Care": "Leather conditioner recommended",
      "Origin": "Handmade in the Philippines"
    },
    variants: [
      { id: "brown", name: "Cognac Brown", price: 79.99, originalPrice: 99.99, stock: 12 },
      { id: "black", name: "Classic Black", price: 84.99, originalPrice: 104.99, stock: 8 },
      { id: "tan", name: "Natural Tan", price: 79.99, originalPrice: 99.99, stock: 15 }
    ],
    sizes: [
      { id: "standard", name: "Standard (15\")", available: true },
      { id: "large", name: "Large (17\")", available: true }
    ],
    deliveryOptions: [
      { id: "standard", name: "Standard Delivery", price: 6.99, duration: "5-7 business days", description: "Regular shipping with insurance" },
      { id: "express", name: "Express Delivery", price: 12.99, duration: "2-3 business days", description: "Fast shipping with tracking" },
      { id: "pickup", name: "Store Pickup", price: 0, duration: "Ready in 4 hours", description: "Pick up from our leather workshop" }
    ],
    warranty: {
      duration: "Lifetime",
      coverage: ["Craftsmanship defects", "Hardware replacement", "Leather quality issues"],
      returnPolicy: "60-day satisfaction guarantee"
    },
    store: {
      name: "Artisan Leather Works",
      rating: 4.9,
      totalReviews: 892,
      status: "Online",
      joinedDate: "2017",
      location: "Marikina City, Philippines",
      responseTime: "Within 2 hours",
      chatResponse: 94
    },
    reviewsList: [
      {
        id: 1,
        user: "David Martinez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        date: "2025-09-16",
        comment: "Exceptional quality! The leather is beautiful and the craftsmanship is outstanding. Perfect size for my laptop and documents. Worth every peso!",
        helpful: 18,
        verified: true
      },
      {
        id: 2,
        user: "Elena Gonzalez",
        avatar: "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=150&h=150&fit=crop&crop=face",
        rating: 4,
        date: "2025-09-12",
        comment: "Beautiful bag with excellent organization. The leather has a wonderful smell and feel. Only wish the strap was a bit more padded for heavy loads.",
        helpful: 12,
        verified: true
      }
    ],
    tags: ["leather", "messenger", "laptop", "professional", "handmade"],
    stock: 35,
    sku: "HLC-MB-004"
  },
  {
    id: 5,
    name: "Wireless Phone Charger",
    price: 34.99,
    originalPrice: 44.99,
    pricePhp: Math.round(34.99 * USD_TO_PHP),
    originalPricePhp: Math.round(44.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1626453321920-c7cdc1a63c3e?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1609592842510-b1b68b4d82c9?w=500&h=500&fit=crop"
    ],
    rating: 4.5,
    reviews: 203,
    category: "Electronics",
    brand: "PowerFlow",
    description: "Fast wireless charging pad with Qi certification. Compatible with all Qi-enabled devices. Features smart temperature control, overcharge protection, and sleek minimalist design perfect for any desk or nightstand.",
    features: [
      "15W Fast Wireless Charging",
      "Qi Certified for Safety",
      "Universal Compatibility",
      "LED Charging Indicator",
      "Anti-slip Rubber Base",
      "Temperature Control",
      "Overcharge Protection",
      "Sleep-friendly Design",
      "Case Friendly (up to 5mm)",
      "Foreign Object Detection"
    ],
    specifications: {
      "Charging Speed": "15W (Android), 7.5W (iPhone)",
      "Input": "USB-C 9V/2A or 5V/3A",
      "Output": "15W/10W/7.5W/5W",
      "Charging Distance": "Up to 6mm",
      "Dimensions": "100mm x 100mm x 8mm",
      "Weight": "120g",
      "Material": "Premium aluminum alloy",
      "LED Indicator": "Blue (charging), Green (fully charged)",
      "Certification": "Qi, CE, FCC, RoHS",
      "Temperature Protection": "45°C automatic cut-off",
      "Compatibility": "iPhone 8+, Samsung Galaxy S6+, Google Pixel 3+",
      "Cable Length": "1.2m USB-C cable included"
    },
    variants: [
      { id: "black", name: "Matte Black", price: 34.99, originalPrice: 44.99, stock: 28 },
      { id: "white", name: "Pearl White", price: 34.99, originalPrice: 44.99, stock: 32 },
      { id: "silver", name: "Space Silver", price: 37.99, originalPrice: 47.99, stock: 24 }
    ],
    sizes: [],
    deliveryOptions: [
      { id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 business days", description: "Regular shipping via courier" },
      { id: "express", name: "Express Delivery", price: 9.99, duration: "1-2 business days", description: "Fast shipping with tracking" },
      { id: "pickup", name: "Store Pickup", price: 0, duration: "Ready in 1 hour", description: "Pick up from our electronics store" }
    ],
    warranty: {
      duration: "18 months",
      coverage: ["Manufacturing defects", "Charging performance", "LED indicator issues", "Temperature control"],
      returnPolicy: "30-day satisfaction guarantee"
    },
    store: {
      name: "TechAccessories Hub",
      rating: 4.6,
      totalReviews: 1876,
      status: "Online",
      joinedDate: "2020",
      location: "Quezon City, Philippines",
      responseTime: "Within 45 minutes",
      chatResponse: 92
    },
    reviewsList: [
      {
        id: 1,
        user: "Mark Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b412f2d3?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        date: "2025-09-20",
        comment: "Works perfectly with my iPhone 14 Pro! Charges fast and the LED indicator is subtle but helpful. Great build quality for the price.",
        helpful: 16,
        verified: true
      },
      {
        id: 2,
        user: "Rachel Wong",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        rating: 4,
        date: "2025-09-18",
        comment: "Convenient and works well through my phone case. Sometimes takes a moment to find the sweet spot for charging, but overall very satisfied.",
        helpful: 9,
        verified: true
      }
    ],
    tags: ["wireless", "charger", "qi", "fast-charging", "electronics"],
    stock: 84,
    sku: "PF-WC-005"
  },
  {
    id: 6,
    name: "Classic Denim Jacket",
    price: 69.99,
    originalPrice: 89.99,
    pricePhp: Math.round(69.99 * USD_TO_PHP),
    originalPricePhp: Math.round(89.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=500&h=500&fit=crop"
    ],
    rating: 4.4,
    reviews: 127,
    category: "Clothing",
    brand: "Urban Classic",
    description: "Timeless denim jacket crafted from premium cotton denim. Features classic styling with modern fit and comfort. Perfect for layering and adding effortless style to any outfit.",
    features: [
      "100% Cotton Denim",
      "Classic button-front closure",
      "Two chest pockets with button flaps",
      "Adjustable button cuffs",
      "Regular fit design",
      "Pre-washed for softness",
      "Durable construction",
      "Versatile styling options"
    ],
    specifications: {
      "Material": "100% Cotton Denim",
      "Weight": "12 oz denim",
      "Fit": "Regular fit",
      "Closure": "Button front",
      "Pockets": "2 chest pockets, 2 side pockets",
      "Care Instructions": "Machine wash cold, hang dry",
      "Origin": "Made in Philippines",
      "Wash": "Medium wash with subtle fading",
      "Lining": "Unlined for breathability"
    },
    variants: [
      { id: "medium-wash", name: "Medium Wash", price: 69.99, originalPrice: 89.99, stock: 20 },
      { id: "dark-wash", name: "Dark Wash", price: 74.99, originalPrice: 94.99, stock: 16 },
      { id: "light-wash", name: "Light Wash", price: 69.99, originalPrice: 89.99, stock: 22 },
      { id: "black", name: "Black Denim", price: 74.99, originalPrice: 94.99, stock: 18 }
    ],
    sizes: [
      { id: "xs", name: "XS", available: true },
      { id: "s", name: "S", available: true },
      { id: "m", name: "M", available: true },
      { id: "l", name: "L", available: true },
      { id: "xl", name: "XL", available: true },
      { id: "xxl", name: "XXL", available: false }
    ],
    deliveryOptions: [
      { id: "standard", name: "Standard Delivery", price: 5.99, duration: "4-6 business days", description: "Regular shipping via courier" },
      { id: "express", name: "Express Delivery", price: 11.99, duration: "2-3 business days", description: "Fast shipping with tracking" },
      { id: "pickup", name: "Store Pickup", price: 0, duration: "Ready in 2 hours", description: "Pick up from our fashion store" }
    ],
    warranty: {
      duration: "6 months",
      coverage: ["Construction defects", "Button/zipper issues", "Color fading"],
      returnPolicy: "30-day exchange/return policy"
    },
    store: {
      name: "Denim District PH",
      rating: 4.5,
      totalReviews: 1342,
      status: "Online",
      joinedDate: "2019",
      location: "Taguig City, Philippines",
      responseTime: "Within 1 hour",
      chatResponse: 89
    },
    reviewsList: [
      {
        id: 1,
        user: "Alex Rivera",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4,
        date: "2025-09-19",
        comment: "Great quality denim jacket! Fits well and the wash looks authentic. Perfect for casual outfits. The cotton feels sturdy but not stiff.",
        helpful: 14,
        verified: true
      },
      {
        id: 2,
        user: "Sofia Mercado",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 5,
        date: "2025-09-14",
        comment: "Love this jacket! The medium wash is perfect and it goes with everything. True to size and great value for money.",
        helpful: 11,
        verified: true
      }
    ],
    tags: ["denim", "jacket", "classic", "cotton", "casual"],
    stock: 76,
    sku: "UC-DJ-006"
  },

  // ELECTRONICS CATEGORY (IDs 7-56) - 50 items total
  {
    id: 7,
    name: "Gaming Mechanical Keyboard",
    price: 89.99,
    originalPrice: 119.99,
    pricePhp: Math.round(89.99 * USD_TO_PHP),
    originalPricePhp: Math.round(119.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=500&h=500&fit=crop"
    ],
    rating: 4.7,
    reviews: 289,
    category: "Electronics",
    brand: "GameTech Pro",
    description: "RGB mechanical gaming keyboard with tactile switches for precise gaming performance.",
    features: ["RGB Backlighting", "Mechanical Switches", "Anti-ghosting", "Gaming Mode"],
    specifications: {
      "Switch Type": "Mechanical Blue",
      "Key Layout": "104 Keys",
      "Connection": "USB-C",
      "Compatibility": "Windows, Mac, Linux"
    },
    variants: [
      { id: "black", name: "Black", price: 89.99, originalPrice: 119.99, stock: 25 },
      { id: "white", name: "White", price: 94.99, originalPrice: 124.99, stock: 18 }
    ],
    sizes: [],
    deliveryOptions: [
      { id: "standard", name: "Standard Delivery", price: 5.99, duration: "3-5 days", description: "Regular shipping" },
      { id: "express", name: "Express Delivery", price: 12.99, duration: "1-2 days", description: "Fast shipping" }
    ],
    warranty: { duration: "2 years", coverage: ["Hardware defects", "Key switch issues"], returnPolicy: "30-day return" },
    store: { name: "Gaming Gear Hub", rating: 4.8, totalReviews: 1543, status: "Online", joinedDate: "2019", location: "Manila, Philippines", responseTime: "Within 1 hour", chatResponse: 96 },
    reviewsList: generateReviews(3),
    tags: ["gaming", "mechanical", "rgb", "keyboard"],
    stock: 43,
    sku: "GTP-MK-007"
  },
  {
    id: 8,
    name: "4K Webcam with Microphone",
    price: 149.99,
    originalPrice: 199.99,
    pricePhp: Math.round(149.99 * USD_TO_PHP),
    originalPricePhp: Math.round(199.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=500&h=500&fit=crop"
    ],
    rating: 4.6,
    reviews: 156,
    category: "Electronics",
    brand: "StreamCam Pro",
    description: "Professional 4K webcam with built-in microphone for streaming and video calls.",
    features: ["4K Recording", "Auto Focus", "Built-in Microphone", "Privacy Shutter"],
    specifications: {
      "Resolution": "4K 30fps",
      "Field of View": "90 degrees",
      "Connection": "USB 3.0",
      "Compatibility": "Windows, Mac, Linux"
    },
    variants: [
      { id: "black", name: "Black", price: 149.99, originalPrice: 199.99, stock: 32 }
    ],
    sizes: [],
    deliveryOptions: [
      { id: "standard", name: "Standard Delivery", price: 6.99, duration: "3-5 days", description: "Regular shipping" },
      { id: "express", name: "Express Delivery", price: 13.99, duration: "1-2 days", description: "Fast shipping" }
    ],
    warranty: { duration: "1 year", coverage: ["Hardware defects", "Lens issues"], returnPolicy: "30-day return" },
    store: { name: "Tech Peripherals", rating: 4.5, totalReviews: 892, status: "Online", joinedDate: "2020", location: "Cebu, Philippines", responseTime: "Within 2 hours", chatResponse: 89 },
    reviewsList: generateReviews(3),
    tags: ["webcam", "4k", "streaming", "microphone"],
    stock: 32,
    sku: "SCP-WC-008"
  },
  {
    id: 9,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    originalPrice: 99.99,
    pricePhp: Math.round(79.99 * USD_TO_PHP),
    originalPricePhp: Math.round(99.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&h=500&fit=crop"
    ],
    rating: 4.4,
    reviews: 203,
    category: "Electronics",
    brand: "SoundWave",
    description: "Waterproof portable Bluetooth speaker with 20-hour battery life.",
    features: ["Waterproof IPX7", "20-hour Battery", "360° Sound", "USB-C Charging"],
    specifications: {
      "Battery Life": "20 hours",
      "Bluetooth": "5.0",
      "Water Rating": "IPX7",
      "Output": "25W"
    },
    variants: [
      { id: "blue", name: "Ocean Blue", price: 79.99, originalPrice: 99.99, stock: 28 },
      { id: "red", name: "Fire Red", price: 79.99, originalPrice: 99.99, stock: 22 },
      { id: "black", name: "Midnight Black", price: 84.99, originalPrice: 104.99, stock: 19 }
    ],
    sizes: [],
    deliveryOptions: [
      { id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" },
      { id: "express", name: "Express Delivery", price: 9.99, duration: "1-2 days", description: "Fast shipping" }
    ],
    warranty: { duration: "1 year", coverage: ["Hardware defects", "Battery issues"], returnPolicy: "30-day return" },
    store: { name: "Audio Excellence", rating: 4.6, totalReviews: 1234, status: "Online", joinedDate: "2018", location: "Davao, Philippines", responseTime: "Within 1 hour", chatResponse: 93 },
    reviewsList: generateReviews(3),
    tags: ["bluetooth", "speaker", "waterproof", "portable"],
    stock: 69,
    sku: "SW-BT-009"
  },
  {
    id: 10,
    name: "Smartphone 128GB",
    price: 599.99,
    originalPrice: 799.99,
    pricePhp: Math.round(599.99 * USD_TO_PHP),
    originalPricePhp: Math.round(799.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop"
    ],
    rating: 4.8,
    reviews: 892,
    category: "Electronics",
    brand: "TechPhone",
    description: "Latest smartphone with 128GB storage, triple camera system, and 5G connectivity.",
    features: ["5G Ready", "Triple Camera", "128GB Storage", "Fast Charging", "Face ID"],
    specifications: {
      "Storage": "128GB",
      "RAM": "8GB",
      "Display": "6.7-inch OLED",
      "Camera": "Triple 48MP",
      "Battery": "4500mAh"
    },
    variants: [
      { id: "black", name: "Space Black", price: 599.99, originalPrice: 799.99, stock: 15 },
      { id: "blue", name: "Deep Blue", price: 599.99, originalPrice: 799.99, stock: 12 },
      { id: "gold", name: "Rose Gold", price: 649.99, originalPrice: 849.99, stock: 8 }
    ],
    sizes: [],
    deliveryOptions: [
      { id: "standard", name: "Standard Delivery", price: 0, duration: "3-5 days", description: "Free shipping" },
      { id: "express", name: "Express Delivery", price: 19.99, duration: "1-2 days", description: "Fast shipping" },
      { id: "overnight", name: "Overnight", price: 39.99, duration: "Next day", description: "Priority shipping" }
    ],
    warranty: { duration: "2 years", coverage: ["Hardware defects", "Battery issues", "Screen damage"], returnPolicy: "14-day return" },
    store: { name: "Mobile World", rating: 4.9, totalReviews: 3245, status: "Online", joinedDate: "2017", location: "Manila, Philippines", responseTime: "Within 30 minutes", chatResponse: 98 },
    reviewsList: generateReviews(5),
    tags: ["smartphone", "5g", "camera", "fast-charging"],
    stock: 35,
    sku: "TP-SM-010"
  },

  // Continue with more Electronics products...
  {
    id: 11,
    name: "Wireless Gaming Mouse",
    price: 69.99,
    originalPrice: 89.99,
    pricePhp: Math.round(69.99 * USD_TO_PHP),
    originalPricePhp: Math.round(89.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=500&fit=crop"
    ],
    rating: 4.5,
    reviews: 167,
    category: "Electronics",
    brand: "ProGamer",
    description: "High-precision wireless gaming mouse with customizable RGB lighting.",
    features: ["16000 DPI", "Wireless 2.4GHz", "RGB Lighting", "Programmable Buttons"],
    specifications: {
      "DPI": "16000",
      "Polling Rate": "1000Hz",
      "Battery": "70 hours",
      "Weight": "85g"
    },
    variants: [
      { id: "black", name: "Gaming Black", price: 69.99, originalPrice: 89.99, stock: 34 }
    ],
    sizes: [],
    deliveryOptions: [
      { id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }
    ],
    warranty: { duration: "2 years", coverage: ["Hardware defects"], returnPolicy: "30-day return" },
    store: { name: "Gaming Gear Hub", rating: 4.8, totalReviews: 1543, status: "Online", joinedDate: "2019", location: "Manila, Philippines", responseTime: "Within 1 hour", chatResponse: 96 },
    reviewsList: generateReviews(3),
    tags: ["gaming", "mouse", "wireless", "rgb"],
    stock: 34,
    sku: "PG-GM-011"
  },

  // CLOTHING CATEGORY (IDs 57-106) - 50 items total
  {
    id: 57,
    name: "Casual Polo Shirt",
    price: 39.99,
    originalPrice: 59.99,
    pricePhp: Math.round(39.99 * USD_TO_PHP),
    originalPricePhp: Math.round(59.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop"
    ],
    rating: 4.3,
    reviews: 128,
    category: "Clothing",
    brand: "CasualWear Co",
    description: "Comfortable cotton polo shirt perfect for casual and semi-formal occasions.",
    features: ["100% Cotton", "Breathable Fabric", "Classic Fit", "Machine Washable"],
    specifications: {
      "Material": "100% Cotton",
      "Fit": "Classic",
      "Care": "Machine wash cold",
      "Origin": "Philippines"
    },
    variants: [
      { id: "white", name: "Classic White", price: 39.99, originalPrice: 59.99, stock: 45 },
      { id: "navy", name: "Navy Blue", price: 39.99, originalPrice: 59.99, stock: 38 },
      { id: "gray", name: "Heather Gray", price: 39.99, originalPrice: 59.99, stock: 42 }
    ],
    sizes: [
      { id: "s", name: "S", available: true },
      { id: "m", name: "M", available: true },
      { id: "l", name: "L", available: true },
      { id: "xl", name: "XL", available: true }
    ],
    deliveryOptions: [
      { id: "standard", name: "Standard Delivery", price: 3.99, duration: "3-5 days", description: "Regular shipping" }
    ],
    warranty: { duration: "6 months", coverage: ["Color fading", "Fabric defects"], returnPolicy: "30-day exchange" },
    store: { name: "Fashion Forward PH", rating: 4.7, totalReviews: 1523, status: "Online", joinedDate: "2020", location: "Cebu City, Philippines", responseTime: "Within 30 minutes", chatResponse: 95 },
    reviewsList: generateReviews(3),
    tags: ["polo", "cotton", "casual", "classic"],
    stock: 125,
    sku: "CW-PS-057"
  },

  // ACCESSORIES CATEGORY (IDs 107-156) - 50 items total  
  {
    id: 107,
    name: "Minimalist Wrist Watch",
    price: 129.99,
    originalPrice: 179.99,
    pricePhp: Math.round(129.99 * USD_TO_PHP),
    originalPricePhp: Math.round(179.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=500&h=500&fit=crop"
    ],
    rating: 4.6,
    reviews: 89,
    category: "Accessories",
    brand: "TimeDesign",
    description: "Elegant minimalist watch with genuine leather strap and Swiss movement.",
    features: ["Swiss Movement", "Leather Strap", "Water Resistant", "Minimalist Design"],
    specifications: {
      "Movement": "Swiss Quartz",
      "Case Material": "Stainless Steel",
      "Strap": "Genuine Leather",
      "Water Resistance": "30M"
    },
    variants: [
      { id: "brown", name: "Brown Leather", price: 129.99, originalPrice: 179.99, stock: 18 },
      { id: "black", name: "Black Leather", price: 129.99, originalPrice: 179.99, stock: 22 }
    ],
    sizes: [],
    deliveryOptions: [
      { id: "standard", name: "Standard Delivery", price: 6.99, duration: "3-5 days", description: "Regular shipping" }
    ],
    warranty: { duration: "2 years", coverage: ["Movement defects", "Water damage"], returnPolicy: "30-day return" },
    store: { name: "Timepiece Collection", rating: 4.8, totalReviews: 567, status: "Online", joinedDate: "2019", location: "Manila, Philippines", responseTime: "Within 2 hours", chatResponse: 94 },
    reviewsList: generateReviews(3),
    tags: ["watch", "minimalist", "leather", "swiss"],
    stock: 40,
    sku: "TD-MW-107"
  },

  // Adding 40+ more Electronics products (IDs 12-56)
  {
    id: 12, name: "USB-C Hub 7-in-1", price: 49.99, originalPrice: 69.99, pricePhp: Math.round(49.99 * USD_TO_PHP), originalPricePhp: Math.round(69.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop"],
    rating: 4.5, reviews: 234, category: "Electronics", brand: "ConnectPro", description: "7-in-1 USB-C hub with multiple ports for connectivity.",
    features: ["7 Ports", "USB-C", "4K HDMI", "Fast Charging"], specifications: {"Ports": "7", "USB": "3.0", "HDMI": "4K"}, variants: [{ id: "gray", name: "Space Gray", price: 49.99, originalPrice: 69.99, stock: 45 }],
    sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "1 year", coverage: ["Hardware defects"], returnPolicy: "30-day return" },
    store: { name: "Tech Accessories", rating: 4.6, totalReviews: 876, status: "Online", joinedDate: "2020", location: "Manila, Philippines", responseTime: "Within 1 hour", chatResponse: 92 },
    reviewsList: generateReviews(3), tags: ["usb-c", "hub", "connectivity"], stock: 45, sku: "CP-HUB-012"
  },
  { id: 13, name: "LED Ring Light", price: 89.99, originalPrice: 119.99, pricePhp: Math.round(89.99 * USD_TO_PHP), originalPricePhp: Math.round(119.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1626315869436-598b3e351ab3?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1626315869436-598b3e351ab3?w=500&h=500&fit=crop"],
    rating: 4.7, reviews: 189, category: "Electronics", brand: "StudioLight", description: "Professional LED ring light for photography and streaming.", features: ["Dimmable", "Color Temperature", "Phone Mount", "Remote Control"],
    specifications: {"LED Count": "240", "Diameter": "18 inches", "Power": "55W"}, variants: [{ id: "white", name: "White", price: 89.99, originalPrice: 119.99, stock: 28 }], sizes: [],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 6.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "2 years", coverage: ["LED defects"], returnPolicy: "30-day return" },
    store: { name: "Photo Studio Gear", rating: 4.8, totalReviews: 543, status: "Online", joinedDate: "2019", location: "Quezon City, Philippines", responseTime: "Within 30 minutes", chatResponse: 95 },
    reviewsList: generateReviews(3), tags: ["led", "ring-light", "photography", "streaming"], stock: 28, sku: "SL-RL-013"
  },
  { id: 14, name: "Power Bank 20000mAh", price: 39.99, originalPrice: 59.99, pricePhp: Math.round(39.99 * USD_TO_PHP), originalPricePhp: Math.round(59.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1609592842510-b1b68b4d82c9?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1609592842510-b1b68b4d82c9?w=500&h=500&fit=crop"],
    rating: 4.4, reviews: 567, category: "Electronics", brand: "PowerMax", description: "High-capacity portable power bank with fast charging.", features: ["20000mAh", "Fast Charge", "Dual USB", "LED Display"],
    specifications: {"Capacity": "20000mAh", "Output": "22.5W", "Ports": "3"}, variants: [{ id: "black", name: "Black", price: 39.99, originalPrice: 59.99, stock: 67 }], sizes: [],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "1 year", coverage: ["Battery defects"], returnPolicy: "30-day return" },
    store: { name: "Power Solutions", rating: 4.5, totalReviews: 1234, status: "Online", joinedDate: "2018", location: "Cebu, Philippines", responseTime: "Within 1 hour", chatResponse: 88 },
    reviewsList: generateReviews(3), tags: ["power-bank", "portable", "fast-charge"], stock: 67, sku: "PM-PB-014"
  },
  { id: 15, name: "Laptop Stand Adjustable", price: 59.99, originalPrice: 79.99, pricePhp: Math.round(59.99 * USD_TO_PHP), originalPricePhp: Math.round(79.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop"],
    rating: 4.6, reviews: 123, category: "Electronics", brand: "ErgoDesk", description: "Adjustable aluminum laptop stand for better ergonomics.", features: ["Adjustable Height", "Aluminum Build", "Heat Dissipation", "Portable"],
    specifications: {"Material": "Aluminum", "Compatibility": "10-17 inch laptops", "Weight": "1.2kg"}, variants: [{ id: "silver", name: "Silver", price: 59.99, originalPrice: 79.99, stock: 34 }], sizes: [],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 5.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "2 years", coverage: ["Build defects"], returnPolicy: "30-day return" },
    store: { name: "Workspace Solutions", rating: 4.7, totalReviews: 456, status: "Online", joinedDate: "2020", location: "Manila, Philippines", responseTime: "Within 2 hours", chatResponse: 91 },
    reviewsList: generateReviews(3), tags: ["laptop-stand", "ergonomic", "adjustable"], stock: 34, sku: "ED-LS-015"
  },
  { id: 16, name: "Security Camera 1080p", price: 129.99, originalPrice: 169.99, pricePhp: Math.round(129.99 * USD_TO_PHP), originalPricePhp: Math.round(169.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"],
    rating: 4.5, reviews: 298, category: "Electronics", brand: "SecureTech", description: "WiFi security camera with night vision and motion detection.", features: ["1080p HD", "Night Vision", "Motion Detection", "Cloud Storage"],
    specifications: {"Resolution": "1080p", "Storage": "Cloud + SD", "Connectivity": "WiFi"}, variants: [{ id: "white", name: "White", price: 129.99, originalPrice: 169.99, stock: 42 }], sizes: [],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 6.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "2 years", coverage: ["Hardware defects"], returnPolicy: "30-day return" },
    store: { name: "Home Security", rating: 4.6, totalReviews: 987, status: "Online", joinedDate: "2019", location: "Davao, Philippines", responseTime: "Within 1 hour", chatResponse: 93 },
    reviewsList: generateReviews(3), tags: ["security", "camera", "wifi", "surveillance"], stock: 42, sku: "ST-SC-016"
  },

  // Adding 40+ more Clothing products (IDs 58-106)
  { id: 58, name: "Slim Fit Jeans", price: 79.99, originalPrice: 99.99, pricePhp: Math.round(79.99 * USD_TO_PHP), originalPricePhp: Math.round(99.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop"],
    rating: 4.4, reviews: 245, category: "Clothing", brand: "DenimCraft", description: "Premium slim fit jeans with comfortable stretch fabric.", features: ["Stretch Fabric", "Slim Fit", "Premium Denim", "5-Pocket Design"],
    specifications: {"Material": "98% Cotton, 2% Elastane", "Fit": "Slim", "Wash": "Dark Indigo"}, variants: [{ id: "indigo", name: "Dark Indigo", price: 79.99, originalPrice: 99.99, stock: 56 }],
    sizes: [{ id: "30", name: "30", available: true }, { id: "32", name: "32", available: true }, { id: "34", name: "34", available: true }], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "6 months", coverage: ["Construction defects"], returnPolicy: "30-day exchange" }, store: { name: "Denim District PH", rating: 4.5, totalReviews: 1342, status: "Online", joinedDate: "2019", location: "Taguig City, Philippines", responseTime: "Within 1 hour", chatResponse: 89 },
    reviewsList: generateReviews(3), tags: ["jeans", "slim-fit", "denim", "stretch"], stock: 56, sku: "DC-SJ-058"
  },
  { id: 59, name: "Knit Sweater", price: 69.99, originalPrice: 89.99, pricePhp: Math.round(69.99 * USD_TO_PHP), originalPricePhp: Math.round(89.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=500&fit=crop"],
    rating: 4.6, reviews: 178, category: "Clothing", brand: "CozyWear", description: "Soft knit sweater perfect for cooler weather.", features: ["Soft Knit", "Breathable", "Machine Washable", "Cozy Fit"],
    specifications: {"Material": "100% Acrylic", "Fit": "Regular", "Care": "Machine wash"}, variants: [{ id: "beige", name: "Beige", price: 69.99, originalPrice: 89.99, stock: 43 }],
    sizes: [{ id: "s", name: "S", available: true }, { id: "m", name: "M", available: true }, { id: "l", name: "L", available: true }], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "6 months", coverage: ["Fabric defects"], returnPolicy: "30-day exchange" }, store: { name: "Comfort Clothing", rating: 4.4, totalReviews: 567, status: "Online", joinedDate: "2020", location: "Cebu, Philippines", responseTime: "Within 2 hours", chatResponse: 87 },
    reviewsList: generateReviews(3), tags: ["sweater", "knit", "cozy", "winter"], stock: 43, sku: "CW-KS-059"
  },
  { id: 60, name: "Running Shoes", price: 119.99, originalPrice: 149.99, pricePhp: Math.round(119.99 * USD_TO_PHP), originalPricePhp: Math.round(149.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop"],
    rating: 4.7, reviews: 432, category: "Clothing", brand: "SportStep", description: "Lightweight running shoes with superior cushioning.", features: ["Lightweight", "Cushioned Sole", "Breathable Mesh", "Non-slip"],
    specifications: {"Material": "Mesh upper", "Sole": "Rubber", "Weight": "280g"}, variants: [{ id: "black", name: "Black/White", price: 119.99, originalPrice: 149.99, stock: 78 }],
    sizes: [{ id: "8", name: "8", available: true }, { id: "9", name: "9", available: true }, { id: "10", name: "10", available: true }], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 5.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "1 year", coverage: ["Sole defects", "Material wear"], returnPolicy: "30-day return" }, store: { name: "Athletic Gear", rating: 4.8, totalReviews: 2134, status: "Online", joinedDate: "2018", location: "Manila, Philippines", responseTime: "Within 30 minutes", chatResponse: 96 },
    reviewsList: generateReviews(4), tags: ["running", "shoes", "athletic", "lightweight"], stock: 78, sku: "SS-RS-060"
  },

  // Adding 40+ more Accessories products (IDs 108-156)
  { id: 108, name: "Leather Wallet", price: 45.99, originalPrice: 65.99, pricePhp: Math.round(45.99 * USD_TO_PHP), originalPricePhp: Math.round(65.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop"],
    rating: 4.5, reviews: 167, category: "Accessories", brand: "LeatherCraft", description: "Genuine leather wallet with RFID blocking technology.", features: ["RFID Blocking", "Genuine Leather", "Multiple Card Slots", "Bill Compartment"],
    specifications: {"Material": "Genuine Leather", "Slots": "12 card slots", "RFID": "Yes"}, variants: [{ id: "brown", name: "Brown", price: 45.99, originalPrice: 65.99, stock: 54 }],
    sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 3.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "2 years", coverage: ["Leather quality"], returnPolicy: "30-day return" },
    store: { name: "Artisan Leather Works", rating: 4.9, totalReviews: 892, status: "Online", joinedDate: "2017", location: "Marikina City, Philippines", responseTime: "Within 2 hours", chatResponse: 94 },
    reviewsList: generateReviews(3), tags: ["wallet", "leather", "rfid", "accessories"], stock: 54, sku: "LC-LW-108"
  },
  { id: 109, name: "Aviator Sunglasses", price: 89.99, originalPrice: 119.99, pricePhp: Math.round(89.99 * USD_TO_PHP), originalPricePhp: Math.round(119.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop"],
    rating: 4.6, reviews: 234, category: "Accessories", brand: "SunStyle", description: "Classic aviator sunglasses with UV protection and polarized lenses.", features: ["UV Protection", "Polarized Lenses", "Metal Frame", "Classic Design"],
    specifications: {"Lens": "Polarized", "Frame": "Metal", "UV Protection": "100%"}, variants: [{ id: "gold", name: "Gold Frame", price: 89.99, originalPrice: 119.99, stock: 32 }],
    sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "1 year", coverage: ["Frame defects", "Lens quality"], returnPolicy: "30-day return" },
    store: { name: "Eyewear Boutique", rating: 4.7, totalReviews: 456, status: "Online", joinedDate: "2019", location: "Makati, Philippines", responseTime: "Within 1 hour", chatResponse: 92 },
    reviewsList: generateReviews(3), tags: ["sunglasses", "aviator", "polarized", "uv-protection"], stock: 32, sku: "SS-AS-109"
  },
  { id: 110, name: "Crossbody Bag", price: 59.99, originalPrice: 79.99, pricePhp: Math.round(59.99 * USD_TO_PHP), originalPricePhp: Math.round(79.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop"],
    rating: 4.4, reviews: 156, category: "Accessories", brand: "UrbanCarry", description: "Stylish crossbody bag perfect for daily use and travel.", features: ["Adjustable Strap", "Multiple Pockets", "Water Resistant", "Lightweight"],
    specifications: {"Material": "Nylon", "Dimensions": "25x18x8 cm", "Weight": "0.4kg"}, variants: [{ id: "black", name: "Black", price: 59.99, originalPrice: 79.99, stock: 47 }],
    sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "1 year", coverage: ["Zipper defects", "Strap issues"], returnPolicy: "30-day return" },
    store: { name: "Urban Accessories", rating: 4.5, totalReviews: 678, status: "Online", joinedDate: "2020", location: "Quezon City, Philippines", responseTime: "Within 1 hour", chatResponse: 89 },
    reviewsList: generateReviews(3), tags: ["crossbody", "bag", "travel", "urban"], stock: 47, sku: "UC-CB-110"
  },

  // Continue adding more Electronics products (reaching 50 total)
  { id: 17, name: "Bluetooth Earbuds Pro", price: 199.99, originalPrice: 249.99, pricePhp: Math.round(199.99 * USD_TO_PHP), originalPricePhp: Math.round(249.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop"],
    rating: 4.8, reviews: 1289, category: "Electronics", brand: "AudioTech", description: "Premium wireless earbuds with active noise cancellation.",
    features: ["ANC", "Wireless Charging", "30hr Battery", "IPX7"], specifications: {"Battery": "30 hours", "Drivers": "12mm", "Connectivity": "Bluetooth 5.3"},
    variants: [{ id: "white", name: "White", price: 199.99, originalPrice: 249.99, stock: 89 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 0, duration: "3-5 days", description: "Free shipping" }],
    warranty: { duration: "2 years", coverage: ["Hardware defects"], returnPolicy: "30-day return" }, store: { name: "Audio Excellence", rating: 4.6, totalReviews: 1234, status: "Online", joinedDate: "2018", location: "Davao, Philippines", responseTime: "Within 1 hour", chatResponse: 93 },
    reviewsList: generateReviews(4), tags: ["earbuds", "wireless", "anc", "premium"], stock: 89, sku: "AT-BE-017"
  },
  { id: 18, name: "Gaming Chair RGB", price: 299.99, originalPrice: 399.99, pricePhp: Math.round(299.99 * USD_TO_PHP), originalPricePhp: Math.round(399.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop"],
    rating: 4.5, reviews: 456, category: "Electronics", brand: "GameThrone", description: "Ergonomic gaming chair with RGB lighting and premium comfort.",
    features: ["RGB Lighting", "Ergonomic Design", "Memory Foam", "360° Swivel"], specifications: {"Material": "PU Leather", "Weight Capacity": "150kg", "Height": "Adjustable"},
    variants: [{ id: "black", name: "Black/Red", price: 299.99, originalPrice: 399.99, stock: 23 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 15.99, duration: "5-7 days", description: "Large item shipping" }],
    warranty: { duration: "3 years", coverage: ["Mechanism defects", "Foam quality"], returnPolicy: "30-day return" }, store: { name: "Gaming Gear Hub", rating: 4.8, totalReviews: 1543, status: "Online", joinedDate: "2019", location: "Manila, Philippines", responseTime: "Within 1 hour", chatResponse: 96 },
    reviewsList: generateReviews(4), tags: ["gaming", "chair", "rgb", "ergonomic"], stock: 23, sku: "GT-GC-018"
  },
  { id: 19, name: "Tablet 10-inch Android", price: 249.99, originalPrice: 329.99, pricePhp: Math.round(249.99 * USD_TO_PHP), originalPricePhp: Math.round(329.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop"],
    rating: 4.4, reviews: 678, category: "Electronics", brand: "TabletPro", description: "10-inch Android tablet perfect for work and entertainment.",
    features: ["10-inch Display", "64GB Storage", "8MP Camera", "Long Battery"], specifications: {"OS": "Android 13", "Storage": "64GB", "RAM": "4GB", "Battery": "7000mAh"},
    variants: [{ id: "gray", name: "Space Gray", price: 249.99, originalPrice: 329.99, stock: 56 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 7.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "1 year", coverage: ["Hardware defects"], returnPolicy: "14-day return" }, store: { name: "Mobile World", rating: 4.9, totalReviews: 3245, status: "Online", joinedDate: "2017", location: "Manila, Philippines", responseTime: "Within 30 minutes", chatResponse: 98 },
    reviewsList: generateReviews(4), tags: ["tablet", "android", "portable", "entertainment"], stock: 56, sku: "TP-TAB-019"
  },
  { id: 20, name: "Smart Home Hub", price: 129.99, originalPrice: 169.99, pricePhp: Math.round(129.99 * USD_TO_PHP), originalPricePhp: Math.round(169.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"],
    rating: 4.6, reviews: 234, category: "Electronics", brand: "SmartLife", description: "Central hub for controlling all your smart home devices.",
    features: ["Voice Control", "App Integration", "Multi-Device", "Easy Setup"], specifications: {"Connectivity": "WiFi, Zigbee, Z-Wave", "Compatibility": "Alexa, Google", "Range": "100m"},
    variants: [{ id: "white", name: "White", price: 129.99, originalPrice: 169.99, stock: 34 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 6.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "2 years", coverage: ["Hardware defects"], returnPolicy: "30-day return" }, store: { name: "Smart Home Tech", rating: 4.7, totalReviews: 567, status: "Online", joinedDate: "2020", location: "Cebu, Philippines", responseTime: "Within 1 hour", chatResponse: 91 },
    reviewsList: generateReviews(3), tags: ["smart-home", "hub", "automation", "voice-control"], stock: 34, sku: "SL-SH-020"
  },

  // Continue adding more Clothing products
  { id: 61, name: "Formal Dress Shirt", price: 89.99, originalPrice: 119.99, pricePhp: Math.round(89.99 * USD_TO_PHP), originalPricePhp: Math.round(119.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop"],
    rating: 4.5, reviews: 289, category: "Clothing", brand: "FormalWear Co", description: "Premium formal dress shirt perfect for business and special occasions.",
    features: ["Wrinkle Resistant", "Cotton Blend", "Classic Collar", "French Cuffs"], specifications: {"Material": "60% Cotton, 40% Polyester", "Fit": "Slim", "Collar": "Spread"},
    variants: [{ id: "white", name: "Classic White", price: 89.99, originalPrice: 119.99, stock: 45 }], sizes: [{ id: "15", name: "15", available: true }, { id: "16", name: "16", available: true }],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 5.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "6 months", coverage: ["Construction defects"], returnPolicy: "30-day exchange" },
    store: { name: "Professional Attire", rating: 4.6, totalReviews: 456, status: "Online", joinedDate: "2019", location: "Makati, Philippines", responseTime: "Within 2 hours", chatResponse: 88 },
    reviewsList: generateReviews(3), tags: ["formal", "dress-shirt", "business", "cotton"], stock: 45, sku: "FW-DS-061"
  },
  { id: 62, name: "Cargo Shorts", price: 49.99, originalPrice: 69.99, pricePhp: Math.round(49.99 * USD_TO_PHP), originalPricePhp: Math.round(69.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop"],
    rating: 4.3, reviews: 167, category: "Clothing", brand: "OutdoorGear", description: "Durable cargo shorts with multiple pockets for outdoor activities.",
    features: ["Multiple Pockets", "Durable Fabric", "Comfortable Fit", "Quick Dry"], specifications: {"Material": "65% Cotton, 35% Polyester", "Pockets": "6", "Length": "11 inch"},
    variants: [{ id: "khaki", name: "Khaki", price: 49.99, originalPrice: 69.99, stock: 67 }], sizes: [{ id: "30", name: "30", available: true }, { id: "32", name: "32", available: true }],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "6 months", coverage: ["Construction defects"], returnPolicy: "30-day exchange" },
    store: { name: "Adventure Clothing", rating: 4.4, totalReviews: 234, status: "Online", joinedDate: "2020", location: "Baguio, Philippines", responseTime: "Within 3 hours", chatResponse: 85 },
    reviewsList: generateReviews(3), tags: ["cargo", "shorts", "outdoor", "pockets"], stock: 67, sku: "OG-CS-062"
  },

  // Continue adding more Accessories products
  { id: 111, name: "Baseball Cap Premium", price: 34.99, originalPrice: 49.99, pricePhp: Math.round(34.99 * USD_TO_PHP), originalPricePhp: Math.round(49.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&h=500&fit=crop"],
    rating: 4.4, reviews: 189, category: "Accessories", brand: "CapStyle", description: "Premium baseball cap with adjustable strap and embroidered logo.",
    features: ["Adjustable Strap", "Breathable Fabric", "Embroidered Logo", "Curved Brim"], specifications: {"Material": "100% Cotton", "Size": "One Size Fits All", "Closure": "Snapback"},
    variants: [{ id: "navy", name: "Navy Blue", price: 34.99, originalPrice: 49.99, stock: 78 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 3.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "6 months", coverage: ["Construction defects"], returnPolicy: "30-day return" }, store: { name: "Hat Collection", rating: 4.3, totalReviews: 345, status: "Online", joinedDate: "2021", location: "Iloilo, Philippines", responseTime: "Within 4 hours", chatResponse: 82 },
    reviewsList: generateReviews(3), tags: ["cap", "baseball", "adjustable", "cotton"], stock: 78, sku: "CS-BC-111"
  },
  { id: 112, name: "Silver Chain Necklace", price: 79.99, originalPrice: 109.99, pricePhp: Math.round(79.99 * USD_TO_PHP), originalPricePhp: Math.round(109.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop"],
    rating: 4.7, reviews: 234, category: "Accessories", brand: "JewelCraft", description: "Elegant sterling silver chain necklace for any occasion.",
    features: ["Sterling Silver", "Hypoallergenic", "Adjustable Length", "Gift Box"], specifications: {"Material": "925 Sterling Silver", "Length": "18-20 inches", "Weight": "15g"},
    variants: [{ id: "silver", name: "Sterling Silver", price: 79.99, originalPrice: 109.99, stock: 34 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 5.99, duration: "3-5 days", description: "Secure shipping" }],
    warranty: { duration: "1 year", coverage: ["Tarnishing", "Clasp defects"], returnPolicy: "30-day return" }, store: { name: "Fine Jewelry", rating: 4.8, totalReviews: 1123, status: "Online", joinedDate: "2018", location: "Manila, Philippines", responseTime: "Within 2 hours", chatResponse: 95 },
    reviewsList: generateReviews(3), tags: ["necklace", "silver", "jewelry", "elegant"], stock: 34, sku: "JC-SN-112"
  },

  // Adding more Electronics products (continuing to reach 50)
  { id: 21, name: "Wireless Mouse Pad", price: 39.99, originalPrice: 54.99, pricePhp: Math.round(39.99 * USD_TO_PHP), originalPricePhp: Math.round(54.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop"],
    rating: 4.3, reviews: 145, category: "Electronics", brand: "DeskPro", description: "Premium wireless charging mouse pad with LED lighting.",
    features: ["Wireless Charging", "LED RGB", "Water Resistant", "Large Surface"], specifications: {"Size": "350x250mm", "Charging": "Qi Wireless", "Power": "USB-C"},
    variants: [{ id: "black", name: "Black", price: 39.99, originalPrice: 54.99, stock: 67 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "1 year", coverage: ["Electronics defects"], returnPolicy: "30-day return" }, store: { name: "Desk Setup Pro", rating: 4.5, totalReviews: 234, status: "Online", joinedDate: "2020", location: "Pasig, Philippines", responseTime: "Within 2 hours", chatResponse: 87 },
    reviewsList: generateReviews(3), tags: ["mousepad", "wireless", "charging", "rgb"], stock: 67, sku: "DP-WMP-021"
  },
  { id: 22, name: "Mechanical Keyboard Compact", price: 159.99, originalPrice: 199.99, pricePhp: Math.round(159.99 * USD_TO_PHP), originalPricePhp: Math.round(199.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop"],
    rating: 4.8, reviews: 567, category: "Electronics", brand: "KeyMaster", description: "Compact 60% mechanical keyboard with hot-swappable switches.",
    features: ["Hot-Swappable", "RGB Backlight", "60% Layout", "USB-C"], specifications: {"Switches": "Cherry MX Red", "Layout": "60%", "Connectivity": "USB-C, Wireless"},
    variants: [{ id: "black", name: "Black", price: 159.99, originalPrice: 199.99, stock: 23 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 7.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "2 years", coverage: ["Switch defects", "PCB issues"], returnPolicy: "30-day return" }, store: { name: "Keyboard Enthusiasts", rating: 4.9, totalReviews: 1456, status: "Online", joinedDate: "2019", location: "Manila, Philippines", responseTime: "Within 1 hour", chatResponse: 97 },
    reviewsList: generateReviews(4), tags: ["keyboard", "mechanical", "compact", "gaming"], stock: 23, sku: "KM-MKC-022"
  },
  { id: 23, name: "4K Monitor 27-inch", price: 399.99, originalPrice: 549.99, pricePhp: Math.round(399.99 * USD_TO_PHP), originalPricePhp: Math.round(549.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop"],
    rating: 4.7, reviews: 789, category: "Electronics", brand: "ViewPro", description: "27-inch 4K IPS monitor with HDR support and USB-C connectivity.",
    features: ["4K Resolution", "HDR10", "IPS Panel", "USB-C Hub"], specifications: {"Resolution": "3840x2160", "Refresh Rate": "60Hz", "Panel": "IPS", "Brightness": "400 nits"},
    variants: [{ id: "black", name: "Black", price: 399.99, originalPrice: 549.99, stock: 12 }], sizes: [], deliveryOptions: [{ id: "express", name: "Express Delivery", price: 19.99, duration: "1-2 days", description: "Fast delivery for large items" }],
    warranty: { duration: "3 years", coverage: ["Dead pixels", "Backlight defects"], returnPolicy: "30-day return" }, store: { name: "Display World", rating: 4.8, totalReviews: 2134, status: "Online", joinedDate: "2017", location: "Manila, Philippines", responseTime: "Within 1 hour", chatResponse: 94 },
    reviewsList: generateReviews(4), tags: ["monitor", "4k", "27-inch", "professional"], stock: 12, sku: "VP-4KM-023"
  },
  { id: 24, name: "Desk Lamp LED Smart", price: 89.99, originalPrice: 119.99, pricePhp: Math.round(89.99 * USD_TO_PHP), originalPricePhp: Math.round(119.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"],
    rating: 4.6, reviews: 234, category: "Electronics", brand: "LightTech", description: "Smart LED desk lamp with wireless charging base and app control.",
    features: ["App Control", "Wireless Charging", "Eye Care", "Touch Control"], specifications: {"Brightness": "2000 Lumens", "Color Temperature": "3000K-6500K", "Power": "18W"},
    variants: [{ id: "white", name: "White", price: 89.99, originalPrice: 119.99, stock: 45 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 6.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "2 years", coverage: ["LED defects", "Charging pad"], returnPolicy: "30-day return" }, store: { name: "Smart Lighting", rating: 4.7, totalReviews: 567, status: "Online", joinedDate: "2020", location: "Cebu, Philippines", responseTime: "Within 2 hours", chatResponse: 89 },
    reviewsList: generateReviews(3), tags: ["desk-lamp", "smart", "led", "wireless-charging"], stock: 45, sku: "LT-DL-024"
  },
  { id: 25, name: "External SSD 1TB", price: 129.99, originalPrice: 179.99, pricePhp: Math.round(129.99 * USD_TO_PHP), originalPricePhp: Math.round(179.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"],
    rating: 4.8, reviews: 1123, category: "Electronics", brand: "StoragePro", description: "Ultra-fast 1TB external SSD with USB-C 3.2 connectivity.",
    features: ["1TB Capacity", "USB-C 3.2", "Portable Design", "Hardware Encryption"], specifications: {"Capacity": "1TB", "Interface": "USB-C 3.2", "Speed": "1050 MB/s", "Size": "80x60x10mm"},
    variants: [{ id: "black", name: "Black", price: 129.99, originalPrice: 179.99, stock: 67 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 5.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "5 years", coverage: ["Hardware defects"], returnPolicy: "30-day return" }, store: { name: "Storage Solutions", rating: 4.9, totalReviews: 1876, status: "Online", joinedDate: "2018", location: "Manila, Philippines", responseTime: "Within 1 hour", chatResponse: 96 },
    reviewsList: generateReviews(4), tags: ["ssd", "external", "portable", "fast"], stock: 67, sku: "SP-SSD-025"
  },

  // Adding more Clothing products
  { id: 63, name: "Polo Shirt Classic", price: 59.99, originalPrice: 79.99, pricePhp: Math.round(59.99 * USD_TO_PHP), originalPricePhp: Math.round(79.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500&h=500&fit=crop"],
    rating: 4.4, reviews: 345, category: "Clothing", brand: "ClassicWear", description: "Classic polo shirt in premium cotton pique fabric.",
    features: ["Cotton Pique", "Classic Fit", "Ribbed Collar", "Side Vents"], specifications: {"Material": "100% Cotton", "Fit": "Classic", "Collar": "Ribbed"},
    variants: [{ id: "navy", name: "Navy Blue", price: 59.99, originalPrice: 79.99, stock: 89 }], sizes: [{ id: "M", name: "Medium", available: true }, { id: "L", name: "Large", available: true }],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "6 months", coverage: ["Construction defects"], returnPolicy: "30-day exchange" },
    store: { name: "Classic Clothing", rating: 4.5, totalReviews: 678, status: "Online", joinedDate: "2019", location: "Makati, Philippines", responseTime: "Within 2 hours", chatResponse: 86 },
    reviewsList: generateReviews(3), tags: ["polo", "classic", "cotton", "casual"], stock: 89, sku: "CW-PS-063"
  },
  { id: 64, name: "Winter Jacket Puffer", price: 149.99, originalPrice: 199.99, pricePhp: Math.round(149.99 * USD_TO_PHP), originalPricePhp: Math.round(199.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop"],
    rating: 4.7, reviews: 234, category: "Clothing", brand: "WinterPro", description: "Warm puffer jacket with down insulation and water-resistant coating.",
    features: ["Down Insulation", "Water Resistant", "Adjustable Hood", "Multiple Pockets"], specifications: {"Insulation": "700 Fill Down", "Shell": "Nylon", "Lining": "Polyester"},
    variants: [{ id: "black", name: "Black", price: 149.99, originalPrice: 199.99, stock: 34 }], sizes: [{ id: "M", name: "Medium", available: true }, { id: "L", name: "Large", available: true }],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 8.99, duration: "5-7 days", description: "Large item shipping" }], warranty: { duration: "1 year", coverage: ["Zipper defects", "Insulation quality"], returnPolicy: "30-day exchange" },
    store: { name: "Winter Gear", rating: 4.8, totalReviews: 456, status: "Online", joinedDate: "2018", location: "Baguio, Philippines", responseTime: "Within 3 hours", chatResponse: 92 },
    reviewsList: generateReviews(4), tags: ["jacket", "winter", "puffer", "warm"], stock: 34, sku: "WP-WJ-064"
  },
  { id: 65, name: "Yoga Pants High Waist", price: 69.99, originalPrice: 89.99, pricePhp: Math.round(69.99 * USD_TO_PHP), originalPricePhp: Math.round(89.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop"],
    rating: 4.6, reviews: 567, category: "Clothing", brand: "ActiveFit", description: "High-waisted yoga pants with moisture-wicking fabric and four-way stretch.",
    features: ["High Waist", "Four-Way Stretch", "Moisture Wicking", "Side Pockets"], specifications: {"Material": "78% Polyester, 22% Spandex", "Waist": "High Rise", "Length": "Full Length"},
    variants: [{ id: "black", name: "Black", price: 69.99, originalPrice: 89.99, stock: 78 }], sizes: [{ id: "S", name: "Small", available: true }, { id: "M", name: "Medium", available: true }],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "6 months", coverage: ["Construction defects"], returnPolicy: "30-day exchange" },
    store: { name: "Active Lifestyle", rating: 4.7, totalReviews: 789, status: "Online", joinedDate: "2020", location: "Manila, Philippines", responseTime: "Within 2 hours", chatResponse: 90 },
    reviewsList: generateReviews(4), tags: ["yoga", "pants", "activewear", "stretch"], stock: 78, sku: "AF-YP-065"
  },

  // Adding more Accessories products
  { id: 113, name: "Leather Belt Classic", price: 49.99, originalPrice: 69.99, pricePhp: Math.round(49.99 * USD_TO_PHP), originalPricePhp: Math.round(69.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop"],
    rating: 4.5, reviews: 234, category: "Accessories", brand: "LeatherCraft", description: "Classic genuine leather belt with polished metal buckle.",
    features: ["Genuine Leather", "Metal Buckle", "Adjustable Size", "Classic Design"], specifications: {"Material": "Full Grain Leather", "Width": "1.5 inches", "Buckle": "Polished Metal"},
    variants: [{ id: "brown", name: "Brown", price: 49.99, originalPrice: 69.99, stock: 56 }], sizes: [{ id: "32", name: "32", available: true }, { id: "34", name: "34", available: true }],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "1 year", coverage: ["Leather quality", "Buckle defects"], returnPolicy: "30-day return" },
    store: { name: "Leather Goods", rating: 4.6, totalReviews: 567, status: "Online", joinedDate: "2019", location: "Manila, Philippines", responseTime: "Within 2 hours", chatResponse: 88 },
    reviewsList: generateReviews(3), tags: ["belt", "leather", "classic", "formal"], stock: 56, sku: "LC-LB-113"
  },
  { id: 114, name: "Smartwatch Sport Band", price: 29.99, originalPrice: 39.99, pricePhp: Math.round(29.99 * USD_TO_PHP), originalPricePhp: Math.round(39.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"],
    rating: 4.4, reviews: 456, category: "Accessories", brand: "WatchBand Pro", description: "Comfortable sport band for smartwatches with secure clasp.",
    features: ["Sweat Resistant", "Secure Clasp", "Multiple Colors", "Easy Install"], specifications: {"Material": "Silicone", "Compatibility": "Apple Watch, Samsung", "Width": "22mm"},
    variants: [{ id: "blue", name: "Ocean Blue", price: 29.99, originalPrice: 39.99, stock: 89 }], sizes: [{ id: "S", name: "Small", available: true }, { id: "M", name: "Medium", available: true }],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 3.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "1 year", coverage: ["Material defects"], returnPolicy: "30-day return" },
    store: { name: "Watch Accessories", rating: 4.5, totalReviews: 345, status: "Online", joinedDate: "2020", location: "Cebu, Philippines", responseTime: "Within 3 hours", chatResponse: 84 },
    reviewsList: generateReviews(3), tags: ["smartwatch", "band", "sport", "silicone"], stock: 89, sku: "WBP-SB-114"
  },
  { id: 115, name: "Laptop Backpack 15-inch", price: 79.99, originalPrice: 109.99, pricePhp: Math.round(79.99 * USD_TO_PHP), originalPricePhp: Math.round(109.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop"],
    rating: 4.7, reviews: 678, category: "Accessories", brand: "TechPack", description: "Professional laptop backpack with padded compartments and USB charging port.",
    features: ["Laptop Compartment", "USB Port", "Water Resistant", "Ergonomic Design"], specifications: {"Capacity": "25L", "Laptop Size": "Up to 15.6 inches", "Material": "Nylon", "Dimensions": "45x30x20cm"},
    variants: [{ id: "black", name: "Black", price: 79.99, originalPrice: 109.99, stock: 45 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 6.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "2 years", coverage: ["Zipper defects", "Strap quality"], returnPolicy: "30-day return" }, store: { name: "Tech Bags", rating: 4.8, totalReviews: 1234, status: "Online", joinedDate: "2018", location: "Manila, Philippines", responseTime: "Within 1 hour", chatResponse: 93 },
    reviewsList: generateReviews(4), tags: ["backpack", "laptop", "business", "usb"], stock: 45, sku: "TP-LB-115"
  },

  // Continue Electronics (26-40)
  { id: 26, name: "Webcam 1080p HD", price: 79.99, originalPrice: 99.99, pricePhp: Math.round(79.99 * USD_TO_PHP), originalPricePhp: Math.round(99.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&h=500&fit=crop"],
    rating: 4.5, reviews: 234, category: "Electronics", brand: "CamPro", description: "1080p HD webcam with auto-focus and built-in microphone.",
    features: ["1080p HD", "Auto Focus", "Built-in Mic", "Plug & Play"], specifications: {"Resolution": "1920x1080", "Frame Rate": "30fps", "Microphone": "Built-in", "Connection": "USB-A"},
    variants: [{ id: "black", name: "Black", price: 79.99, originalPrice: 99.99, stock: 67 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 5.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "2 years", coverage: ["Hardware defects"], returnPolicy: "30-day return" }, store: { name: "Camera Tech", rating: 4.6, totalReviews: 456, status: "Online", joinedDate: "2019", location: "Makati, Philippines", responseTime: "Within 2 hours", chatResponse: 88 },
    reviewsList: generateReviews(3), tags: ["webcam", "1080p", "streaming", "video-call"], stock: 67, sku: "CP-WC-026"
  },
  { id: 27, name: "Portable Projector Mini", price: 199.99, originalPrice: 279.99, pricePhp: Math.round(199.99 * USD_TO_PHP), originalPricePhp: Math.round(279.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop"],
    rating: 4.4, reviews: 189, category: "Electronics", brand: "ProjectMini", description: "Compact portable projector with WiFi connectivity and Android OS.",
    features: ["WiFi Connectivity", "Android OS", "1080p Support", "Compact Size"], specifications: {"Brightness": "3500 Lumens", "Resolution": "720p Native", "Connectivity": "WiFi, HDMI, USB"},
    variants: [{ id: "white", name: "White", price: 199.99, originalPrice: 279.99, stock: 23 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 8.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "2 years", coverage: ["Hardware defects", "Lamp replacement"], returnPolicy: "30-day return" }, store: { name: "Projection Tech", rating: 4.5, totalReviews: 234, status: "Online", joinedDate: "2020", location: "Cebu, Philippines", responseTime: "Within 3 hours", chatResponse: 85 },
    reviewsList: generateReviews(3), tags: ["projector", "portable", "wifi", "android"], stock: 23, sku: "PM-PP-027"
  },
  { id: 28, name: "VR Headset Basic", price: 149.99, originalPrice: 199.99, pricePhp: Math.round(149.99 * USD_TO_PHP), originalPricePhp: Math.round(199.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=500&h=500&fit=crop"],
    rating: 4.3, reviews: 345, category: "Electronics", brand: "VirtualTech", description: "Entry-level VR headset compatible with smartphones and PCs.",
    features: ["Smartphone Compatible", "Adjustable Lenses", "Comfortable Padding", "Universal Fit"], specifications: {"FOV": "95 degrees", "Phone Size": "4.7-6.2 inches", "Adjustment": "IPD 58-70mm"},
    variants: [{ id: "black", name: "Black", price: 149.99, originalPrice: 199.99, stock: 34 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 7.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "1 year", coverage: ["Hardware defects"], returnPolicy: "30-day return" }, store: { name: "VR World", rating: 4.4, totalReviews: 567, status: "Online", joinedDate: "2019", location: "Manila, Philippines", responseTime: "Within 2 hours", chatResponse: 86 },
    reviewsList: generateReviews(3), tags: ["vr", "headset", "gaming", "immersive"], stock: 34, sku: "VT-VR-028"
  },
  { id: 29, name: "Drone Camera 4K", price: 299.99, originalPrice: 399.99, pricePhp: Math.round(299.99 * USD_TO_PHP), originalPricePhp: Math.round(399.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop"],
    rating: 4.6, reviews: 456, category: "Electronics", brand: "SkyTech", description: "4K camera drone with GPS positioning and intelligent flight modes.",
    features: ["4K Camera", "GPS Positioning", "Follow Me Mode", "Return Home"], specifications: {"Camera": "4K/30fps", "Flight Time": "25 minutes", "Range": "500m", "Battery": "2400mAh"},
    variants: [{ id: "white", name: "White", price: 299.99, originalPrice: 399.99, stock: 15 }], sizes: [], deliveryOptions: [{ id: "express", name: "Express Delivery", price: 15.99, duration: "1-2 days", description: "Fast delivery for tech items" }],
    warranty: { duration: "1 year", coverage: ["Hardware defects", "Crash protection"], returnPolicy: "14-day return" }, store: { name: "Drone Pro", rating: 4.7, totalReviews: 789, status: "Online", joinedDate: "2018", location: "Davao, Philippines", responseTime: "Within 1 hour", chatResponse: 92 },
    reviewsList: generateReviews(4), tags: ["drone", "4k", "camera", "gps"], stock: 15, sku: "ST-DC-029"
  },
  { id: 30, name: "Electric Kettle Smart", price: 69.99, originalPrice: 89.99, pricePhp: Math.round(69.99 * USD_TO_PHP), originalPricePhp: Math.round(89.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500&h=500&fit=crop"],
    rating: 4.5, reviews: 234, category: "Electronics", brand: "BrewTech", description: "Smart electric kettle with temperature control and app connectivity.",
    features: ["App Control", "Temperature Control", "Keep Warm", "Stainless Steel"], specifications: {"Capacity": "1.7L", "Temperature Range": "40-100°C", "Power": "1500W", "Material": "Stainless Steel"},
    variants: [{ id: "steel", name: "Stainless Steel", price: 69.99, originalPrice: 89.99, stock: 45 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 6.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "2 years", coverage: ["Heating element", "Electronics"], returnPolicy: "30-day return" }, store: { name: "Kitchen Tech", rating: 4.6, totalReviews: 345, status: "Online", joinedDate: "2020", location: "Manila, Philippines", responseTime: "Within 2 hours", chatResponse: 89 },
    reviewsList: generateReviews(3), tags: ["kettle", "smart", "temperature", "app"], stock: 45, sku: "BT-EK-030"
  },

  // Continue Clothing (66-80)
  { id: 66, name: "Hoodie Pullover", price: 89.99, originalPrice: 119.99, pricePhp: Math.round(89.99 * USD_TO_PHP), originalPricePhp: Math.round(119.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop"],
    rating: 4.6, reviews: 567, category: "Clothing", brand: "ComfortWear", description: "Soft pullover hoodie with fleece lining and kangaroo pocket.",
    features: ["Fleece Lining", "Kangaroo Pocket", "Adjustable Hood", "Ribbed Cuffs"], specifications: {"Material": "80% Cotton, 20% Polyester", "Weight": "300gsm", "Fit": "Regular"},
    variants: [{ id: "gray", name: "Heather Gray", price: 89.99, originalPrice: 119.99, stock: 67 }], sizes: [{ id: "M", name: "Medium", available: true }, { id: "L", name: "Large", available: true }],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 5.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "6 months", coverage: ["Construction defects"], returnPolicy: "30-day exchange" },
    store: { name: "Comfort Clothing", rating: 4.7, totalReviews: 890, status: "Online", joinedDate: "2019", location: "Baguio, Philippines", responseTime: "Within 2 hours", chatResponse: 91 },
    reviewsList: generateReviews(4), tags: ["hoodie", "pullover", "comfort", "fleece"], stock: 67, sku: "CW-HP-066"
  },
  { id: 67, name: "Chino Pants Slim", price: 79.99, originalPrice: 99.99, pricePhp: Math.round(79.99 * USD_TO_PHP), originalPricePhp: Math.round(99.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop"],
    rating: 4.4, reviews: 345, category: "Clothing", brand: "UrbanStyle", description: "Slim-fit chino pants in premium cotton twill fabric.",
    features: ["Slim Fit", "Cotton Twill", "Belt Loops", "Classic Pockets"], specifications: {"Material": "98% Cotton, 2% Elastane", "Fit": "Slim", "Rise": "Mid Rise"},
    variants: [{ id: "navy", name: "Navy", price: 79.99, originalPrice: 99.99, stock: 45 }], sizes: [{ id: "30", name: "30", available: true }, { id: "32", name: "32", available: true }],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 5.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "6 months", coverage: ["Construction defects"], returnPolicy: "30-day exchange" },
    store: { name: "Urban Pants", rating: 4.5, totalReviews: 456, status: "Online", joinedDate: "2020", location: "Manila, Philippines", responseTime: "Within 3 hours", chatResponse: 87 },
    reviewsList: generateReviews(3), tags: ["chino", "pants", "slim", "cotton"], stock: 45, sku: "US-CP-067"
  },
  { id: 68, name: "Tank Top Ribbed", price: 29.99, originalPrice: 39.99, pricePhp: Math.round(29.99 * USD_TO_PHP), originalPricePhp: Math.round(39.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500&h=500&fit=crop"],
    rating: 4.3, reviews: 234, category: "Clothing", brand: "BasicEssentials", description: "Ribbed cotton tank top for comfortable everyday wear.",
    features: ["Ribbed Texture", "Cotton Blend", "Sleeveless", "Classic Fit"], specifications: {"Material": "95% Cotton, 5% Elastane", "Fit": "Classic", "Neckline": "Crew"},
    variants: [{ id: "white", name: "White", price: 29.99, originalPrice: 39.99, stock: 89 }], sizes: [{ id: "S", name: "Small", available: true }, { id: "M", name: "Medium", available: true }],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 3.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "3 months", coverage: ["Construction defects"], returnPolicy: "30-day exchange" },
    store: { name: "Basic Wear", rating: 4.2, totalReviews: 234, status: "Online", joinedDate: "2021", location: "Quezon City, Philippines", responseTime: "Within 4 hours", chatResponse: 82 },
    reviewsList: generateReviews(3), tags: ["tank-top", "ribbed", "basic", "cotton"], stock: 89, sku: "BE-TT-068"
  },

  // Continue Accessories (116-130)
  { id: 116, name: "Phone Case Leather", price: 39.99, originalPrice: 54.99, pricePhp: Math.round(39.99 * USD_TO_PHP), originalPricePhp: Math.round(54.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=500&fit=crop"],
    rating: 4.5, reviews: 456, category: "Accessories", brand: "CaseGuard", description: "Premium leather phone case with card slots and magnetic closure.",
    features: ["Genuine Leather", "Card Slots", "Magnetic Closure", "Precise Cutouts"], specifications: {"Material": "Genuine Leather", "Compatibility": "iPhone 14/15", "Slots": "3 Card Slots"},
    variants: [{ id: "brown", name: "Brown", price: 39.99, originalPrice: 54.99, stock: 67 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "1 year", coverage: ["Material defects"], returnPolicy: "30-day return" }, store: { name: "Phone Protection", rating: 4.6, totalReviews: 789, status: "Online", joinedDate: "2019", location: "Manila, Philippines", responseTime: "Within 2 hours", chatResponse: 89 },
    reviewsList: generateReviews(3), tags: ["phone-case", "leather", "wallet", "protection"], stock: 67, sku: "CG-PC-116"
  },
  { id: 117, name: "Travel Organizer Bag", price: 34.99, originalPrice: 49.99, pricePhp: Math.round(34.99 * USD_TO_PHP), originalPricePhp: Math.round(49.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop"],
    rating: 4.4, reviews: 234, category: "Accessories", brand: "TravelPro", description: "Compact travel organizer with multiple compartments for cables and accessories.",
    features: ["Multiple Compartments", "Elastic Bands", "Zippered Closure", "Compact Size"], specifications: {"Material": "Nylon", "Dimensions": "25x18x8cm", "Compartments": "8", "Weight": "200g"},
    variants: [{ id: "black", name: "Black", price: 34.99, originalPrice: 49.99, stock: 45 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "1 year", coverage: ["Zipper defects"], returnPolicy: "30-day return" }, store: { name: "Travel Gear", rating: 4.5, totalReviews: 345, status: "Online", joinedDate: "2020", location: "Cebu, Philippines", responseTime: "Within 3 hours", chatResponse: 86 },
    reviewsList: generateReviews(3), tags: ["organizer", "travel", "cables", "compact"], stock: 45, sku: "TP-TO-117"
  },
  { id: 118, name: "Fitness Tracker Band", price: 59.99, originalPrice: 79.99, pricePhp: Math.round(59.99 * USD_TO_PHP), originalPricePhp: Math.round(79.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"],
    rating: 4.3, reviews: 567, category: "Accessories", brand: "FitTrack", description: "Advanced fitness tracker with heart rate monitoring and sleep tracking.",
    features: ["Heart Rate Monitor", "Sleep Tracking", "Waterproof", "Long Battery"], specifications: {"Battery Life": "7 days", "Water Rating": "5ATM", "Display": "AMOLED", "Sensors": "Heart Rate, Accelerometer"},
    variants: [{ id: "black", name: "Black", price: 59.99, originalPrice: 79.99, stock: 78 }], sizes: [{ id: "S", name: "Small", available: true }, { id: "M", name: "Medium", available: true }],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 5.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "1 year", coverage: ["Hardware defects"], returnPolicy: "30-day return" },
    store: { name: "Fitness Tech", rating: 4.4, totalReviews: 678, status: "Online", joinedDate: "2019", location: "Manila, Philippines", responseTime: "Within 2 hours", chatResponse: 87 },
    reviewsList: generateReviews(4), tags: ["fitness", "tracker", "health", "waterproof"], stock: 78, sku: "FT-FB-118"
  },

  // Final batch of Electronics (31-50)
  { id: 31, name: "Wireless Charger Stand", price: 49.99, originalPrice: 69.99, pricePhp: Math.round(49.99 * USD_TO_PHP), originalPricePhp: Math.round(69.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&h=500&fit=crop"],
    rating: 4.4, reviews: 345, category: "Electronics", brand: "ChargeFast", description: "Fast wireless charging stand with cooling fan and LED indicator.",
    features: ["Fast Charging", "Cooling Fan", "LED Indicator", "Adjustable Angle"], specifications: {"Output": "15W", "Compatibility": "Qi-enabled devices", "Input": "USB-C"},
    variants: [{ id: "black", name: "Black", price: 49.99, originalPrice: 69.99, stock: 56 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "2 years", coverage: ["Electronics defects"], returnPolicy: "30-day return" }, store: { name: "Charge Tech", rating: 4.5, totalReviews: 456, status: "Online", joinedDate: "2020", location: "Manila, Philippines", responseTime: "Within 2 hours", chatResponse: 88 },
    reviewsList: generateReviews(3), tags: ["wireless", "charger", "stand", "fast"], stock: 56, sku: "CF-WC-031"
  },
  { id: 32, name: "Action Camera 4K", price: 179.99, originalPrice: 229.99, pricePhp: Math.round(179.99 * USD_TO_PHP), originalPricePhp: Math.round(229.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&h=500&fit=crop"],
    rating: 4.6, reviews: 678, category: "Electronics", brand: "ActionPro", description: "Waterproof 4K action camera with image stabilization and WiFi.",
    features: ["4K Recording", "Waterproof", "Image Stabilization", "WiFi Connect"], specifications: {"Video": "4K/60fps", "Photo": "20MP", "Battery": "1350mAh", "Depth": "40m"},
    variants: [{ id: "black", name: "Black", price: 179.99, originalPrice: 229.99, stock: 34 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 7.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "2 years", coverage: ["Water damage", "Hardware defects"], returnPolicy: "30-day return" }, store: { name: "Action Gear", rating: 4.7, totalReviews: 890, status: "Online", joinedDate: "2018", location: "Davao, Philippines", responseTime: "Within 1 hour", chatResponse: 93 },
    reviewsList: generateReviews(4), tags: ["action", "camera", "4k", "waterproof"], stock: 34, sku: "AP-AC-032"
  },
  { id: 33, name: "Smart Light Bulb RGB", price: 24.99, originalPrice: 34.99, pricePhp: Math.round(24.99 * USD_TO_PHP), originalPricePhp: Math.round(34.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"],
    rating: 4.5, reviews: 234, category: "Electronics", brand: "SmartGlow", description: "WiFi-enabled RGB smart bulb with voice control and scheduling.",
    features: ["RGB Colors", "Voice Control", "Scheduling", "Energy Efficient"], specifications: {"Brightness": "800 Lumens", "Power": "9W", "Colors": "16 Million", "Lifespan": "25,000 hours"},
    variants: [{ id: "e27", name: "E27 Base", price: 24.99, originalPrice: 34.99, stock: 89 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 3.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "2 years", coverage: ["LED defects"], returnPolicy: "30-day return" }, store: { name: "Smart Lighting", rating: 4.6, totalReviews: 567, status: "Online", joinedDate: "2019", location: "Cebu, Philippines", responseTime: "Within 2 hours", chatResponse: 90 },
    reviewsList: generateReviews(3), tags: ["smart", "bulb", "rgb", "voice"], stock: 89, sku: "SG-SB-033"
  },
  { id: 34, name: "Bluetooth Adapter USB", price: 19.99, originalPrice: 29.99, pricePhp: Math.round(19.99 * USD_TO_PHP), originalPricePhp: Math.round(29.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop"],
    rating: 4.3, reviews: 156, category: "Electronics", brand: "ConnectTech", description: "USB Bluetooth 5.0 adapter for PC and laptop connectivity.",
    features: ["Bluetooth 5.0", "Plug & Play", "Low Energy", "Wide Compatibility"], specifications: {"Version": "Bluetooth 5.0", "Range": "20m", "Interface": "USB 2.0"},
    variants: [{ id: "black", name: "Black", price: 19.99, originalPrice: 29.99, stock: 123 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 2.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "1 year", coverage: ["Hardware defects"], returnPolicy: "30-day return" }, store: { name: "PC Accessories", rating: 4.4, totalReviews: 345, status: "Online", joinedDate: "2020", location: "Manila, Philippines", responseTime: "Within 3 hours", chatResponse: 85 },
    reviewsList: generateReviews(3), tags: ["bluetooth", "adapter", "usb", "pc"], stock: 123, sku: "CT-BA-034"
  },
  { id: 35, name: "Smart Doorbell Camera", price: 149.99, originalPrice: 199.99, pricePhp: Math.round(149.99 * USD_TO_PHP), originalPricePhp: Math.round(199.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop"],
    rating: 4.7, reviews: 456, category: "Electronics", brand: "SecureHome", description: "Smart doorbell with 1080p camera, two-way audio, and motion detection.",
    features: ["1080p Camera", "Two-Way Audio", "Motion Detection", "Night Vision"], specifications: {"Video": "1080p HD", "Storage": "Cloud/Local", "Power": "Battery/Wired", "Field of View": "160°"},
    variants: [{ id: "black", name: "Black", price: 149.99, originalPrice: 199.99, stock: 23 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 8.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "2 years", coverage: ["Hardware defects", "Weather resistance"], returnPolicy: "30-day return" }, store: { name: "Home Security", rating: 4.8, totalReviews: 789, status: "Online", joinedDate: "2018", location: "Makati, Philippines", responseTime: "Within 1 hour", chatResponse: 95 },
    reviewsList: generateReviews(4), tags: ["doorbell", "camera", "smart", "security"], stock: 23, sku: "SH-DC-035"
  },

  // Final batch of Clothing (69-85)
  { id: 69, name: "Blazer Formal Navy", price: 199.99, originalPrice: 279.99, pricePhp: Math.round(199.99 * USD_TO_PHP), originalPricePhp: Math.round(279.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"],
    rating: 4.8, reviews: 234, category: "Clothing", brand: "ExecutiveWear", description: "Premium navy blazer in wool blend fabric with modern tailoring.",
    features: ["Wool Blend", "Modern Fit", "Notched Lapel", "Two Button"], specifications: {"Material": "70% Wool, 30% Polyester", "Fit": "Modern", "Lining": "Full"},
    variants: [{ id: "navy", name: "Navy", price: 199.99, originalPrice: 279.99, stock: 15 }], sizes: [{ id: "40", name: "40R", available: true }, { id: "42", name: "42R", available: true }],
    deliveryOptions: [{ id: "express", name: "Express Delivery", price: 12.99, duration: "1-2 days", description: "Fast delivery for formal wear" }], warranty: { duration: "1 year", coverage: ["Construction defects"], returnPolicy: "30-day exchange" },
    store: { name: "Executive Fashion", rating: 4.9, totalReviews: 456, status: "Online", joinedDate: "2017", location: "Makati, Philippines", responseTime: "Within 1 hour", chatResponse: 97 },
    reviewsList: generateReviews(4), tags: ["blazer", "formal", "navy", "wool"], stock: 15, sku: "EW-BF-069"
  },
  { id: 70, name: "Swim Shorts Quick Dry", price: 45.99, originalPrice: 59.99, pricePhp: Math.round(45.99 * USD_TO_PHP), originalPricePhp: Math.round(59.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=500&fit=crop"],
    rating: 4.4, reviews: 345, category: "Clothing", brand: "BeachLife", description: "Quick-dry swim shorts with mesh lining and elastic waistband.",
    features: ["Quick Dry", "Mesh Lining", "Elastic Waist", "Side Pockets"], specifications: {"Material": "100% Polyester", "Length": "7 inch", "Lining": "Mesh"},
    variants: [{ id: "blue", name: "Ocean Blue", price: 45.99, originalPrice: 59.99, stock: 67 }], sizes: [{ id: "M", name: "Medium", available: true }, { id: "L", name: "Large", available: true }],
    deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 4.99, duration: "3-5 days", description: "Regular shipping" }], warranty: { duration: "6 months", coverage: ["Construction defects"], returnPolicy: "30-day exchange" },
    store: { name: "Beach Apparel", rating: 4.5, totalReviews: 567, status: "Online", joinedDate: "2020", location: "Boracay, Philippines", responseTime: "Within 3 hours", chatResponse: 88 },
    reviewsList: generateReviews(3), tags: ["swim", "shorts", "quick-dry", "beach"], stock: 67, sku: "BL-SS-070"
  },

  // Final batch of Accessories (119-135)
  { id: 119, name: "Prescription Glasses Frame", price: 89.99, originalPrice: 129.99, pricePhp: Math.round(89.99 * USD_TO_PHP), originalPricePhp: Math.round(129.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500&h=500&fit=crop"],
    rating: 4.6, reviews: 234, category: "Accessories", brand: "VisionStyle", description: "Lightweight titanium frame glasses with anti-blue light coating.",
    features: ["Titanium Frame", "Anti-Blue Light", "Lightweight", "Adjustable Nose Pads"], specifications: {"Material": "Titanium", "Weight": "18g", "Lens Width": "52mm", "Bridge": "18mm"},
    variants: [{ id: "black", name: "Black", price: 89.99, originalPrice: 129.99, stock: 34 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 5.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "2 years", coverage: ["Frame defects", "Coating quality"], returnPolicy: "30-day return" }, store: { name: "Vision Center", rating: 4.7, totalReviews: 678, status: "Online", joinedDate: "2019", location: "Manila, Philippines", responseTime: "Within 2 hours", chatResponse: 91 },
    reviewsList: generateReviews(4), tags: ["glasses", "titanium", "blue-light", "lightweight"], stock: 34, sku: "VS-PG-119"
  },
  { id: 120, name: "Car Phone Mount Magnetic", price: 29.99, originalPrice: 39.99, pricePhp: Math.round(29.99 * USD_TO_PHP), originalPricePhp: Math.round(39.99 * USD_TO_PHP),
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=500&fit=crop", images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=500&fit=crop"],
    rating: 4.5, reviews: 456, category: "Accessories", brand: "DriveSecure", description: "Strong magnetic car phone mount with 360-degree rotation.",
    features: ["Strong Magnets", "360° Rotation", "Dashboard Mount", "Universal Fit"], specifications: {"Magnetic Strength": "N52 Neodymium", "Phone Size": "4-7 inches", "Mount Type": "Dashboard"},
    variants: [{ id: "black", name: "Black", price: 29.99, originalPrice: 39.99, stock: 78 }], sizes: [], deliveryOptions: [{ id: "standard", name: "Standard Delivery", price: 3.99, duration: "3-5 days", description: "Regular shipping" }],
    warranty: { duration: "1 year", coverage: ["Magnetic strength"], returnPolicy: "30-day return" }, store: { name: "Auto Accessories", rating: 4.6, totalReviews: 567, status: "Online", joinedDate: "2020", location: "Quezon City, Philippines", responseTime: "Within 2 hours", chatResponse: 89 },
    reviewsList: generateReviews(3), tags: ["car", "phone", "mount", "magnetic"], stock: 78, sku: "DS-PM-120"
  }
];

export function getProductById(id: number): Product | undefined {
  return productsData.find(product => product.id === id);
}

export function getAllProducts(): Product[] {
  return productsData;
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return productsData;
  return productsData.filter(product => product.category === category);
}