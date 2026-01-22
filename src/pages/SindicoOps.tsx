import React, { useState } from "react";

import { Header } from "../components/Header";
import { StatsCards } from "../components/StatsCards";
import { Tabs } from "../components/Tabs";
import { ChatPanel } from "../components/ChatPanel";
import { TicketsPanel } from "../components/TicketsPanel";
import { ReportsPanel } from "../components/ReportsPanel";
import { TicketModal } from "../components/TicketModal";

import { analyzeMessage } from "../utils/analyzeMessage";
import type { ChatMessage, Ticket } from "../types/ticket";
import { useTickets } from "../hooks/useTickets";

export default function SindicoOps() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "tickets" | "reports">("chat");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { tickets, stats, selectedTicket, setSelectedTicket, addTicket, resolveTicket } =
    useTickets();

  function handleSendMessage() {
    const text = newMessage.trim();
    if (!text) return;

    const analysis = analyzeMessage(text);
    const nextId = tickets.length ? Math.max(...tickets.map((t) => t.id)) + 1 : 1;

    const ticket: Ticket = {
      id: nextId,
      category: analysis.category,
      sentiment: analysis.sentiment,
      urgency: analysis.urgency,
      message: text,
      unit: "999",
      score: analysis.score,
      status: "pending",
      created: new Date().toISOString(),
      factors: [
        `Categoria: ${analysis.category}`,
        `Urgência: ${analysis.urgency}`,
        `Sentimento: ${analysis.sentiment}`,
      ],
    };

    addTicket(ticket);

    const now = new Date().toLocaleTimeString();
    setMessages((prev) => [
      ...prev,
      { type: "user", text, time: now },
      {
        type: "system",
        text: `✓ Solicitação registrada! Score de risco: ${analysis.score}/100. Categoria: ${analysis.category}. Você receberá retorno em até 24h.`,
        time: now,
      },
    ]);

    setNewMessage("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu} />

      <StatsCards stats={stats} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          showMobileMenu={showMobileMenu}
          setShowMobileMenu={setShowMobileMenu}
        />

        {activeTab === "chat" && (
          <ChatPanel
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            onSend={handleSendMessage}
          />
        )}

        {activeTab === "tickets" && (
          <TicketsPanel tickets={tickets} onSelect={(t) => setSelectedTicket(t)} />
        )}

        {activeTab === "reports" && <ReportsPanel stats={stats} />}
      </div>

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onResolve={(id) => resolveTicket(id)}
        />
      )}
    </div>
  );
}
