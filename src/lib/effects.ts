export interface EffectMeta {
  title: string;
  description: string;
  category: "text" | "backgrounds" | "ui-components";
  tags: string[];
}

export interface PropDefinition {
  name: string;
  type: "color" | "slider" | "select" | "text";
  default: string | number;
  label: string;
  description: string;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: { value: string; label: string }[];
}

export interface EffectModule {
  meta: EffectMeta;
  code: string;
  props?: PropDefinition[];
  codeTemplate?: string;
  default: any;
}

export interface EffectEntry {
  slug: string;
  category: string;
  meta: EffectMeta;
  code: string;
  props?: PropDefinition[];
  codeTemplate?: string;
  Component: any;
}

const TEXT_CUSTOMIZABLE_CATEGORIES = new Set(["text", "ui-components"]);

function extractTextSnippet(html: string): string | undefined {
  const match = html.match(/>([^<>]+)</);
  const value = match?.[1]?.trim();
  return value ? value : undefined;
}

function withTextProp(
  entry: Omit<EffectEntry, "slug" | "Component">,
): Omit<EffectEntry, "slug" | "Component"> {
  if (!TEXT_CUSTOMIZABLE_CATEGORIES.has(entry.category)) {
    return entry;
  }

  const hasTextProp = entry.props?.some(
    (prop) => prop.type === "text" && prop.name === "text",
  );
  if (hasTextProp) {
    return entry;
  }

  const templateSource = entry.codeTemplate ?? entry.code;
  const defaultText = extractTextSnippet(entry.code);
  if (!defaultText) {
    return entry;
  }

  const textPlaceholder = "{{text}}";
  if (!templateSource.includes(textPlaceholder)) {
    const textToReplace = templateSource.match(/>([^<>]+)</)?.[1];
    if (!textToReplace) {
      return entry;
    }

    const replacedTemplate = templateSource.replace(
      textToReplace,
      textPlaceholder,
    );
    return {
      ...entry,
      props: [
        ...(entry.props ?? []),
        {
          name: "text",
          type: "text",
          default: defaultText,
          label: "Text",
          description: "Displayed text",
        },
      ],
      codeTemplate: replacedTemplate,
    };
  }

  return {
    ...entry,
    props: [
      ...(entry.props ?? []),
      {
        name: "text",
        type: "text",
        default: defaultText,
        label: "Text",
        description: "Displayed text",
      },
    ],
  };
}

/** PascalCase filename → kebab-case slug */
export function toSlug(filename: string): string {
  // Extract filename from path like '../effects/text/GradientRainbow.astro'
  const base = filename.split("/").pop()!.replace(".astro", "");
  return base
    .replace(/([a-z])(\d+[A-Z]*)/g, "$1-$2") // letter→digits(+caps): Extruded3D → Extruded-3D
    .replace(/([a-z])([A-Z])/g, "$1-$2") // camelCase: GradientRainbow → Gradient-Rainbow
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

const CATEGORIES = ["text", "backgrounds", "ui-components"] as const;

const CATEGORY_LABELS: Record<string, string> = {
  text: "Text Effects",
  backgrounds: "Backgrounds",
  "ui-components": "UI Components",
};

/** Load all effects from all categories */
export function getAllEffects(): Map<string, EffectEntry[]> {
  const textModules = import.meta.glob<EffectModule>(
    "../effects/text/*.astro",
    { eager: true },
  );
  const bgModules = import.meta.glob<EffectModule>(
    "../effects/backgrounds/*.astro",
    { eager: true },
  );
  const uiModules = import.meta.glob<EffectModule>(
    "../effects/ui-components/*.astro",
    { eager: true },
  );

  const moduleMaps: Record<string, Record<string, EffectModule>> = {
    text: textModules,
    backgrounds: bgModules,
    "ui-components": uiModules,
  };

  const result = new Map<string, EffectEntry[]>();

  for (const category of CATEGORIES) {
    const modules = moduleMaps[category];
    const entries: EffectEntry[] = Object.entries(modules).map(
      ([path, mod]) => {
        const normalized = withTextProp({
          category,
          meta: mod.meta,
          code: mod.code,
          props: mod.props,
          codeTemplate: mod.codeTemplate,
        });

        return {
          slug: toSlug(path),
          ...normalized,
          Component: mod.default,
        };
      },
    );
    // Sort alphabetically by title
    entries.sort((a, b) => a.meta.title.localeCompare(b.meta.title));
    result.set(category, entries);
  }

  return result;
}

/** Get category display label */
export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? category;
}

/** Get all categories */
export function getCategories(): readonly string[] {
  return CATEGORIES;
}

/** Find a specific effect */
export function findEffect(
  allEffects: Map<string, EffectEntry[]>,
  category: string,
  slug: string,
): EffectEntry | undefined {
  const entries = allEffects.get(category);
  return entries?.find((e) => e.slug === slug);
}

/** Get the first effect in a category (for redirects) */
export function getFirstEffect(
  allEffects: Map<string, EffectEntry[]>,
  category: string,
): EffectEntry | undefined {
  const entries = allEffects.get(category);
  return entries?.[0];
}
