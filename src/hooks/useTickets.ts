import { useMemo, useState } from "react";
import type { Stats, Ticket } from "../types/ticket";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "sindicoops:tickets:v1";

const mockTickets: Ticket[] = [
  {
    id: 1,
    category: "Manutenção",
    sentiment: "negativo",
    urgency: "alta",
    message: "Elevador está parado há 2 dias",
    unit: "301",
    score: 85,
    status: "pending",
    created: new Date().toISOString(),
    factors: ["Recorrência: 3 vezes", "Inadimplente: Não", "Urgência: Alta"],
  },
  {
    id: 2,
    category: "Reclamação",
    sentiment: "neutro",
    urgency: "média",
    message: "Barulho excessivo no apartamento 405",
    unit: "302",
    score: 62,
    status: "pending",
    created: new Date().toISOString(),
    factors: ["Recorrência: 1 vez", "Inadimplente: Não", "Urgência: Média"],
  },
];

export function useTickets() {
  const [tickets, setTickets] = useLocalStorage<Ticket[]>(STORAGE_KEY, mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const stats: Stats = useMemo(() => {
    const total = tickets.length;
    const pending = tickets.filter((t) => t.status === "pending").length;
    const resolved = tickets.filter((t) => t.status === "resolved").length;
    const critical = tickets.filter((t) => t.score >= 70).length;
    return { total, pending, resolved, critical };
  }, [tickets]);

  function addTicket(ticket: Ticket) {
    setTickets((prev) => [...prev, ticket]);
  }

  function resolveTicket(id: number) {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "resolved" } : t))
    );
    setSelectedTicket(null);
  }

  return {
    tickets,
    stats,
    selectedTicket,
    setSelectedTicket,
    addTicket,
    resolveTicket,
  };
}
