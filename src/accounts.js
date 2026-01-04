export default class Account {
  #transactions = [];
  #balance = 0;
  constructor(owner) {
    this.owner = owner;
    this.income = 0;
    this.expense = 0;
  }

  addTransaction(title, amount, category, date, type) {
    const transaction = { title, amount, category, date, type };

    this.#transactions.push(transaction);

    if (type === "income") {
      this.#balance += amount;
    } else if (type === "expense") {
      this.#balance -= amount;
    }
    return this;
  }

  getIncome() {
    return this.#transactions
      .filter((tx) => tx.type === "income")
      .reduce((total, tx) => total + tx.amount, 0);
  }

  getExpense() {
    return this.#transactions
      .filter((tx) => tx.type === "expense")
      .reduce((total, tx) => total + tx.amount, 0);
  }

  getBalance() {
    return this.#balance;
  }

  getCategoryBreakdown() {
    const expenses = this.#transactions.filter((tx) => tx.type === "expense");
    const totalExpense = expenses.reduce((sum, tx) => sum + tx.amount, 0);
    const categoryTotals = expenses.reduce((acc, cur) => {
      const { category, amount } = cur;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});

    const categoryPercentages = {};

    for (let cat in categoryTotals) {
      categoryPercentages[cat] = Math.round(
        (categoryTotals[cat] / totalExpense) * 100
      );
    }
    return categoryPercentages;
  }
  getTransactions() {
    return this.#transactions;
  }
}
