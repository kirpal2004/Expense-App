import React, { useEffect, useState } from "react";
import "./ExpensesByDate.css";

const ExpensesByDate = (expenses) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    if (selectedDate) {
      const total = expenses
        .filter((exp) => exp.date === selectedDate)
        .reduce((sum, exp) => sum + parseInt(exp.price, 10), 0);

      setTotalExpense(total);
    }
  }, [selectedDate, expenses]);

  return (
    <div className="date-expense-container">
      <label>Select Date:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      {selectedDate && (
        <h2 className="total-expense">
          Total Expense for <span className="highlight">{selectedDate}</span>: ₹{totalExpense}
        </h2>
      )}
      <ExpensesByDate/>
    </div>
   
    
  );
};

export default ExpensesByDate;
