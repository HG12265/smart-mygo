const allProducts = [
    // =======================
    //    MOBILE PHONES
    // =======================
    {
        id: 1,
        name: 'Realme P1 5G',
        price: 15999,
        imageSrc: 'images/phone1.jpg',
        details: { 'Display': '6.67-inch AMOLED', 'RAM': '8 GB', 'Storage': '128 GB', 'Processor': 'MediaTek Dimensity 7050' }
    },
    {
        id: 2,
        name: 'Poco M6 5G',
        price: 8999,
        imageSrc: 'images/phone2.jpg',
        details: { 'Display': '6.74-inch HD+', 'RAM': '4 GB', 'Storage': '128 GB', 'Processor': 'MediaTek Dimensity 6100+' }
    },
    {
        id: 3,
        name: 'Vivo T3X 5G',
        price: 13999,
        imageSrc: 'images/phone3.jpg',
        details: { 'Display': '6.72-inch FHD+', 'RAM': '6 GB', 'Storage': '128 GB', 'Processor': 'Snapdragon 6 Gen 1' }
    },
    // =======================
    //        TABLETS
    // =======================
    {
        id: 4,
        name: 'Realme Pad 2 Lite',
        price: 22999,
        imageSrc: 'images/tab1.jpg',
        details: { 'Display': '11.5-inch 2K', 'RAM': '8 GB', 'Storage': '256 GB', 'Battery': '8360 mAh' }
    },
    {
        id: 5,
        name: 'Samsung Galaxy Tab S10+',
        price: 89999,
        imageSrc: 'images/tab2.jpg',
        details: { 'Display': '12.4-inch Super AMOLED', 'RAM': '12 GB', 'Storage': '512 GB', 'Processor': 'Exynos Flagship' }
    },
    {
        id: 6,
        name: 'Mi Xiaomi Pad 6',
        price: 10999,
        imageSrc: 'images/tab3.jpg',
        details: { 'Display': '11-inch WQHD+', 'RAM': '6 GB', 'Storage': '128 GB', 'Processor': 'Snapdragon 870' }
    },
    // =======================
    //      POWER BANKS
    // =======================
    {
        id: 7,
        name: 'Ambrane Power Bank',
        price: 2499,
        imageSrc: 'images/pb1.jpg',
        details: { 'Capacity': '27000 mAh', 'Output': '20W Fast Charging', 'Ports': '2 USB, 1 Type-C' }
    },
    {
        id: 8,
        name: 'MI Power Bank 3i',
        price: 2149,
        imageSrc: 'images/pb2.jpg',
        details: { 'Capacity': '20000 mAh', 'Output': '18W Fast Charging', 'Ports': '2 USB-A, 1 Type-C, 1 Micro-USB' }
    },
    // =======================
    //        HEADSETS
    // =======================
    {
        id: 9,
        name: 'OnePlus Bullets Z2',
        price: 1599,
        imageSrc: 'images/head1.jpg',
        details: { 'Type': 'Neckband', 'Battery Life': '30 Hours', 'Feature': 'Bombastic Bass' }
    },
    {
        id: 10,
        name: 'Boult Audio Z40',
        price: 1099,
        imageSrc: 'images/head2.jpg',
        details: { 'Type': 'TWS Earbuds', 'Battery Life': '60 Hours', 'Feature': 'Zen ENC Mic' }
    },
    // =======================
    //       BACK COVERS
    // =======================
    {
        id: 11,
        name: 'iPhone 15 Pro Cover',
        price: 499,
        imageSrc: 'images/back1.jpg',
        details: { 'Material': 'Transparent Hard Case', 'Compatibility': 'iPhone 15 Pro', 'Feature': 'Shock Absorbent' }
    },
    {
        id: 12,
        name: 'Samsung S24 Ultra Cover',
        price: 599,
        imageSrc: 'images/back2.jpg',
        details: { 'Material': 'Matte Silicone Case', 'Compatibility': 'Samsung S24 Ultra', 'Feature': 'Anti-Fingerprint' }
    },
    // =======================
    //        CHARGERS
    // =======================
    {
        id: 13,
        name: 'Apple 20W USB-C Adapter',
        price: 1599,
        imageSrc: 'images/charger1.jpg',
        details: { 'Power': '20W', 'Connector': 'USB Type-C', 'Compatibility': 'iPhone, iPad, AirPods' }
    },
    {
        id: 14,
        name: 'Samsung 45W Travel Adapter',
        price: 2999,
        imageSrc: 'images/charger2.jpg',
        details: { 'Power': '45W', 'Connector': 'USB Type-C', 'Feature': 'Super Fast Charging 2.0' }
    }
];