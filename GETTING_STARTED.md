# Getting Started Guide - Expense Tracker

Welcome to the Expense Tracker! This guide will help you get started with the application in minutes.

## 📋 Prerequisites

- **Node.js** 16.x or higher
- **npm** 8.x or higher
- A modern web browser (Chrome, Firefox, Safari, Edge)

## 🚀 Installation & Running

### Step 1: Install Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including React, Vite, TailwindCSS, and Chart.js.

### Step 2: Start Development Server

```bash
npm run dev
```

Your browser will automatically open to `http://localhost:5173/` with the app running.

### Step 3: Start Using

You'll see the Expense Tracker interface with:
- Navigation bar at the top
- Expense form on the left
- Charts and expense list on the right

## 💡 First Steps

### Adding Your First Expense

1. **Enter Title**: Type what you spent on (e.g., "Coffee")
2. **Enter Amount**: Type the amount in dollars (e.g., 5.50)
3. **Select Category**: Choose from Food, Transport, Bills, Shopping, etc.
4. **Pick Date**: Select the date (defaults to today)
5. **Click "Add Expense"**: Your expense is saved!

The app will immediately:
- Add it to your expense list
- Update the pie chart
- Recalculate summary statistics
- Save to localStorage (persists after refresh)

### Viewing Your Data

**Summary Cards** at the top show:
- Total expenses spent
- Number of transactions
- Average expense amount
- Your top spending category

**Pie Chart** displays spending by category:
- Hover over segments to see percentages
- Helps identify spending patterns

**Line Chart** shows daily spending trends:
- Use the time range buttons (7d, 14d, 30d, 60d, 90d)
- Visualize spending over time
- Smooth animations as you add expenses

**Expense List** shows all transactions:
- Desktop: Clean table view
- Mobile: Easy-to-read card view
- Inline edit and delete buttons
- Sorting and filtering options

## 🔧 Common Tasks

### Edit an Expense

1. Click the **Edit** button (pencil icon) next to any expense
2. Update the form fields
3. Click **Update Expense**
4. Changes apply immediately

### Delete an Expense

1. Click the **Delete** button (trash icon)
2. Confirm in the popup dialog
3. Expense is removed instantly

### Filter Expenses

Use the **Filter by Category** dropdown to view spending in a specific category.

### Sort Expenses

Use the **Sort by** dropdown to arrange by:
- **Date** (newest first)
- **Amount** (highest first)
- **Category** (alphabetical)

### Export Data

Click **Export as CSV** to download your expenses as a spreadsheet file. Great for:
- Sharing with accountants
- Detailed analysis in Excel
- Creating backups

### Toggle Dark Mode

Click the **Moon/Sun icon** in the top-right corner to switch between light and dark modes. Your preference is saved automatically.

## 📱 Mobile Usage

The app is fully responsive:
- **Mobile**: Single-column layout, card view for expenses
- **Tablet**: Two-column layout
- **Desktop**: Full three-column layout with tables

All features work the same on any device!

## 💾 Data & Storage

### How Data Persists

- All data is saved in **localStorage** (browser's local storage)
- No server or backend required
- Data persists after closing the browser
- Works 100% offline

### Backup Your Data

To backup your data:
1. Click **Export as CSV**
2. Save the file to your computer
3. Keep it as a backup

To restore data, you would need to manually re-enter or import (currently manual entry).

### Clear Data

To delete all data:
1. Open Developer Tools (F12)
2. Go to Console tab
3. Type: `localStorage.clear()`
4. Press Enter
5. Refresh the page

⚠️ This cannot be undone!

## 🎨 Customization

### Changing Colors

Edit `tailwind.config.js` and modify the `colors` section:

```javascript
colors: {
  primary: { /* Change green to blue, red, etc. */ },
  secondary: { /* Change sky-blue */ },
}
```

Then restart dev server.

### Adding New Categories

Edit `src/utils/constants.js` and add to the `CATEGORIES` array:

```javascript
{ id: 'custom', label: 'My Category', icon: 'fas fa-star', color: 'bg-yellow-100...' }
```

### Changing Time Ranges

In `src/components/Dashboard.jsx`, modify:

```javascript
{[7, 14, 30, 60, 90].map(days => (
  // Add or remove numbers as needed
))}
```

## 🐛 Troubleshooting

### App not starting?

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Charts not showing?

- Check browser console (F12) for errors
- Clear localStorage: `localStorage.clear()`
- Refresh the page
- Add at least one expense

### Styles look wrong?

- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Restart dev server: `npm run dev`

### Data disappeared?

- Check if browser allows localStorage (not in private/incognito mode)
- Check if cookies are enabled
- Try a different browser

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `dist/` folder with optimized files.

To preview:

```bash
npm run preview
```

## 🚀 Deploying

You can deploy the `dist/` folder to:
- **Vercel**: Drag and drop the `dist` folder
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Upload `dist` contents
- **Any static hosting**: Just upload the `dist` folder

## 📚 Project Structure Quick Reference

```
src/
├── components/          # All React components
│   ├── Navbar.jsx      # Top navigation
│   ├── Dashboard.jsx   # Main layout
│   ├── ExpenseForm.jsx # Add/edit form
│   ├── ExpenseList.jsx # List of expenses
│   ├── PieChart.jsx    # Category chart
│   ├── LineChart.jsx   # Trend chart
│   ├── SummaryCards.jsx # Statistics
│   └── Modal.jsx       # Confirmation dialogs
├── hooks/
│   └── useTheme.js     # Dark/light mode logic
├── utils/
│   └── constants.js    # Categories, helpers
├── App.jsx             # Main app component
└── index.css           # Global styles
```

## 💪 Tips for Better Financial Tracking

1. **Be Consistent**: Log expenses daily or as you spend
2. **Use Categories**: Helps identify spending patterns
3. **Review Weekly**: Check the line chart for trends
4. **Set Goals**: Aim to reduce high categories
5. **Export & Analyze**: Use CSV export for deeper analysis

## 🤔 FAQ

**Q: Will my data sync across devices?**
A: No, data is stored locally. Use CSV export to move between devices.

**Q: Can I have multiple budgets?**
A: Currently no, but you could create separate browser profiles.

**Q: Is there a mobile app?**
A: It's a web app that works on mobile browsers. Install as PWA (coming soon).

**Q: How much data can I store?**
A: Browser localStorage typically allows 5-10MB (thousands of expenses).

## 📖 More Help

- Check the **README.md** for technical details
- Review component code - it's well-commented
- Open Developer Tools (F12) to inspect and debug

## 🎉 Ready to Go!

Your Expense Tracker is ready to use. Start adding expenses and gaining insights into your spending habits!

Happy tracking! 💰
