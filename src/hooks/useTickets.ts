import { useEffect, useMemo, useState } from "react";
import type { Stats, Ticket } from "../types/ticket";
import * as api from "../services/ticketsApi";

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const data = await api.listTickets({ limit: 200 });
      setTickets(data);
    } catch (e: any) {
      setError(e?.message ?? "Erro ao carregar tickets");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const stats: Stats = useMemo(() => {
    const total = tickets.length;
    const pending = tickets.filter(t => t.status === "pending").length;
    const resolved = tickets.filter(t => t.status === "resolved").length;
    const critical = tickets.filter(t => t.score >= 70).length;
    return { total, pending, resolved, critical };
  }, [tickets]);

  async function addTicketFromUi(input: {
    unit: string;
    message: string;
    category: string;
    urgency: "baixa" | "média" | "alta";
    sentiment: "neutro" | "negativo" | "positivo";
    score: number;
    factors: string[];
  }) {
    const created = await api.createTicket(input);
    setTickets(prev => [created, ...prev]);
    return created;
  }

  async function resolveTicket(id: string) {
    const updated = await api.resolveTicket(id);
    setTickets(prev => prev.map(t => (t.id === id ? updated : t)));
    setSelectedTicket(null);
  }

  return {
    tickets,
    stats,
    selectedTicket,
    setSelectedTicket,
    addTicketFromUi,
    resolveTicket,
    loading,
    error,
    refresh,
  };
}
