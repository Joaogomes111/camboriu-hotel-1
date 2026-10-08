"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

type Props = {
  initialRoom: string;
  roomNames: string[];
  onClose: () => void;
};

export default function ReservationDialog({ initialRoom, roomNames, onClose }: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const submissionId = useRef("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    submissionId.current = crypto.randomUUID();
    nameRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const params = new URLSearchParams(window.location.search);
    const payload = {
      submissionId: submissionId.current,
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      room: form.get("room"),
      checkin: form.get("checkin"),
      checkout: form.get("checkout"),
      guests: form.get("guests"),
      website: form.get("website"),
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Falha ao enviar.");
      setSent(true);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "hotel_reservation_lead_submitted" });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Falha ao enviar. Tente novamente.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="reservation-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="reservation-dialog" role="dialog" aria-modal="true" aria-labelledby="reservation-title">
        <button className="reservation-close" type="button" onClick={onClose} aria-label="Fechar formulário">×</button>
        {sent ? (
          <div className="reservation-success" role="status">
            <h2 id="reservation-title">Pedido recebido</h2>
            <p>A equipe do Camboriú Hotel entrará em contato pelo WhatsApp informado.</p>
            <a
              className="reservation-submit"
              href="https://api.whatsapp.com/send?phone=5547992290029&text=Ol%C3%A1!%20Enviei%20uma%20solicita%C3%A7%C3%A3o%20de%20reserva%20pelo%20site."
              target="_blank"
              rel="noreferrer"
            >
              Continuar no WhatsApp
            </a>
          </div>
        ) : (
          <>
            <h2 id="reservation-title">Consulte sua hospedagem</h2>
            <p className="reservation-intro">Conte à recepção o que você procura.</p>
            <form onSubmit={submit}>
              <div className="reservation-fields">
                <label className="reservation-full">Nome
                  <input ref={nameRef} name="name" autoComplete="name" maxLength={120} required />
                </label>
                <label>WhatsApp
                  <input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={30} required />
                </label>
                <label>E-mail (opcional)
                  <input name="email" type="email" autoComplete="email" maxLength={160} />
                </label>
                <label className="reservation-full">Acomodação
                  <select name="room" defaultValue={initialRoom}>
                    <option value="">Ainda não sei</option>
                    {roomNames.map((room) => <option key={room} value={room}>{room}</option>)}
                  </select>
                </label>
                <label>Entrada (opcional)
                  <input name="checkin" type="date" />
                </label>
                <label>Saída (opcional)
                  <input name="checkout" type="date" />
                </label>
                <label>Hóspedes (opcional)
                  <input name="guests" type="number" min="1" max="20" inputMode="numeric" />
                </label>
                <label className="reservation-honeypot" aria-hidden="true">Site
                  <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <p className="reservation-privacy">
                Seus dados serão usados pela equipe do hotel para responder à sua solicitação. {" "}
                <a href="/privacidade" target="_blank" rel="noopener noreferrer">Privacidade</a>
              </p>
              {error ? <p className="reservation-error" role="alert">{error}</p> : null}
              <button className="reservation-submit" type="submit" disabled={sending}>
                {sending ? "Enviando..." : "Enviar solicitação"}
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
