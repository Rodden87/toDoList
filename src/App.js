import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { BsSun, BsMoon } from "react-icons/bs";
import { getToken } from "./services/authService";
import "./App.css";

import LoginPage from "./LoginPage";
import Tasks from "./components/Tasks";
import { Container } from "./components/Container";

function App() {
  const [theme, setTheme] = useState("dark");
  const [userAuthenticated, setUserAuthenticated] = useState(!!getToken());

  useEffect(() => {
    // Cargar tema desde localStorage
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.body.classList.add(savedTheme);
  }, []);

  useEffect(() => {
    // Actualizar tema dinámicamente
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Router>
      <main className={`min-vh-100 d-flex flex-column align-items-center pt-4 ${theme}`}>
        <Container>
          <div className="d-flex justify-content-between align-items-center w-100 mb-4">
            <h2 className="text-center">📝 To-Do List App</h2>
            <button onClick={toggleTheme} className="btn btn-outline-secondary">
              {theme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
            </button>
          </div>
          
          <Routes>
            {/* Redirigir a Login si no está autenticado */}
            <Route 
              path="/" 
              element={userAuthenticated ? <Tasks setUserAuthenticated={setUserAuthenticated} /> : <Navigate to="/login" />} 
            />
            <Route path="/login" element={<LoginPage setUserAuthenticated={setUserAuthenticated} />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
