export type TicketStatus = 'pending' | 'resolved';
export type Urgency = 'baixa' | 'média' | 'alta';
export type Sentiment = 'neutro' | 'negativo' | 'positivo';

export interface Ticket {
  id: string;
  category: string;
  sentiment: Sentiment;
  urgency: Urgency;
  message: string;
  unit: string;
  score: number;
  status: TicketStatus;
  created: string;
  factors: string[];
}

export interface Stats {
  total: number;
  pending: number;
  resolved: number;
  critical: number;
}

export interface ChatMessage {
  type: 'user' | 'system';
  text: string;
  time: string;
}
