import { defineCollection, type ImageFunction } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

export const seoSchemaWithoutImage = z.object({
  title: z.string(),
  description: z.string(),
  type: z.string().optional(),
  keywords: z.string().optional(),
  canonicalUrl: z.string().optional(),
  twitter: z
    .object({
      creator: z.string().optional(),
    })
    .optional(),
  robots: z.string().optional(),
});

const seoSchema = (image: ImageFunction) =>
  z
    .object({
      image: image().optional(),
    })
    .merge(seoSchemaWithoutImage);

const pageCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      seo: seoSchema(image),
    }),
});

const linkCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: './src/content/links' }),
  schema: z.object({
    label: z.string(),
    name: z.string(),
    url: z.string(),
  }),
});

const jobCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/jobs' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      company: z.string(),
      location: z.string(),
      from: z.number(),
      to: z.number().optional(), // optional if currently working
      url: z.string(),
      images: z.array(image()).optional(),
    }),
});

const talkCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    event: z.string(),
    location: z.string(),
    url: z.string(),
  }),
});

const postCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      image: image().optional(),
      seo: seoSchema(image),
    }),
});

export const collections = {
  pages: pageCollection,
  links: linkCollection,
  jobs: jobCollection,
  talks: talkCollection,
  posts: postCollection,
};
