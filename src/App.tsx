import React from "react";
import Login from "./page/llogin";
import Dashboard from "./page/Dashboard";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./page/Register";
import ProtectedRoute from "./components/layout/protect/ProtectedRoute";
import Routers from "./route/Routers";

const App: React.FC = () => {
  return <Routers />;
};

export default App;
