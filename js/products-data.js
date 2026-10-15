/**
 * SHIVARA BY RIDDHI - Heritage Luxury Jewelry Catalog Data
 * All currency calculations support INR (base), USD, GBP, and AED.
 */

const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, locale: 'en-IN' },
  USD: { symbol: '$', rate: 0.012, locale: 'en-US' },
  GBP: { symbol: '£', rate: 0.0095, locale: 'en-GB' },
  AED: { symbol: 'AED ', rate: 0.044, locale: 'en-AE' }
};

let currentCurrency = 'INR';

function formatCurrency(amountInINR, currency = currentCurrency) {
  const curr = CURRENCIES[currency] || CURRENCIES.INR;
  const converted = Math.round(amountInINR * curr.rate);
  return `${curr.symbol}${converted.toLocaleString(curr.locale)}`;
}

const PRODUCTS = [
  {
    id: 'shivara-01',
    name: 'The Maharani Swarna Rani Haar',
    category: 'bridal',
    categoryName: 'Bridal Heritage',
    priceINR: 485000,
    rating: 5.0,
    reviewsCount: 38,
    badge: 'Bestseller',
    badgeType: 'gold',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
    imageHover: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=85'
    ],
    purity: '22K BIS Hallmarked (916 Pure Gold)',
    grossWeight: '88.4 g',
    netGoldWeight: '69.2 g',
    gemstones: 'Natural Basra Seed Pearls, Syndicate Polki, Zambian Emerald Beads',
    certification: 'BIS Hallmark 916 & SGL Certified Authenticity Dossier',
    closure: 'Hand-braided Pure Zari Silk Dori with Gold Filigree Tassels',
    shortDesc: 'A grand multi-tier royal heirloom necklace invoking the majesty of Marwar courts, adorned with cascading pearls and uncut polki diamonds.',
    description: 'The Maharani Swarna Rani Haar is an ode to timeless sovereign grace. Forged painstakingly over 140 hours by 5th-generation master karigars in our Jaipur atelier, every tier is balanced with symmetrical gold paisleys, floral openwork, and glowing Basra seed pearls that rest with regal poise against royal bridal silks.'
  },
  {
    id: 'shivara-02',
    name: 'Basra Pearl & Emerald Choker Suite',
    category: 'pearl',
    categoryName: 'Pearl Necklaces',
    priceINR: 265000,
    rating: 4.9,
    reviewsCount: 24,
    badge: 'Heritage Edition',
    badgeType: 'pearl',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=80',
    imageHover: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85'
    ],
    purity: '22K BIS Hallmarked (916 Pure Gold)',
    grossWeight: '56.8 g',
    netGoldWeight: '42.1 g',
    gemstones: 'Lustrous Grade-AAA Natural Basra Pearls, Cabochon Emeralds',
    certification: 'GIA Gemological Report & Government BIS Hallmarking',
    closure: 'Adjustable Velvet Cord with Gold Bead Clasp',
    shortDesc: 'Five luminous strands of unblemished pearls anchored by a hand-carved floral emerald centerpiece encased in pure yellow gold.',
    description: 'A breath of pure aristocratic poetry. Each pearl is hand-graded for matching orient, creamy iridescence, and sphericity. Interspersed with 22K antique gold spacer granules, the centerpiece features an untreated Zambian emerald encircled by micro-prong set rose-cut diamonds.'
  },
  {
    id: 'shivara-03',
    name: 'Devi Lakshmi Temple Hasli',
    category: 'temple',
    categoryName: 'Temple Jewellery',
    priceINR: 320000,
    rating: 5.0,
    reviewsCount: 42,
    badge: 'Masterpiece',
    badgeType: 'gold',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=900&q=80',
    imageHover: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85'
    ],
    purity: '22K Antique Nakashi Gold (916 Hallmarked)',
    grossWeight: '72.5 g',
    netGoldWeight: '66.8 g',
    gemstones: 'Natural Burmese Ruby Cabochons, South Sea Baroque Pearl Drops',
    certification: 'BIS Hallmark 916 & Temple Artisans Guild Seal',
    closure: 'Hinged Gold Hasli Collar with Hidden Safety Pin Lock',
    shortDesc: 'A divine Nakashi work neck torque featuring Goddess Lakshmi seated upon a golden lotus, flanked by auspicious celestial elephants.',
    description: 'Carved using the sacred ancient Nakashi technique where gold is pushed and sculpted entirely by hand without moulds. The matte antique finish evokes centuries of sanctified tradition, while the ruby droplets and lustrous South Sea baroque pearl droplets create an aura of auspicious prosperity.'
  },
  {
    id: 'shivara-04',
    name: 'Padmavati Polki Gulbandh',
    category: 'choker',
    categoryName: 'Polki & Chokers',
    priceINR: 540000,
    rating: 5.0,
    reviewsCount: 31,
    badge: 'Bridal',
    badgeType: 'gold',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80',
    imageHover: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=85'
    ],
    purity: '24K Pure Gold Foil Kundan & 22K Base (916)',
    grossWeight: '94.6 g',
    netGoldWeight: '71.0 g',
    gemstones: 'Syndicate Polki Diamonds, Flawless Basra Pearls, Russian Emerald Beads',
    certification: 'SGL International Diamond & Gold Certification',
    closure: 'Handmade Gold Thread Adjustable Dori',
    shortDesc: 'An opulent closed-setting diamond choker featuring intricate Jadau setting with reverse hand-painted Meenakari enamel art.',
    description: 'Inspired by the historic royal palaces of Mewar, this gulbandh sits flush around the neck with sublime ergonomic comfort. The reverse face features bespoke Jaipur meenakari in rich peacock blues and lotus ruby reds — an invisible secret of luxury known only to the wearer.'
  },
  {
    id: 'shivara-05',
    name: 'Sitara Petite Pearl Lariat',
    category: 'daily',
    categoryName: 'Daily Wear Elegance',
    priceINR: 88000,
    rating: 4.8,
    reviewsCount: 19,
    badge: 'New',
    badgeType: 'pearl',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
    imageHover: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1200&q=85'
    ],
    purity: '18K Yellow Gold (750 Hallmarked)',
    grossWeight: '18.4 g',
    netGoldWeight: '16.2 g',
    gemstones: 'Single South Sea Drop Pearl, Solitaire Brilliant Diamond (0.28 ct)',
    certification: 'IGI Certified Diamond & 18K Hallmarked Gold',
    closure: 'Spring Ring Clasp with 2-inch Extension Links',
    shortDesc: 'A fluid golden chain terminating in a whisper of diamonds and an ethereal teardrop pearl for sophisticated daily poise.',
    description: 'Tailored for the contemporary woman who honors heritage without excessive weight. The Sitara Lariat slips gracefully under crisp linen collars or plunging evening necklines, catching the ambient light with every effortless gesture.'
  },
  {
    id: 'shivara-06',
    name: 'Aishwarya Navratan Regal Collar',
    category: 'festive',
    categoryName: 'The Festive Edit',
    priceINR: 375000,
    rating: 5.0,
    reviewsCount: 27,
    badge: 'Bestseller',
    badgeType: 'gold',
    image: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=900&q=80',
    imageHover: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1200&q=85'
    ],
    purity: '22K Yellow Gold (916 Hallmarked)',
    grossWeight: '68.2 g',
    netGoldWeight: '52.4 g',
    gemstones: 'Nine Celestial Gemstones (Ruby, Pearl, Coral, Emerald, Yellow Sapphire, Diamond, Blue Sapphire, Hessonite, Cat’s Eye)',
    certification: 'BIS 916 & Comprehensive Astrological Gemstone Certificate',
    closure: 'Handwoven Golden Zari Cord with Pearl Slider',
    shortDesc: 'A cosmic constellation of nine sacred gemstones set in 22K filigree gold, conferring harmony, beauty, and radiant charm.',
    description: 'Celebrating the Vedic cosmology of the Navagrahas, this collar balances spiritual significance with arresting visual majesty. The nine unheated gemstones are bordered by micro-beaded gold wirework and a gentle fringe of ivory seed pearls.'
  },
  {
    id: 'shivara-07',
    name: 'Noor Jahan Jadau Choker',
    category: 'bridal',
    categoryName: 'Bridal Heritage',
    priceINR: 415000,
    rating: 4.9,
    reviewsCount: 33,
    badge: 'Bridal',
    badgeType: 'gold',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=80',
    imageHover: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=85'
    ],
    purity: '22K Pure Gold & 24K Kundan Foiling',
    grossWeight: '82.0 g',
    netGoldWeight: '64.5 g',
    gemstones: 'Rose-Cut Polki Diamonds, Watermelon Tourmaline Drops, White Pearls',
    certification: 'BIS Hallmark 916 & Gemological Institute of India Card',
    closure: 'Pure Silk Golden Dori with Pearl Drops',
    shortDesc: 'Mughal-inspired arched latticework sparkling with untreated polki crystals and gentle pastel tourmaline drops.',
    description: 'Named after the legendary empress renowned for her sartorial brilliance, the Noor Jahan choker combines jali architecture with delicate gemstone setting. Its flexibility ensures it molds like silk against your neckline.'
  },
  {
    id: 'shivara-08',
    name: 'Aadya Sacred Rudraksha & Gold Haar',
    category: 'temple',
    categoryName: 'Temple Jewellery',
    priceINR: 195000,
    rating: 5.0,
    reviewsCount: 22,
    badge: 'Heritage Edition',
    badgeType: 'gold',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=900&q=80',
    imageHover: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=85'
    ],
    purity: '22K Yellow Gold (916 Hallmarked)',
    grossWeight: '48.5 g',
    netGoldWeight: '43.2 g',
    gemstones: 'Authentic 5-Mukhi Himalayan Rudraksha Beads, Basra Pearls',
    certification: 'BIS Hallmarked 916 & Botanical Rudraksha Certification',
    closure: 'S-Hook Solid Gold Clasp',
    shortDesc: 'Spiritual sanctity woven with gold. Hand-chased floral gold caps encasing sacred beads, finished with a trishul pendant.',
    description: 'A deeply personal piece of divine protective jewelry. Incorporating Shivara’s signature trishul motif sculpted in 22K gold, the Aadya Haar connects the wearer with the sacred energy of Mount Kailash and ancient temple traditions.'
  },
  {
    id: 'shivara-09',
    name: 'Tara Golden South Sea Choker',
    category: 'pearl',
    categoryName: 'Pearl Necklaces',
    priceINR: 310000,
    rating: 4.9,
    reviewsCount: 16,
    badge: 'New',
    badgeType: 'pearl',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80',
    imageHover: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85'
    ],
    purity: '18K Warm Champagne Gold (750 Hallmarked)',
    grossWeight: '62.0 g',
    netGoldWeight: '38.0 g',
    gemstones: 'Natural Champagne & Golden South Sea Pearls (11-13mm)',
    certification: 'Mikimoto Standards Certified Pearl Dossier',
    closure: 'Concealed Diamond Ball Clasp in 18K Gold',
    shortDesc: 'A graduated necklace of rare, naturally golden South Sea pearls glowing with deep satiny lustre and royal dignity.',
    description: 'Harvested from the warm pristine waters of the South Pacific, these naturally golden pearls require no artificial dye or irradiation. Strung individually on knotted pure silk thread with an invisible diamond-studded gold ball clasp.'
  },
  {
    id: 'shivara-10',
    name: 'Ananya Brushed Gold Torque',
    category: 'daily',
    categoryName: 'Daily Wear Elegance',
    priceINR: 115000,
    rating: 4.9,
    reviewsCount: 28,
    badge: 'Bestseller',
    badgeType: 'gold',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
    imageHover: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=85'
    ],
    purity: '22K Satin Brushed Gold (916 Hallmarked)',
    grossWeight: '24.5 g',
    netGoldWeight: '24.5 g',
    gemstones: 'Solid 22K Gold (Zero Stones) with micro-fluted pearl terminals',
    certification: 'BIS Hallmark 916 Laser Inscribed',
    closure: 'Flexible Memory-Core Slip-On Neck Torque',
    shortDesc: 'Sculptural minimalism meets Indian goldsmithing. A tactile satin-brushed gold collar with flared pearl finials.',
    description: 'Formed from solid 22K gold over a high-tensile inner core, the Ananya Torque retains its graceful crescent contour around the clavicle. The velvety micro-brushed finish diffuses the harsh glare of modern light into a warm, buttery golden warmth.'
  },
  {
    id: 'shivara-11',
    name: 'Rajkumari Meenakari Hasli Collar',
    category: 'festive',
    categoryName: 'The Festive Edit',
    priceINR: 290000,
    rating: 5.0,
    reviewsCount: 20,
    badge: 'Limited Edition',
    badgeType: 'gold',
    image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=900&q=80',
    imageHover: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=1200&q=85'
    ],
    purity: '22K Gold with Cloisonné Enamel (916 Hallmarked)',
    grossWeight: '59.4 g',
    netGoldWeight: '49.0 g',
    gemstones: 'Natural Uncut Polki, Royal Cobalt & Gulabi Meena, South Sea Pearls',
    certification: 'BIS Hallmark 916 & Master Enameller Guild Seal',
    closure: 'Screw-pin Hinge with Dual Safety Catch',
    shortDesc: 'Reversible royal neckpiece featuring hand-vitrified Jaipur enamel artwork on one side and glistening uncut diamonds on the other.',
    description: 'A tour de force of traditional miniature enameling. Glass powder infused with natural minerals is fired at 850°C to create an indestructible jewel-toned glaze. Wear with diamonds forward for bridal ceremonies, or turn around to display the breathtaking royal peacock blue enamel for festive soirees.'
  },
  {
    id: 'shivara-12',
    name: 'Surya Kundan Floral Collar Suite',
    category: 'bridal',
    categoryName: 'Bridal Heritage',
    priceINR: 625000,
    rating: 5.0,
    reviewsCount: 45,
    badge: 'Masterpiece',
    badgeType: 'gold',
    image: 'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=900&q=80',
    imageHover: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85'
    ],
    purity: '24K Gold Kundan & 22K Structure (916 Hallmarked)',
    grossWeight: '108.0 g',
    netGoldWeight: '82.5 g',
    gemstones: 'Hand-selected Syndicate Polki, Natural Basra Pearls, Burmese Pigeon-Blood Rubies',
    certification: 'BIS 916 & International Gemological Laboratory Dossier',
    closure: 'Handwoven Heavy Zari Cord with Pearl Finials',
    shortDesc: 'The crowning glory of our bridal archives. A grand floral collar radiating solar energy, draped with clusters of iridescent Basra pearls.',
    description: 'Designed exclusively for the royal bride. Seven grand floral medallions of graduated scale encircle the collarbone, each centered by an uncut diamond of exceptional fire. Over 180 hours of meticulous karigari create a piece that will be passed through your lineage for centuries.'
  }
];

