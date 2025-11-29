import { useState } from 'react'
import { formatCurrency, formatDate, getCategoryById } from '../utils/constants'
import Modal from './Modal'

const ExpenseList = ({ expenses, onEdit, onDelete, filterCategory = null, sortBy = 'date' }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  // Filter expenses
  const filteredExpenses = filterCategory
    ? expenses.filter(exp => exp.category === filterCategory)
    : expenses

  // Sort expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date)
    } else if (sortBy === 'amount') {
      return b.amount - a.amount
    } else if (sortBy === 'category') {
      return a.category.localeCompare(b.category)
    }
    return 0
  })

  const handleDeleteClick = (id) => {
    setDeleteConfirm(id)
  }

  const handleConfirmDelete = (id) => {
    onDelete(id)
    setDeleteConfirm(null)
  }

  if (sortedExpenses.length === 0) {
    return (
      <div className="card p-8 text-center animate-fadeIn">
        <i className="fas fa-inbox text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          {filterCategory ? 'No expenses in this category' : 'No expenses yet. Add one to get started!'}
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="card overflow-hidden animate-fadeIn">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i className="fas fa-list text-secondary-500"></i>
            Expense List
          </h2>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedExpenses.map(expense => {
                const category = getCategoryById(expense.category)
                return (
                  <tr
                    key={expense.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-smooth"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900 dark:text-white">{expense.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                        <i className={category.icon}></i>
                        {category.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(expense.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 dark:text-gray-400">
                        {formatDate(expense.date)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onEdit(expense)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-smooth"
                          title="Edit expense"
                          aria-label={`Edit ${expense.title}`}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(expense.id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-smooth"
                          title="Delete expense"
                          aria-label={`Delete ${expense.title}`}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
          {sortedExpenses.map(expense => {
            const category = getCategoryById(expense.category)
            return (
              <div
                key={expense.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-smooth animate-slideUp"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{expense.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {formatDate(expense.date)}
                    </p>
                  </div>
                  <span className="font-bold text-primary-600 dark:text-primary-400 text-lg">
                    {formatCurrency(expense.amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                    <i className={category.icon}></i>
                    {category.label}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(expense)}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-smooth"
                      title="Edit expense"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(expense.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-smooth"
                      title="Delete expense"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm !== null && (
        <Modal
          title="Delete Expense?"
          message="Are you sure you want to delete this expense? This action cannot be undone."
          onConfirm={() => handleConfirmDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
          confirmText="Delete"
          confirmClass="btn-danger"
        />
      )}
    </>
  )
}

export default ExpenseList
