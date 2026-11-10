import { Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Produits from "./pages/Produits";
import Dashboard from "./pages/Dashboard";

import PrivateRoute from "./components/PrivateRoute";
import AjouterProduit from "./pages/AjouterProduit";
import ModifierProduit from "./pages/ModifierProduit";

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
        {" | "}
        <Link to="/produits/ajouter">Ajouter un produit</Link>
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

        <Route
          path="/produits/ajouter"
          element={
            <PrivateRoute>
             <AjouterProduit />
            </PrivateRoute>
          }
        />
        <Route
          path="/produits/:id/modifier"
          element={
            <PrivateRoute>
              <ModifierProduit />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;