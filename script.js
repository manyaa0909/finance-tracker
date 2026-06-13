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

}

// This function renders the transaction list on screen
function renderTransactions() {
    transactionList.innerHTML = '';

    transactions.forEach((t, index) => {
        const li = document.createElement('li');
        li.classList.add(t.type === 'income' ? 'income-item' : 'expense-item');
        li.innerHTML = `
            <span>${t.description}</span>
            <span>${t.type === 'income' ? '+' : '-'}₹${t.amount}</span>
            <button class="delete-btn" onclick="deleteTransaction(${index})">🗑</button>
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
        type:type
    };

    // Add to array and re-render
    transactions.push(transaction);
    renderTransactions();

    // Clear the inputs
    descriptionInput.value = '';
    amountInput.value = '';
}

// This function deletes a transaction by index
function deleteTransaction(index) {
    transactions.splice(index, 1);
    renderTransactions();
}

// Listen for button click
addBtn.addEventListener('click', addTransaction);