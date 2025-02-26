import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import Login from "./Login";
import ExpensesPage from "./ExpensesPage.js";

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true); // ✅ Prevent unnecessary redirects

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        if (!user || user.uid !== currentUser.uid) { // ✅ Store only if changed
          setUser(currentUser);
          localStorage.setItem("user", JSON.stringify(currentUser));
        }
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false); // ✅ Ensure loading state is updated
    });

    return () => unsubscribe();
  }, [user]); // ✅ Add `user` dependency to track changes

  if (loading) {
    return <p>Loading...</p>; // ✅ Prevent unnecessary redirects on first load
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={user ? <ExpensesPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

export default App;
