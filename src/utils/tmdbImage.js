/**
 * Generates the full image URL for a TMDB image.
 * 
 * @param {string | null | undefined} imagePath - The poster_path or backdrop_path from TMDB.
 * @param {string} [width='w500'] - The desired image width (e.g., 'w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original').
 * @returns {string | null} The full image URL, or null if no path is provided.
 */
function getTmdbImageUrl(imagePath, width = 'w500') {
  if (!imagePath) return null;

  // Remove leading slash if it exists to prevent double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

  return `https://image.tmdb.org/t/p/${width}/${cleanPath}`;
}

export { getTmdbImageUrl }