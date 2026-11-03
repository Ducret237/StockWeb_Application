import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access"); // Vérifie si le token d'accès est présent dans le stockage local

  return token
    ? children
    : <Navigate to="/login" />;
}

export default PrivateRoute;