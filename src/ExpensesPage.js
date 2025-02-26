import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "./firebase";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import Drawer from "@mui/material/Drawer";
import { IconButton, Tooltip, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeToggle from "./components/DarkModeToggle";
import "./ExpensesPage.css";

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalMonthlyExpense, setTotalMonthlyExpense] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  // 🔐 Redirect to login if user is not authenticated
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) navigate("/login");
    });
    return () => unsubscribe();
  }, [navigate]);

  // 🔄 Fetch Expenses from API
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost/read.php");
      const data = await response.json();

      console.log("📤 Fetch Response:", data);

      if (data.status === "success" && Array.isArray(data.data)) {
        setExpenses(data.data);
      } else {
        console.error("❌ Invalid response format:", data);
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🔢 Calculate Total Expense for Selected Date
  useEffect(() => {
    if (selectedDate) {
      const total = expenses
        .filter((expense) => {
          console.log("Comparing:", expense.date, "with", selectedDate);
          return expense.date === selectedDate;
        })
        .reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);
      setTotalExpense(total);
    } else {
      setTotalExpense(0);
    }
  }, [selectedDate, expenses]);

  // 🔢 Calculate Total Expense for Selected Month
  useEffect(() => {
    if (selectedMonth) {
      const totalMonthly = expenses
        .filter((expense) => {
          console.log("Checking Month:", expense.date, "Starts with:", selectedMonth);
          return expense.date.startsWith(selectedMonth);
        })
        .reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);
      setTotalMonthlyExpense(totalMonthly);
    } else {
      setTotalMonthlyExpense(0);
    }
  }, [selectedMonth, expenses]);

  // 🆕 Add Expense
  const addExpenseHandler = async (expenseData) => {
    try {
      const response = await fetch("http://localhost/insert.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });

      const result = await response.json();
      console.log("📥 Insert Response:", result);

      if (result.status === "success" && result.data) {
        if (!result.data.id) {
          console.error("❌ API did not return expected data format:", result);
          return;
        }

        setExpenses((prevExpenses) => [...prevExpenses, result.data]);
        fetchData();
      } else {
        console.error("❌ Insert Failed:", result);
      }
    } catch (error) {
      console.error("❌ Insert Error:", error);
    }
  };

  // 🗑️ Delete Expense
  const deleteExpenseHandler = async (id) => {
    try {
      const response = await fetch("http://localhost/delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const result = await response.json();
      console.log("🗑️ Delete Response:", result);

      if (result.status === "success") {
        setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== id));
        fetchData();
      } else {
        console.error("❌ Delete Failed:", result);
      }
    } catch (error) {
      console.error("❌ Delete Error:", error);
    }
  };

  return (
    <div className="app-container">
      <NewExpense onAddExpense={addExpenseHandler} expenses={expenses} />

      <Button variant="contained" color="primary" onClick={() => { logout(); navigate("/login"); }}>
        Logout
      </Button>

      <Tooltip title="Filter">
        <IconButton onClick={() => setIsDrawerOpen(true)} className="menu-button">
          <MenuIcon style={{ fontSize: "65px", color: "Highlight" }} />
        </IconButton>
      </Tooltip>

      <Drawer anchor="left" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="drawer-content">
          <h2>Filter Expenses</h2>
          
          <div className="date-picker">
            <label>Select Date:</label>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </div>
          <h2>Total Expense for {selectedDate || "N/A"}: ₹{totalExpense}</h2>

          <div className="month-picker">
            <label>Select Month:</label>
            <input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
          </div>
          <h2>Total Expense for {selectedMonth || "N/A"}: ₹{totalMonthlyExpense}</h2>

          <Button variant="contained" color="secondary" onClick={() => setIsDrawerOpen(false)}>
            Close
          </Button>
        </div>
      </Drawer>

      <DarkModeToggle />
      <Expenses item={expenses} onDeleteExpense={deleteExpenseHandler} />
    </div>
  );
};

export default ExpensesPage;
