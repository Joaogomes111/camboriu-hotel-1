import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Camboriú Hotel landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Cambori/);
  assert.match(html, /Reservas/);
  assert.match(html, /Apartamento Solteiro/);
  assert.match(html, /Apartamento Duplo/);
  assert.match(html, /Apartamento Casal/);
  assert.match(html, /Apartamento Triplo/);
  assert.match(html, /Apartamento Quadruplo/);
  assert.match(html, /Galeria/);
  assert.match(html, /Comodidades/);
  assert.match(html, /Informações Importantes/);
  assert.match(html, /cafe-manha-video\.mp4/);
  assert.match(html, /camboriu-logo\.png/);
  assert.match(html, /balneario-camboriu-novo\.png/);
  assert.match(html, /5547992290029/);
  assert.match(html, /Av\. do Estado Dalmo Vieira, 5029/);
  assert.doesNotMatch(html, /Quarto Casal 01|Quarto Quádruplo 03/);
  assert.doesNotMatch(html, /Código promocional|não precisa/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("removes starter-only code from the product surface", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview|codex-preview/);
  assert.doesNotMatch(layout, /_sites-preview|Starter Project|codex-preview/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
