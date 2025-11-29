import { useTheme } from '../hooks/useTheme'
import { CURRENCIES } from '../utils/constants'

const Navbar = ({ currency, onCurrencyChange }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md transition-smooth sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
              <i className="fas fa-wallet text-white text-lg"></i>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              Expense Tracker
            </h1>
          </div>

          {/* Currency and Theme Controls */}
          <div className="flex items-center gap-3">
            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-medium border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-smooth"
              aria-label="Select currency"
            >
              {CURRENCIES.map(curr => (
                <option key={curr.code} value={curr.code}>
                  {curr.label} ({curr.symbol})
                </option>
              ))}
            </select>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-yellow-400 transition-smooth hover:bg-gray-200 dark:hover:bg-gray-600 active:scale-95"
              aria-label="Toggle dark mode"
              title="Switch to dark/light mode"
            >
              <i className="fas fa-moon text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
