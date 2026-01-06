import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import "./style.css";
import AddTransaction from "./AddTransaction";
import Totals from "./totals";
import TransactionLists from "./TransactionLists";

const STORAGE_KEY = "expenseapp:transactions";

function loadTransactions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.warn("Failed to load saved transactions", err);
    return [];
  }
}

function App() {
  const [transactions, setTransactions] = useState(loadTransactions);

  function handleDelete(id) {
    setTransactions((txs) => txs.filter((t) => t.id !== id));
  }

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (err) {
      console.warn("Failed to save transactions", err);
    }
  }, [transactions]);

  function handleTransaction(newTransaction) {
    setTransactions((transactions) => [...transactions, newTransaction]);
  }

  return (
    <>
      <h1 className="heading">The Expense App</h1>
      <div id="roott">
        {/* ///Add expense */}
        <AddTransaction handleTransaction={handleTransaction} />

        {/* To add date and catogory */}

        {/* totals  */}
        <Totals transactions={transactions} />

        {/* slips */}
        <TransactionLists transactions={transactions} onDelete={handleDelete} />
      </div>{" "}
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
