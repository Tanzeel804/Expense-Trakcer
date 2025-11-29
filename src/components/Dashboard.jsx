import { useState } from 'react'
import ExpenseForm from './ExpenseForm'
import ExpenseList from './ExpenseList'
import PieChart from './PieChart'
import LineChart from './LineChart'
import SummaryCards from './SummaryCards'
import { CATEGORIES, exportToCSV } from '../utils/constants'

const Dashboard = ({ expenses, onAddExpense, onUpdateExpense, onDeleteExpense, currency }) => {
  const [editingExpense, setEditingExpense] = useState(null)
  const [filterCategory, setFilterCategory] = useState(null)
  const [sortBy, setSortBy] = useState('date')
  const [timeRange, setTimeRange] = useState(30)

  const handleAddExpense = (expense) => {
    onAddExpense(expense)
  }

  const handleEditExpense = (expense) => {
    setEditingExpense(expense)
  }

  const handleUpdateExpense = (expense) => {
    onUpdateExpense(editingExpense.id, expense)
    setEditingExpense(null)
  }

  const handleCancelEdit = () => {
    setEditingExpense(null)
  }

  const handleDeleteExpense = (id) => {
    onDeleteExpense(id)
  }

  const handleExport = () => {
    exportToCSV(expenses)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Summary Cards */}
      <div className="mb-8">
        <SummaryCards expenses={expenses} currency={currency} />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-1">
          {editingExpense ? (
            <ExpenseForm
              initialData={editingExpense}
              onSubmit={handleUpdateExpense}
              onCancel={handleCancelEdit}
            />
          ) : (
            <ExpenseForm onSubmit={handleAddExpense} />
          )}

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={expenses.length === 0}
            className="btn-secondary w-full mt-4 flex items-center justify-center gap-2"
            title="Download expenses as CSV"
          >
            <i className="fas fa-download"></i>
            Export as CSV
          </button>
        </div>

        {/* Right Column - Charts */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          {/* Time Range Selector for Line Chart */}
          <div className="card p-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
              <i className="fas fa-calendar-alt mr-2"></i>
              Trend Time Range
            </label>
            <div className="flex gap-2 flex-wrap">
              {[7, 14, 30, 60, 90].map(days => (
                <button
                  key={days}
                  onClick={() => setTimeRange(days)}
                  className={`px-4 py-2 rounded-lg transition-smooth text-sm font-medium ${
                    timeRange === days
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {days}d
                </button>
              ))}
            </div>
          </div>

          {/* Line Chart */}
          <LineChart expenses={expenses} timeRange={timeRange} />

          {/* Pie Chart */}
          <PieChart expenses={expenses} />

          {/* Filters */}
          <div className="card p-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                  <i className="fas fa-filter mr-2"></i>
                  Filter by Category
                </label>
                <select
                  value={filterCategory || ''}
                  onChange={(e) => setFilterCategory(e.target.value || null)}
                  className="select-field text-sm"
                >
                  <option value="">All Categories</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                  <i className="fas fa-sort mr-2"></i>
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select-field text-sm"
                >
                  <option value="date">Date (Newest)</option>
                  <option value="amount">Amount (Highest)</option>
                  <option value="category">Category</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expense List - Full Width */}
      <div className="mt-8">
        <ExpenseList
          expenses={expenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
          filterCategory={filterCategory}
          sortBy={sortBy}
                  currency={currency}
        />
      </div>
    </main>
  )
}

export default Dashboard
