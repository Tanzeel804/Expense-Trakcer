import { useState } from 'react'
import { CATEGORIES } from '../utils/constants'

const ExpenseForm = ({ onSubmit, initialData = null, onCancel = null }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
      amount: '',
      category: 'food',
      date: new Date().toISOString().split('T')[0],
    }
  )
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount is required'
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number'
    }

    if (!formData.date) {
      newErrors.date = 'Date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
    })

    // Reset form if not editing
    if (!initialData) {
      setFormData({
        title: '',
        amount: '',
        category: 'food',
        date: new Date().toISOString().split('T')[0],
      })
    }
    setErrors({})
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 animate-slideUp">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <i className="fas fa-plus-circle text-primary-500"></i>
        {initialData ? 'Edit Expense' : 'Add Expense'}
      </h2>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Expense Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Grocery shopping"
            className={`input-field ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
            autoFocus
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className={`input-field ${errors.amount ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select-field"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`input-field ${errors.date ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          type="submit"
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          <i className="fas fa-check"></i>
          {initialData ? 'Update' : 'Add'} Expense
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-outline flex-1 flex items-center justify-center gap-2"
          >
            <i className="fas fa-times"></i>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default ExpenseForm
