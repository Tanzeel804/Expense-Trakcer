import { useEffect, useRef } from 'react'
import { Chart, registerables } from 'chart.js'
import { formatDate } from '../utils/constants'

Chart.register(...registerables)

const LineChart = ({ expenses, timeRange = 30 }) => {
  const canvasRef = useRef(null)
  const chartRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current || expenses.length === 0) return

    // Get date range
    const today = new Date()
    const startDate = new Date(today.getTime() - timeRange * 24 * 60 * 60 * 1000)

    // Initialize daily totals
    const dailyTotals = {}
    for (let i = timeRange; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000)
      const dateStr = date.toISOString().split('T')[0]
      dailyTotals[dateStr] = 0
    }

    // Fill in actual expenses
    expenses.forEach(expense => {
      const expenseDate = new Date(expense.date).toISOString().split('T')[0]
      if (expenseDate in dailyTotals) {
        dailyTotals[expenseDate] += expense.amount
      }
    })

    const dates = Object.keys(dailyTotals).sort()
    const amounts = dates.map(date => dailyTotals[date])

    // Destroy previous chart if exists
    if (chartRef.current) {
      chartRef.current.destroy()
    }

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const textColor = isDark ? '#e5e7eb' : '#374151'
    const gridColor = isDark ? '#374151' : '#e5e7eb'

    // Create new chart
    const ctx = canvasRef.current.getContext('2d')
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates.map(date => {
          const d = new Date(date)
          return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }),
        datasets: [
          {
            label: 'Daily Spending',
            data: amounts,
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            borderWidth: 3,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: '#22c55e',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            labels: {
              color: textColor,
              font: { size: 12 },
              padding: 15,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: { size: 14 },
            bodyFont: { size: 13 },
            callbacks: {
              label: function (context) {
                return `Spent: $${context.parsed.y.toFixed(2)}`
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: gridColor,
            },
            ticks: {
              color: textColor,
              callback: function (value) {
                return '$' + value.toFixed(0)
              },
            },
          },
          x: {
            grid: {
              color: gridColor,
            },
            ticks: {
              color: textColor,
            },
          },
        },
        animation: {
          duration: 800,
        },
      },
    })

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [expenses, timeRange])

  return (
    <div className="card p-6 animate-fadeIn">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <i className="fas fa-chart-line text-secondary-500"></i>
        Spending Trends ({timeRange} Days)
      </h2>
      {expenses.length === 0 ? (
        <div className="h-72 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Add expenses to see the trend</p>
        </div>
      ) : (
        <div className="relative h-72">
          <canvas ref={canvasRef}></canvas>
        </div>
      )}
    </div>
  )
}

export default LineChart
