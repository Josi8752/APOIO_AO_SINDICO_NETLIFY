
import type { Handler } from "@netlify/functions";
import { supabase } from "./_shared/supabase";
import { readJson, resolveTicketSchema } from "./_shared/validate";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = await readJson(event.body);
  const parsed = resolveTicketSchema.safeParse(data);

  if (!parsed.success) {
    return { statusCode: 400, headers: { "content-type": "application/json" }, body: JSON.stringify({ error: "Invalid payload" }) };
  }

  const { id } = parsed.data;

  const { data: updated, error } = await supabase
    .from("tickets")
    .update({ status: "resolved" })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return { statusCode: 500, headers: { "content-type": "application/json" }, body: JSON.stringify({ error: error.message }) };
  }

  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ticket: updated }),
  };
};

