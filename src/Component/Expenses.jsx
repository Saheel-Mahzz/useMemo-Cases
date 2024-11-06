import React, { useMemo, useState } from "react";

const Expenses = () => {
  const [expenseData, setExpenseData] = useState({
    amount: "",
    category: "",
  });
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({ ...prev, [name]: value }));
  };
  // Function to add a new expense to the expenses list
  const handleAddExpense = () => {
    const amount = parseFloat(expenseData.amount); // Convert the input amount to a float
    const category = expenseData.category; // Get the selected category

    // Only add the expense if amount and category are valid
    if (amount && category) {
      const newExpense = {
        id: Date.now(),
        amount: amount,
        category: category,
      };
      setExpenses([...expenses, newExpense]);
      setExpenseData({
        amount: "",
        category: "",
      });
    }
  };
  // Memoized value to filter the expenses based on the selected category
  const filterExpenses = useMemo(() => {
    if (filter === "All") return expenses;

    return expenses.filter((expense) => expense.category === filter);
  }, [filter, expenses]); // Dependencies: Re-run when filter or expenses change

  // Memoized value to calculate the total of all expenses
  const totalExpense = useMemo(() => {
    return expenses.reduce((total, expense) => {
      return total + expense.amount;
    }, 0);
  }, [expenses]); // Recalculate total when expenses change
  console.log("This are the expense data:", expenseData);
  return (
    <div className="container">
      <div className="input-fields">
        <input
          type="text"
          placeholder="Enter a amount.."
          name="amount"
          value={expenseData.amount}
          onChange={handleChange}
        />
        <select
          onChange={handleChange}
          name="category"
          value={expenseData.category}
        >
          <option value="Category" selected>
            Category
          </option>
          <option value="Transport">Transport</option>
          <option value="Food">Food</option>
          <option value="Others">Others</option>
        </select>

        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      <div className="expenses-box">
        <ul className="filters">
          <li
            onClick={() => setFilter("All")}
            className={`${filter === "All" ? "filter-selected" : ""}`}
          >
            All
          </li>
          <li
            onClick={() => setFilter("Transport")}
            className={`${filter === "Transport" ? "filter-selected" : ""}`}
          >
            Transport
          </li>
          <li
            onClick={() => setFilter("Food")}
            className={`${filter === "Food" ? "filter-selected" : ""}`}
          >
            Food
          </li>
          <li
            onClick={() => setFilter("Others")}
            className={`${filter === "Others" ? "filter-selected" : ""}`}
          >
            Others
          </li>
        </ul>
        {filterExpenses.length > 0 ? (
          <ul className="expenses-list">
            {filterExpenses.map((expense) => (
              <li>
                {expense.category} - ${expense.amount}
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses are list for the category : {filter} </p>
        )}
        <h2>Total expense : ${totalExpense} </h2>
      </div>
    </div>
  );
};

export default Expenses;
