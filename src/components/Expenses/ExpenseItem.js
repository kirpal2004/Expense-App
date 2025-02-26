import React from "react";
import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate.js";
import Card from "../UI/Card.js";

const ExpenseItem = (props) => {
  // Function to handle delete
  const deleteHandler = () => {
    props.onDelete(props.id);  // Call the delete function passed from parent (Expenses.js)
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={new Date(props.date)} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">₹ {props.amount}</div>
        <button onClick={deleteHandler} className="delete-button">Delete</button>
      </div>
    </Card>
  );
};

export default ExpenseItem;
