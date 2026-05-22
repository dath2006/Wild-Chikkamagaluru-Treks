/**
 * ─── SITE MEDIA REGISTRY ────────────────────────────────────────────────────
 *
 * Custom Domain: media.wildchikkamagalurutreks.com
 * Total Files: 77 (55 images, 22 videos)
 *
 * Display areas:
 *   1. HERO_TILES          — floating photo tiles on desktop hero
 *   2. CIRCULAR_GALLERY    — WebGL carousel (uses hero.* files)
 *   3. TREK_MEDIA          — per-trek gallery (all media per trek + subfolders)
 *   4. MOBILE_CAROUSEL     — mobile hero images
 *   5. TREK_JOURNEY        — hero banner videos before trek section
 *   6. BITS_AND_PIECES     — general gallery items mixed everywhere
 *   7. ALL_GALLERY_MEDIA   — unified collection for intelligent gallery
 *
 * Subfolder handling:
 *   - kudremuka/back_waters → merged into Kudremukh Peak
 *   - kurinjal/movements → merged into Kurinjal Peak
 * ────────────────────────────────────────────────────────────────────────────
 */

const BASE_URL = "https://media.wildchikkamagalurutreks.com";

// ─── 1. HERO TILES (desktop floating cards) ──────────────────────────────────
// Mix of trek heroes + bits_and_pieces for variety
export const HERO_TILE_IMAGES: Record<string, string> = {
  // Trek highlights
  "Mullayanagiri sunrise": `${BASE_URL}/chikkamagaluru%20treks/mullaynagiri/hero.webp`,
  "Kudremukh ridge": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/hero.jpeg`,
  "Hebbe falls": `${BASE_URL}/chikkamagaluru%20treks/hebbe%20falls/hero.jpg`,
  "Jari falls": `${BASE_URL}/chikkamagaluru%20treks/jhari%20falls/hero.jpg`,
  "Netravati ridge": `${BASE_URL}/chikkamagaluru%20treks/netravathi/hero.png`,
  "Kurinjal vista": `${BASE_URL}/chikkamagaluru%20treks/kurinjal/hero.jpeg`,
  "Ettina Bhuja rock": `${BASE_URL}/chikkamagaluru%20treks/ethin%20bhuja/hero_1.jpeg`,
  "Gangadikkal view": `${BASE_URL}/chikkamagaluru%20treks/gangadikal/hero.jpeg`,
  "Bandaje cascade": `${BASE_URL}/chikkamagaluru%20treks/bandaje%20falls%20trek/hero.jpeg`,
  "Ballalrayan fort": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/hero.jpg`,
  "Kyatanamakki sunset": `${BASE_URL}/chikkamagaluru%20treks/Kyatanamakki%20hills/hero.jpeg`,
  "Rani Jheri viewpoint": `${BASE_URL}/chikkamagaluru%20treks/rani%20jheri/hero_1.jpg`,
  // Bits & pieces mixed in
  "Charmudi mist": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Charmudi%20Falls.jpeg`,
  "Forest deep": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/FOREST.jpeg`,
  "Karnataka wilds": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Karnataka%20Forest.jpeg`,
  "Misty cascade": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Misty%20Falls.jpeg`,
  "Road adventure": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Road%20Trip.jpeg`,
  // Poster image
  "Chikkamagaluru poster": `${BASE_URL}/chikkamagaluru%20treks/poster.jpeg`,
};

// ─── 2. CIRCULAR GALLERY (WebGL carousel - uses hero files) ──────────────────
// Key = trek name (must match treks.ts exactly)
export const TREK_COVER_IMAGES: Record<string, string> = {
  Mullayanagiri: `${BASE_URL}/chikkamagaluru%20treks/mullaynagiri/hero.webp`,
  "Kudremukh Peak": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/hero.jpeg`,
  "Netravati Peak": `${BASE_URL}/chikkamagaluru%20treks/netravathi/hero.png`,
  "Kurinjal Peak": `${BASE_URL}/chikkamagaluru%20treks/kurinjal/hero.jpeg`,
  "Ettina Bhuja": `${BASE_URL}/chikkamagaluru%20treks/ethin%20bhuja/hero_1.jpeg`,
  "Gangadikkal Peak": `${BASE_URL}/chikkamagaluru%20treks/gangadikal/hero.jpeg`,
  "Narasimha Parvatha": "", // No media available
  "Bandaje Falls": `${BASE_URL}/chikkamagaluru%20treks/bandaje%20falls%20trek/hero.jpeg`,
  "Ukkada Falls": "", // No media available
  "Hebbe Falls": `${BASE_URL}/chikkamagaluru%20treks/hebbe%20falls/hero.jpg`,
  "Jari Falls": `${BASE_URL}/chikkamagaluru%20treks/jhari%20falls/hero.jpg`,
  Bandekallu: "", // No media available
  // New treks
  "Ballalrayan Durga": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/hero.jpg`,
  "Hanumana Gudi Falls": "", // Video only trek
  "Hidden Water Falls": `${BASE_URL}/chikkamagaluru%20treks/hidden%20water%20falls/hero.jpeg`,
  "Kodige Falls": "", // Video only trek
  "Kyatanamakki Hills": `${BASE_URL}/chikkamagaluru%20treks/Kyatanamakki%20hills/hero.jpeg`,
  "Rani Jheri": `${BASE_URL}/chikkamagaluru%20treks/rani%20jheri/hero_1.jpg`,
};

// ─── 3. TREK MEDIA IMAGES (masonry gallery + lightbox) ────────────────────────
// All images per trek including subfolder contents
export const TREK_MEDIA_IMAGES: Record<string, string> = {
  // ─── Mullayanagiri ───
  "Summit view": `${BASE_URL}/chikkamagaluru%20treks/mullaynagiri/DSC_0347.jpg`,
  "Mullayanagiri scaled": `${BASE_URL}/chikkamagaluru%20treks/mullaynagiri/Mullayanagiri-scaled.webp`,
  "Mullayanagiri evening": `${BASE_URL}/chikkamagaluru%20treks/mullaynagiri/WhatsApp%20Image%202026-05-21%20at%208.18.18%20PM.jpeg`,
  // "Mullayana temple": "",
  // "Ridge trail": "",

  // ─── Kudremukh Peak (includes back_waters subfolder) ───
  "Kudremukh evening 1": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/WhatsApp%20Image%202026-05-21%20at%2019.59.49.jpeg`,
  "Kudremukh evening 2": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/WhatsApp%20Image%202026-05-21%20at%2019.59.50.jpeg`,
  // Back waters subfolder
  "Back waters view 1": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/back_waters/WhatsApp%20Image%202026-05-21%20at%207.54.28%20PM%20(1).jpeg`,
  "Back waters view 2": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/back_waters/WhatsApp%20Image%202026-05-21%20at%207.54.28%20PM.jpeg`,
  "Back waters view 3": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/back_waters/WhatsApp%20Image%202026-05-21%20at%207.54.31%20PM.jpeg`,
  "Back waters view 4": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/back_waters/WhatsApp%20Image%202026-05-21%20at%207.54.32%20PM.jpeg`,
  "Back waters view 5": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/back_waters/WhatsApp%20Image%202026-05-21%20at%207.54.34%20PM.jpeg`,

  // ─── Netravati Peak ───
  "Netravati dawn": `${BASE_URL}/chikkamagaluru%20treks/netravathi/WhatsApp%20Image%202026-05-21%20at%2019.57.33.jpeg`,
  "Netravati evening": `${BASE_URL}/chikkamagaluru%20treks/netravathi/WhatsApp%20Image%202026-05-21%20at%208.37.50%20PM.jpeg`,

  // ─── Kurinjal Peak (includes movements subfolder) ───
  "Kurinjal view 1": `${BASE_URL}/chikkamagaluru%20treks/kurinjal/WhatsApp%20Image%202026-05-21%20at%2020.01.53%20(1).jpeg`,
  "Kurinjal view 2": `${BASE_URL}/chikkamagaluru%20treks/kurinjal/WhatsApp%20Image%202026-05-21%20at%2020.01.53.jpeg`,
  // Movements subfolder
  "Kurinjal movements": `${BASE_URL}/chikkamagaluru%20treks/kurinjal/movements/WhatsApp%20Image%202026-05-21%20at%208.07.18%20PM.jpeg`,

  // ─── Ettina Bhuja ───
  "Ettina formation 1": `${BASE_URL}/chikkamagaluru%20treks/ethin%20bhuja/WhatsApp%20Image%202026-05-21%20at%2020.17.47.jpeg`,
  "Ettina formation 2": `${BASE_URL}/chikkamagaluru%20treks/ethin%20bhuja/WhatsApp%20Image%202026-05-21%20at%2020.17.48.jpeg`,
  "Ettina hero": `${BASE_URL}/chikkamagaluru%20treks/ethin%20bhuja/hero.jpeg`,
  "Rock formation": `${BASE_URL}/chikkamagaluru%20treks/ethin%20bhuja/hero_1.jpeg`,

  // ─── Gangadikkal Peak ───
  "Gangadikkal view": `${BASE_URL}/chikkamagaluru%20treks/gangadikal/WhatsApp%20Image%202026-05-21%20at%2020.04.50.jpeg`,
  "Panoramic view": `${BASE_URL}/chikkamagaluru%20treks/gangadikal/hero.jpeg`,

  // ─── Narasimha Parvatha ───
  // No media available

  // ─── Bandaje Falls ───
  "Bandaje main view": `${BASE_URL}/chikkamagaluru%20treks/bandaje%20falls%20trek/WhatsApp%20Image%202026-05-21%20at%2020.13.43.jpeg`,
  "Bandaje falls": `${BASE_URL}/chikkamagaluru%20treks/bandaje%20falls%20trek/hero.jpeg`,

  // ─── Ukkada Falls ───
  // No media available

  // ─── Hebbe Falls ───
  "Hebbe natural beauty": `${BASE_URL}/chikkamagaluru%20treks/hebbe%20falls/The-Natural-Beauty-of-Hebbe-Waterfalls.jpg`,
  "Hebbe hero": `${BASE_URL}/chikkamagaluru%20treks/hebbe%20falls/hero.jpg`,
  "Hebbe wide shot": `${BASE_URL}/chikkamagaluru%20treks/hebbe%20falls/z1du9w6kfbe1tz61elcule5k8lum_4355778037_6d244c698f_o.webp`,

  // ─── Jari Falls ───
  "Jari caption": `${BASE_URL}/chikkamagaluru%20treks/jhari%20falls/caption.jpg`,
  "Jari hero": `${BASE_URL}/chikkamagaluru%20treks/jhari%20falls/hero.jpg`,
  "Jari falls": `${BASE_URL}/chikkamagaluru%20treks/jhari%20falls/jhari%20falls.jpg`,

  // ─── Bandekallu ───
  // No media available

  // ─── Ballalrayan Durga ───
  "Fort ruins 1": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/WhatsApp%20Image%202026-05-21%20at%208.02.30%20PM.jpeg`,
  "Fort ruins 2": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/WhatsApp%20Image%202026-05-21%20at%208.02.31%20PM%20(1).jpeg`,
  "Fort ruins 3": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/WhatsApp%20Image%202026-05-21%20at%208.02.31%20PM.jpeg`,
  "Fort ruins 4": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/WhatsApp%20Image%202026-05-21%20at%208.02.32%20PM%20(1).jpeg`,
  "Fort ruins 5": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/WhatsApp%20Image%202026-05-21%20at%208.02.32%20PM.jpeg`,
  "Ballalarayana fort": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/ballalarayana-durga-fort.jpg`,
  "Ballalrayan hero": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/hero.jpg`,

  // ─── Hidden Water Falls ───
  "Hidden cascade": `${BASE_URL}/chikkamagaluru%20treks/hidden%20water%20falls/hero.jpeg`,

  // ─── Kyatanamakki Hills ───
  "Kyatanamakki evening": `${BASE_URL}/chikkamagaluru%20treks/Kyatanamakki%20hills/WhatsApp%20Image%202026-05-21%20at%208.28.35%20PM.jpeg`,
  "Kyatanamakki hero": `${BASE_URL}/chikkamagaluru%20treks/Kyatanamakki%20hills/hero.jpeg`,
  "Grassland vista": `${BASE_URL}/chikkamagaluru%20treks/Kyatanamakki%20hills/hero.jpeg`,
  "Sunset horizon": `${BASE_URL}/chikkamagaluru%20treks/Kyatanamakki%20hills/WhatsApp%20Image%202026-05-21%20at%208.28.35%20PM.jpeg`,

  // ─── Rani Jheri ───
  "Rani Jheri hero": `${BASE_URL}/chikkamagaluru%20treks/rani%20jheri/hero.webp`,
  "Rani Jheri hero 1": `${BASE_URL}/chikkamagaluru%20treks/rani%20jheri/hero_1.jpg`,
  "Viewpoint vista": `${BASE_URL}/chikkamagaluru%20treks/rani%20jheri/hero_1.jpg`,
  "Wiki viewpoint": `${BASE_URL}/chikkamagaluru%20treks/rani%20jheri/rani-jhari-view-point-wiki.jpg`,

  // ─── BITS_AND_PIECES (Mixed into general gallery) ───
  "Charmudi falls": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Charmudi%20Falls.jpeg`,
  "Deep forest": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/FOREST.jpeg`,
  "Karnataka forest": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Karnataka%20Forest.jpeg`,
  "Misty falls": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Misty%20Falls.jpeg`,
  "Road trip": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Road%20Trip.jpeg`,
};

// ─── 4. TREK MEDIA VIDEOS (lightbox video player) ────────────────────────────
export const TREK_MEDIA_VIDEOS: Record<string, string> = {
  // ─── Mullayanagiri ───
  "Mullayanagiri video": `${BASE_URL}/chikkamagaluru%20treks/mullaynagiri/WhatsApp%20Video%202026-05-21%20at%208.18.33%20PM.mp4`,

  // ─── Netravati Peak ───
  "Netravati video": `${BASE_URL}/chikkamagaluru%20treks/netravathi/WhatsApp%20Video%202026-05-21%20at%208.37.55%20PM.mp4`,

  // ─── Kurinjal Peak ───
  "Kurinjal movement 1": `${BASE_URL}/chikkamagaluru%20treks/kurinjal/movements/WhatsApp%20Video%202026-05-21%20at%208.07.20%20PM.mp4`,
  "Kurinjal movement 2": `${BASE_URL}/chikkamagaluru%20treks/kurinjal/movements/WhatsApp%20Video%202026-05-21%20at%208.07.23%20PM.mp4`,
  "Kurinjal movement 3": `${BASE_URL}/chikkamagaluru%20treks/kurinjal/movements/WhatsApp%20Video%202026-05-21%20at%208.07.29%20PM.mp4`,

  // ─── Hanumana Gudi Falls ───
  "Sacred cascade": `${BASE_URL}/chikkamagaluru%20treks/hanumana%20gudi%20falls/WhatsApp%20Video%202026-05-21%20at%208.13.00%20PM.mp4`,

  // ─── Hidden Water Falls ───
  "Waterfall plunge": `${BASE_URL}/chikkamagaluru%20treks/hidden%20water%20falls/WhatsApp%20Video%202026-05-21%20at%208.39.59%20PM.mp4`,
  "Misty spray": `${BASE_URL}/chikkamagaluru%20treks/hidden%20water%20falls/WhatsApp%20Video%202026-05-21%20at%209.03.58%20PM.mp4`,
  "Pool below": `${BASE_URL}/chikkamagaluru%20treks/hidden%20water%20falls/WhatsApp%20Video%202026-05-21%20at%209.04.00%20PM.mp4`,
  "Forest approach": `${BASE_URL}/chikkamagaluru%20treks/hidden%20water%20falls/WhatsApp%20Video%202026-05-21%20at%209.08.13%20PM.mp4`,

  // ─── Kodige Falls ───
  "Kodige cascade": `${BASE_URL}/chikkamagaluru%20treks/kodige%20falls/WhatsApp%20Video%202026-05-21%20at%209.12.54%20PM.mp4`,

  // ─── Bandaje Falls ───
  "Bandaje video": `${BASE_URL}/chikkamagaluru%20treks/bandaje%20falls%20trek/WhatsApp%20Video%202026-05-21%20at%208.23.05%20PM.mp4`,

  // ─── Kudremukh Back Waters ───
  "Back waters video": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/back_waters/lakhya_dam.mp4`,

  // ─── Kyatanamakki Hills ───
  "Rolling hills video": `${BASE_URL}/chikkamagaluru%20treks/Kyatanamakki%20hills/WhatsApp%20Video%202026-05-21%20at%208.28.47%20PM.mp4`,
  "Panoramic sweep": `${BASE_URL}/chikkamagaluru%20treks/Kyatanamakki%20hills/kyatanamakki_hills.mp4`,

  // ─── Rani Jheri ───
  "Valley breeze": `${BASE_URL}/chikkamagaluru%20treks/rani%20jheri/WhatsApp%20Video%202026-05-21%20at%209.06.51%20PM.mp4`,
  "Clouds rolling": `${BASE_URL}/chikkamagaluru%20treks/rani%20jheri/WhatsApp%20Video%202026-05-21%20at%209.06.56%20PM.mp4`,

  // ─── BITS_AND_PIECES ───
  "Kyatanmakki bits": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Kyatanmakki%20Hills.mp4`,
  "Unknown territory": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Unknown%20Territory.mp4`,
};

// ─── 5. TREK JOURNEY VIDEOS (Hero banner before trek section) ────────────────
export const TREK_JOURNEY_VIDEOS = [
  {
    title: "Explore Chikkamagaluru",
    description: "A journey through the Western Ghats",
    url: `${BASE_URL}/chikkamagaluru%20treks/trek_journey/explore_chikkamagaluru.mp4`,
    poster: `${BASE_URL}/chikkamagaluru%20treks/poster.jpeg`,
  },
  {
    title: "Trek Journey",
    description: "Experience the adventure",
    url: `${BASE_URL}/chikkamagaluru%20treks/trek_journey/trek_journey.mp4`,
    poster: `${BASE_URL}/chikkamagaluru%20treks/poster.jpeg`,
  },
] as const;

// ─── 6. MOBILE CAROUSEL IMAGES ───────────────────────────────────────────────
export const MOBILE_CAROUSEL_IMAGES: Record<string, string> = {
  Mullayanagiri: `${BASE_URL}/chikkamagaluru%20treks/mullaynagiri/hero.webp`,
  "Kudremukh Peak": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/hero.jpeg`,
  "Netravati Peak": `${BASE_URL}/chikkamagaluru%20treks/netravathi/hero.png`,
  "Kurinjal Peak": `${BASE_URL}/chikkamagaluru%20treks/kurinjal/hero.jpeg`,
  "Ettina Bhuja": `${BASE_URL}/chikkamagaluru%20treks/ethin%20bhuja/hero_1.jpeg`,
  "Gangadikkal Peak": `${BASE_URL}/chikkamagaluru%20treks/gangadikal/hero.jpeg`,
  "Narasimha Parvatha": "",
  "Bandaje Falls": `${BASE_URL}/chikkamagaluru%20treks/bandaje%20falls%20trek/hero.jpeg`,
  "Ukkada Falls": "",
  "Hebbe Falls": `${BASE_URL}/chikkamagaluru%20treks/hebbe%20falls/hero.jpg`,
  "Jari Falls": `${BASE_URL}/chikkamagaluru%20treks/jhari%20falls/hero.jpg`,
  Bandekallu: "",
  // New treks
  "Ballalrayan Durga": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/hero.jpg`,
  "Hanumana Gudi Falls": "",
  "Hidden Water Falls": `${BASE_URL}/chikkamagaluru%20treks/hidden%20water%20falls/hero.jpeg`,
  "Kodige Falls": "",
  "Kyatanamakki Hills": `${BASE_URL}/chikkamagaluru%20treks/Kyatanamakki%20hills/hero.jpeg`,
  "Rani Jheri": `${BASE_URL}/chikkamagaluru%20treks/rani%20jheri/hero_1.jpg`,
};

// ─── 7. BITS_AND_PIECES (General gallery items) ─────────────────────────────
export const BITS_AND_PIECES = {
  images: [
    {
      label: "Charmudi Falls",
      url: `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Charmudi%20Falls.jpeg`,
    },
    { label: "Forest", url: `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/FOREST.jpeg` },
    {
      label: "Karnataka Forest",
      url: `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Karnataka%20Forest.jpeg`,
    },
    {
      label: "Misty Falls",
      url: `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Misty%20Falls.jpeg`,
    },
    {
      label: "Road Trip",
      url: `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Road%20Trip.jpeg`,
    },
  ],
  videos: [
    {
      label: "Kyatanmakki Hills",
      url: `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Kyatanmakki%20Hills.mp4`,
    },
    {
      label: "Unknown Territory",
      url: `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Unknown%20Territory.mp4`,
    },
  ],
} as const;

// ─── 8. SITE IMAGES ───────────────────────────────────────────────────────────
export const SITE_IMAGES = {
  founderPortrait: `${BASE_URL}/chikkamagaluru%20treks/sushanth/sushanth_image.jpeg`,
  founderAvatar: `${BASE_URL}/chikkamagaluru%20treks/sushanth/sushanth_profile.jpg`,
  contactCard: `${BASE_URL}/chikkamagaluru%20treks/sushanth/sushanth_image.jpeg`,
  stayHero: `${BASE_URL}/chikkamagaluru%20treks/poster.jpeg`,
  aboutHero: `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Road%20Trip.jpeg`,
} as const;

// ─── 9. ALL_GALLERY_MEDIA (Unified collection for intelligent gallery) ─────────
// Flat list of all media across all treks for gallery display
export const ALL_GALLERY_MEDIA = [
  // Images
  ...Object.entries(TREK_MEDIA_IMAGES).map(([label, url]) => ({
    type: "image" as const,
    label,
    url,
  })),
  // Videos
  ...Object.entries(TREK_MEDIA_VIDEOS).map(([label, url]) => ({
    type: "video" as const,
    label,
    url,
  })),
  // Bits and pieces
  ...BITS_AND_PIECES.images.map((item) => ({
    type: "image" as const,
    label: item.label,
    url: item.url,
  })),
  ...BITS_AND_PIECES.videos.map((item) => ({
    type: "video" as const,
    label: item.label,
    url: item.url,
  })),
];

// ─── 10. TREK-SPECIFIC MEDIA COLLECTIONS (for trek detail pages) ─────────────
export const getTrekMedia = (trekName: string): { images: string[]; videos: string[] } => {
  const trekMediaMap: Record<string, { images: string[]; videos: string[] }> = {
    Mullayanagiri: {
      images: [
        TREK_MEDIA_IMAGES["Summit view"],
        TREK_MEDIA_IMAGES["Mullayanagiri scaled"],
        TREK_MEDIA_IMAGES["Mullayanagiri evening"],
      ].filter(Boolean),
      videos: [TREK_MEDIA_VIDEOS["Mullayanagiri video"]].filter(Boolean),
    },
    "Kudremukh Peak": {
      images: [
        TREK_MEDIA_IMAGES["Kudremukh evening 1"],
        TREK_MEDIA_IMAGES["Kudremukh evening 2"],
        TREK_MEDIA_IMAGES["Back waters view 1"],
        TREK_MEDIA_IMAGES["Back waters view 2"],
        TREK_MEDIA_IMAGES["Back waters view 3"],
        TREK_MEDIA_IMAGES["Back waters view 4"],
        TREK_MEDIA_IMAGES["Back waters view 5"],
      ].filter(Boolean),
      videos: [TREK_MEDIA_VIDEOS["Back waters video"]].filter(Boolean),
    },
    "Netravati Peak": {
      images: [TREK_MEDIA_IMAGES["Netravati dawn"], TREK_MEDIA_IMAGES["Netravati evening"]].filter(
        Boolean,
      ),
      videos: [TREK_MEDIA_VIDEOS["Netravati video"]].filter(Boolean),
    },
    "Kurinjal Peak": {
      images: [
        TREK_MEDIA_IMAGES["Kurinjal view 1"],
        TREK_MEDIA_IMAGES["Kurinjal view 2"],
        TREK_MEDIA_IMAGES["Kurinjal movements"],
      ].filter(Boolean),
      videos: [
        TREK_MEDIA_VIDEOS["Kurinjal movement 1"],
        TREK_MEDIA_VIDEOS["Kurinjal movement 2"],
        TREK_MEDIA_VIDEOS["Kurinjal movement 3"],
      ].filter(Boolean),
    },
    "Ettina Bhuja": {
      images: [
        TREK_MEDIA_IMAGES["Ettina formation 1"],
        TREK_MEDIA_IMAGES["Ettina formation 2"],
        TREK_MEDIA_IMAGES["Ettina hero"],
        TREK_MEDIA_IMAGES["Rock formation"],
      ].filter(Boolean),
      videos: [],
    },
    "Gangadikkal Peak": {
      images: [TREK_MEDIA_IMAGES["Gangadikkal view"], TREK_MEDIA_IMAGES["Panoramic view"]].filter(
        Boolean,
      ),
      videos: [],
    },
    "Narasimha Parvatha": { images: [], videos: [] },
    "Bandaje Falls": {
      images: [TREK_MEDIA_IMAGES["Bandaje main view"], TREK_MEDIA_IMAGES["Bandaje falls"]].filter(
        Boolean,
      ),
      videos: [TREK_MEDIA_VIDEOS["Bandaje video"]].filter(Boolean),
    },
    "Ukkada Falls": { images: [], videos: [] },
    "Hebbe Falls": {
      images: [
        TREK_MEDIA_IMAGES["Hebbe natural beauty"],
        TREK_MEDIA_IMAGES["Hebbe hero"],
        TREK_MEDIA_IMAGES["Hebbe wide shot"],
      ].filter(Boolean),
      videos: [],
    },
    "Jari Falls": {
      images: [
        TREK_MEDIA_IMAGES["Jari caption"],
        TREK_MEDIA_IMAGES["Jari hero"],
        TREK_MEDIA_IMAGES["Jari falls"],
      ].filter(Boolean),
      videos: [],
    },
    Bandekallu: { images: [], videos: [] },
    "Ballalrayan Durga": {
      images: [
        TREK_MEDIA_IMAGES["Fort ruins 1"],
        TREK_MEDIA_IMAGES["Fort ruins 2"],
        TREK_MEDIA_IMAGES["Fort ruins 3"],
        TREK_MEDIA_IMAGES["Fort ruins 4"],
        TREK_MEDIA_IMAGES["Fort ruins 5"],
        TREK_MEDIA_IMAGES["Ballalarayana fort"],
        TREK_MEDIA_IMAGES["Ballalrayan hero"],
      ].filter(Boolean),
      videos: [],
    },
    "Hanumana Gudi Falls": {
      images: [],
      videos: [TREK_MEDIA_VIDEOS["Sacred cascade"]].filter(Boolean),
    },
    "Hidden Water Falls": {
      images: [TREK_MEDIA_IMAGES["Hidden cascade"]].filter(Boolean),
      videos: [
        TREK_MEDIA_VIDEOS["Waterfall plunge"],
        TREK_MEDIA_VIDEOS["Misty spray"],
        TREK_MEDIA_VIDEOS["Pool below"],
        TREK_MEDIA_VIDEOS["Forest approach"],
      ].filter(Boolean),
    },
    "Kodige Falls": {
      images: [],
      videos: [TREK_MEDIA_VIDEOS["Kodige cascade"]].filter(Boolean),
    },
    "Kyatanamakki Hills": {
      images: [
        TREK_MEDIA_IMAGES["Kyatanamakki evening"],
        TREK_MEDIA_IMAGES["Kyatanamakki hero"],
        TREK_MEDIA_IMAGES["Grassland vista"],
        TREK_MEDIA_IMAGES["Sunset horizon"],
      ].filter(Boolean),
      videos: [
        TREK_MEDIA_VIDEOS["Rolling hills video"],
        TREK_MEDIA_VIDEOS["Panoramic sweep"],
      ].filter(Boolean),
    },
    "Rani Jheri": {
      images: [
        TREK_MEDIA_IMAGES["Rani Jheri hero"],
        TREK_MEDIA_IMAGES["Rani Jheri hero 1"],
        TREK_MEDIA_IMAGES["Viewpoint vista"],
        TREK_MEDIA_IMAGES["Wiki viewpoint"],
      ].filter(Boolean),
      videos: [TREK_MEDIA_VIDEOS["Valley breeze"], TREK_MEDIA_VIDEOS["Clouds rolling"]].filter(
        Boolean,
      ),
    },
  };

  return trekMediaMap[trekName] || { images: [], videos: [] };
};
