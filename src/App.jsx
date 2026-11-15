import { Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Produits from "./pages/Produits";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Fournisseurs from "./pages/Fournisseurs";
import MouvementStock from "./pages/MouvementStock";

import PrivateRoute from "./components/PrivateRoute";
import AjouterProduit from "./pages/AjouterProduit";
import ModifierProduit from "./pages/ModifierProduit";
import AjouterCategorie from "./pages/AjouterCategorie";
import ModifierCategorie from "./pages/ModifierCategorie";
import AjouterFournisseur from "./pages/AjouterFournisseur";
import ModifierFournisseur from "./pages/ModifierFournisseur";
import AjouterMouvement from "./pages/AjouterMouvement";

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
        {" | "}
        <Link to="/categories">Catégories</Link>
        {" | "}
        <Link to="/fournisseurs">Fournisseurs</Link>
        {" | "}
        <Link to="/mouvements">Mouvements</Link>
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
        <Route
          path="/categories"
          element={<Categories />}
        />
        <Route
         path="/categories/ajouter"
         element={
          <PrivateRoute>
            <AjouterCategorie />
          </PrivateRoute>
          }
        />
        <Route
          path="/categories/:id/modifier"
          element={
         <PrivateRoute>
           <ModifierCategorie />
         </PrivateRoute>
         }
        />
        <Route
          path="/fournisseurs"
          element={
        <PrivateRoute>
          <Fournisseurs />
        </PrivateRoute>
         }
        />
      <Route
        path="/fournisseurs/ajouter"
        element={
        <PrivateRoute>
         <AjouterFournisseur />
        </PrivateRoute>
        }
      />
      <Route
        path="/fournisseurs/:id/modifier"
        element={
        <PrivateRoute>
          <ModifierFournisseur />
        </PrivateRoute>
       }
      />
      <Route
        path="/mouvements"
        element={
        <PrivateRoute>
          <MouvementStock />
        </PrivateRoute>
        }
        
      />
      <Route
        path="/mouvements/ajouter"
        element={
          <PrivateRoute>
            <AjouterMouvement />
          </PrivateRoute>
        }
      />
      </Routes>
    </div>
  );
}

export default App;