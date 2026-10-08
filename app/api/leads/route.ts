import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const crmEndpoint =
  process.env.CRM_SITE_LEADS_URL ||
  "https://crm-camboriu-hotel.vercel.app/api/webhooks/site-leads";

function field(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: NextRequest) {
  if (Number(request.headers.get("content-length") || 0) > 16_384) {
    return NextResponse.json({ ok: false, error: "Solicitação muito grande." }, { status: 413 });
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ ok: false, error: "Origem inválida." }, { status: 403 });
  }

  let input: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 16_384) throw new Error("Solicitação muito grande.");
    input = JSON.parse(raw);
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Dados inválidos.");
  } catch {
    return NextResponse.json({ ok: false, error: "Dados inválidos." }, { status: 400 });
  }

  if (field(input.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = field(input.name, 120);
  const phone = field(input.phone, 30);
  const email = field(input.email, 160);
  const room = field(input.room, 80);
  const checkin = field(input.checkin, 10);
  const checkout = field(input.checkout, 10);
  const guests = field(input.guests, 3);

  if (name.length < 2 || phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json(
      { ok: false, error: "Informe seu nome e um WhatsApp válido." },
      { status: 400 },
    );
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "E-mail inválido." }, { status: 400 });
  }
  if (
    (checkin && !/^\d{4}-\d{2}-\d{2}$/.test(checkin)) ||
    (checkout && !/^\d{4}-\d{2}-\d{2}$/.test(checkout)) ||
    (checkin && checkout && checkout <= checkin)
  ) {
    return NextResponse.json({ ok: false, error: "Confira as datas da estadia." }, { status: 400 });
  }

  const token = process.env.SITE_LEADS_WEBHOOK_TOKEN;
  if (!token) {
    console.error("[site-leads] token não configurado");
    return NextResponse.json({ ok: false, error: "Formulário indisponível no momento." }, { status: 503 });
  }

  try {
    const response = await fetch(crmEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Site-Leads-Token": token,
      },
      body: JSON.stringify({
        submission_id: field(input.submissionId, 80),
        name,
        phone,
        email,
        room,
        checkin,
        checkout,
        guests,
        source: "Site",
        form_name: "Reserva - Camboriú Hotel",
        campaign: field(input.campaign, 120),
        utm_source: field(input.utmSource, 120),
        utm_medium: field(input.utmMedium, 120),
        utm_campaign: field(input.utmCampaign, 120),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) throw new Error(`CRM retornou HTTP ${response.status}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[site-leads] falha ao enviar ao CRM", {
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
    return NextResponse.json(
      { ok: false, error: "Não foi possível enviar. Tente novamente ou fale pelo WhatsApp." },
      { status: 502 },
    );
  }
}
