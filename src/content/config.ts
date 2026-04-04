import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Álvaro Bergillos'),
    category: z.enum([
      'Diseño Web',
      'SEO',
      'Meta Ads',
      'Estrategia Digital',
      'Casos de Estudio'
    ]),
    tags: z.array(z.string()),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    readingTime: z.number(), // minutos
  }),
});

export const collections = { blog };
