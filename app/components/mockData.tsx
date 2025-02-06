type MockData = {
  phones: {
    _id: string;
    image: string;
    title: string;
    price: number;
  }[];
  laptops: {
    _id: string;
    image: string;
    title: string;
    price: number;
  }[];
  electronics: {
    _id: string;
    image: string;
    title: string;
    price: number;
  }[];
  toys: {
    _id: string;
    image: string;
    title: string;
    price: number;
  }[];
  videoGames: {
    _id: string;
    image: string;
    title: string;
    price: number;
  }[];
  petSupplies: {
    _id: string;
    image: string;
    title: string;
    price: number;
  }[];
};

const mockData: MockData = {
  phones: [
    {
      _id: "6790f3fcf1e2a9283a278168",
      image:
        "https://www.courtsmammouth.mu/101654-product_set/samsung-galaxy-s24-ul.jpg",
      title: "Samsung S24 Ultra",
      price: 150000,
    },
    {
      _id: "6790f434f1e2a9283a278169",
      image:
        "https://eshop.hkcsl.com/on/demandware.static/-/Sites-master-hkt-hk/def.jpg",
      title: "Iphone 15 Pro Max",
      price: 109000,
    },
    {
      _id: "6790f4f9f1e2a9283a27816a",
      image:
        "https://www.daimagestore.com/wp-content/uploads/2024/06/oneplus-11r-5g.jpg",
      title: "OnePlus 13R",
      price: 90000,
    },
    {
      _id: "6790f57af1e2a9283a27816b",
      image:
        "https://aidea.com.my/image/aidea/image/cache/data/all_product_images/p.jpg",
      title: "Samsung Galaxy Z Fold2",
      price: 230000,
    },
    {
      _id: "6790f5ddf1e2a9283a27816c",
      image:
        "https://p.turbosquid.com/ts-thumb/G6/ey2MwL/b5/black01/jpg/1679854377.jpg",
      title: "Oppo Find X8 Pro",
      price: 120000,
    },
    {
      _id: "6790f5fbf1e2a9283a27816d",
      image:
        "https://static.digit.in/default/nothing-phone-1-1280-1-9085ae7a7b.png",
      title: "Nothing Phone 2",
      price: 97000,
    },
    {
      _id: "6791e9eeb101a7d8cee83977",
      image: "https://techring.in/wp-content/uploads/2023/05/Realme-13-Pro.jpg",
      title: "Realme 13 Pro",
      price: 88000,
    },
    {
      _id: "6791eb12b101a7d8cee83978",
      image:
        "https://mybroadband.co.za/news/wp-content/uploads/2020/10/iPhone-12-Pro-Max.jpg",
      title: "Iphone 12 Pro Max",
      price: 70000,
    },
    {
      _id: "6791eb4db101a7d8cee83979",
      image:
        "https://techcart.com.au/wp-content/uploads/2023/07/74050-OnePlus-Nord-5G.jpg",
      title: "OnePlus Nord 5g",
      price: 65000,
    },
    {
      _id: "6791ebd9b101a7d8cee8397a",
      image:
        "https://www.giztop.com/media/catalog/product/cache/dc206057cdd42d7e34b.jpg",
      title: "Redmi Note 13+",
      price: 110000,
    },
    {
      _id: "6791ec7eb101a7d8cee8397b",
      image:
        "https://static1.anpoimages.com/wordpress/wp-content/uploads/2024/08/go.jpg",
      title: "Google Pixel 9 Pro XL",
      price: 123000,
    },
    {
      _id: "6791ecc2b101a7d8cee8397c",
      image:
        "https://www.91-cdn.com/hub/wp-content/uploads/2024/04/Vivo-X100-Vivo-Smartphone.jpg",
      title: "Vivo X200 Pro",
      price: 165000,
    },
    {
      _id: "6791ed52b101a7d8cee8397d",
      image:
        "https://www.livokoua.com.mx/cdn/shop/files/PRODUCTOS-2024-01-21T093854.jpg",
      title: "Honor Magic6 Pro",
      price: 110000,
    },
    {
      _id: "6791ed91b101a7d8cee8397e",
      image:
        "https://cdn.mos.cms.futurecdn.net/h7oXkigRb8TEJf4kWSDpFA-320-80.jpg",
      title: "Sony Xperia 1 VI",
      price: 210000,
    },
    {
      _id: "6791ee4bb101a7d8cee8397f",
      image:
        "https://static.hub.91mobiles.com/multisite/wp-content/uploads/sites/3/motorola-edge-50-ultra.jpg",
      title: "Motorola Edge 50 Ultra",
      price: 78000,
    },
    {
      _id: "679211aab101a7d8cee83980",
      image:
        "https://www.gizmochina.com/wp-content/uploads/2023/02/FowWc-WaAAAbYE8.jpg",
      title: "Xaomi 13 Lite",
      price: 70000,
    },
    {
      _id: "679212b0b101a7d8cee83981",
      image:
        "https://th.bing.com/th/id/OIP.abrsCkblHIAOxZH9XRzbFQHaE8?w=1620&h=1080",
      title: "Samsung A54 5g",
      price: 45000,
    },
    {
      _id: "67921301b101a7d8cee83982",
      image:
        "https://www.headshotreviews.com/wp-content/uploads/2023/07/OPPO-Reno-10.jpg",
      title: "Oppo Reno 10",
      price: 80000,
    },
    {
      _id: "679214c9b101a7d8cee83983",
      image:
        "https://img.grouponcdn.com/stores/3pvJ6LttL3QUSeBoxqQnnH9RhHUm/storesp.jpg",
      title: "Iphone SE 3rd Gen",
      price: 67000,
    },
    {
      _id: "6792156eb101a7d8cee83984",
      image:
        "https://th.bing.com/th/id/OIP.1L_5mSRQGGOiTNE7utPIxQAAAA?w=474&h=266",
      title: "Google Pixel 6",
      price: 50000,
    },
  ],

  laptops: [
    {
      _id: "67921d41b101a7d8cee83985",
      image:
        "https://i5.walmartimages.com/asr/78f70e6f-3555-4fec-98ec-49a3fcbb49cd_...",
      title: "Apple MacBook Air",
      price: 300000,
    },
    {
      _id: "67921e5fb101a7d8cee83986",
      image:
        "https://media.ldlc.com/r1600/ld/products/00/05/99/69/LD0005996963.jpg",
      title: "Dell XPS 13",
      price: 256000,
    },
    {
      _id: "67921eceb101a7d8cee83987",
      image:
        "https://th.bing.com/th/id/OIP.MKdzMMEjmciWLc9-CWNnOAHaHa?w=500&h=500&r…",
      title: "Razer Blade 17 Pro",
      price: 150000,
    },
    {
      _id: "67921f1fb101a7d8cee83988",
      image:
        "https://www.kindpng.com/picc/m/342-3426664_windows-laptops-hp-spectre-...",
      title: "HP Spectre x360 14",
      price: 210000,
    },
    {
      _id: "67921f9cb101a7d8cee83989",
      image:
        "https://th.bing.com/th/id/OIP.1lo0OJbOZIOPi9h1hsGkKQHaHa?rs=1&pid=ImgD...",
      title: "Lenovo ThinkPad X1 Carbon Gen 11",
      price: 235000,
    },
    {
      _id: "67922427b101a7d8cee8398a",
      image:
        "https://c1.neweggimages.com/ProductImageCompressAll1280/A24GD2206190CK...",
      title: "Microsoft Surface Laptop 5",
      price: 180000,
    },
    {
      _id: "67922535b101a7d8cee8398b",
      image:
        "https://assets.umart.com.au/newsite/images/202402/goods_img/Asus-Lapto...",
      title: "Asus ROG Flow Z13",
      price: 200000,
    },
    {
      _id: "679225a0b101a7d8cee8398c",
      image:
        "https://th.bing.com/th/id/OIP.NUcJoJadNhvmJbE9wTmwvgHaE8?w=1024&h=683&...",
      title: "Samsung Galaxy Book Pro 360",
      price: 140000,
    },
    {
      _id: "67922636b101a7d8cee8398d",
      image:
        "https://boletando.com/wp-content/uploads/2022/10/ezgif-2-09aed749e4-1...",
      title: "Acer Swift 3",
      price: 95000,
    },
    {
      _id: "6792267fb101a7d8cee8398e",
      image:
        "https://th.bing.com/th/id/OIP.vLLyOXBd6HtxyQyEygy07AHaHa?rs=1&pid=ImgD...",
      title: "MSI GE76 Raider",
      price: 376000,
    },
    {
      _id: "6792272eb101a7d8cee8398f",
      image:
        "https://th.bing.com/th/id/R.8fca3e6ccbb9b38ec5e023baf8e83ecc?rik=Nq8Ba...",
      title: "LG Gram 17",
      price: 225000,
    },
    {
      _id: "67922774b101a7d8cee83990",
      image:
        "https://th.bing.com/th/id/OIP.x_ECOcSFGa4v0RszmWD87AAAAA?rs=1&pid=ImgD...",
      title: "ASUS TUF Dash F15",
      price: 270000,
    },
    {
      _id: "679227c4b101a7d8cee83991",
      image:
        "https://phucanhcdn.com/media/product/49124_laptop_hp_envy_x360_13_bf00...",
      title: "HP Elite Dragonfly",
      price: 275000,
    },
    {
      _id: "67922837b101a7d8cee83992",
      image:
        "https://c1.neweggimages.com/ProductImageCompressAll1280/A65E_131860163...",
      title: "Dell Inspiron 15 5000",
      price: 40000,
    },
    {
      _id: "67922882b101a7d8cee83993",
      image:
        "https://mudita.com.np/media/catalog/product/cache/278abbc8911ee5bd8d9d...",
      title: "Acer Predator Helios 300",
      price: 165000,
    },
    {
      _id: "679228fbb101a7d8cee83994",
      image: "https://www.softcom.co.id/wp-content/uploads/2023/05/flex6.jpg",
      title: "Lenovo IdeaPad Flex 5 14",
      price: 110000,
    },
    {
      _id: "67922981b101a7d8cee83995",
      image:
        "https://www.laptoparena.net/images/Huawei_MateBook_Matebook_X_Pro_2021...",
      title: "Huawei MateBook X Pro",
      price: 190000,
    },
    {
      _id: "679229eab101a7d8cee83996",
      image:
        "https://tech.co.za/wp-content/uploads/2022/12/Asus-Vivobook-S-14-Flip...",
      title: "Asus ZenBook Flip 14",
      price: 90000,
    },
    {
      _id: "67922a97b101a7d8cee83997",
      image:
        "https://blogs.windows.com/wp-content/uploads/prod/sites/2/2021/06/AW-x...",
      title: "Alienware X17",
      price: 285000,
    },
    {
      _id: "67922b25b101a7d8cee83998",
      image:
        "https://www.ilounge.com/wp-content/uploads/2022/11/MacBook-Pro.png",
      title: "Apple MacBook Pro 16-inch",
      price: 300000,
    },
  ],
  electronics: [
    {
      _id: "67924440b101a7d8cee83999",
      image:
        "https://images-na.ssl-images-amazon.com/images/S/mediaservice.woot.com…",
      title: "Xbox Wireless Controller",
      price: 7500,
    },
    {
      _id: "67924494b101a7d8cee8399a",
      image:
        "https://www.maxgaming.com/bilder/artiklar/liten/18804_S.jpg?m=16209816…",
      title: "PlayStation DualSense Wireless Controller",
      price: 9000,
    },
    {
      _id: "679247eab101a7d8cee8399b",
      image:
        "https://th.bing.com/th/id/OIP.U9JeOSNi1KQA7r8_lX-o8gAAAA?rs=1&pid=ImgD…",
      title: "Razer Wolverine V2 Chroma Wired Controller",
      price: 2500,
    },
    {
      _id: "6792487fb101a7d8cee8399c",
      image:
        "https://th.bing.com/th/id/R.f83dbb7c6d377066affd6bde29890e2f?rik=%2fop…",
      title: "Nintendo Switch Pro Controller",
      price: 12000,
    },
    {
      _id: "67924bcab101a7d8cee8399d",
      image:
        "https://multiplayer.net-cdn.it/thumbs/images/2020/06/12/ps5-playstatio…",
      title: "Sony PlayStation 5",
      price: 65000,
    },
    {
      _id: "67924c24b101a7d8cee8399e",
      image:
        "https://progenix.co.za/image/cache/catalog/xbox/microsoft-xbox-series-…",
      title: "Xbox Series X",
      price: 60000,
    },
    {
      _id: "67924cb9b101a7d8cee839a0",
      image:
        "https://www.itinternational.pk/wp-content/uploads/2020/12/Sony-PlaySta…",
      title: "PlayStation 4 Pro",
      price: 35000,
    },
    {
      _id: "67924cf4b101a7d8cee839a1",
      image:
        "https://c1.neweggimages.com/ProductImageCompressAll1280/AN2HS200519km0…",
      title: "Nintendo Switch OLED",
      price: 40000,
    },
    {
      _id: "67925177b101a7d8cee839a2",
      image:
        "https://th.bing.com/th/id/OIP.5rJIn2aQcZHaRP5qooKyhAHaGC?w=1226&h=1000…",
      title: "Samsung QN90B Neo QLED 4K Smart TV",
      price: 158000,
    },
    {
      _id: "679251f2b101a7d8cee839a3",
      image:
        "https://onsitego.com/blog/wp-content/uploads/2021/08/LG-OLED-83-C1-Ser…",
      title: "LG OLED C1 Series 4K Smart TV",
      price: 110000,
    },
    {
      _id: "6792524bb101a7d8cee839a4",
      image: "https://c1.neweggimages.com/ProductImage/A1J7D210407HBGE0.jpg",
      title: "Sony Bravia XR A80J 4K OLED Smart TV",
      price: 150000,
    },
    {
      _id: "67925384b101a7d8cee839a5",
      image:
        "https://tvcentre.co.ke/wp-content/uploads/2023/12/VP-40-Smart-Vidaa.we…",
      title: "Hisense U8G Quantum Series 4K Smart TV",
      price: 85000,
    },
    {
      _id: "67925579b101a7d8cee839a6",
      image:
        "https://th.bing.com/th/id/OIP.mK2Cafc3om8aZgYZmueDFgHaG9?rs=1&pid=ImgD…",
      title: "Apple Watch Series 8",
      price: 45000,
    },
    {
      _id: "679255b3b101a7d8cee839a7",
      image:
        "https://www.bpm-power.com/cdn-cgi/image/quality=90,fit=scale-down,f=au…",
      title: "Samsung Galaxy Watch 5",
      price: 28000,
    },
    {
      _id: "679255f7b101a7d8cee839a8",
      image:
        "https://th.bing.com/th/id/OIP.v9DS36w9Lg7oP-t6NxtJhgHaHa?w=600&h=600&r…",
      title: "Fossil Gen 6 Smartwatch",
      price: 31000,
    },
    {
      _id: "679256c0b101a7d8cee839a9",
      image:
        "https://joyofandroid.com/wp-content/uploads/2019/07/Forerunner945-garm…",
      title: "Garmin Forerunner 945",
      price: 60000,
    },
    {
      _id: "6792579cb101a7d8cee839ab",
      image:
        "https://cdnb.artstation.com/p/marketplace/presentation_assets/001/735/…",
      title: "Sony WH-1000XM5",
      price: 30000,
    },
    {
      _id: "679257f5b101a7d8cee839ac",
      image:
        "https://gadgetsin.com/uploads/2021/08/spigen_ultra_hybrid_pro_airpods_…",
      title: "Apple AirPods Max",
      price: 70000,
    },
    {
      _id: "6792584ab101a7d8cee839ad",
      image:
        "https://th.bing.com/th/id/OIP.OVZaR2tDLNAkSG7_w9XF3wHaHa?w=800&h=800&r…",
      title: "Sennheiser Momentum 4 Wireless",
      price: 54000,
    },
    {
      _id: "6792587eb101a7d8cee839ae",
      image:
        "https://cogconnected.com/wp-content/uploads/2020/05/JBL-Quantum-One-Ke…",
      title: "JBL Quantum One Gaming Headset",
      price: 32000,
    },
  ],
  toys: [
    {
      _id: "67928312b101a7d8cee839af",
      image:
        "https://kmartau.mo.cloudinary.net/b958b602-0650-4d37-b8b7-ac88dd321fa1",
      title: "Alphabet Blocks Set",
      price: 2200,
    },
    {
      _id: "67928343b101a7d8cee839b0",
      image:
        "https://kidlovestoys.com/wp-content/uploads/2019/02/Cartoon-Cute-Animal-Puzzle.jpg",
      title: "Animal Puzzle Board",
      price: 1250,
    },
    {
      _id: "6792884eb101a7d8cee839b1",
      image:
        "https://www.kingdom-figurine.fr/wp-content/uploads/2020/09/SPIDER-MAN-Figure.jpg",
      title: "Spider-Man Action Figure",
      price: 2800,
    },
    {
      _id: "679288d4b101a7d8cee839b2",
      image:
        "https://th.bing.com/th/id/OIP.7OOOf2uylQQMpyvLG1EZlAHaHa?w=1500&h=1500",
      title: "Transformers Optimus Prime Action Figure",
      price: 4500,
    },
    {
      _id: "67928972b101a7d8cee839b3",
      image:
        "https://th.bing.com/th/id/OIP.NxOAQSi7GDXnCipYTn8bbQHaId?w=1400&h=1600",
      title: "Bubble Machine Gun",
      price: 8500,
    },
    {
      _id: "679289ceb101a7d8cee839b4",
      image:
        "https://ae01.alicdn.com/kf/HTB1N5ccazQnBKNjSZSgq6xHGXXaX/Rainbow-Kite.jpg",
      title: "Kite with Tail (Rainbow)",
      price: 3000,
    },
    {
      _id: "67928a51b101a7d8cee839b5",
      image:
        "https://secure.img1-ag.wfcdn.com/im/18233847/resize-h700-w700%5Ecompr-",
      title: "Mini Kitchen Set",
      price: 7000,
    },

    {
      _id: "67928a86b101a7d8cee839b6",
      image:
        "https://th.bing.com/th/id/OIP.C-Kw2SEW_Ri7MvYqGQKXewHaHa?w=1200&h=1200",
      title: "Dollhouse with Furniture",
      price: 12000,
    },
    {
      _id: "67928ad1b101a7d8cee839b7",
      image:
        "https://th.bing.com/th/id/OIP.SOEp-b1TaCQBTp8cVJ3LmwHaHa?rs=1&pid=ImgD",
      title: "Remote-Controlled Racing Car",
      price: 10000,
    },
    {
      _id: "67928b2eb101a7d8cee839b8",
      image:
        "https://i.pinimg.com/originals/37/d8/f9/37d8f9c28400d8990dc6375d8f81c7",
      title: "Walkie-Talkies",
      price: 2450,
    },
    {
      _id: "67928b87b101a7d8cee839b9",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2021/6/BT/LE/KO/118957110/lud",
      title: "Snakes & Ladders Game",
      price: 1500,
    },
    {
      _id: "67928bfcb101a7d8cee839ba",
      image:
        "https://promoultd.net/wp-content/uploads/2022/11/Black-Rubiks-Cube-3.j",
      title: "Rubik’s Cube",
      price: 450,
    },
    {
      _id: "67928ca5b101a7d8cee839bb",
      image:
        "https://i5.walmartimages.com/asr/bbe31ad7-95bc-46d7-9993-6aa12d33ee4b_",
      title: "Mini Basketball Hoop with Ball",
      price: 4000,
    },
    {
      _id: "67928cdbb101a7d8cee839bc",
      image:
        "https://th.bing.com/th/id/OIP.rJncOID_GMmF6WZt2Ml1UQAAAA?w=400&h=400",
      title: "Football",
      price: 2500,
    },
    {
      _id: "67928d1db101a7d8cee839bd",
      image:
        "https://i.pinimg.com/originals/a6/66/7b/a6667b6880e1fc762e514af1dafdf6",
      title: "Badminton Set",
      price: 1500,
    },
    {
      _id: "67928d74b101a7d8cee839be",
      image:
        "https://i5.walmartimages.com/asr/d510d79e-9126-46b4-9ff5-4a4416019794",
      title: "LEGO Classic Creative Building Set",
      price: 3200,
    },
    {
      _id: "67928e02b101a7d8cee839bf",
      image:
        "https://i5.walmartimages.com/asr/d026fe00-fdaa-48f4-bf1b-d313ddae335e",
      title: "Hula Hoop",
      price: 1000,
    },
    {
      _id: "67928ed8b101a7d8cee839c0",
      image:
        "https://th.bing.com/th/id/R.bf42cb1406073a29a7edf8e12250b62e?rik=cBUwH",
      title: "Bath Toys (Floating Animals Set)",
      price: 650,
    },
    {
      _id: "67928f39b101a7d8cee839c1",
      image:
        "https://i.pinimg.com/originals/0d/c2/7a/0dc27a025de7a1da19f1dcefb0a510",
      title: "Kids' Bicycle",
      price: 15000,
    },
    {
      _id: "67928fa0b101a7d8cee839c2",
      image:
        "https://i.pinimg.com/originals/ed/c8/aa/edc8aa99cb2e6eb3d6eb0a88a5db6e",
      title: "Teddy Bear",
      price: 9000,
    },
  ],
  videoGames: [
    {
      _id: "679293cc9cad09831f334ae5",
      title: "God Of War Ragnarok",
      price: 8500,
      image:
        "https://th.bing.com/th/id/OIP.zDpx8cwKxj7Ksgi9IfuYogHaHa?rs=1&pid=ImgD",
    },
    {
      _id: "67934049204568b3d0df12b6",
      title: "Red Dead Redemption",
      price: 5000,
      image:
        "https://th.bing.com/th/id/OIP.I2U6s6j8itCqwdC3eXGBfwHaH9?w=820&h=881&r",
    },
    {
      _id: "6793407d204568b3d0df12b7",
      title: "Spider-Man: Miles Morales",
      price: 9000,
      image:
        "https://th.bing.com/th/id/OIP.rGIIefa_EU3WS_Cm1MXlaQHaHa?w=600&h=600&r",
    },

    {
      _id: "67934130204568b3d0df12b8",
      title: "Horizon Forbidden West",
      price: 7000,
      image:
        "https://th.bing.com/th/id/OIP.1GA5fq24pbl6ZwnC0fFY8wAAAA?w=400&h=400&r",
    },
    {
      _id: "679343bd204568b3d0df12b9",
      title: "Call of Duty: Modern Warfare II",
      price: 8000,
      image:
        "https://th.bing.com/th/id/OIP.rQx39F4TAhMsaxw-axrdSwHaFe?rs=1&pid=ImgD",
    },
    {
      _id: "67934460204568b3d0df12ba",
      title: "Halo Infinite",
      price: 5000,
      image:
        "https://sm.pcmag.com/pcmag_me/photo/default/halo-infinite-standard-edi",
    },
    {
      _id: "67934628204568b3d0df12bb",
      title: "Grand Theft Auto V",
      price: 10000,
      image:
        "https://th.bing.com/th/id/OIP.LQhvpALeE2s5a8AifWsvnAAAAA?rs=1&pid=ImgD",
    },
    {
      _id: "6793465b204568b3d0df12bc",
      title: "Call of Duty: Black Ops Cold War",
      price: 6000,
      image:
        "https://www.tradeinn.com/f/13805/138054554/sony-call-of-duty-black-ops",
    },
    {
      _id: "67934714204568b3d0df12bd",
      title: "Assassin’s Creed Valhalla",
      price: 7500,
      image:
        "https://ps4gamingstore.com/wp-content/uploads/2021/07/Assassins-Creed-",
    },
    {
      _id: "67934767204568b3d0df12be",
      title: "FIFA 23",
      price: 6000,
      image:
        "https://clicktobrands.com/wp-content/uploads/2022/09/Fifa-23-for-Ps5-C",
    },
    {
      _id: "679347ef204568b3d0df12bf",
      title: "Resident Evil 4 (Remake)",
      price: 9000,
      image:
        "https://th.bing.com/th/id/OIP.UGiLaqjy4BQ9KkN_fzeBcAHaHa?rs=1&pid=ImgD",
    },
    {
      _id: "67934827204568b3d0df12c0",
      title: "Resident Evil Village (8)",
      price: 12000,
      image:
        "https://th.bing.com/th/id/OIP.idJ0OeJ3DEEF8Vi6_ed6UQHaHa?w=600&h=600&r",
    },
    {
      _id: "679348b2204568b3d0df12c1",
      title: "Batman: Arkham Knight",
      price: 5000,
      image:
        "https://www.psn.ma/wp-content/uploads/2016/11/Batman-Arkham-Knight-PS4",
    },
    {
      _id: "67934a73204568b3d0df12c2",
      title: "The Last of Us",
      price: 6500,
      image:
        "https://i.pinimg.com/originals/06/64/b8/0664b8bbd4eba84e70d5bf000dd196",
    },
    {
      _id: "67934b00204568b3d0df12c3",
      title: "Uncharted 4: A Thief's End",
      price: 8000,
      image:
        "https://cairosales.com/57221-thickbox_default/sony-cd-playstation-4-un",
    },
    {
      _id: "67934b24204568b3d0df12c4",
      title: "Uncharted: The Lost Legacy",
      price: 10000,
      image:
        "https://www.gamerzoneme.com/wp-content/uploads/2021/09/711719968009-60",
    },
    {
      _id: "67934bf9204568b3d0df12c5",
      title: "Far Cry 5",
      price: 9000,
      image:
        "https://res.cloudinary.com/dpz25upyk/image/upload/v1714317979/w4rtmnyn",
    },
    {
      _id: "67934c4b204568b3d0df12c6",
      title: "Crew 2",
      price: 7500,
      image:
        "https://ik.imagekit.io/k1wj4sk9q/tr:q-40/storage/images/product/the_cr",
    },
    {
      _id: "67934c6b204568b3d0df12c7",
      title: "UFC 5",
      price: 8000,
      image:
        "https://th.bing.com/th/id/OIP.-hRiaWj7G91JA7FqIQPZdgHaHa?rs=1&pid=ImgD",
    },
    {
      _id: "67934cf4204568b3d0df12c8",
      title: "Mortal Kombat 1",
      price: 15000,
      image:
        "https://bindassbuy.pk/cdn/shop/files/PS5TN98.jpg?v=1695135349&width=14",
    },
  ],
  petSupplies: [
    {
      _id: "67935d51204568b3d0df12c9",
      image:
        "https://images.albertsons-media.com/is/image/ABS/960318107?$ecom-pdp-d…",
      title: "Blue Dog Food",
      price: 6500,
    },
    {
      _id: "67935f8c204568b3d0df12ca",
      image:
        "https://www.topvaluereviews.net/wp-content/uploads/2016/05/811rpY-l4L.…",
      title: "Meow Mix",
      price: 2800,
    },
    {
      _id: "67936417204568b3d0df12cb",
      image:
        "https://prod-spinneys-cdn-new.azureedge.net/media/images/products/2023…",
      title: "Dog Treats",
      price: 2500,
    },
    {
      _id: "67936466204568b3d0df12cc",
      image:
        "https://i.pinimg.com/736x/5e/24/f4/5e24f4b2a7dfa97af5981f143f625196.jp…",
      title: "Temptations: Cat Treats",
      price: 1800,
    },
    {
      _id: "679364ea204568b3d0df12cd",
      image:
        "https://www.bmr.ca/media/catalog/product/cache/dbd4d66e0218ad08feb3e29…",
      title: "Dog Food Bowl",
      price: 850,
    },
    {
      _id: "6793650d204568b3d0df12ce",
      image:
        "https://cdn.staticsoe.com/uploads/27668/cart/resources/20220612/a5ae9b…",
      title: "Atomatic Pet Feeders",
      price: 10500,
    },
    {
      _id: "67936569204568b3d0df12cf",
      image:
        "https://cdn.shopify.com/s/files/1/0028/0212/2798/products/buy-petsafe-…",
      title: "Mildew Resistant Pet Water Fountain",
      price: 22000,
    },
    {
      _id: "67936604204568b3d0df12d0",
      image:
        "https://i5.walmartimages.com/seo/Wamans-Large-Dog-Bed-Pet-Winter-Warm-…",
      title: "Dog Bed",
      price: 2500,
    },
    {
      _id: "6793664b204568b3d0df12d1",
      image:
        "https://www.petfoodnmore.com/wp-content/uploads/2021/11/7075617_PR_Sno…",
      title: "Cat Bed",
      price: 2000,
    },
    {
      _id: "679366af204568b3d0df12d2",
      image:
        "https://i5.walmartimages.com/asr/7a769d81-7ccb-44a2-b3f7-5341954a178f_…",
      title: "Pet Mats",
      price: 1050,
    },
    {
      _id: "6793670c204568b3d0df12d3",
      image:
        "https://th.bing.com/th/id/OIP.d5TIxAbBUynRnNf6qNk57wHaHa?rs=1&pid=ImgD…",
      title: "Chew Toy",
      price: 700,
    },
    {
      _id: "67936750204568b3d0df12d4",
      image:
        "https://img-va.myshopline.com/image/store/2004177470/1673676624636/1.p…",
      title: "Interractive Cat Toy",
      price: 2000,
    },
    {
      _id: "679367da204568b3d0df12d5",
      image:
        "https://piscespets.com/cdn/shop/products/s100019509_1024x.jpg?v=162085…",
      title: "Bristle Brush",
      price: 400,
    },
    {
      _id: "67936828204568b3d0df12d6",
      image:
        "https://www.ozgroomingworld.com.au/assets/full/WA-WE58453.jpg?20200311…",
      title: "Nail Clipper and Ginder",
      price: 1800,
    },
    {
      _id: "6793689f204568b3d0df12d7",
      image:
        "https://th.bing.com/th/id/OIP.sZIyOj-VyNzIKV5wNvMJYgHaHa?rs=1&pid=ImgD…",
      title: "Cat Shampoo",
      price: 650,
    },
    {
      _id: "679368e5204568b3d0df12d8",
      image:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/1291750-cent…",
      title: "Dog Shampoo",
      price: 700,
    },
    {
      _id: "6793691a204568b3d0df12d9",
      image:
        "https://th.bing.com/th/id/OIP.3A7qbK-37C9Y7q26fyZfcwAAAA?w=474&h=474&r…",
      title: "Adjustable Pet Collar",
      price: 1100,
    },
    {
      _id: "67936977204568b3d0df12da",
      image:
        "https://th.bing.com/th/id/OIP.UbZ75ivNuNb6rihgQsCJkgHaE8?w=2560&h=1707…",
      title: "Cat Litter Boxes",
      price: 1850,
    },
    {
      _id: "679369cb204568b3d0df12db",
      image:
        "https://i5.walmartimages.com/asr/5e397bcb-6cad-42ef-a6e8-e47f01ba1a4e_…",
      title: "Flea and tick prevention products",
      price: 900,
    },
    {
      _id: "67936a20204568b3d0df12dc",
      image:
        "https://miro.medium.com/v2/resize:fit:800/1*K5I7HcF_y_wfzXtVOBT0Rw.jpe…",
      title: "Pet First Aid Kit",
      price: 5500,
    },
  ],
};
