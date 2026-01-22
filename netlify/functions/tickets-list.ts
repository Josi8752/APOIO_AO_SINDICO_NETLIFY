
import type { Handler } from "@netlify/functions";
import { supabase } from "./_shared/supabase";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const status = event.queryStringParameters?.status; // pending | resolved (opcional)
  const limit = Math.min(Number(event.queryStringParameters?.limit ?? "50"), 200);

  let q = supabase
    .from("tickets")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (status === "pending" || status === "resolved") {
    q = q.eq("status", status);
  }

  const { data, error } = await q;

  if (error) {
    return { statusCode: 500, headers: { "content-type": "application/json" }, body: JSON.stringify({ error: error.message }) };
  }

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ tickets: data ?? [] }),
  };
};
