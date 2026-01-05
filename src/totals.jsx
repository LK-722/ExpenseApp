import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function Totals({ transactions }) {
  const totalIncome = transactions
    .slice()
    .filter((trans) => trans.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions
    .slice()
    .filter((trans) => trans.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const totalBalance = totalIncome - totalExpense;

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [totalIncome, totalExpense],
        backgroundColor: ["#008000", "#ff0000"],
        borderWidth: 0,
        cutout: "55%",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        color: "#111",
        font: { weight: "600", size: 12 },
        formatter: (value, ctx) => {
          const dataArr = ctx.chart.data.datasets[0].data;
          const total = dataArr.reduce((a, b) => a + b, 0);
          if (!total) return "0%";
          return `${Math.round((value / total) * 100)}%`;
        },
      },
    },
  };

  return (
    <div className="totals body-parts">
      <ul className="totals-list">
        <li className={`total ${totalBalance >= 0 ? "positive" : "negative"}`}>
          <span>Total balance </span>
          <span>
            {totalBalance > 0
              ? `$${totalBalance}`
              : `-$${Math.abs(totalBalance)}`}
          </span>
        </li>
        <li className="total-income">
          <span>Total Income</span> <span>${totalIncome}</span>
        </li>
        <li className="total-expense">
          <span>Total Expense</span> <span>${totalExpense}</span>
        </li>
      </ul>
      <div className="chart-wrap">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
