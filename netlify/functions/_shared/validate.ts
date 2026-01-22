
import { z } from "zod";

export async function readJson(eventBody: string | null) {
  if (!eventBody) return null;
  try {
    return JSON.parse(eventBody);
  } catch {
    return null;
  }
}

export const createTicketSchema = z.object({
  unit: z.string().min(1).max(20),
  message: z.string().min(3).max(2000),
  category: z.string().min(1).max(50),
  urgency: z.enum(["baixa", "média", "alta"]),
  sentiment: z.enum(["neutro", "negativo", "positivo"]),
  score: z.number().int().min(0).max(100),
  factors: z.array(z.string().min(1).max(200)).max(20),
});

export const resolveTicketSchema = z.object({
  id: z.string().uuid(),
});

