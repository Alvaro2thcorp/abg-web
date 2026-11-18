import { defineCollection, z } from 'astro:content';

// Blog en español. image: ruta base en /img/foto (sin -1280.webp).
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Álvaro Bergillos'),
    line: z.enum(['promotoras', 'arquitectura', 'reformas', 'inmobiliarias']),
    image: z.string(),
    imageW: z.number(),
    imageH: z.number(),
    imageAlt: z.string(),
    readingTime: z.number(),
  }),
});

export const collections = { blog };
