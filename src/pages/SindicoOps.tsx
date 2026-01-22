import React, { useState } from "react";

import { Header } from "../components/Header";
import { StatsCards } from "../components/StatsCards";
import { Tabs } from "../components/Tabs";
import { ChatPanel } from "../components/ChatPanel";
import { TicketsPanel } from "../components/TicketsPanel";
import { ReportsPanel } from "../components/ReportsPanel";
import { TicketModal } from "../components/TicketModal";

import { analyzeMessage } from "../utils/analyzeMessage";
import type { ChatMessage } from "../types/ticket";
import { useTickets } from "../hooks/useTickets";

export default function SindicoOps() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "tickets" | "reports">("chat");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const {
    tickets,
    stats,
    selectedTicket,
    setSelectedTicket,
    addTicketFromUi,
    resolveTicket,
    loading,
    error,
  } = useTickets();

  async function handleSendMessage() {
    const text = newMessage.trim();
    if (!text) return;

    const analysis = analyzeMessage(text);
    const now = new Date().toLocaleTimeString();

    // UI instantânea
    setMessages((prev) => [...prev, { type: "user", text, time: now }]);
    setNewMessage("");

    try {
      await addTicketFromUi({
        unit: "999",
        message: text,
        category: analysis.category,
        urgency: analysis.urgency,
        sentiment: analysis.sentiment,
        score: analysis.score,
        factors: [
          `Categoria: ${analysis.category}`,
          `Urgência: ${analysis.urgency}`,
          `Sentimento: ${analysis.sentiment}`,
        ],
      });

      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          text: `✓ Solicitação registrada! Score de risco: ${analysis.score}/100. Categoria: ${analysis.category}. Você receberá retorno em até 24h.`,
          time: now,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          type: "system",
          text: `✕ Falha ao registrar o chamado. Tente novamente.`,
          time: now,
        },
      ]);
    }
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
          <div className="space-y-3">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}
            <ChatPanel
              messages={messages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              onSend={handleSendMessage}
            />
          </div>
        )}

        {activeTab === "tickets" && (
          <div className="space-y-3">
            {loading && (
              <div className="bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700">
                Carregando tickets...
              </div>
            )}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}
            <TicketsPanel tickets={tickets} onSelect={(t) => setSelectedTicket(t)} />
          </div>
        )}

        {activeTab === "reports" && <ReportsPanel stats={stats} />}
      </div>

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onResolve={(id: string) => resolveTicket(id)}
        />
      )}
    </div>
  );
}
