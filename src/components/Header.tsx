import { Building, Menu, X } from "lucide-react";

export function Header({
  showMobileMenu,
  setShowMobileMenu,
}: {
  showMobileMenu: boolean;
  setShowMobileMenu: (v: boolean) => void;
}) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">SINDICOOPS_IA</h1>
              <p className="text-xs sm:text-sm text-gray-600">Gestão Inteligente de Condomínios</p>
            </div>
          </div>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Abrir menu"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
}
