import type { Ticket } from "../types/ticket";

const BASE = "/.netlify/functions";

export async function listTickets(params?: {
  status?: "pending" | "resolved";
  limit?: number;
}) {
  const qs = new URLSearchParams();
  if (params?.status) qs.set("status", params.status);
  if (params?.limit) qs.set("limit", String(params.limit));

  const res = await fetch(
    `${BASE}/tickets-list${qs.toString() ? `?${qs}` : ""}`
  );

  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();

  return json.tickets.map(mapDbToTicket) as Ticket[];
}

export async function createTicket(input: {
  unit: string;
  message: string;
  category: string;
  urgency: "baixa" | "média" | "alta";
  sentiment: "neutro" | "negativo" | "positivo";
  score: number;
  factors: string[];
}) {
  const res = await fetch(`${BASE}/tickets-create`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();

  return mapDbToTicket(json.ticket) as Ticket;
}

export async function resolveTicket(id: string) {
  const res = await fetch(`${BASE}/tickets-resolve`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) throw new Error(await res.text());
  const json = await res.json();

  return mapDbToTicket(json.ticket) as Ticket;
}

function mapDbToTicket(db: any): Ticket {
  return {
    id: db.id,
    unit: db.unit,
    category: db.category,
    urgency: db.urgency,
    sentiment: db.sentiment,
    message: db.message,
    score: db.score,
    status: db.status,
    created: db.created_at,
    factors: Array.isArray(db.factors) ? db.factors : [],
  };
}
