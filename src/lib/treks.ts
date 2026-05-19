export type TrekMedia = {
  type: "image" | "video";
  label: string;
  seed: number;
};

export type Trek = {
  name: string;
  altitude?: string;
  start?: string;
  blurb: string;
  tag?: string;
  coverSeed: number;
  media: TrekMedia[];
};

export const treks: Trek[] = [
  {
    name: "Mullayanagiri",
    altitude: "6,330 ft",
    start: "Sarpadhari",
    blurb: "Highest peak in Karnataka with the ancient Mullayana Swamy temple and sweeping views.",
    tag: "Iconic",
    coverSeed: 10,
    media: [
      { type: "image", label: "Summit view", seed: 10 },
      { type: "image", label: "Mullayana temple", seed: 11 },
      { type: "image", label: "Ridge trail", seed: 12 },
      { type: "video", label: "Trek highlight reel", seed: 13 },
    ],
  },
  {
    name: "Kudremukh Peak",
    altitude: "6,207 ft",
    start: "Mullodi",
    blurb:
      "The second-highest peak in Karnataka — a magical monsoon trek through the National Park.",
    tag: "Monsoon",
    coverSeed: 20,
    media: [
      { type: "image", label: "Misty peak", seed: 20 },
      { type: "image", label: "Forest canopy", seed: 21 },
      { type: "image", label: "Monsoon meadow", seed: 22 },
      { type: "video", label: "Monsoon trail video", seed: 23 },
    ],
  },
  {
    name: "Netravati Peak",
    altitude: "4,900 ft",
    start: "Samse",
    blurb: "Lush landscapes and quiet forest trails inside Kudremukh National Park.",
    coverSeed: 30,
    media: [
      { type: "image", label: "Forest path", seed: 30 },
      { type: "image", label: "Valley view", seed: 31 },
      { type: "image", label: "Summit camp", seed: 32 },
    ],
  },
  {
    name: "Kurinjal Peak",
    altitude: "5,751 ft",
    start: "Bhagavathi Nature Camp",
    blurb: "Offbeat, uncrowded and incredibly scenic — a quiet favourite.",
    tag: "Offbeat",
    coverSeed: 40,
    media: [
      { type: "image", label: "Scenic ridge", seed: 40 },
      { type: "image", label: "Nature camp", seed: 41 },
      { type: "image", label: "Sunrise", seed: 42 },
    ],
  },
  {
    name: "Ettina Bhuja",
    altitude: "4,265 ft",
    start: "Byrapura",
    blurb: "Unique summit rock formation reached through forest-covered trails.",
    coverSeed: 50,
    media: [
      { type: "image", label: "Rock formation", seed: 50 },
      { type: "image", label: "Forest trail", seed: 51 },
      { type: "image", label: "Summit view", seed: 52 },
    ],
  },
  {
    name: "Gangadikkal Peak",
    altitude: "4,797 ft",
    start: "Kudremukh Town",
    blurb: "Challenging terrain rewarded with wide, soul-stirring views.",
    coverSeed: 60,
    media: [
      { type: "image", label: "Panoramic view", seed: 60 },
      { type: "image", label: "Steep climb", seed: 61 },
      { type: "image", label: "Summit flag", seed: 62 },
    ],
  },
  {
    name: "Narasimha Parvatha",
    altitude: "3,772 ft",
    start: "Kigga",
    blurb: "An adventurous route through dense forest and open meadows.",
    coverSeed: 70,
    media: [
      { type: "image", label: "Dense forest", seed: 70 },
      { type: "image", label: "Open meadow", seed: 71 },
      { type: "image", label: "River crossing", seed: 72 },
    ],
  },
  {
    name: "Bandaje Falls",
    altitude: "4,921 ft",
    start: "Sunkasale",
    blurb: "A trek that ends at the breathtaking Bandaje Arbi waterfalls.",
    tag: "Waterfall",
    coverSeed: 80,
    media: [
      { type: "image", label: "Bandaje falls", seed: 80 },
      { type: "image", label: "Trail to falls", seed: 81 },
      { type: "video", label: "Waterfall video", seed: 82 },
      { type: "image", label: "Forest bathing", seed: 83 },
    ],
  },
  {
    name: "Ukkada Falls",
    start: "Hidden trail",
    blurb: "A hidden gem — a moderate hike through pristine, untouched jungle.",
    tag: "Hidden",
    coverSeed: 90,
    media: [
      { type: "image", label: "Hidden waterfall", seed: 90 },
      { type: "image", label: "Jungle trail", seed: 91 },
      { type: "image", label: "Pristine pool", seed: 92 },
    ],
  },
  {
    name: "Bandekallu",
    altitude: "4 km loop",
    start: "Mallanduru",
    blurb: "Wander through fragrant coffee plantations and scenic countryside.",
    coverSeed: 100,
    media: [
      { type: "image", label: "Coffee plantation", seed: 100 },
      { type: "image", label: "Countryside view", seed: 101 },
      { type: "image", label: "Sunset loop", seed: 102 },
    ],
  },
];
