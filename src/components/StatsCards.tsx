import { AlertTriangle, CheckCircle, Clock, MessageSquare } from "lucide-react";
import type { Stats } from "../types/ticket";

export function StatsCards({ stats }: { stats: Stats }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Total</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 sm:p-3 rounded-lg">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Pendentes</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Resolvidos</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.resolved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 sm:p-3 rounded-lg">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Críticos</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">{stats.critical}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