const COLLECTIONS = [
  {
    id: 'bridal-necklaces',
    name: 'Bridal Necklaces',
    subtitle: 'The Sacred Trousseau',
    count: '18 Masterpieces',
    image: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=800&q=80',
    desc: 'Grand multi-tiered rani haars and polki collars curated for your eternal vows.'
  },
  {
    id: 'pearl-necklaces',
    name: 'Pearl Necklaces',
    subtitle: 'Lustrous Oceans',
    count: '14 Heirlooms',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
    desc: 'Certified natural Basra & Golden South Sea pearls woven with pure gold.'
  },
  {
    id: 'gold-choker-sets',
    name: 'Gold Choker Sets',
    subtitle: 'Imperial Gulbandh',
    count: '16 Creations',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=800&q=80',
    desc: 'Close-fitting royal neckpieces sculpted with Jadau and Meenakari craftsmanship.'
  },
  {
    id: 'temple-jewellery',
    name: 'Temple Jewellery',
    subtitle: 'Sacred Devotion',
    count: '12 Heirlooms',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80',
    desc: 'Deep antique matte gold depicting Goddess Lakshmi, trishul, and Vedic emblems.'
  },
  {
    id: 'daily-wear-elegance',
    name: 'Daily Wear Elegance',
    subtitle: 'Subtle Grandeur',
    count: '20 Designs',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    desc: 'Featherlight 18K & 22K necklaces designed for daily poise and effortless charm.'
  },
  {
    id: 'festive-edit',
    name: 'Festive Edit',
    subtitle: 'Celebration of Joy',
    count: '15 Designs',
    image: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&w=800&q=80',
    desc: 'Navratan collars, enamelled haslis, and statement necklaces for landmark soirees.'
  }
];

