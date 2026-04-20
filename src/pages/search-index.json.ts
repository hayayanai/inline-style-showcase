import type { APIRoute } from "astro";
import { getAllEffects, getCategoryLabel } from "../lib/effects";

export const GET: APIRoute = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const allEffects = getAllEffects();
  const searchIndex = [...allEffects.entries()].flatMap(([category, effects]) =>
    effects.map((e) => ({
      title: e.meta.title,
      description: e.meta.description,
      category,
      categoryLabel: getCategoryLabel(category),
      tags: e.meta.tags,
      href: `${baseUrl}${category}/${e.slug}`,
    })),
  );
  return new Response(JSON.stringify(searchIndex), {
    headers: { "Content-Type": "application/json" },
  });
};
