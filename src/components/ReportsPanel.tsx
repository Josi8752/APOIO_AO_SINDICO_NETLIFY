import type { Stats } from "../types/ticket";

export function ReportsPanel({ stats }: { stats: Stats }) {
  const resolution = stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Relatório Semanal</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="border-l-4 border-blue-600 pl-4">
            <p className="text-sm text-gray-600">Taxa de Resolução</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{resolution}%</p>
          </div>
          <div className="border-l-4 border-red-600 pl-4">
            <p className="text-sm text-gray-600">Tickets Críticos</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.critical}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Principais Categorias</h3>

          {/* Placeholder: troque por cálculo real por categoria */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base text-gray-700">Manutenção</span>
              <span className="text-sm sm:text-base font-semibold text-gray-900">45%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
