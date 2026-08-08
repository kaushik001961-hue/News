import "server-only";

const dictionaries: Record<string, () => Promise<any>> = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  es: () =>
    import("../dictionaries/en.json").then((module) => module.default), // Falls back to English until es.json is created
};

export const getDictionary = async (locale: string) => {
  // Fallback to English if the requested locale configuration doesn't exist
  const loadDictionary = dictionaries[locale] ?? dictionaries.en;
  return loadDictionary();
};