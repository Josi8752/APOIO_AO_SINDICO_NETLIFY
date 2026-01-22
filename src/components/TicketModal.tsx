import { X } from "lucide-react";
import type { Ticket } from "../types/ticket";

export function TicketModal({
  ticket,
  onClose,
  onResolve,
}: {
  ticket: Ticket;
  onClose: () => void;
  onResolve: (id: number) => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Detalhes do Ticket</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Fechar modal">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Mensagem</p>
            <p className="text-gray-900 break-words">{ticket.message}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Fatores PER-CON</p>
            <ul className="space-y-1">
              {ticket.factors.map((factor, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={() => onResolve(ticket.id)}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Marcar como Resolvido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
