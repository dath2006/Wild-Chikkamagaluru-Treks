export type Trek = {
  name: string;
  altitude?: string;
  start?: string;
  blurb: string;
  tag?: string;
};

export const treks: Trek[] = [
  {
    name: "Mullayanagiri",
    altitude: "6,330 ft",
    start: "Sarpadhari",
    blurb: "Highest peak in Karnataka with the ancient Mullayana Swamy temple and sweeping views.",
    tag: "Iconic",
  },
  {
    name: "Kudremukh Peak",
    altitude: "6,207 ft",
    start: "Mullodi",
    blurb: "The second-highest peak in Karnataka — a magical monsoon trek through the National Park.",
    tag: "Monsoon",
  },
  {
    name: "Netravati Peak",
    altitude: "4,900 ft",
    start: "Samse",
    blurb: "Lush landscapes and quiet forest trails inside Kudremukh National Park.",
  },
  {
    name: "Kurinjal Peak",
    altitude: "5,751 ft",
    start: "Bhagavathi Nature Camp",
    blurb: "Offbeat, uncrowded and incredibly scenic — a quiet favourite.",
    tag: "Offbeat",
  },
  {
    name: "Ettina Bhuja",
    altitude: "4,265 ft",
    start: "Byrapura",
    blurb: "Unique summit rock formation reached through forest-covered trails.",
  },
  {
    name: "Gangadikkal Peak",
    altitude: "4,797 ft",
    start: "Kudremukh Town",
    blurb: "Challenging terrain rewarded with wide, soul-stirring views.",
  },
  {
    name: "Narasimha Parvatha",
    altitude: "3,772 ft",
    start: "Kigga",
    blurb: "An adventurous route through dense forest and open meadows.",
  },
  {
    name: "Bandaje Falls",
    altitude: "4,921 ft",
    start: "Sunkasale",
    blurb: "A trek that ends at the breathtaking Bandaje Arbi waterfalls.",
    tag: "Waterfall",
  },
  {
    name: "Ukkada Falls",
    start: "Hidden trail",
    blurb: "A hidden gem — a moderate hike through pristine, untouched jungle.",
    tag: "Hidden",
  },
  {
    name: "Bandekallu",
    altitude: "4 km loop",
    start: "Mallanduru, ~37 km from Chikkamagaluru",
    blurb: "Wander through fragrant coffee plantations and scenic countryside.",
  },
];
