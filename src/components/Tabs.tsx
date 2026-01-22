import { BarChart3, FileText, MessageSquare } from "lucide-react";

export function Tabs({
  activeTab,
  setActiveTab,
  showMobileMenu,
  setShowMobileMenu,
}: {
  activeTab: "chat" | "tickets" | "reports";
  setActiveTab: (t: "chat" | "tickets" | "reports") => void;
  showMobileMenu: boolean;
  setShowMobileMenu: (v: boolean) => void;
}) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 mb-4 ${showMobileMenu ? "block" : "hidden lg:block"}`}>
      <div className="flex flex-col lg:flex-row border-b border-gray-200">
        <button
          onClick={() => { setActiveTab("chat"); setShowMobileMenu(false); }}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
            activeTab === "chat" ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Atendimento</span>
        </button>

        <button
          onClick={() => { setActiveTab("tickets"); setShowMobileMenu(false); }}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
            activeTab === "tickets" ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <BarChart3 className="w-5 h-5" />
          <span>Tickets</span>
        </button>

        <button
          onClick={() => { setActiveTab("reports"); setShowMobileMenu(false); }}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
            activeTab === "reports" ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <FileText className="w-5 h-5" />
          <span>Relatórios</span>
        </button>
      </div>
    </div>
  );
}
