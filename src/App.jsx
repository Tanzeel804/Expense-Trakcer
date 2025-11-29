import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import { useTheme } from './hooks/useTheme'
import { DEFAULT_CURRENCY } from './utils/constants'

function App() {
  const { theme, mounted } = useTheme()
  const [expenses, setExpenses] = useState([])
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY)

  // Load expenses and currency from localStorage on mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses')
    if (savedExpenses) {
      try {
        setExpenses(JSON.parse(savedExpenses))
      } catch (error) {
        console.error('Failed to load expenses:', error)
      }
    }
    
    const savedCurrency = localStorage.getItem('currency') || DEFAULT_CURRENCY
    setCurrency(savedCurrency)
  }, [])

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    setExpenses([newExpense, ...expenses])
  }

  const updateExpense = (id, updatedExpense) => {
    setExpenses(expenses.map(exp => exp.id === id ? { ...updatedExpense, id } : exp))
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency)
    localStorage.setItem('currency', newCurrency)
  }

  if (!mounted) {
    return null // Don't render until theme is loaded
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-smooth">
      <Navbar currency={currency} onCurrencyChange={handleCurrencyChange} />
      <Dashboard
        expenses={expenses}
        onAddExpense={addExpense}
        onUpdateExpense={updateExpense}
        onDeleteExpense={deleteExpense}
        currency={currency}
      />
    </div>
  )
}

export default App
