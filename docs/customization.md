# ✏️ Customizing CVfolio

This guide walks you through customizing the CVfolio template to reflect your personal profile, style, and content.

## Project Structure

Understanding the project structure is key to customizing CVfolio. Below is an overview of the main directories and files, focusing on those you'll likely modify.

### Key Directories and Files for Customization

| Path                          | Purpose                                                                                                                              | Customization Notes                                                                                                                               |
|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `src/assets/`                 | Contains static assets like fonts, your avatar, and images used for social media previews (meta images).                             | Replace `avatar.png` (or your chosen image format) with your photo. Update `favicon.svg` and other icons as needed.                           |
| `src/components/`             | Holds reusable UI components such as the header, footer, navigation, and sections like "Experience" or "Projects".                    | Modify these components if you want to change the layout or appearance of specific parts of your site.                                           |
| `src/content/`                | This is where your personal data resides. It includes Markdown (`.md`) or JSON (`.json`) files for your job history, project details, blog posts, etc. | **This is the primary directory for content updates.** Edit the files here to populate your CV with your information.                             |
| `src/content/config.ts`       | Configuration file for Astro content collections. Defines the schema (structure and data types) for your content (jobs, projects, etc.).      | Modify this if you want to add custom fields to your content types or change existing validation rules.                                           |
| `src/layouts/`                | Defines the overall page structure and templates for different types of pages (e.g., homepage, blog post, default page layout).        | Changes here will affect the global layout of your site. Useful for adding elements that should appear on every page (e.g., a custom banner).    |
| `src/pages/`                  | Manages the routing for your site. Each `.astro` or `.md` file in this directory (or its subdirectories) becomes a page on your site.    | Add or remove pages here. For example, to add a new top-level page like "Certifications", you could create `src/pages/certifications.astro`. |
| `src/styles/global.css`       | Contains global CSS styles and utility classes that affect the entire site's appearance.                                                | Customize your site's theme (colors, typography, spacing) by modifying this file.                                                                 |
| `src/lib/`                    | Contains utility functions, constants (like site metadata), and configurations used throughout the project.                             | You will likely modify `src/lib/consts.ts` to change site-wide metadata like your name, site title, or social media links.                       |
| `astro.config.mjs`            | The main configuration file for the Astro build system.                                                                                 | Advanced users might tweak this for site-wide settings, Astro integrations, or build process adjustments.                                         |
| `tailwind.config.cjs`         | Configuration file for Tailwind CSS.                                                                                                    | If you're familiar with Tailwind CSS, you can customize the design system (e.g., add custom colors, fonts, or spacing) here.                  |
| `public/`                     | For static assets that don't require processing by Astro, like `robots.txt`, `favicon.ico`, or verification files for webmaster tools.    | Place any files here that need to be accessible directly via a URL at the site root.                                                              |

> You are free to preserve the "Made by CVFolio" labels from the footer and the floating badge.

## Technologies Used

CVfolio is built with modern web technologies to provide a fast, flexible, and developer-friendly experience. Understanding these technologies can help you further customize your site:

### Astro

