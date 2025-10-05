import { z } from 'astro/zod';

type LayoutConfig = {
  header: boolean;
  footer: boolean;
  themeSwitcher: boolean;
};

type HomepageSections = {
  author: boolean;
  about: boolean;
  contact: boolean;
  workExperience: boolean;
  speaking: boolean;
};

type WritingSections = {
  author: boolean;
  latestPosts: boolean;
};

type SectionsConfig = {
  homepage: HomepageSections;
  writing: WritingSections;
};

export type SiteConfig = {
  layout: LayoutConfig;
  sections: SectionsConfig;
};

const layoutSchema = z
  .object({
    header: z.boolean().optional(),
    footer: z.boolean().optional(),
    themeSwitcher: z.boolean().optional(),
  })
  .optional();

const homepageSectionsSchema = z
  .object({
    author: z.boolean().optional(),
    about: z.boolean().optional(),
    contact: z.boolean().optional(),
    workExperience: z.boolean().optional(),
    speaking: z.boolean().optional(),
  })
  .optional();

const writingSectionsSchema = z
  .object({
    author: z.boolean().optional(),
    latestPosts: z.boolean().optional(),
  })
  .optional();

const sectionsSchema = z
  .object({
    homepage: homepageSectionsSchema,
    writing: writingSectionsSchema,
  })
  .optional();

const siteConfigSchema = z.object({
  layout: layoutSchema,
  sections: sectionsSchema,
});

type RawSiteConfig = z.infer<typeof siteConfigSchema>;

type FlagRecord = Record<string, boolean>;

const DEFAULT_SITE_CONFIG: SiteConfig = {
  layout: {
    header: true,
    footer: true,
    themeSwitcher: true,
  },
  sections: {
    homepage: {
      author: true,
      about: true,
      contact: true,
      workExperience: true,
      speaking: true,
    },
    writing: {
      author: true,
      latestPosts: true,
    },
  },
};

function createDefaultSiteConfig(): SiteConfig {
  return {
    layout: { ...DEFAULT_SITE_CONFIG.layout },
    sections: {
      homepage: { ...DEFAULT_SITE_CONFIG.sections.homepage },
      writing: { ...DEFAULT_SITE_CONFIG.sections.writing },
    },
  };
}

function mergeFlags<T extends FlagRecord>(defaults: T, overrides?: Partial<T>): T {
  return { ...defaults, ...(overrides ?? {}) } as T;
}

function formatValidationIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.join('.') || 'root';
      return `  - ${path}: ${issue.message}`;
    })
    .join('\n');
}

function validateSiteConfig(raw: unknown): RawSiteConfig | undefined {
  const result = siteConfigSchema.safeParse(raw);

  if (result.success) {
    return result.data;
  }

  console.warn('[cvfolio] Invalid cvfolio.config.json detected. Falling back to defaults.');
  console.warn(formatValidationIssues(result.error));
  return undefined;
}

export async function loadSiteConfig(): Promise<SiteConfig> {
  const defaults = createDefaultSiteConfig();

  try {
    const mod = await import('../../cvfolio.config.json?raw');
    const rawContent = typeof mod.default === 'string' ? mod.default : mod;
    const parsedContent = JSON.parse(rawContent);
    const parsed = validateSiteConfig(parsedContent);

    const effective = parsed ?? {};

    const layout = mergeFlags(defaults.layout, effective.layout);
    const sections = {
      homepage: mergeFlags(defaults.sections.homepage, effective.sections?.homepage),
      writing: mergeFlags(defaults.sections.writing, effective.sections?.writing),
    };

    return { layout, sections };
  } catch (error) {
    console.warn('[cvfolio] Unable to load cvfolio.config.json. Falling back to defaults.', error);
    return defaults;
  }
}

export { DEFAULT_SITE_CONFIG };
