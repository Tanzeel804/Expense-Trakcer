# Expense Tracker - Modern Frontend Application

A **fully responsive, feature-rich expense tracking application** built with React, Vite, and TailwindCSS. Track your spending, visualize trends with interactive charts, and manage your finances effortlessly.

## 🌟 Features

### Core Functionality
- ✅ **Add, Edit, Delete Expenses** - Manage your expenses with a smooth, intuitive interface
- ✅ **Category-based Organization** - Pre-defined and custom categories with icons
- ✅ **Smart Filtering & Sorting** - Filter by category or sort by date, amount, or category
- ✅ **Data Persistence** - All data saved in localStorage, works offline
- ✅ **Dark/Light Mode** - Toggle between themes with persistent preference

### Analytics & Visualization
- 📊 **Interactive Pie Chart** - See spending distribution by category
- 📈 **Dynamic Line Chart** - Visualize spending trends (7, 14, 30, 60, 90 days)
- 💡 **Summary Dashboard** - Total expenses, average, transaction count, top category

### User Experience
- 🎨 **Modern Design** - Clean, minimalist UI with smooth animations
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Smooth Animations** - Fade-ins, slide-ups, and scale transitions
- ♿ **Accessible** - ARIA labels, focus states, keyboard navigation
- 📥 **Export Feature** - Download expenses as CSV

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository (or extract the project)
cd expense-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
expense-tracker/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # App header with theme toggle
│   │   ├── Dashboard.jsx        # Main layout component
│   │   ├── ExpenseForm.jsx      # Add/Edit expense form
│   │   ├── ExpenseList.jsx      # Expenses table/cards
│   │   ├── PieChart.jsx         # Category distribution chart
│   │   ├── LineChart.jsx        # Spending trend chart
│   │   ├── SummaryCards.jsx     # Statistics cards
│   │   └── Modal.jsx            # Confirmation modal
│   ├── hooks/
│   │   └── useTheme.js          # Dark/light mode hook
│   ├── utils/
│   │   └── constants.js         # Categories, helpers, formatters
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Tailwind + custom styles
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── postcss.config.js           # PostCSS configuration
```

## 🎯 Component Overview

### **Navbar.jsx**
- App title and branding
- Dark/light mode toggle with smooth transitions
- Sticky header for easy access

### **ExpenseForm.jsx**
- Input fields: Title, Amount, Category, Date
- Real-time validation with error messages
- Edit mode for updating existing expenses
- Submit and cancel actions

### **ExpenseList.jsx**
- Desktop: Responsive table with sorting
- Mobile: Card-based layout with swipe-friendly design
- Inline edit/delete buttons
- Delete confirmation modal
- Empty state message

### **PieChart.jsx**
- Dynamic doughnut chart using Chart.js
- Category-wise spending distribution
- Hover tooltips with percentage breakdown
- Smooth animations on data updates

### **LineChart.jsx**
- Line chart showing daily spending trends
- Configurable time ranges (7-90 days)
- Interactive tooltips and hover effects
- Dark/light mode aware styling

### **SummaryCards.jsx**
- 4 key metrics: Total, Count, Average, Top Category
- Animated cards with staggered entrance
- Icons and color-coded categories
- Responsive grid layout

### **Dashboard.jsx**
- Integrates all components in responsive grid
- Manages state for add/edit/delete operations
- Handles filtering and sorting logic
- Export to CSV functionality

## 🛠️ Technology Stack

- **React 18** - UI library
- **Vite 5** - Build tool
- **TailwindCSS 3** - Utility-first CSS
- **Chart.js 4** - Data visualization
- **FontAwesome 6.5** - Icon library
- **LocalStorage** - Data persistence

## 💾 Data Structure

Each expense is stored as:
```javascript
{
  id: 1234567890,
  title: "Grocery shopping",
  amount: 45.50,
  category: "food",
  date: "2025-11-29",
  createdAt: "2025-11-29T10:30:00.000Z"
}
```

## 🎨 Color Scheme

### Light Mode
- Background: `#f9fafb` (Gray-50)
- Card: `#ffffff` (White)
- Text: `#111827` (Gray-900)
- Primary: `#22c55e` (Green-500)
- Secondary: `#0ea5e9` (Sky-500)

### Dark Mode
- Background: `#111827` (Gray-900)
- Card: `#1f2937` (Gray-800)
- Text: `#f3f4f6` (Gray-100)
- Primary: `#22c55e` (Green-500)
- Secondary: `#0ea5e9` (Sky-500)

## 🔐 Features Details

### Input Validation
- Required fields: Title, Amount, Date
- Amount must be positive number
- Date cannot be in future
- Real-time validation with error feedback

### LocalStorage Strategy
- Auto-save on every expense change
- Load on app initialization
- Fallback to empty state if corrupted

### Responsive Breakpoints
- **Mobile**: < 640px (Single column)
- **Tablet**: 640px - 1024px (Two columns)
- **Desktop**: > 1024px (Three columns)

### Dark Mode Implementation
- CSS class-based toggle
- System preference detection
- Smooth color transitions
- Proper contrast ratios for accessibility

## ✨ Animations

- **fadeIn**: 300ms opacity transition
- **slideUp**: 300ms upward slide with fade
- **slideDown**: 300ms downward slide with fade
- **scaleIn**: 300ms scale with fade
- Chart animations: 800ms with easing

## 📊 Performance

- Memoized chart updates
- Optimized re-renders
- Chart destruction on unmount
- Lazy loading of icons
- Minified production build

## 🐛 Known Limitations & Future Enhancements

- No multi-user support (localStorage only)
- No sync across devices
- Optional: Budget goals and alerts
- Optional: Recurring expenses
- Optional: Receipt photo upload
- Optional: Multi-currency support

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

**Happy expense tracking! 💰**
