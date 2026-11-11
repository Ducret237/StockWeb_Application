import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  }

  return (
    <div>
      <h1>Tableau de bord</h1>

      <p>Bienvenue dans StockManager.</p>

      <p>
        Cette page est réservée aux utilisateurs authentifiés.
      </p>

      <button onClick={handleLogout}>
        Déconnexion
      </button>
    </div>
  );
}

export default Dashboard;