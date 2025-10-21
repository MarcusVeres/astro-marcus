// PANDABOX

// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { glob } from "astro/loaders";

// 3. Define your collection(s)
const galleries = defineCollection({
  // loader: glob({ pattern: "*.json", base: "src/content/galleries" }),
  loader: glob({ pattern: "*.json", base: "src/collections/galleries" }),
  schema: ({ image }) =>
    z.object({
      images: z.array(
        z.object({
          src: image(),
          alt: z.string(),
          title: z.string(),
          description: z.string(),
        }),
      ),
    }),
});


// MINE

const blog = defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: "./src/collections/blog" }),
    schema: z.object({
      author: z.string(),
      description: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      pubDate: z.date(),
      tags: z.array(z.string()),
      title: z.string(),
    })
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/collections/portfolio" }), // Changed to .md for simpler content
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),  // Hero image URL (used in lightbox)
    thumbnail: z.string().optional(),  // Optional thumbnail for grid (falls back to image)
    category: z.array(z.string()).optional(),  // For filtering ["design", "3d", "photography"]
    order: z.number().optional(),
    pubDate: z.date().optional(),

    // Content type determines lightbox behavior
    contentType: z.enum(['simple', 'case-study', 'external', 'iframe']).default('simple'),

    // Case study fields (when contentType = 'case-study')
    caseStudyUrl: z.string().optional(),  // Internal URL like "/m/knife-design"

    // External project fields (when contentType = 'external')
    externalUrl: z.string().optional(),   // External URL
    externalLabel: z.string().optional(), // Button text like "View on Behance"

    // Iframe fields (when contentType = 'iframe')
    iframeUrl: z.string().optional(),     // Any URL to embed

    // Optional links to display in preview (social media, etc.)
    links: z.array(z.object({
      label: z.string(),
      url: z.string(),
      icon: z.string().optional()  // Icon identifier like "behance", "github"
    })).optional(),

    // Grid display options
    gridSpan: z.string().optional().default('default'),  // Tailwind classes like "row-span-2", "md:col-span-2", or "default"
    aspectRatio: z.string().optional().default('golden'),  // "golden", "square", "default", or custom aspect ratio
    gridPosition: z.string().optional(),  // Precise positioning like "md:col-start-3"
    showOverlay: z.boolean().optional(),  // Show text overlay on card (for case studies)

    // Legacy fields for backwards compatibility if needed
    client: z.string().optional(),
    technologies: z.array(z.string()).optional(),
  })
});

const products = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: "./src/collections/products" }), // MDX for landing pages
  schema: z.object({
    cta: z.string(),
    features: z.array(z.string()),
    price: z.object({
      amount: z.number(),
      currency: z.string(),
      display: z.string().optional() // e.g., "$99" for display
    }).optional(),  // Not all products might have price
    tagline: z.string(),
    testimonials: z.array(z.object({
      name: z.string(),
      testimonial: z.string(),
      date: z.date().optional(),
      rating: z.number().optional(),
    })).optional(),
    title: z.string(),
  })
});

const resources = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/collections/resources" }),
  schema: z.object({
    title: z.string(),
    surTitle: z.string().optional(),  // e.g., "How to Bake"
    mainTitle: z.string().optional(), // e.g., "Carrot Muffins" (defaults to title if not provided)
    subTitle: z.string().optional(),  // e.g., "A beginner's guide" (displays below mainTitle)
    description: z.string(),
    icon: z.string(),
    tags: z.array(z.string()),
    color: z.string().optional(),
    order: z.number().optional(),
    pubDate: z.date().optional(),
    featured: z.boolean().optional(),  // Feature on home page
    resourceType: z.enum(['default', 'code-tutorial', 'recipe', 'pdf']).optional().default('default'), // Layout type
    image: z.object({
      url: z.string(),
      alt: z.string()
    }).optional(),
    fileUrl: z.string().optional(),
    fileType: z.string().optional(),
    standaloneUrl: z.string().optional(),
  })
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/collections/reviews" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    company: z.string(),
    image: z.string(),
    quote: z.string(),
    rating: z.number().optional(),
    order: z.number().optional(),
    featured: z.boolean().optional(),
  })
});


// OPTIONAL 

// If you split jobs into individual files
// const jobs = defineCollection({
//   loader: glob({ pattern: '**/[^_]*.json', base: "./src/collections/jobs" }), // fixed typo
//   schema: z.object({
//     Name: z.string(),  // Capital N to match your JSON
//     Company: z.string(),
//     Keywords: z.array(z.string()),
//     Start: z.string(),
//     End: z.string().optional(),  // Some jobs don't have End
//     Title: z.string(),
//     Bullets: z.array(z.string()).optional(),  // Not all jobs have bullets
//     BannerAlt: z.string().optional()  // Only some have this
//   })
// });

// If you split tools into individual files:
// const tools = defineCollection({
//   loader: glob({ pattern: '**/[^_]*.json', base: "./src/collections/tools" }), // fixed typo
//   schema: z.object({
//     BgHoverColor: z.string().optional(), // Some don't have this
//     Svg: z.string(),  // Capital S to match
//     SvgColor: z.string(),
//     Title: z.string()
//   })
// });


// EXPORT

// Export collections for use with glob
// Only export jobs/tools if using individual files approach

// export const collections = { galleries: galleries }; // TEST
export const collections = { blog, galleries, portfolio, products, resources, reviews };