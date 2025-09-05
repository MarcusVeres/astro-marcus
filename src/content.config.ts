// Import the glob loader
import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

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
  loader: glob({ pattern: '**/[^_]*.mdx', base: "./src/collections/portfolio" }), // MDX for component flexibility
  schema: z.object({
    client: z.string().optional(),  // Might not have client for personal projects
    deliverables: z.array(z.string()),
    demoUrl: z.string().optional(),  // Made optional
    featured: z.boolean().default(false),
    images: z.array(z.object({
      url: z.string(),
      alt: z.string()
    })),
    liveUrl: z.string().optional(),  // Made optional
    outcome: z.string(),
    tags: z.array(z.string()),
    technologies: z.array(z.string()),
    title: z.string(),
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

export const collections = { blog, portfolio, products };
