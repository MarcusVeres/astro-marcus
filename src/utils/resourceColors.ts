// Featured categories with their associated tags (hybrid approach)
export const featuredCategories = [
  {
    name: 'All',
    tags: [], // Empty array means "show all"
  },
  {
    name: 'Build',
    tags: ['technology', 'programming', 'web', 'internet', 'ai'],
  },
  {
    name: 'Communicate',
    tags: ['communication', 'public-speaking', 'writing', 'speaking'],
  },
  {
    name: 'Create',
    tags: ['design', 'graphics', 'art', 'entertainment', 'making'],
  },
  {
    name: 'Grow',
    tags: ['personal-development', 'philosophy', 'principles', 'memory', 'self-improvement', 'learning'],
  },
  {
    name: 'Live',
    tags: ['food', 'games', 'life', 'health', 'social'],
  },
  {
    name: 'Thrive',
    tags: ['business', 'finance', 'professional'],
  },
];

// Portfolio categories (for portfolio page filtering)
export const portfolioCategories = [
  {
    name: 'All',
    tags: [], // Empty means show all
  },
  {
    name: 'Art',
    tags: ['art', 'painting', 'drawing', 'illustration'],
  },
  {
    name: 'Design',
    tags: ['design', '3d', 'graphics', 'art'],
  },
  {
    name: 'Photography',
    tags: ['photography', 'nature', 'wildlife', 'portrait', 'urban', 'industrial', 'abstract', 'architecture', 'still-life'],
  },
  {
    name: 'Programming',
    tags: ['programming', 'web', 'technology', 'code'],
  },
  {
    name: 'Video',
    tags: ['video', 'animation', 'motion'],
  },
  {
    name: 'Writing',
    tags: ['writing', 'article', 'case-study'],
  },
];

// Cyberpunk/Stained Glass Color Palette (6 colors)
// Green → Cyan → Blue → Purple → Magenta → Pink
export const categoryColors = {
  build: 'blue-500',          // Technology 
  communicate: 'pink-500',    // Communication
  create: 'green-500',        // Creative 
  grow: 'purple-600',         // Personal growth
  live: 'yellow-500',         // Life/wellness
  thrive: 'red-600',          // Business
};

// Tag-to-color mapping for resources
export const tagColorMap: Record<string, string> = {
  // Build - Cyan (Technology & Internet)
  'technology': categoryColors.build,
  'internet': categoryColors.build,
  'web': categoryColors.build,
  'advertising': categoryColors.build,
  'programming': categoryColors.build,
  'ai': categoryColors.build,

  // Grow - Purple (Personal Development)
  'personal-development': categoryColors.grow,
  'philosophy': categoryColors.grow,
  'principles': categoryColors.grow,
  'memory': categoryColors.grow,
  'self-improvement': categoryColors.grow,
  'learning': categoryColors.grow,

  // Communicate - Fuchsia (Communication & Speaking)
  'communication': categoryColors.communicate,
  'public-speaking': categoryColors.communicate,
  'writing': categoryColors.communicate,
  'speaking': categoryColors.communicate,

  // Create - Pink (Design & Graphics)
  'design': categoryColors.create,
  'graphics': categoryColors.create,
  'art': categoryColors.create,
  'making': categoryColors.create,
  'entertainment': categoryColors.create,

  // Thrive - Blue (Business & Finance)
  'business': categoryColors.thrive,
  'finance': categoryColors.thrive,
  'professional': categoryColors.thrive,

  // Live - Emerald (Food & Fun)
  'food': categoryColors.live,
  'games': categoryColors.live,
  'life': categoryColors.live,
  'health': categoryColors.live,
  'social': categoryColors.live,

  // Additional unmapped tags
  'baking': categoryColors.live,
  'automotive': categoryColors.thrive,
  'maintenance': categoryColors.build,
  'wellness': categoryColors.grow,
};

// Color rotation for unmapped tags (follows stained glass gradient)
const colorRotation = [
  categoryColors.live,        // Emerald green
  categoryColors.build,       // Cyan
  categoryColors.thrive,      // Blue
  categoryColors.grow,        // Purple
  categoryColors.communicate, // Fuchsia
  categoryColors.create,      // Pink
];

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
