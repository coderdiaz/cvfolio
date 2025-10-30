import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface SiteConfig {
  sections: {
    workExperience: boolean;
    talks: boolean;
    writing: boolean;
    socialLinks: boolean;
  };
  elements: {
    avatar: boolean;
    themeSwitch: boolean;
    header: boolean;
    footer: boolean;
  };
}

let cachedConfig: SiteConfig | null = null;

export function getSiteConfig(): SiteConfig {
  if (cachedConfig) return cachedConfig;

  try {
    const configPath = path.join(process.cwd(), 'config.yml');
    const fileContents = fs.readFileSync(configPath, 'utf8');
    cachedConfig = yaml.load(fileContents) as SiteConfig;
    return cachedConfig;
  } catch (error) {
    // Return default config if file doesn't exist
    console.warn('config.yml not found, using defaults');
    return {
      sections: {
        workExperience: true,
        talks: true,
        writing: true,
        socialLinks: true,
      },
      elements: {
        avatar: true,
        themeSwitch: true,
        header: true,
        footer: true,
      },
    };
  }
}
