# 💰 Personal Finance Tracker

🌐 **Live Demo:** [Click here](https://manyaa0909.github.io/finance-tracker)

A responsive web application to track personal income and expenses with category-wise filtering, real-time balance calculation, and visual expense breakdown using charts.


---

## 🚀 Features

- Add income and expense transactions with description, amount, and category
- Real-time summary showing Total Income, Total Expense, and Balance
- Filter transactions by category and type (Income/Expense)
- Dynamic pie chart showing expense breakdown by category
- Data persistence using localStorage — transactions survive page refresh
- Delete individual transactions
- Clean and responsive UI

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | CSS3 |
| Logic | JavaScript (ES6+) |
| Charts | Chart.js |
| Storage | localStorage |

---

## 📁 Project Structure

```
finance-tracker/
│
├── index.html        # Main HTML structure
├── style.css         # Styling and layout
└── script.js         # Application logic
```

---

## ⚙️ Setup & Installation

No installations or dependencies needed — runs directly in the browser.

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/finance-tracker.git
   ```

2. **Open the project**
   ```bash
   cd finance-tracker
   ```

3. **Run it**
   - Open `index.html` directly in your browser, or
   - Use VS Code Live Server extension for auto-refresh

---

## 📸 How to Use

1. **Add a Transaction**
   - Enter a description (e.g. "Monthly Salary")
   - Enter the amount
   - Select a category (Salary, Food, Rent, Transport, Entertainment, Other)
   - Select type (Income or Expense)
   - Click **Add Transaction**

2. **View Summary**
   - Total Income, Total Expense, and Balance update automatically at the top

3. **Filter Transactions**
   - Use the category and type dropdowns above the transaction list to filter

4. **View Expense Chart**
   - Pie chart updates automatically showing expense breakdown by category

5. **Delete a Transaction**
   - Click the 🗑 icon on any transaction to remove it

---

## 🗄️ Key Concepts Used

- **DOM Manipulation** — dynamically creating and updating HTML elements
- **Event Listeners** — handling button clicks and dropdown changes
- **Array Methods** — filter, forEach, reduce for data processing
- **localStorage** — persisting data across browser sessions
- **Chart.js Integration** — rendering dynamic pie charts
- **ES6 Features** — arrow functions, template literals, destructuring

---

## 🔮 Future Enhancements

- Add date picker for each transaction
- Monthly view with income vs expense bar chart
- Export transactions as CSV
- Budget limit alerts per category
- Dark mode toggle

---

## 👩‍💻 Author

**Manya Singh**

