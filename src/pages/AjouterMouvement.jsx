import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AjouterMouvement() {
  const navigate = useNavigate();

  const [produits, setProduits] = useState([]);

  const [produit, setProduit] = useState("");
  const [typeMouvement, setTypeMouvement] = useState("");
  const [quantite, setQuantite] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    async function chargerProduits() {
      try {
        const response = await api.get("produits/");
        setProduits(response.data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des produits :",
          error
        );
      }
    }

    chargerProduits();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      await api.post("mouvements/", {
        type_mouvement: typeMouvement,
        quantite: quantite,
        produit: produit,
      });

      alert("Mouvement enregistré avec succès.");

      navigate("/mouvements");
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du mouvement :",
        error
      );

      if (error.response?.data?.quantite) {
        const message = error.response.data.quantite;

        if (Array.isArray(message)) {
          setError(message[0]);
        } else {
          setError(message);
        }
      } else {
        setError(
          "Impossible d'enregistrer le mouvement."
        );
      }
    }
  }

  return (
    <div>
      <h1>Enregistrer un mouvement</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Produit :</label>
          <br />

          <select
            value={produit}
            onChange={(event) =>
              setProduit(event.target.value)
            }
            required
          >
            <option value="">
              Sélectionner un produit
            </option>

            {produits.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.nom} - Stock : {item.quantite}
              </option>
            ))}
          </select>
        </div>

        <br />

        <div>
          <label>Type de mouvement :</label>
          <br />

          <select
            value={typeMouvement}
            onChange={(event) =>
              setTypeMouvement(event.target.value)
            }
            required
          >
            <option value="">
              Sélectionner le type
            </option>

            <option value="ENTREE">
              Entrée
            </option>

            <option value="SORTIE">
              Sortie
            </option>
          </select>
        </div>

        <br />

        <div>
          <label>Quantité :</label>
          <br />

          <input
            type="number"
            min="1"
            value={quantite}
            onChange={(event) =>
              setQuantite(event.target.value)
            }
            required
          />
        </div>

        <br />

        {error && (
          <p>{error}</p>
        )}

        <button type="submit">
          Enregistrer le mouvement
        </button>
      </form>
    </div>
  );
}

export default AjouterMouvement;