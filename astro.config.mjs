// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './src/lib/remark.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://cv.coderdiaz.com',
  // Astro 7 defaults to the Sätteri Markdown pipeline. Keep the unified()
  // (remark/rehype) processor so the remarkReadingTime plugin keeps working.
  // Plugins are passed to unified() directly (markdown.remarkPlugins is deprecated).
  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
    }),
    shikiConfig: {
      theme: 'gruvbox-dark-medium',
    },
  },
  // Astro 7 changed the default to 'jsx'. Preserve the pre-upgrade
  // HTML-aware whitespace handling to avoid rendering regressions.
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap(),
    mdx({
      optimize: true,
      syntaxHighlight: 'shiki',
    }),
  ],
  // Fonts API stabilized in Astro 6: moved from experimental.fonts to top-level.
  fonts: [
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/Inter-Regular.woff2'],
            style: 'normal',
            weight: 400,
          },
          {
            src: ['./src/assets/fonts/Inter-Medium.woff2'],
            style: 'normal',
            weight: 500,
          },
          {
            src: ['./src/assets/fonts/Inter-SemiBold.woff2'],
            style: 'normal',
            weight: 600,
          },
          {
            src: ['./src/assets/fonts/Inter-Bold.woff2'],
            style: 'normal',
            weight: 700,
          },
          {
            src: ['./src/assets/fonts/Inter-ExtraBold.woff2'],
            style: 'normal',
            weight: 800,
          },
        ],
      },
    },
    {
      name: 'InterVariable',
      cssVariable: '--font-inter-variable',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/InterVariable.woff2'],
            style: 'normal',
            weight: 'variable',
          },
        ],
      },
    },
  ],
});
