/**
 * Handles image loading errors by replacing the broken image source with a fallback/placeholder.
 * 
 * @param {React.SyntheticEvent<HTMLImageElement, Event>} event - The image error event.
 * @param {string} [fallbackUrl='/path/to/placeholder.png'] - The URL of the fallback image.
 */
export function handleImageError(event, fallbackUrl = 'https://via.placeholder.com/500x750?text=No+Image') {
  // Prevent infinite loops if the fallback itself fails to load
  event.currentTarget.onerror = null; 
  event.currentTarget.src = fallbackUrl;
}