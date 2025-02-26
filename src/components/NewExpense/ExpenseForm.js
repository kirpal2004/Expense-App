import React, { useState } from "react";

import './ExpenseForm.css';

const ExpenseForm = (props) => {

    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredAmount, setEnteredAmount] = useState('');
    const [enteredDate, setEnteredDate] = useState('');

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    };
    const amountChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    };
    const dateChangeHandler = (event) => {
        setEnteredDate(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        // Ensure correct field names and data types
        const expenseData = {
            title: enteredTitle.trim(), // Remove extra spaces
            price: enteredAmount ? parseInt(enteredAmount, 10) : 0, // Convert amount to an integer
            date: enteredDate, // Keep YYYY-MM-DD format
        };

        console.log("🚀 Sending Data to Backend:", expenseData); // Debugging

        // Ensure no missing fields
        if (!expenseData.title || isNaN(expenseData.price) || !expenseData.date) {
            console.error("⚠️ Missing fields! Please check the form.");
            return;
        }

        props.onSaveExpenseData(expenseData);

        // Clear form fields
        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
    };


    return ( 
       <form onSubmit = { submitHandler } >
        <div className = "new-expense__controls" >
        <div className = "new-expense__control" >
        <label > Title </label> 
        <input type = "text"
        value = { enteredTitle }
        onChange = { titleChangeHandler }/> 
        </div > 
        <div className = "new-expense__control" >
        <label > Amount </label> 
        <input type = "number"
        value = { enteredAmount }
        min = "0.01"
        step = "0.01"
        onChange = { amountChangeHandler }/>
         </div > 
         <div className = "new-expense__control" >
        <label > Date </label>
         <input type = "date"
        value = { enteredDate }
        onChange = { dateChangeHandler }/> 
        </div >
         </div> <div className = "new-expense__actions" >
        <button type = "submit" > Add Expense </button> </div > </form>     
    );
}
export default ExpenseForm;