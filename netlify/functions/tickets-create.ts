
import type { Handler } from "@netlify/functions";
import { supabase } from "./_shared/supabase";
import { createTicketSchema, readJson } from "./_shared/validate";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = await readJson(event.body);
  const parsed = createTicketSchema.safeParse(data);

  if (!parsed.success) {
    return {
      statusCode: 400,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ error: "Invalid payload", details: parsed.error.flatten() }),
    };
  }

  const payload = parsed.data;

  const { data: inserted, error } = await supabase
    .from("tickets")
    .insert({
      unit: payload.unit,
      message: payload.message,
      category: payload.category,
      urgency: payload.urgency,
      sentiment: payload.sentiment,
      score: payload.score,
      status: "pending",
      factors: payload.factors,
    })
    .select("*")
    .single();

  if (error) {
    return { statusCode: 500, headers: { "content-type": "application/json" }, body: JSON.stringify({ error: error.message }) };
  }

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ticket: inserted }),
  };
};

