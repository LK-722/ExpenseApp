import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import "./style.css";
import AddTransaction from "./AddTransaction";
import Totals from "./totals";
import TransactionLists from "./TransactionLists";

function App() {
  const [transactions, setTransactions] = useState([]);

  function handleTransaction(newTransaction) {
    setTransactions((transactions) => [...transactions, newTransaction]);
  }

  return (
    <div id="roott">
      {/* ///Add expense */}
      <AddTransaction handleTransaction={handleTransaction} />

      {/* To add date and catogory */}

      {/* totals  */}
      <Totals transactions={transactions} />

      {/* slips */}
      <TransactionLists transactions={transactions} />
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
