import { calculateTotalExpenses, getTopCategory, getCategoryById, formatCurrency } from '../utils/constants'

const SummaryCards = ({ expenses }) => {
  const totalExpenses = calculateTotalExpenses(expenses)
  const topCategory = getTopCategory(expenses)
  const topCategoryData = topCategory ? getCategoryById(topCategory) : null
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0

  const stats = [
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      icon: 'fas fa-coins',
      color: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300',
    },
    {
      title: 'Number of Expenses',
      value: expenses.length,
      icon: 'fas fa-receipt',
      color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
    },
    {
      title: 'Average Expense',
      value: formatCurrency(averageExpense),
      icon: 'fas fa-chart-bar',
      color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300',
    },
    ...(topCategoryData ? [{
      title: 'Top Category',
      value: topCategoryData.label,
      icon: topCategoryData.icon,
      color: topCategoryData.color,
    }] : []),
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="card p-6 animate-slideUp"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
            <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${stat.color}`}>
              <i className={`${stat.icon} text-xl`}></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards
