import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SessionTimeout() {
  const navigate = useNavigate();

  useEffect(() => {
    const INACTIVITY_TIME = 10 * 60 * 1000;
    // 10 minutes

    let timeout;

    const logout = () => {
      const accessToken = localStorage.getItem("access");

      // On ne fait rien si personne n'est connecté
      if (!accessToken) {
        return;
      }

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      localStorage.setItem(
        "sessionMessage",
        "Votre session a été fermée après 10 minutes d'inactivité. Veuillez vous reconnecter pour continuer."
      );

      navigate("/login");
    };

    const resetTimer = () => {
      clearTimeout(timeout);

      const accessToken = localStorage.getItem("access");

      // Démarrer le compteur seulement
      // si l'utilisateur est connecté
      if (accessToken) {
        timeout = setTimeout(
          logout,
          INACTIVITY_TIME
        );
      }
    };

    const events = [ // Liste des événements qui réinitialisent le compteur
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(timeout);

      events.forEach((event) => {
        window.removeEventListener(
          event,
          resetTimer
        );
      });
    };
  }, [navigate]);

  return null;
}

export default SessionTimeout;