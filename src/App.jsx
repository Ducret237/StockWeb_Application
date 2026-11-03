import { Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Produits from "./pages/Produits";
import Dashboard from "./pages/Dashboard";

import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Accueil</Link>
        {" | "}
        <Link to="/login">Connexion</Link>
        {" | "}
        <Link to="/produits">Produits</Link>
        {" | "}
        <Link to="/dashboard">Tableau de bord</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/produits"
          element={<Produits />}
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;