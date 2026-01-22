import type { Sentiment, Urgency } from "../types/ticket";

export function analyzeMessage(text: string): {
  category: string;
  urgency: Urgency;
  sentiment: Sentiment;
  score: number;
} {
  const keywords: Record<string, string[]> = {
    manutencao: ["elevador", "portão", "interfone", "luz", "água", "vazamento"],
    reclamacao: ["barulho", "som alto", "festa", "perturbação"],
    financeiro: ["boleto", "pagamento", "taxa", "cobrança"],
    solicitacao: ["reserva", "salão", "churrasqueira", "autorização"],
  };

  let category = "Solicitação";
  let urgency: Urgency = "baixa";
  let sentiment: Sentiment = "neutro";
  let score = 30;

  const lowerText = text.toLowerCase();

  // Categoria
  for (const [cat, words] of Object.entries(keywords)) {
    if (words.some((word) => lowerText.includes(word))) {
      category = cat.charAt(0).toUpperCase() + cat.slice(1);
      break;
    }
  }

  // Urgência
  if (
    lowerText.includes("urgente") ||
    lowerText.includes("parado") ||
    lowerText.includes("quebrado")
  ) {
    urgency = "alta";
    score += 40;
  } else if (lowerText.includes("importante") || lowerText.includes("problema")) {
    urgency = "média";
    score += 20;
  }

  // Sentimento
  if (
    lowerText.includes("!") ||
    lowerText.includes("absurdo") ||
    lowerText.includes("inaceitável")
  ) {
    sentiment = "negativo";
    score += 15;
  }

  // Clamp 0..100
  score = Math.max(0, Math.min(100, score));
  return { category, urgency, sentiment, score };
}
