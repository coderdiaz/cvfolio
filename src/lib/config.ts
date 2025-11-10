import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { z } from 'astro:content';

const SiteConfigSchema = z.object({
  sections: z.object({
    about: z.boolean(),
    workExperience: z.boolean(),
    talks: z.boolean(),
    writing: z.boolean(),
    socialLinks: z.boolean(),
  }),
  elements: z.object({
    avatar: z.boolean(),
    themeSwitch: z.boolean(),
    header: z.boolean(),
    footer: z.boolean(),
  }),
});

type SiteConfig = z.infer<typeof SiteConfigSchema>;

const defaultConfig: SiteConfig = {
  sections: {
    about: true,
    workExperience: true,
    talks: true,
    writing: true,
    socialLinks: true,
  },
  elements: {
    avatar: true,
    themeSwitch: true,
    footer: true,
    header: true,
  },
};

function deepMerge(target: any, source: any): any {
  // Recursively merge source into target
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === 'object' &&
      !Array.isArray(source[key])
    ) {
      if (!target[key] || typeof target[key] !== 'object') {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      if (target[key] === undefined) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

function isValidConfig(config: SiteConfig): config is SiteConfig {
  return SiteConfigSchema.safeParse(config).success;
}

export function getSiteConfig(): SiteConfig {
  const configPath = path.join(process.cwd(), 'config.yml');
  let loadedConfig: any = {};
  try {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    loadedConfig = yaml.load(fileContents);
    if (!loadedConfig || typeof loadedConfig !== 'object') {
      console.warn(
        'config.yml is empty or not a valid YAML object, using defaults',
      );
      return defaultConfig;
    }
    // Merge loaded config with defaults
    const mergedConfig = deepMerge(loadedConfig, defaultConfig);
    if (!isValidConfig(mergedConfig)) {
      console.warn(
        'config.yml is malformed or missing required fields, using defaults',
      );
      return defaultConfig;
    }
    return mergedConfig as SiteConfig;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.warn('config.yml not found, using defaults');
    } else if (
      error.name === 'YAMLException' ||
      error instanceof yaml.YAMLException
    ) {
      console.warn('config.yml is malformed YAML, using defaults');
    } else {
      console.warn(
        `Error loading config.yml: ${error.message}, using defaults`,
      );
    }
    return defaultConfig;
  }
}
