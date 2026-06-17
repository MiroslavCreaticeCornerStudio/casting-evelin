import type { APIRoute } from "astro";

// Serves an uploaded file from R2 by its random key (unguessable).
export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
  const bucket: any = (locals as any).runtime?.env?.UPLOADS;
  const key = params.key;
  if (!bucket || !key) return new Response("Not found", { status: 404 });

  const object = await bucket.get(key);
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata?.(headers);
  if (object.httpEtag) headers.set("etag", object.httpEtag);
  headers.set("cache-control", "private, max-age=3600");

  return new Response(object.body, { headers });
};
