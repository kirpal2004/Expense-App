import { useEffect, useState } from "react";
import "./ExpensesByMonth.css";

const ExpenseByMonth = (expenses) => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [totalMonthlyExpense, setTotalMonthlyExpense] = useState(0);

    useEffect(() => {
        if (selectedMonth) {
            const total = expenses
                .filter((exp) => exp.date.startsWith(selectedMonth))
                .reduce((sum, exp) => sum + parseInt(exp.price, 10), 0);

            setTotalMonthlyExpense(total);
        }
    }, [selectedMonth, expenses]);

    return ( 
        <div className = "month-picker" >
        
        <label> Select Month: </label> 
        <input type = "month"
        value = { selectedMonth }
        onChange = { (e) => setSelectedMonth(e.target.value) }/> 
        {
            selectedMonth && ( 
                <h2 className = "total-expense" >
                Total Expense
                for < span className = "highlight" > { selectedMonth } </span>: ₹{totalMonthlyExpense} 
                </h2>
            )
        } 
        <ExpenseByMonth/>
        </div>
        
    );
};

export default ExpenseByMonth;