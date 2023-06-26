import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import AboutUsPage from "./pages/AboutUsPage";
// import AboutUsPage from "./pages/AboutUsPage";
import "./App.css";
import HabitFormPage from "./pages/HabitFormPage";
import HabitsListPage from "./pages/HabitsListPage";
import ShowHabitPage from "./pages/ShowHabitPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from './components/PrivateRoute';

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/habits/new">
              Create
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about-us">
              About Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/Login">
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container-xl text-center">
        <div className="row justify-content-center">
          <Routes>
            <PrivateRoute path="/habits/new" component={<HabitFormPage />} />
            <PrivateRoute path="/habits/:id" component={<ShowHabitPage />} />
            <PrivateRoute path="/" component={<HabitsListPage />} />
            
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;