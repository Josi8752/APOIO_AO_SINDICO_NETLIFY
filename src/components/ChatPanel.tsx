import { MessageSquare, Send } from "lucide-react";
import type { ChatMessage } from "../types/ticket";

export function ChatPanel({
  messages,
  newMessage,
  setNewMessage,
  onSend,
}: {
  messages: ChatMessage[];
  newMessage: string;
  setNewMessage: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="h-96 sm:h-[500px] overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-sm sm:text-base">Envie sua primeira mensagem para começar</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${msg.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}>
              <p className="text-sm sm:text-base break-words">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.type === "user" ? "text-blue-100" : "text-gray-500"}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          <button
            onClick={onSend}
            className="bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
