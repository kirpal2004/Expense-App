import React, { useState, useEffect } from "react";
import "./Expenses.css";
import ExpenseItem from "./ExpenseItem";
import Card from "../UI/Card.js";

const Expenses = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [expenses, setExpenses] = useState(props.item || []);

  useEffect(() => {
    console.log("📤 Fetch Response:", props.item);
    setExpenses(props.item || []);
  }, [props.item]);

  // 🔍 Filter expenses by title, date, or amount
  const filteredExpenses = (expenses || []).filter((expense) => {
    if (!expense) return false;

    const title = (expense.title || "").toLowerCase();
    const date = expense.date ? new Date(expense.date).toISOString().split("T")[0] : "";
    const amount = expense.amount ? expense.amount.toString() : "";

    return (
      title.includes(searchTerm.toLowerCase()) ||
      date.includes(searchTerm) ||
      amount.includes(searchTerm)
    );
  });

  // 🔽 Sort expenses (handle undefined values)
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === "amount") return parseFloat(a.amount || 0) - parseFloat(b.amount || 0);
    if (sortBy === "date") return new Date(a.date || 0) - new Date(b.date || 0);
    if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
    return 0;
  });

  return (
    <Card className="expenses">
      <input
        type="text"
        placeholder="Search expenses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort By</option>
        <option value="amount">Amount</option>
        <option value="date">Date</option>
        <option value="title">Title</option>
      </select>

      {sortedExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        sortedExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            id={expense.id}
            date={expense.date}
            title={expense.title}
            amount={expense.amount}
            onDelete={() => props.onDeleteExpense(expense.id)}
          />
        ))
      )}
    </Card>
  );
};

export default Expenses;
