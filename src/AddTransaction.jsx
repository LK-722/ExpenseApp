import { useState } from "react";

export default function AddTransaction({ handleTransaction }) {
  const [isIcome, setIsIcome] = useState(true);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [categoryListIncomme, setCategoryListIncome] = useState([
    "Salary",
    "Sale",
    "Lottery",
    "Refunds",
    "Grants",
    "Awards",
  ]);
  const [categoryListExpense, setCategoryListExpense] = useState([
    "Travel",
    "Groceries",
    "Clothes",
    "Bills",
    "Entertainment",
    "Electronics",
    "Home",
    "Health",
    "Social",
    "Transportation",
    "Shopping",
  ]);

  function handleForm(e) {
    e.preventDefault();
    if (!title.trim() || !date || !category || !amount || amount <= 0) return;

    const newTransaction = {
      title: title,
      amount: Number(amount),
      date: date,
      category: category,
      type: isIcome ? "income" : "expense",
    };
    handleTransaction(newTransaction);
    setTitle("");
    setAmount("");
    setDate("");
    setCategory("");
  }

  return (
    <div className="transaction-body body-parts">
      <form className="transaction-form" onSubmit={handleForm}>
        {/* //Title */}
        <div className="title-section">
          <h3 className="titles-form">Title</h3>
          <input
            type="text"
            placeholder="Title"
            className="inputs-form"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* //Add amount */}
        <div>
          <h3 className="titles-form">Amount</h3>
          <div className="set-amount">
            <button
              type="button"
              onClick={() => setIsIcome(true)}
              className={`buttons amount-btn1 ${
                isIcome ? "income-positive" : ""
              } `}
            >
              Icome
            </button>
            <button
              type="button"
              onClick={() => setIsIcome(false)}
              className={`buttons amount-btn2 ${
                isIcome ? "" : "income-negitive"
              } `}
            >
              Expense
            </button>
            <input
              type="number"
              placeholder="Amount"
              className="inputs-form"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        {/* date and category  */}

        <div className="add-inputs">
          <div className="inputs">
            <h3 className="titles-form">Date & Time</h3>
            <input
              type="datetime-local"
              className="inputs-form"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="inputs">
            <h3 className="titles-form">Category</h3>
            <select
              className="inputs-form"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>select Category</option>
              {(isIcome ? categoryListIncomme : categoryListExpense).map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
              <select>add category</select>
            </select>
          </div>
        </div>

        <button className="expense-btn buttons" type="submit">
          Add expense
        </button>
      </form>
    </div>
  );
}
