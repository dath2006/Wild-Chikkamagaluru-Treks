/**
 * ─── SITE MEDIA REGISTRY ────────────────────────────────────────────────────
 *
 * This is the single place to set every image/video URL used on the site.
 * All three display areas pull from here:
 *
 *   1. HERO_TILES       — floating photo tiles on the desktop hero
 *   2. CIRCULAR_GALLERY — the WebGL scrolling carousel in the Treks section
 *   3. TREK_MEDIA       — per-trek media for the masonry gallery + lightbox
 *
 * How to add a real image: replace the placeholder string with your R2 URL.
 * Example:
 *   url: "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/folder/file.jpg"
 *
 * Leave url as "" to fall back to the gradient color-block placeholder.
 * ────────────────────────────────────────────────────────────────────────────
 */

// ─── 1. HERO TILES (desktop floating cards) ──────────────────────────────────
export const HERO_TILE_IMAGES: Record<string, string> = {
  "Mullayanagiri sunrise":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Places/mullayanagiri/WhatsApp%20Image%202026-05-20%20at%2011.13.58%20PM.jpeg",
  "Kudremukh ridge":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Places/kudremukha/WhatsApp%20Image%202026-05-19%20at%2010.23.36%20PM.jpeg",
  "Hebbe falls":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Falls/hebbe_falls/WhatsApp%20Image%202026-05-20%20at%2011.16.32%20PM.jpeg",
  "Jari falls":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Falls/jhari_falls/WhatsApp%20Image%202026-05-20%20at%2011.17.54%20PM.jpeg",
  "Trail through mist": "",
  "Coffee estate": "",
  "Summit camp": "",
  // Extra pool items cycled inside tiles:
  "Baba Budangiri": "",
  "Z-Point dusk": "",
  "Netravati ridge":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Places/netravathi_peak/WhatsApp%20Image%202026-05-19%20at%2010.23.35%20PM.jpeg",
  "Shola forest": "",
  "Bhadra backwaters": "",
  "Kemmangundi vista":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Places/kemmangundi/WhatsApp%20Image%202026-05-20%20at%2011.08.01%20PM.jpeg",
};

// ─── 2. CIRCULAR GALLERY (WebGL carousel, one image per trek) ─────────────────
// Key = trek name (must match treks.ts exactly)
export const TREK_COVER_IMAGES: Record<string, string> = {
  Mullayanagiri:
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Places/mullayanagiri/WhatsApp%20Image%202026-05-20%20at%2011.13.58%20PM.jpeg",
  "Kudremukh Peak":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Places/kudremukha/WhatsApp%20Image%202026-05-19%20at%2010.23.36%20PM.jpeg",
  "Netravati Peak":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Places/netravathi_peak/WhatsApp%20Image%202026-05-19%20at%2010.23.35%20PM.jpeg",
  "Kurinjal Peak":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Places/kurinjal_peak/WhatsApp%20Image%202026-05-20%20at%2011.06.28%20PM.jpeg",
  "Ettina Bhuja":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Places/ethin_bhuja/WhatsApp%20Image%202026-05-20%20at%2011.12.48%20PM.jpeg",
  "Gangadikkal Peak": "",
  "Narasimha Parvatha": "",
  "Bandaje Falls": "",
  "Ukkada Falls": "",
  "Hebbe Falls":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Falls/hebbe_falls/WhatsApp%20Image%202026-05-20%20at%2011.16.32%20PM.jpeg",
  "Jari Falls":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Falls/jhari_falls/WhatsApp%20Image%202026-05-20%20at%2011.17.54%20PM.jpeg",
  Bandekallu: "",
};

// ─── 3. TREK MEDIA (masonry gallery + lightbox, keyed by media label) ─────────
// Key = label string from treks.ts media[]
export const TREK_MEDIA_IMAGES: Record<string, string> = {
  // Mullayanagiri
  "Summit view":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Places/mullayanagiri/WhatsApp%20Image%202026-05-20%20at%2011.13.58%20PM.jpeg",
  "Mullayana temple": "",
  "Ridge trail": "",
  "Trek highlight reel": "",
  // Kudremukh Peak
  "Misty peak":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Places/kemmangundi/WhatsApp%20Image%202026-05-20%20at%2011.08.01%20PM.jpeg",
  "Forest canopy": "",
  "Monsoon meadow":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Places/kudremukha/WhatsApp%20Image%202026-05-19%20at%2010.23.36%20PM%20(1).jpeg",
  "Monsoon trail video": "",
  // Netravati Peak
  "Forest path": "",
  "Valley view": "",
  "Summit camp": "",
  // Kurinjal Peak
  "Scenic ridge": "",
  "Nature camp": "",
  Sunrise: "",
  // Ettina Bhuja
  "Rock formation":
    "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/Places/ethin_bhuja/WhatsApp%20Image%202026-05-20%20at%2011.12.48%20PM.jpeg",
  "Forest trail": "",
  // Gangadikkal Peak
  "Panoramic view": "",
  "Steep climb": "",
  "Summit flag": "",
  // Narasimha Parvatha
  "Dense forest": "",
  "Open meadow": "",
  "River crossing": "",
  // Bandaje Falls
  "Bandaje falls": "",
  "Trail to falls": "",
  "Waterfall video": "",
  "Forest bathing": "",
  // Ukkada Falls
  "Hidden waterfall": "",
  "Jungle trail": "",
  "Pristine pool": "",
  // Bandekallu
  "Coffee plantation": "",
  "Countryside view": "",
  "Sunset loop": "",
};

// ─── 4. OTHER SITE IMAGES ─────────────────────────────────────────────────────
export const SITE_IMAGES = {
  founderPortrait: "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/sushanth/10003.jpg",
  founderAvatar: "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/sushanth/10001.jpg",
  contactCard: "https://pub-18631e686c464661a4c7ffbf0ced64ef.r2.dev/sushanth/10001%20(1).jpg",
  stayHero: "",
  aboutHero: "",
};
