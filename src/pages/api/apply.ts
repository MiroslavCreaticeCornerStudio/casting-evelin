import type { APIRoute } from "astro";
import { put } from "@vercel/blob";

// This route runs as a Vercel serverless function (not prerendered).
export const prerender = false;

const SKYGURU_ENDPOINT = "https://inclusive.skyguru.ai/api/v1/public/leads";
const FORM_NAME = "Casting Evelin";
// Vercel serverless functions cap the request body at ~4.5 MB — keep CVs under it.
const MAX_FILE = 4 * 1024 * 1024; // 4 MB

// Only the CV is uploaded for this form.
const FILE_FIELDS = [{ field: "cv", label: "Линк към CV" }];

const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
];

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

const sanitize = (name: string) =>
  (name || "file").replace(/[^a-zA-Z0-9._-]/g, "_").slice(-100) || "file";

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ message: "Невалидни данни от формата." }, 400);
  }

  const str = (k: string) => ((form.get(k) as string) || "").trim();

  const phone = str("phone");
  if (!phone) return json({ message: "Телефонът е задължителен." }, 422);
  if (!form.get("consent"))
    return json({ message: "Необходимо е съгласие за обработка на личните данни." }, 422);

  // Upload the CV to Vercel Blob (public, unguessable URL) and collect the link.
  const extra: { name: string; value: string }[] = [];
  for (const { field, label } of FILE_FIELDS) {
    const file = form.get(field);
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_FILE) {
        return json({ message: `${label}: файлът е твърде голям (макс. 4 MB).` }, 422);
      }
      try {
        const blob = await put(`cv/${crypto.randomUUID()}/${sanitize(file.name)}`, file, {
          access: "public",
          contentType: file.type || "application/octet-stream",
        });
        extra.push({ name: label, value: blob.url });
      } catch {
        return json({ message: "Неуспешно качване на файла. Опитайте отново." }, 502);
      }
    }
  }

  const tracking: Record<string, string> = {};
  for (const k of TRACKING_KEYS) {
    const v = str(k);
    if (v) tracking[k] = v;
  }

  const payload: Record<string, unknown> = {
    phone,
    name: str("name") || undefined,
    email: str("email") || undefined,
    form: FORM_NAME,
    ...tracking,
    ...(extra.length ? { extra } : {}),
  };

  try {
    const res = await fetch(SKYGURU_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.status === 201) return json({ success: true }, 201);

    if (res.status === 422) {
      const data: any = await res.json().catch(() => ({}));
      const first = data?.errors
        ? (Object.values(data.errors)[0] as any)?.[0]
        : data?.message;
      return json({ message: first || "Моля, проверете въведените данни." }, 422);
    }
    if (res.status === 429) {
      return json({ message: "Твърде много заявки. Опитайте отново след минута." }, 429);
    }
    return json({ message: "Възникна грешка при изпращането. Опитайте отново по-късно." }, 502);
  } catch {
    return json({ message: "Неуспешна връзка със сървъра." }, 502);
  }
};
