import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { groupExpensesByCategory, getCategoryById, getChartColors, formatCurrency } from '../utils/constants'

Chart.register(...registerables)

const PieChart = ({ expenses, currency = undefined }) => {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || expenses.length === 0) return

    // Group expenses by category
    const grouped = groupExpensesByCategory(expenses)
    const categories = Object.keys(grouped)
    const amounts = Object.values(grouped)
    const colors = getChartColors()

    // Destroy previous chart if exists
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    // Create new chart
    const ctx = canvasRef.current.getContext('2d')
    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: categories.map(cat => getCategoryById(cat).label),
        datasets: [
          {
            data: amounts,
            backgroundColor: colors,
            borderColor: window.matchMedia('(prefers-color-scheme: dark)').matches
              ? '#1f2937'
              : '#ffffff',
            borderWidth: 2,
            hoverOffset: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 15,
              font: {
                size: 12,
              },
              color: window.matchMedia('(prefers-color-scheme: dark)').matches
                ? '#e5e7eb'
                : '#374151',
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: { size: 14 },
            bodyFont: { size: 13 },
            callbacks: {
                label: function (context) {
                const label = context.label || ''
                const value = context.parsed || 0
                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                const percentage = ((value / total) * 100).toFixed(1)
                return `${label}: ${formatCurrency(value, currency)} (${percentage}%)`
              },
            },
          },
        },
        animation: {
          animateRotate: true,
          animateScale: false,
          duration: 800,
        },
      },
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [expenses])

  return (
    <div className="card p-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <i className="fas fa-chart-pie text-primary-500"></i>
        Spending by Category
      </h2>
      {expenses.length === 0 ? (
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Add expenses to see the chart</p>
        </div>
      ) : (
        <div className="relative h-64">
          <canvas ref={canvasRef}></canvas>
        </div>
      )}
    </div>
  )
}

export default PieChart