const TESTIMONIALS = [
  {
    name: 'Gayatri Singhania',
    city: 'Udaipur & London',
    role: 'Heritage Bride',
    quote: 'When my Maharani Swarna Rani Haar arrived in the ivory velvet casket, my mother wept with joy. The weight of the 22K gold, the whisper of real Basra pearls, and Riddhi’s personal note made our wedding in City Palace feel like a royal fairytale.',
    stars: 5,
    wedding: 'Royal Wedding at Jagmandir Palace'
  },
  {
    name: 'Dr. Meera Nambiar',
    city: 'Mumbai',
    role: 'Connoisseur & Collector',
    quote: 'As someone who has collected Cartier and Mikimoto pearls for 20 years, Shivara’s craftsmanship stands peerless. The Devi Lakshmi Temple Hasli possesses an antique devotion and sculptural purity you simply cannot find in commercial jewelry houses.',
    stars: 5,
    wedding: 'Temple Wedding in Guruvayur'
  },
  {
    name: 'Zoya Merchant',
    city: 'Dubai',
    role: 'Bespoke Atelier Client',
    quote: 'The virtual consultation with Riddhi via video concierge was seamless. From diamond selection to the final hallmarking certificate sent via insured air courier to Dubai, every detail breathed absolute luxury.',
    stars: 5,
    wedding: 'Reception at Burj Al Arab'
  },
  {
    name: 'Devika Rathore',
    city: 'Jaipur & Delhi',
    role: 'Heritage Bride',
    quote: 'The Padmavati Polki Gulbandh didn’t just complement my red raw silk lehenga — it defined the entire evening. The reverse Meenakari is so breathtaking that guests asked to see the back of the necklace as much as the front!',
    stars: 5,
    wedding: 'Fairmont Palace Wedding'
  }
];
