export interface Track {
  id: string;
  title: string;
  artist: string;
  filename: string;
  year: string;
  tags: readonly string[];
  description: string;
  visible: boolean;
}

const allTracks: Track[] = [
  {
    id: "w-magic",
    title: "W Magic",
    artist: "Lantxx",
    filename: "w-magic.wav",
    year: "2025",
    tags: ["Electronic", "Ambient"],
    description:
      "An electronic piece weaving ambient textures through shimmering arpeggios and deep bass foundations.",
    visible: true,
  },
];

export const tracks = allTracks.filter((t) => t.visible);