- **What it is:** Astro is a modern static site builder that delivers lightning-fast performance with a unique "islands architecture." This means it renders UI components to HTML at build time and ships minimal JavaScript by default.
- **Why it's used:** For its speed, content-focused approach (ideal for sites like portfolios and blogs), and excellent developer experience. It allows you to build content-rich websites using the UI components of your choice (React, Vue, Svelte, etc.), or by just using Astro's own component syntax (`.astro` files).
- **Official Documentation:** [Astro Docs](https://docs.astro.build/)

### Tailwind CSS

- **What it is:** Tailwind CSS is a utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center`, and `rotate-90` that can be composed to build any design, directly in your markup.
- **Why it's used:** It provides a highly efficient way to style components without writing much custom CSS. It's highly customizable and helps maintain a consistent design system across the project.
- **Official Documentation:** [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Other Notable Mentions

- **TypeScript:** Used for adding static typing to JavaScript, which helps improve code quality, catch errors early, and enhance maintainability. You'll encounter `.ts` and `.tsx` files in the project.
- **Prettier:** An opinionated code formatter that automatically ensures a consistent code style across the entire project. This helps in maintaining readability and collaboration.

## Customization Options

CVfolio offers a range of customization options to make your site truly yours. Here’s how you can tailor its appearance and content:

### Appearance Customization

You have several ways to change the look and feel of your CVfolio site:

1.  **Global Styles (`src/styles/global.css`):**
    *   **Colors:** Modify CSS custom properties (variables) for primary, secondary, accent, and background colors to match your personal brand. Look for the `:root` selector where these are typically defined.
    *   **Fonts:** Change the `font-family` properties for body text and headings. You can use web-safe fonts or import custom fonts (see "Adding Custom Fonts" below).
    *   **Typography:** Adjust base font sizes, line heights, and other typographic scales to your liking.

2.  **Tailwind CSS Configuration (`tailwind.config.cjs`):**
    *   **Extending Theme:** For more advanced theme customization, you can extend Tailwind's default theme. This includes adding custom colors, fonts, spacing units, breakpoints, etc. Refer to the [Tailwind CSS documentation on theme customization](https://tailwindcss.com/docs/theme#customizing-the-default-theme).
    *   **Example (adding a custom brand color):**
        ```javascript
        // tailwind.config.cjs
        module.exports = {
          theme: {
            extend: {
              colors: {
                'brand-primary': '#YOUR_COLOR_CODE', // Replace with your hex, rgb, or hsl color
              },
            },
          },
          plugins: [],
        }
        ```
        You can then use this color in your HTML/Astro components with classes like `bg-brand-primary` or `text-brand-primary`.

3.  **Adding Custom Fonts:**
    *   Download your desired font files (preferably in WOFF2 format for web performance).
    *   Place them in the `src/assets/fonts/` directory.
    *   Import them using `@font-face` rules in `src/styles/global.css`:
        ```css
        /* src/styles/global.css */
        @font-face {
          font-family: 'YourCustomFont'; /* Choose a name for your font */
          src: url('../assets/fonts/YourCustomFont-Regular.woff2') format('woff2');
          font-weight: normal; /* Or specific weight like 400, 700 */
          font-style: normal;  /* Or italic, oblique */
          font-display: swap;  /* Ensures text remains visible during font loading */
        }
        ```
    *   Apply the font in `src/styles/global.css` (e.g., to `body` or specific heading classes) or by extending the theme in `tailwind.config.cjs`.

4.  **Component Structure (`src/components/`):**
    *   Modify the Astro components in this directory if you want to change the structure or layout of specific sections (e.g., how project cards are displayed, the order of elements in the header, or the footer's content).

5.  **Layouts (`src/layouts/`):**
    *   Adjust layout files (e.g., `Layout.astro`) if you need to make site-wide structural changes, such as adding a new global sidebar, modifying the main navigation, or altering the overall page template.

### Content Management

Your personal and professional information is managed primarily through files in `src/content/` and `src/lib/consts.ts`.

1.  **Site-wide Constants (`src/lib/consts.ts`):**
    *   Update constants like `SITE_TITLE`, `SITE_DESCRIPTION`, `AUTHOR_NAME`, `AUTHOR_EMAIL`, and your social media links directly in this file. These are often used for SEO and in the footer or header.

2.  **Content Collections (`src/content/`):**
    *   CVfolio uses Astro's [Content Collections](https://docs.astro.build/en/guides/content-collections/) to manage structured content like job experiences, projects, blog posts, talks, etc.
    *   Each subdirectory within `src/content/` (e.g., `jobs`, `projects`, `writing`) represents a distinct collection of content.
    *   Content is typically written in Markdown (`.md`) files.
    *   **Adding New Content:** To add a new job experience, for example, create a new `.md` file in `src/content/jobs/`. Follow the structure (frontmatter fields) of existing files within that collection.
    *   **Modifying Existing Content:** Simply edit the respective Markdown files.
    *   **Frontmatter:** Pay close attention to the frontmatter (the YAML block at the top of each Markdown file, enclosed by `---`). This is where metadata like titles, dates, tags, descriptions, images, and other custom fields are defined. The schema for this frontmatter is defined in `src/content/config.ts`.

3.  **Defining Content Structure (`src/content/config.ts`):**
    *   This crucial file defines the schema (the expected structure and data types) for each content collection using Zod, a TypeScript-first schema validation library.
    *   If you want to add new fields to your projects (e.g., "client_name" or "technologies_used") or change validation rules (e.g., make a field optional), you'll modify the corresponding collection schema here.
    *   **Example (adding `technologies_used` array to projects):**
        ```typescript
        // src/content/config.ts
        import { defineCollection, z } from 'astro:content';

        const projectCollection = defineCollection({
          schema: z.object({
            title: z.string(),
            description: z.string().optional(),
            // ... other existing fields
            technologies_used: z.array(z.string()).optional(), // New optional array of strings
          }),
        });

        export const collections = {
          // ... other collections
          projects: projectCollection, // Ensure 'projects' matches your folder name in src/content/
        };
        ```
    *   After updating the schema, you can use the new field in your Markdown files' frontmatter and access it in your Astro components when rendering the content.

4.  **Static Pages (`src/pages/`):**
    *   For standalone static pages like an "About Me" page (if it's not part of a collection) or custom landing pages, you can create or modify `.astro` or `.md` files directly in the `src/pages/` directory.
    *   The `index.astro` file in `src/pages/` typically serves as your homepage.

By understanding these customization points, you can tailor CVfolio to perfectly represent your professional journey and personal style.

## SEO Implementation & Customization

CVfolio is set up with Search Engine Optimization (SEO) best practices in mind. Here’s how SEO is implemented and how you can customize it:

### 1. Global Meta Tags

-   **Location:** Often managed by an `SEO.astro` component (e.g., in `src/components/SEO.astro`) which is then imported into your main layout(s) (e.g., `src/layouts/Layout.astro`).
-   **Site Title & Description:** Default site-wide title, description, and author are typically sourced from `src/lib/consts.ts`. Ensure these are updated to accurately reflect your site's main identity.
    ```typescript
    // Example: src/lib/consts.ts
    export const SITE_TITLE = 'Your Name - Professional Portfolio & Blog';
    export const SITE_DESCRIPTION = 'Showcasing my work, skills, and thoughts on technology and design.';
    export const AUTHOR_NAME = 'Your Name';
    ```
-   **Language:** The `lang` attribute in the `<html>` tag is usually set in the main layout file (e.g., `src/layouts/Layout.astro`). Verify it matches your primary content language (e.g., `en`).
-   **Theme Color:** A `<meta name="theme-color" ...>` tag might be present in your main layout or SEO component, allowing you to specify a color for the browser UI elements. Customize this to match your brand.

### 2. Page-Specific Meta Tags

-   **How it works:** Individual pages and items from content collections (like blog posts or projects) can (and should) override or extend global meta tags for more targeted SEO. This is typically handled by passing props (like `title`, `description`) to the `SEO.astro` component from your pages or by defining them in the frontmatter of Markdown files.
-   **In Markdown (e.g., `src/content/writing/my-amazing-post.md`):**
    ```yaml
    ---
    title: "My Amazing Blog Post Title"
    description: "A concise and compelling summary of this amazing blog post, crucial for SEO."
    publishDate: "2023-10-26"
    # You can also add fields for specific Open Graph or Twitter images
    ogImage: "/assets/images/posts/my-amazing-post-og.png"
    twitterImage: "/assets/images/posts/my-amazing-post-twitter.png"
    ---
    The rest of your post content goes here...
    ```
-   **In `.astro` pages (e.g., `src/pages/about.astro`):**
    ```astro
    ---
    import Layout from '../layouts/Layout.astro'; // Your main layout
    import SEO from '../components/SEO.astro';   // Your SEO component

    const pageTitle = "About Me - Jane Doe, Web Developer";
    const pageDescription = "Discover Jane Doe's journey, skills in web development, and professional experience.";
    const pageOgImage = "/assets/images/pages/about-me-og.png";
    ---
    <Layout title={pageTitle}> {/* title prop might be used by Layout for browser tab */}
      <SEO
        slot="seo" {/* If your layout uses slots for SEO tags */}
        title={pageTitle}
        description={pageDescription}
        ogImage={pageOgImage}
      />
      <h1>About Me</h1>
      <p>More about my journey...</p>
    </Layout>
    ```
-   **Customization Tips:**
    *   Ensure every page, blog post, and project has a unique, descriptive `title` (ideally under 60 characters) and `meta description` (ideally under 160 characters).
    *   For important pages, provide custom Open Graph (`og:image`, `og:type`, etc.) and Twitter Card (`twitter:card`, `twitter:image`, etc.) meta tags, either in the frontmatter or by passing props to your SEO component.

### 3. Sitemap

-   **Generation:** Typically generated automatically at build time by the `@astrojs/sitemap` integration.
-   **Configuration:** Settings for the sitemap are located in `astro.config.mjs`.
    ```javascript
    // astro.config.mjs
    import { defineConfig } from 'astro/config';
    import sitemap from '@astrojs/sitemap'; // Ensure this integration is installed

    export default defineConfig({
      site: 'https://youractualdomain.com', // **IMPORTANT: Replace with your live domain URL**
      integrations: [
        sitemap() // Default configuration
      ],
    });
    ```
-   **Customization:**
    *   **Crucially, set the `site` property in `astro.config.mjs`** to your production domain name (e.g., `https://johndoe.com`). This is essential for generating correct absolute URLs in the sitemap.
    *   You can exclude specific pages from the sitemap if needed using the `filter` option within the sitemap integration configuration. Refer to the [Astro sitemap documentation](https://docs.astro.build/en/guides/integrations-guide/sitemap/#configuration) for advanced options.

### 4. `robots.txt`

-   **File:** `public/robots.txt` (this file is served from the root of your site).
-   **Purpose:** Instructs search engine crawlers (like Googlebot) on which pages or sections of your site they should or should not crawl and index.
-   **Default Content (Example):** A basic `robots.txt` is usually provided, allowing all content to be crawled and pointing to the sitemap.
    ```
    User-agent: *
    Allow: /
    Sitemap: https://youractualdomain.com/sitemap-index.xml
    ```
-   **Customization:**
    *   Modify this file if you have specific pages (e.g., draft previews, internal admin areas, thank-you pages) that you wish to exclude from search engine indexing.
    *   **Ensure the `Sitemap` URL is correct** and uses your production domain, matching the one generated by the sitemap integration (usually `sitemap-index.xml` for Astro).

### 5. Open Graph & Twitter Cards

-   **Implementation:** These are sets of meta tags that control how your content previews appear when shared on social media platforms like Facebook, LinkedIn (which use Open Graph protocol) and Twitter (which uses Twitter Cards, but also falls back to Open Graph).
-   **Management:** Often managed within the `SEO.astro` component or the main layout, dynamically pulling data from page frontmatter or props passed from individual pages.
-   **Key Tags to Consider:**
    *   `og:title`: Title of the page/content.
    *   `og:description`: A brief description.
    *   `og:image`: URL of an image to represent the content. (Crucial for engagement!)
    *   `og:url`: Canonical URL of the page.
    *   `og:type`: Type of content (e.g., `website`, `article`).
    *   `twitter:card`: Type of Twitter card (e.g., `summary`, `summary_large_image`).
    *   `twitter:title`: Title for Twitter.
    *   `twitter:description`: Description for Twitter.
    *   `twitter:image`: Image for Twitter.
    *   `twitter:site`: Your site's Twitter handle (e.g., `@yourusername`).
    *   `twitter:creator`: The content creator's Twitter handle (if different).
-   **Customization:**
    *   Provide high-quality, appropriately sized images for `og:image` and `twitter:image`.
    *   A default site-wide OG image can be specified in `src/lib/consts.ts` or directly within the SEO component, used as a fallback.
    *   Individual pages and content items should ideally provide their own specific images via frontmatter for richer social sharing.
    *   Update your Twitter handle in `src/lib/consts.ts` or wherever it's referenced for the `twitter:site` tag.

### 6. Structured Data (Schema Markup)

-   **What it is:** Code (commonly in JSON-LD format, embedded in a `<script type="application/ld+json">` tag) that helps search engines understand the content and context of your pages in a more detailed way (e.g., identifying an article, an event, a person, a recipe).
-   **Implementation:** CVfolio might include basic schema markup (e.g., for `Person`, `Article`, `WebSite`) within the `SEO.astro` component or individual page/layout templates.
-   **Customization:**
    *   For enhanced SEO, you can extend existing schema or add more specific schema types relevant to your content (e.g., `JobPosting`, `Project`).
    *   Use tools like [Google's Rich Results Test](https://search.google.com/test/rich-results) and [Schema Markup Validator](https://validator.schema.org/) to create and validate your structured data.

By carefully managing these SEO elements, you can significantly improve your site's visibility and how it's represented in search engine results and on social media platforms.
By carefully managing these SEO elements, you can significantly improve your site's visibility and how it's represented in search engine results and on social media platforms.