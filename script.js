// Store all transactions in an array
let transactions = [];

// Get all the HTML elements we need
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeSelect = document.getElementById('type');
const addBtn = document.getElementById('add-btn');
const transactionList = document.getElementById('transaction-list');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const balance = document.getElementById('balance');
const categorySelect = document.getElementById('category');
const filterCategory = document.getElementById('filter-category');
const filterType = document.getElementById('filter-type');
let expenseChart = null;
// This function runs every time we add or delete a transaction
function updateSummary() {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const balanceAmount = income - expense;
  
    totalIncome.textContent = '₹' + income;
    totalExpense.textContent = '₹' + expense;
    balance.textContent = (balanceAmount < 0 ? '-₹' : '₹') + Math.abs(balanceAmount);
    updateChart();

}
function updateChart() {
    // Get only expense transactions
    const expenses = transactions.filter(t => t.type === 'expense');

    // Group by category and sum amounts
    const categoryTotals = {};
    expenses.forEach(t => {
        if (categoryTotals[t.category]) {
            categoryTotals[t.category] += t.amount;
        } else {
            categoryTotals[t.category] = t.amount;
        }
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'];

    // If chart already exists destroy it before redrawing
    if (expenseChart) {
        expenseChart.destroy();
    }

    // If no expenses show nothing
    if (labels.length === 0) return;

    const ctx = document.getElementById('expense-chart').getContext('2d');
    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// This function renders the transaction list on screen
function renderTransactions() {
    const selectedCategory = filterCategory.value;
    const selectedType = filterType.value;

    const filtered = transactions.filter(t => {
        const categoryMatch = selectedCategory === 'all' || t.category === selectedCategory;
        const typeMatch = selectedType === 'all' || t.type === selectedType;
        return categoryMatch && typeMatch;
    });

    transactionList.innerHTML = '';

    filtered.forEach((t, index) => {
        const li = document.createElement('li');
        li.classList.add(t.type === 'income' ? 'income-item' : 'expense-item');
        li.innerHTML = `
            <span>${t.description} <small>(${t.category})</small></span>
            <span>${t.type === 'income' ? '+' : '-'}₹${t.amount}</span>
            <button class="delete-btn" onclick="deleteTransaction(${transactions.indexOf(t)})">🗑</button>
        `;
        transactionList.appendChild(li);
    });

    updateSummary();
}

// This function adds a new transaction
function addTransaction() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;
    const category = categorySelect.value;

    // Basic validation
    if (description === '') {
        alert('Please enter a description');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }

    // Create transaction object
    const transaction = {
        id: Date.now(),
        description:description,
        amount:amount,
        type:type,
        category:category
    };

    // Add to array and re-render
    transactions.push(transaction);
    
    renderTransactions();
    saveToLocalStorage();

    // Clear the inputs
    descriptionInput.value = '';
    amountInput.value = '';
}

// This function deletes a transaction by index
function deleteTransaction(index) {
    transactions.splice(index, 1);
    renderTransactions();
    saveToLocalStorage();
}

// Listen for button click
addBtn.addEventListener('click', addTransaction);

// Save transactions to localStorage
function saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
function loadDefaultTransactions() {
    const defaultTransactions = [
        { id: 1, description: 'Monthly Salary', amount: 50000, type: 'income', category: 'salary' },
        { id: 2, description: 'Groceries', amount: 3000, type: 'expense', category: 'food' },
        { id: 3, description: 'Rent', amount: 15000, type: 'expense', category: 'rent' },
        { id: 4, description: 'Metro Card', amount: 500, type: 'expense', category: 'transport' },
        { id: 5, description: 'Netflix', amount: 649, type: 'expense', category: 'entertainment' }
    ];
    transactions = defaultTransactions;
    saveToLocalStorage();
    renderTransactions();
}

// Load transactions from localStorage
function loadFromLocalStorage() {
    const saved = localStorage.getItem('transactions');
    if (saved) {
        transactions = JSON.parse(saved);
        renderTransactions();
    } else {
        // No data found so load defaults
        loadDefaultTransactions();
    }
}

// Load saved transactions when page opens
loadFromLocalStorage();

filterCategory.addEventListener('change', renderTransactions);
filterType.addEventListener('change', renderTransactions);