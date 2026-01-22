import { TrendingUp } from "lucide-react";
import type { Ticket } from "../types/ticket";
import { getScoreColor, getUrgencyColor } from "../utils/format";

export function TicketsPanel({ tickets, onSelect }: { tickets: Ticket[]; onSelect: (t: Ticket) => void }) {
  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div key={ticket.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(ticket.urgency)}`}>
                  {ticket.urgency.toUpperCase()}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300">
                  {ticket.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-300">
                  Unidade {ticket.unit}
                </span>
              </div>

              <p className="text-gray-900 font-medium mb-2 break-words">{ticket.message}</p>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Score: <span className={`font-bold ${getScoreColor(ticket.score)}`}>{ticket.score}/100</span>
                </span>
                <span>ID: #{ticket.id}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {ticket.status === "pending" ? (
                <button
                  onClick={() => onSelect(ticket)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
                >
                  Ver Detalhes
                </button>
              ) : (
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium text-center">✓ Resolvido</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
