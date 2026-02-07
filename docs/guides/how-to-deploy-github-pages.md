# Deploy your Astro Website to GitHub Pages using GitHub Actions

This guide will walk you through deploying your Astro website to GitHub Pages using GitHub Actions for automated deployment.

## Prerequisites

- A GitHub repository containing your Astro project
- GitHub Pages enabled on your repository
- Basic understanding of GitHub Actions

## Step 1: Configure Astro for GitHub Pages

### 1.1 Update Astro Configuration

Your `astro.config.mjs` already has the correct site URL configured:

```javascript
export default defineConfig({
  site: 'https://cv.coderdiaz.com',
  // ... other config
});
```

**Important**: If you're using a different domain or GitHub Pages URL, update the `site` property to match your GitHub Pages URL format:

- For user/organization pages: `https://username.github.io`
- For project pages: `https://username.github.io/repository-name`
- For custom domains: `https://yourdomain.com`

### 1.2 Add Base Path (if needed)

If your repository name is not the same as your GitHub Pages URL, add a base path:

```javascript
export default defineConfig({
  site: 'https://username.github.io/repository-name',
  base: '/repository-name',
  // ... other config
});
```

## Step 2: Create GitHub Actions Workflow

### 2.1 Create Workflow Directory

Create the following directory structure in your repository:

```
.github/
└── workflows/
    └── deploy.yml
```

### 2.2 Create the Deployment Workflow

Create a file at `.github/workflows/deploy.yml` with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  # Trigger the workflow every time you push to the `main` branch
  # Using a different branch name? Replace `main` with your branch’s name
  push:
    branches: [main]
  # Allows you to run this workflow manually from the Actions tab on GitHub.
  workflow_dispatch:

# Allow this job to clone the repo and create a page deployment
permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v6
      - name: Install, build, and upload your site
        uses: withastro/action@v5
        # with:
          # path: . # The root location of your Astro project inside the repository. (optional)
          # node-version: 22 # The specific version of Node that should be used to build your site. Defaults to 22. (optional)
          # package-manager: pnpm@latest # The Node package manager that should be used to install dependencies and build your site. Automatically detected based on your lockfile. (optional)
          # build-cmd: pnpm run build # The command to run to build your site. Runs the package build script/task by default. (optional)

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Step 3: Configure GitHub Pages

### 3.1 Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

### 3.2 Configure Pages Settings

- **Source**: GitHub Actions
- **Branch**: Leave as default (GitHub Actions will handle deployment)

## Step 4: Deploy Your Website

### 4.1 Push Your Changes

```bash
git add .
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

### 4.2 Monitor Deployment

1. Go to your repository on GitHub
2. Click on the **Actions** tab
3. You should see your workflow running
4. Wait for the deployment to complete

## Step 5: Verify Deployment

Once the workflow completes successfully:

1. Go to your repository's **Settings** → **Pages**
2. You should see a green checkmark indicating successful deployment
3. Click on the provided URL to view your live website

## Customization Options

### Environment Variables

You can add environment variables to your workflow for different deployment environments:

```yaml
- name: Install, build, and upload your site
  uses: withastro/action@v5
  env:
    NODE_ENV: production
    # Add other environment variables as needed
```

### Custom Build Commands

If you need custom build commands, you can modify the workflow:

```yaml
- name: Install dependencies
  run: npm install

- name: Build site
  run: npm run build

- name: Upload to GitHub Pages
  uses: actions/upload-pages-artifact@v4
  with:
    path: ./dist
```

### Multiple Branches

To deploy from different branches or on pull requests:

```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
```

## Troubleshooting

### Common Issues

1. **Build Failures**

   - Check the Actions tab for error messages
   - Ensure all dependencies are properly installed
   - Verify your Astro configuration is correct

2. **404 Errors**

   - Verify the `site` URL in `astro.config.mjs` matches your GitHub Pages URL
   - Check if you need to add a `base` path for project pages

3. **Permission Errors**

   - Ensure the workflow has the correct permissions
   - Check that GitHub Pages is enabled in repository settings

4. **Asset Loading Issues**
   - Verify all assets are in the `public/` directory
   - Check that image paths are correct

### Debugging Steps

1. **Check Workflow Logs**

   - Go to Actions tab in your repository
   - Click on the failed workflow run
   - Review the detailed logs for error messages

2. **Test Locally**

   ```bash
   npm run build
   npm run preview
   ```

3. **Verify Configuration**
   - Check `astro.config.mjs` for correct site URL
   - Ensure all integrations are properly configured

## Advanced Configuration

### Custom Domain Setup

If you're using a custom domain:

1. Add your custom domain in repository Settings → Pages
2. Update the `site` URL in `astro.config.mjs`
3. Add a `CNAME` file to your `public/` directory with your domain

### SEO Optimization

Your current configuration includes sitemap generation. Ensure it's working by:

1. Checking that `@astrojs/sitemap` is in your integrations
2. Verifying the sitemap is generated in the build output
3. Submitting your sitemap to search engines

### Performance Optimization

Consider adding these optimizations:

1. **Image Optimization**: Use Astro's built-in image optimization
2. **Code Splitting**: Ensure your components are properly optimized
3. **Caching**: Configure appropriate cache headers

## Maintenance

### Regular Updates

- Keep Astro and dependencies updated
- Monitor GitHub Actions for any deprecation warnings
- Regularly test your deployment workflow

### Monitoring

- Set up notifications for failed deployments
- Monitor your website's performance and uptime
- Keep track of GitHub Pages service status

## Resources

- [Astro Documentation](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

**Note**: This documentation is specific to your Astro project configuration. Adjust the site URL and other settings according to your specific deployment requirements.
