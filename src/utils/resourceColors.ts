// Tag-to-color mapping for resources
export const tagColorMap: Record<string, string> = {
  // Technology & Internet
  'technology': 'blue-700',
  'internet': 'blue-700',
  'web': 'blue-700',
  'advertising': 'blue-700',

  // Personal Development
  'personal-development': 'purple-700',
  'philosophy': 'purple-700',
  'principles': 'purple-700',
  'memory': 'purple-700',
  'self-improvement': 'purple-700',

  // Communication & Speaking
  'communication': 'pink-700',
  'public-speaking': 'pink-700',

  // Design & Graphics
  'design': 'pink-700',
  'graphics': 'pink-700',

  // Business & Finance
  'business': 'green-700',
  'finance': 'green-700',

  // Food & Fun
  'food': 'yellow-400',
  'games': 'yellow-400',
  'entertainment': 'yellow-400',
};

// Color rotation for unmapped tags
const colorRotation = ['blue-700', 'purple-700', 'pink-700', 'yellow-400', 'green-700'];

// Get color for a resource based on tags
export function getResourceColor(tags: string[], manualColor?: string, index: number = 0): string {
  // 1. Manual override takes precedence
  if (manualColor) return manualColor;

  // 2. Check if first tag has a mapping
  if (tags.length > 0) {
    const firstTag = tags[0].toLowerCase();
    if (tagColorMap[firstTag]) {
      return tagColorMap[firstTag];
    }
  }

  // 3. Fallback to color rotation based on index
  return colorRotation[index % colorRotation.length];
}
