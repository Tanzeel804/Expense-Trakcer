export const CATEGORIES = [
  { id: 'food', label: 'Food', icon: 'fas fa-utensils', color: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300' },
  { id: 'transport', label: 'Transport', icon: 'fas fa-car', color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' },
  { id: 'bills', label: 'Bills', icon: 'fas fa-file-invoice-dollar', color: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300' },
  { id: 'shopping', label: 'Shopping', icon: 'fas fa-shopping-bag', color: 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300' },
  { id: 'entertainment', label: 'Entertainment', icon: 'fas fa-film', color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300' },
  { id: 'health', label: 'Health', icon: 'fas fa-heartbeat', color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' },
  { id: 'education', label: 'Education', icon: 'fas fa-book', color: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300' },
  { id: 'other', label: 'Other', icon: 'fas fa-circle', color: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300' },
]

export const getCategoryById = (id) => {
  return CATEGORIES.find(cat => cat.id === id) || CATEGORIES[CATEGORIES.length - 1]
}

// Currency configuration
export const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'PKR', symbol: 'Rs.', label: 'Pakistani Rupee' },
]

export const DEFAULT_CURRENCY = 'PKR' // Default to Pakistani Rupees

export const getCurrencySymbol = (currencyCode = DEFAULT_CURRENCY) => {
  const currency = CURRENCIES.find(c => c.code === currencyCode)
  return currency ? currency.symbol : '$'
}

export const formatCurrency = (amount, currencyCode = DEFAULT_CURRENCY) => {
  const currency = CURRENCIES.find(c => c.code === currencyCode)
  if (currency?.code === 'PKR') {
    return `Rs. ${amount.toFixed(2)}`
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency?.code || 'USD',
  }).format(amount)
}

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatDateInput = (dateString) => {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}

export const getDateRange = (days) => {
  const end = new Date()
  const start = new Date(end.getTime() - days * 24 * 60 * 60 * 1000)
  return { start, end }
}

export const groupExpensesByDate = (expenses) => {
  const grouped = {}
  expenses.forEach(expense => {
    const date = new Date(expense.date).toLocaleDateString('en-US')
    if (!grouped[date]) {
      grouped[date] = 0
    }
    grouped[date] += expense.amount
  })
  return grouped
}

export const groupExpensesByCategory = (expenses) => {
  const grouped = {}
  expenses.forEach(expense => {
    if (!grouped[expense.category]) {
      grouped[expense.category] = 0
    }
    grouped[expense.category] += expense.amount
  })
  return grouped
}

export const calculateTotalExpenses = (expenses) => {
  return expenses.reduce((total, expense) => total + expense.amount, 0)
}

export const getTopCategory = (expenses) => {
  const grouped = groupExpensesByCategory(expenses)
  if (Object.keys(grouped).length === 0) return null
  
  const topCategory = Object.entries(grouped).reduce((max, [category, amount]) => 
    amount > max.amount ? { category, amount } : max,
    { category: '', amount: 0 }
  )
  
  return topCategory.category
}

export const getChartColors = () => {
  return [
    '#f97316', // orange
    '#3b82f6', // blue
    '#ef4444', // red
    '#ec4899', // pink
    '#a855f7', // purple
    '#10b981', // green
    '#6366f1', // indigo
    '#6b7280', // gray
  ]
}

export const exportToCSV = (expenses) => {
  const headers = ['Title', 'Amount', 'Category', 'Date']
  const rows = expenses.map(exp => [
    exp.title,
    exp.amount,
    getCategoryById(exp.category).label,
    formatDate(exp.date)
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `expenses-${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
