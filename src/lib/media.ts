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
  // Trek highlights - SEO-friendly descriptive labels for alt text
  "Mullayanagiri sunrise view at 6330ft highest peak Karnataka": `${BASE_URL}/chikkamagaluru%20treks/mullaynagiri/hero.webp`,
  "Kudremukh peak trek Western Ghats monsoon trail Karnataka": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/hero.jpeg`,
  "Hebbe waterfalls Chikkamagaluru Western Ghats scenic view": `${BASE_URL}/chikkamagaluru%20treks/hebbe%20falls/hero.jpg`,
  "Jhari Falls Chikkamagaluru Karnataka waterfall trek view": `${BASE_URL}/chikkamagaluru%20treks/jhari%20falls/hero.jpg`,
  "Netravati Peak ridge trek view Kudremukh National Park": `${BASE_URL}/chikkamagaluru%20treks/netravathi/hero.png`,
  "Kurinjal Peak scenic vista offbeat trek Chikkamagaluru": `${BASE_URL}/chikkamagaluru%20treks/kurinjal/hero.jpeg`,
  "Ettina Bhuja rock formation summit trek Western Ghats": `${BASE_URL}/chikkamagaluru%20treks/ethin%20bhuja/hero_1.jpeg`,
  "Gangadikkal Peak panoramic mountain views Chikkamagaluru": `${BASE_URL}/chikkamagaluru%20treks/gangadikal/hero.jpeg`,
  "Bandaje Falls Arbi waterfall trek Chikkamagaluru Karnataka": `${BASE_URL}/chikkamagaluru%20treks/bandaje%20falls%20trek/hero.jpeg`,
  "Ballalarayana Durga fort ruins ancient trek Chikkamagaluru": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/hero.jpg`,
  "Kyatanamakki Hills sunset grassland trek Western Ghats view": `${BASE_URL}/chikkamagaluru%20treks/Kyatanamakki%20hills/hero.jpeg`,
  "Rani Jheri viewpoint valley vista Chikkamagaluru trek": `${BASE_URL}/chikkamagaluru%20treks/rani%20jheri/hero_1.jpg`,
  // Bits & pieces mixed in
  "Charmudi Falls waterfall misty Chikkamagaluru Karnataka Western Ghats": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Charmudi%20Falls.jpeg`,
  "Dense Western Ghats forest trail Chikkamagaluru trek": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/FOREST.jpeg`,
  "Karnataka Western Ghats forest wilderness trekking view": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Karnataka%20Forest.jpeg`,
  "Misty waterfall cascade Chikkamagaluru monsoon trek": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Misty%20Falls.jpeg`,
  "Scenic road trip to Chikkamagaluru Karnataka mountains": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Road%20Trip.jpeg`,
  // Poster image
  "Chikkamagaluru Western Ghats trekking poster landscape view": `${BASE_URL}/chikkamagaluru%20treks/poster.jpeg`,
};

// ─── 1b. HERO TILE VIDEOS (Desktop background short clips) ───────────────────
// NOTE: These must match actual files in R2 (verified via r2-hierarchy.json)
export const HERO_TILE_VIDEOS: Record<string, string> = {
  // Trek highlight videos for hero tiles (verified paths from R2)
  "Mullayanagiri clip": `${BASE_URL}/chikkamagaluru%20treks/mullaynagiri/WhatsApp%20Video%202026-05-21%20at%208.18.33%20PM.mp4`,
  "Kurinjal clip": `${BASE_URL}/chikkamagaluru%20treks/kurinjal/movements/WhatsApp%20Video%202026-05-21%20at%208.07.20%20PM.mp4`,
  "Bandaje clip": `${BASE_URL}/chikkamagaluru%20treks/bandaje%20falls%20trek/WhatsApp%20Video%202026-05-21%20at%208.23.05%20PM.mp4`,
  "Hidden Falls clip": `${BASE_URL}/chikkamagaluru%20treks/hidden%20water%20falls/WhatsApp%20Video%202026-05-21%20at%208.39.59%20PM.mp4`,
  // Kudremukh back waters video (lakhya_dam.mp4 is the only video in kudremuka folder)
  "Kudremukh back waters clip": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/back_waters/lakhya_dam.mp4`,
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
// All images per trek including subfolder contents with SEO-friendly alt text
export const TREK_MEDIA_IMAGES: Record<string, string> = {
  // ─── Mullayanagiri ───
  "Mullayanagiri summit panorama Western Ghats Karnataka 6330ft": `${BASE_URL}/chikkamagaluru%20treks/mullaynagiri/DSC_0347.jpg`,
  "Mullayanagiri peak scaled view highest Karnataka trek": `${BASE_URL}/chikkamagaluru%20treks/mullaynagiri/Mullayanagiri-scaled.webp`,
  "Mullayanagiri evening sunset Western Ghats Chikkamagaluru": `${BASE_URL}/chikkamagaluru%20treks/mullaynagiri/WhatsApp%20Image%202026-05-21%20at%208.18.18%20PM.jpeg`,

  // ─── Kudremukh Peak (includes back_waters subfolder) ───
  "Kudremukh peak trek evening view Western Ghats Karnataka": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/WhatsApp%20Image%202026-05-21%20at%2019.59.49.jpeg`,
  "Kudremukh monsoon trek sunset view 6207ft peak Karnataka": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/WhatsApp%20Image%202026-05-21%20at%2019.59.50.jpeg`,
  // Back waters subfolder - Lakya Dam area
  "Kudremukh Lakya Dam back waters scenic view 1": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/back_waters/WhatsApp%20Image%202026-05-21%20at%207.54.28%20PM%20(1).jpeg`,
  "Kudremukh Lakya Dam back waters mountain reflection 2": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/back_waters/WhatsApp%20Image%202026-05-21%20at%207.54.28%20PM.jpeg`,
  "Kudremukh back waters panoramic lake view 3": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/back_waters/WhatsApp%20Image%202026-05-21%20at%207.54.31%20PM.jpeg`,
  "Kudremukh Lakya Dam reservoir scenic landscape 4": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/back_waters/WhatsApp%20Image%202026-05-21%20at%207.54.32%20PM.jpeg`,
  "Kudremukh back waters peaceful evening view 5": `${BASE_URL}/chikkamagaluru%20treks/kudremuka/back_waters/WhatsApp%20Image%202026-05-21%20at%207.54.34%20PM.jpeg`,

  // ─── Netravati Peak ───
  "Netravati Peak dawn sunrise view Western Ghats trek": `${BASE_URL}/chikkamagaluru%20treks/netravathi/WhatsApp%20Image%202026-05-21%20at%2019.57.33.jpeg`,
  "Netravati Peak evening golden hour Kudremukh National Park": `${BASE_URL}/chikkamagaluru%20treks/netravathi/WhatsApp%20Image%202026-05-21%20at%208.37.50%20PM.jpeg`,

  // ─── Kurinjal Peak (includes movements subfolder) ───
  "Kurinjal Peak offbeat trek scenic mountain view 1 Chikkamagaluru": `${BASE_URL}/chikkamagaluru%20treks/kurinjal/WhatsApp%20Image%202026-05-21%20at%2020.01.53%20(1).jpeg`,
  "Kurinjal Peak 5751ft altitude trek vista Western Ghats": `${BASE_URL}/chikkamagaluru%20treks/kurinjal/WhatsApp%20Image%202026-05-21%20at%2020.01.53.jpeg`,
  // Movements subfolder
  "Kurinjal Peak trek hiking trail movement action shot": `${BASE_URL}/chikkamagaluru%20treks/kurinjal/movements/WhatsApp%20Image%202026-05-21%20at%208.07.18%20PM.jpeg`,

  // ─── Ettina Bhuja ───
  "Ettina Bhuja rock formation summit unique shape Western Ghats": `${BASE_URL}/chikkamagaluru%20treks/ethin%20bhuja/WhatsApp%20Image%202026-05-21%20at%2020.17.47.jpeg`,
  "Ettina Bhuja peak rock structure trek Chikkamagaluru Karnataka": `${BASE_URL}/chikkamagaluru%20treks/ethin%20bhuja/WhatsApp%20Image%202026-05-21%20at%2020.17.48.jpeg`,
  "Ettina Bhuja hero trek view 4265ft altitude Karnataka": `${BASE_URL}/chikkamagaluru%20treks/ethin%20bhuja/hero.jpeg`,
  "Ettina Bhuja famous rock formation trekking destination": `${BASE_URL}/chikkamagaluru%20treks/ethin%20bhuja/hero_1.jpeg`,

  // ─── Gangadikkal Peak ───
  "Gangadikkal Peak challenging trek mountain vista Western Ghats": `${BASE_URL}/chikkamagaluru%20treks/gangadikal/WhatsApp%20Image%202026-05-21%20at%2020.04.50.jpeg`,
  "Gangadikkal Peak panoramic wide angle view Chikkamagaluru": `${BASE_URL}/chikkamagaluru%20treks/gangadikal/hero.jpeg`,

  // ─── Narasimha Parvatha ───
  // No media available

  // ─── Bandaje Falls ───
  "Bandaje Arbi Falls trek waterfall trail scenic view": `${BASE_URL}/chikkamagaluru%20treks/bandaje%20falls%20trek/WhatsApp%20Image%202026-05-21%20at%2020.13.43.jpeg`,
  "Bandaje Falls waterfall trek hero image Chikkamagaluru": `${BASE_URL}/chikkamagaluru%20treks/bandaje%20falls%20trek/hero.jpeg`,

  // ─── Ukkada Falls ───
  // No media available

  // ─── Hebbe Falls ───
  "Hebbe Falls natural beauty waterfall Chikkamagaluru Karnataka": `${BASE_URL}/chikkamagaluru%20treks/hebbe%20falls/The-Natural-Beauty-of-Hebbe-Waterfalls.jpg`,
  "Hebbe Falls hero scenic waterfall Western Ghats trek": `${BASE_URL}/chikkamagaluru%20treks/hebbe%20falls/hero.jpg`,
  "Hebbe Falls wide angle panoramic view landscape": `${BASE_URL}/chikkamagaluru%20treks/hebbe%20falls/z1du9w6kfbe1tz61elcule5k8lum_4355778037_6d244c698f_o.webp`,

  // ─── Jari Falls ───
  "Jhari Falls caption scenic waterfall Karnataka India": `${BASE_URL}/chikkamagaluru%20treks/jhari%20falls/caption.jpg`,
  "Jhari Falls hero waterfall view Chikkamagaluru trek": `${BASE_URL}/chikkamagaluru%20treks/jhari%20falls/hero.jpg`,
  "Jhari Falls beautiful cascade Western Ghats monsoon": `${BASE_URL}/chikkamagaluru%20treks/jhari%20falls/jhari%20falls.jpg`,

  // ─── Bandekallu ───
  // No media available

  // ─── Ballalrayan Durga ───
  "Ballalarayana Durga fort ruins ancient structure view 1": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/WhatsApp%20Image%202026-05-21%20at%208.02.30%20PM.jpeg`,
  "Ballalarayana Durga historic fort trek Kalasa Chikkamagaluru 2": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/WhatsApp%20Image%202026-05-21%20at%208.02.31%20PM%20(1).jpeg`,
  "Ballalarayana Durga fort trekking destination Karnataka 3": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/WhatsApp%20Image%202026-05-21%20at%208.02.31%20PM.jpeg`,
  "Ballalarayana Durga ancient ruins mountain fort view 4": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/WhatsApp%20Image%202026-05-21%20at%208.02.32%20PM%20(1).jpeg`,
  "Ballalarayana Durga 5200ft fort trek scenic landscape 5": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/WhatsApp%20Image%202026-05-21%20at%208.02.32%20PM.jpeg`,
  "Ballalarayana Durga fort ancient architecture ruins Karnataka": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/ballalarayana-durga-fort.jpg`,
  "Ballalarayana Durga trek hero image historic fort view": `${BASE_URL}/chikkamagaluru%20treks/ballalrayan%20durga%20trek/hero.jpg`,

  // ─── Hidden Water Falls ───
  "Hidden Water Falls secret waterfall trek Chikkamagaluru wilderness": `${BASE_URL}/chikkamagaluru%20treks/hidden%20water%20falls/hero.jpeg`,

  // ─── Kyatanamakki Hills ───
  "Kyatanamakki Hills evening trek sunset view grassland": `${BASE_URL}/chikkamagaluru%20treks/Kyatanamakki%20hills/WhatsApp%20Image%202026-05-21%20at%208.28.35%20PM.jpeg`,
  "Kyatanamakki Hills hero grassland sunset Western Ghats": `${BASE_URL}/chikkamagaluru%20treks/Kyatanamakki%20hills/hero.jpeg`,
  "Kyatanamakki Hills grassland vista rolling hills landscape": `${BASE_URL}/chikkamagaluru%20treks/Kyatanamakki%20hills/hero.jpeg`,
  "Kyatanamakki Hills sunset horizon panoramic trek view": `${BASE_URL}/chikkamagaluru%20treks/Kyatanamakki%20hills/WhatsApp%20Image%202026-05-21%20at%208.28.35%20PM.jpeg`,

  // ─── Rani Jheri ───
  "Rani Jheri hero viewpoint scenic landscape Chikkamagaluru": `${BASE_URL}/chikkamagaluru%20treks/rani%20jheri/hero.webp`,
  "Rani Jheri hero 1 valley vista trek destination Karnataka": `${BASE_URL}/chikkamagaluru%20treks/rani%20jheri/hero_1.jpg`,
  "Rani Jheri viewpoint beautiful valley vista Western Ghats": `${BASE_URL}/chikkamagaluru%20treks/rani%20jheri/hero_1.jpg`,
  "Rani Jheri viewpoint famous trek destination Kalasa Chikkamagaluru": `${BASE_URL}/chikkamagaluru%20treks/rani%20jheri/rani-jhari-view-point-wiki.jpg`,

  // ─── BITS_AND_PIECES (Mixed into general gallery) ───
  "Charmudi Falls misty waterfall Chikkamagaluru Karnataka Western Ghats": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Charmudi%20Falls.jpeg`,
  "Dense Western Ghats forest green wilderness Karnataka India": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/FOREST.jpeg`,
  "Karnataka forest Western Ghats green landscape nature trek": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Karnataka%20Forest.jpeg`,
  "Misty Falls waterfall monsoon Chikkamagaluru Western Ghats scenic": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Misty%20Falls.jpeg`,
  "Road trip adventure Chikkamagaluru Karnataka mountains scenic drive": `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Road%20Trip.jpeg`,
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
      label: "Charmudi Falls misty waterfall Chikkamagaluru Karnataka Western Ghats",
      url: `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Charmudi%20Falls.jpeg`,
    },
    {
      label: "Dense Western Ghats forest green wilderness Karnataka India",
      url: `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/FOREST.jpeg`,
    },
    {
      label: "Karnataka forest Western Ghats green landscape nature trek",
      url: `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Karnataka%20Forest.jpeg`,
    },
    {
      label: "Misty Falls waterfall monsoon Chikkamagaluru Western Ghats scenic",
      url: `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Misty%20Falls.jpeg`,
    },
    {
      label: "Road trip adventure Chikkamagaluru Karnataka mountains scenic drive",
      url: `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Road%20Trip.jpeg`,
    },
  ],
  videos: [
    {
      label: "Kyatanmakki Hills grassland sunset rolling hills trek video",
      url: `${BASE_URL}/chikkamagaluru%20treks/bits_and_pieces/Kyatanmakki%20Hills.mp4`,
    },
    {
      label: "Unknown Territory adventure trek exploration Western Ghats video",
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
        TREK_MEDIA_IMAGES["Mullayanagiri summit panorama Western Ghats Karnataka 6330ft"],
        TREK_MEDIA_IMAGES["Mullayanagiri peak scaled view highest Karnataka trek"],
        TREK_MEDIA_IMAGES["Mullayanagiri evening sunset Western Ghats Chikkamagaluru"],
      ].filter(Boolean),
      videos: [TREK_MEDIA_VIDEOS["Mullayanagiri video"]].filter(Boolean),
    },
    "Kudremukh Peak": {
      images: [
        TREK_MEDIA_IMAGES["Kudremukh peak trek evening view Western Ghats Karnataka"],
        TREK_MEDIA_IMAGES["Kudremukh monsoon trek sunset view 6207ft peak Karnataka"],
        TREK_MEDIA_IMAGES["Kudremukh Lakya Dam back waters scenic view 1"],
        TREK_MEDIA_IMAGES["Kudremukh Lakya Dam back waters mountain reflection 2"],
        TREK_MEDIA_IMAGES["Kudremukh back waters panoramic lake view 3"],
        TREK_MEDIA_IMAGES["Kudremukh Lakya Dam reservoir scenic landscape 4"],
        TREK_MEDIA_IMAGES["Kudremukh back waters peaceful evening view 5"],
      ].filter(Boolean),
      videos: [TREK_MEDIA_VIDEOS["Back waters video"]].filter(Boolean),
    },
    "Netravati Peak": {
      images: [
        TREK_MEDIA_IMAGES["Netravati Peak dawn sunrise view Western Ghats trek"],
        TREK_MEDIA_IMAGES["Netravati Peak evening golden hour Kudremukh National Park"],
      ].filter(Boolean),
      videos: [TREK_MEDIA_VIDEOS["Netravati video"]].filter(Boolean),
    },
    "Kurinjal Peak": {
      images: [
        TREK_MEDIA_IMAGES["Kurinjal Peak offbeat trek scenic mountain view 1 Chikkamagaluru"],
        TREK_MEDIA_IMAGES["Kurinjal Peak 5751ft altitude trek vista Western Ghats"],
        TREK_MEDIA_IMAGES["Kurinjal Peak trek hiking trail movement action shot"],
      ].filter(Boolean),
      videos: [
        TREK_MEDIA_VIDEOS["Kurinjal movement 1"],
        TREK_MEDIA_VIDEOS["Kurinjal movement 2"],
        TREK_MEDIA_VIDEOS["Kurinjal movement 3"],
      ].filter(Boolean),
    },
    "Ettina Bhuja": {
      images: [
        TREK_MEDIA_IMAGES["Ettina Bhuja rock formation summit unique shape Western Ghats"],
        TREK_MEDIA_IMAGES["Ettina Bhuja peak rock structure trek Chikkamagaluru Karnataka"],
        TREK_MEDIA_IMAGES["Ettina Bhuja hero trek view 4265ft altitude Karnataka"],
        TREK_MEDIA_IMAGES["Ettina Bhuja famous rock formation trekking destination"],
      ].filter(Boolean),
      videos: [],
    },
    "Gangadikkal Peak": {
      images: [
        TREK_MEDIA_IMAGES["Gangadikkal Peak challenging trek mountain vista Western Ghats"],
        TREK_MEDIA_IMAGES["Gangadikkal Peak panoramic wide angle view Chikkamagaluru"],
      ].filter(Boolean),
      videos: [],
    },
    "Narasimha Parvatha": { images: [], videos: [] },
    "Bandaje Falls": {
      images: [
        TREK_MEDIA_IMAGES["Bandaje Arbi Falls trek waterfall trail scenic view"],
        TREK_MEDIA_IMAGES["Bandaje Falls waterfall trek hero image Chikkamagaluru"],
      ].filter(Boolean),
      videos: [TREK_MEDIA_VIDEOS["Bandaje video"]].filter(Boolean),
    },
    "Ukkada Falls": { images: [], videos: [] },
    "Hebbe Falls": {
      images: [
        TREK_MEDIA_IMAGES["Hebbe Falls natural beauty waterfall Chikkamagaluru Karnataka"],
        TREK_MEDIA_IMAGES["Hebbe Falls hero scenic waterfall Western Ghats trek"],
        TREK_MEDIA_IMAGES["Hebbe Falls wide angle panoramic view landscape"],
      ].filter(Boolean),
      videos: [],
    },
    "Jari Falls": {
      images: [
        TREK_MEDIA_IMAGES["Jhari Falls caption scenic waterfall Karnataka India"],
        TREK_MEDIA_IMAGES["Jhari Falls hero waterfall view Chikkamagaluru trek"],
        TREK_MEDIA_IMAGES["Jhari Falls beautiful cascade Western Ghats monsoon"],
      ].filter(Boolean),
      videos: [],
    },
    Bandekallu: { images: [], videos: [] },
    "Ballalrayan Durga": {
      images: [
        TREK_MEDIA_IMAGES["Ballalarayana Durga fort ruins ancient structure view 1"],
        TREK_MEDIA_IMAGES["Ballalarayana Durga historic fort trek Kalasa Chikkamagaluru 2"],
        TREK_MEDIA_IMAGES["Ballalarayana Durga fort trekking destination Karnataka 3"],
        TREK_MEDIA_IMAGES["Ballalarayana Durga ancient ruins mountain fort view 4"],
        TREK_MEDIA_IMAGES["Ballalarayana Durga 5200ft fort trek scenic landscape 5"],
        TREK_MEDIA_IMAGES["Ballalarayana Durga fort ancient architecture ruins Karnataka"],
        TREK_MEDIA_IMAGES["Ballalarayana Durga trek hero image historic fort view"],
      ].filter(Boolean),
      videos: [],
    },
    "Hanumana Gudi Falls": {
      images: [],
      videos: [TREK_MEDIA_VIDEOS["Sacred cascade"]].filter(Boolean),
    },
    "Hidden Water Falls": {
      images: [
        TREK_MEDIA_IMAGES["Hidden Water Falls secret waterfall trek Chikkamagaluru wilderness"],
      ].filter(Boolean),
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
        TREK_MEDIA_IMAGES["Kyatanamakki Hills evening trek sunset view grassland"],
        TREK_MEDIA_IMAGES["Kyatanamakki Hills hero grassland sunset Western Ghats"],
        TREK_MEDIA_IMAGES["Kyatanamakki Hills grassland vista rolling hills landscape"],
        TREK_MEDIA_IMAGES["Kyatanamakki Hills sunset horizon panoramic trek view"],
      ].filter(Boolean),
      videos: [
        TREK_MEDIA_VIDEOS["Rolling hills video"],
        TREK_MEDIA_VIDEOS["Panoramic sweep"],
      ].filter(Boolean),
    },
    "Rani Jheri": {
      images: [
        TREK_MEDIA_IMAGES["Rani Jheri hero viewpoint scenic landscape Chikkamagaluru"],
        TREK_MEDIA_IMAGES["Rani Jheri hero 1 valley vista trek destination Karnataka"],
        TREK_MEDIA_IMAGES["Rani Jheri viewpoint beautiful valley vista Western Ghats"],
        TREK_MEDIA_IMAGES["Rani Jheri viewpoint famous trek destination Kalasa Chikkamagaluru"],
      ].filter(Boolean),
      videos: [TREK_MEDIA_VIDEOS["Valley breeze"], TREK_MEDIA_VIDEOS["Clouds rolling"]].filter(
        Boolean,
      ),
    },
  };

  return trekMediaMap[trekName] || { images: [], videos: [] };
};
