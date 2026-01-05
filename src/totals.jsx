export default function Totals({ transactions }) {
  const totalIncome = transactions
    .slice()
    .filter((trans) => trans.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions
    .slice()
    .filter((trans) => trans.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalBalance = Math.abs(totalExpense - totalIncome);

  return (
    <div className="totals body-parts">
      <ul className="totals-list">
        <li>
          <span>Total balance</span> <span>${totalBalance}</span>
        </li>
        <li>
          <span>Total Income</span> <span>${totalIncome}</span>
        </li>
        <li>
          <span>Total Expense</span> <span>${totalExpense}</span>
        </li>
      </ul>
      <div className="category">Category</div>
    </div>
  );
}
