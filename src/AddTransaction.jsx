import { useState } from "react";

export default function AddTransaction({ handleTransaction }) {
  const [isIcome, setIsIcome] = useState(true);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

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
    <form className="transaction-form" onSubmit={handleForm}>
      {/* //Title */}
      <div className="">
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
        <div>
          <button type="button" onClick={() => setIsIcome(true)}>
            Icome
          </button>
          <button type="button" onClick={() => setIsIcome(false)}>
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
        <div>
          <h3 className="titles-form">Date</h3>
          <input
            type="date"
            className="inputs-form"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <h3 className="titles-form">Category</h3>
          <select
            className="inputs-form"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>select Category</option>
            <option>Travel</option>
            <option>Groceries</option>
          </select>
        </div>
      </div>

      <button className="expense-btn" type="submit">
        Add expense
      </button>
    </form>
  );
}
