# ✏️ Customizing CVfolio

This guide walks you through how to customize the CVfolio template to reflect your personal profile, style, and content.

## 📁 Some important files

Here’s an overview of folders relevant to customization:

| Path                     | Purpose                                                   |
|--------------------------|-----------------------------------------------------------|
| `src/assets/`            | Fonts and static images (e.g., avatar, meta image)        |
| `src/components/`        | UI and layout components (header, footer, etc.)           |
| `src/content/`           | Editable content: jobs, links, posts, talks, pages        |
| `src/layouts/`           | Astro layout templates                                    |
| `src/pages/`             | Page routing (`index.astro`, `writing/`)                  |
| `src/styles/global.css`  | Global CSS and utility styles                             |
| `src/lib/`               | Utility functions and constants                           |

> You are free to preserve the labels of `Made by CVFolio` from the footer and the floating badge.
## Toggle sections and elements

You can hide built-in sections and UI elements without touching the templates by editing `cvfolio.config.json` at the project root. The defaults look like this:

```json
{
  "layout": {
    "header": true,
    "footer": true,
    "themeSwitcher": true
  },
  "sections": {
    "homepage": {
      "author": true,
      "about": true,
      "contact": true,
      "workExperience": true,
      "speaking": true
    },
    "writing": {
      "author": true,
      "latestPosts": true
    }
  }
}
```

Set any flag to `false` to remove that section from the rendered page while keeping the source code intact.
