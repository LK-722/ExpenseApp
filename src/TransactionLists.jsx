import { useState } from "react";

export default function TransactionLists({ transactions, onDelete }) {
  const [sortBy, setSortBy] = useState("sort");
  let sortByList;
  if (sortBy === "sort") sortByList = transactions;
  if (sortBy === "description")
    sortByList = transactions
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
  if (sortBy === "category")
    sortByList = transactions
      .slice()
      .sort((a, b) => a.category.localeCompare(b.category));
  if (sortBy === "oldest")
    sortByList = transactions
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  if (sortBy === "newest")
    sortByList = transactions
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="transaction-list body-parts">
      <div className="list-titles">
        <div className="titles-covers">
          <h3 className="titles-form">Title</h3>
        </div>
        <div className="titles-covers">
          <h3 className="titles-form">Amount</h3>
        </div>
        <div className="titles-covers">
          <h3 className="titles-form">Category</h3>
        </div>
        <div className="titles-covers">
          <h3 className="titles-form">Date</h3>
        </div>
        <div className="titles-covers">
          <h3 className="titles-form">Transaction</h3>
        </div>

        <select
          className="filter-list"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="sort">Sort By</option>
          <option value="description">A-Z</option>
          <option value="category">Category</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <div className="list-section">
        <ul>
          {sortByList.map((item) => (
            <li key={item.id} className="trans-list">
              <div>
                <span>{item.title}</span>
              </div>
              <div>
                <span>{item.amount}</span>
              </div>
              <div>
                <span>{item.category}</span>
              </div>
              <div className="dateTime">
                {(() => {
                  const [datePart, timePart = ""] = (item.date || "").split(
                    "T"
                  );
                  return (
                    <>
                      <span>{datePart}</span>
                      <span>{timePart.slice(0, 5)}</span>
                    </>
                  );
                })()}
              </div>
              <div>
                <span>{item.type.toUpperCase()}</span>
              </div>
              <button className="delete-btn" onClick={() => onDelete(item.id)}>
                &#10005;
              </button>
            </li>
          ))}
        </ul>{" "}
      </div>
    </div>
  );
}
