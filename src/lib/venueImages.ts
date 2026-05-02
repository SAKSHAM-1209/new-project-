const rawVenueImages = import.meta.glob("../assets/*.{jpg,png}", { eager: true }) as Record<string, { default: string }>;

export type VenueImageMap = Record<string, string>;

const normalizeFileName = (rawName: string) =>
  rawName
    .trim()
    .replace(/\s+/g, "_")
    .replace(/\.{2,}/g, ".")
    .toLowerCase();

const normalizedVenueImages: VenueImageMap = Object.entries(rawVenueImages).reduce(
  (acc, [path, module]) => {
    const rawName = path.replace("../assets/", "");
    const normalizedName = normalizeFileName(rawName);
    acc[normalizedName] = module.default;
    return acc;
  },
  {} as VenueImageMap
);

const fallbackVenueImage =
  normalizedVenueImages["venue1_1.jpg"] ||
  normalizedVenueImages["venue1.jpg"] ||
  Object.values(normalizedVenueImages)[0] ||
  "/placeholder.svg";

const venueImageRegex = /^venue[ _]?(\d+)(?:[ _]?(\d+))?\.(jpg|png)$/i;

function imageKeySort(a: string, b: string) {
  const aMatch = a.match(venueImageRegex);
  const bMatch = b.match(venueImageRegex);
  const aIndex = aMatch ? Number(aMatch[2] || 0) : 0;
  const bIndex = bMatch ? Number(bMatch[2] || 0) : 0;
  return aIndex - bIndex;
}

export function resolveVenueImages(venueId: number): string[] {
  const matching = Object.keys(normalizedVenueImages)
    .filter((fileName) => {
      const normalized = normalizeFileName(fileName);
      const match = normalized.match(venueImageRegex);
      return !!match && Number(match[1]) === venueId;
    })
    .sort(imageKeySort)
    .map((fileName) => normalizedVenueImages[fileName]);

  return matching.length > 0 ? matching : [fallbackVenueImage];
}

export function getVenueImage(venueId: number, index = 0): string {
  try {
    const images = resolveVenueImages(venueId);
    return images[index] || fallbackVenueImage;
  } catch {
    return fallbackVenueImage;
  }
}

export function getVenueImages(venueId: number): string[] {
  try {
    return resolveVenueImages(venueId);
  } catch {
    return [fallbackVenueImage];
  }
}

export { fallbackVenueImage };
