import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

function ModifierProduit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);

  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [quantite, setQuantite] = useState("");
  const [categorie, setCategorie] = useState("");
  const [fournisseur, setFournisseur] = useState("");

  useEffect(() => { 
    async function chargerDonnees() {
      try {
        const responseProduit = await api.get(`produits/${id}/`);

        const produit = responseProduit.data;

        setNom(produit.nom);
        setDescription(produit.description);
        setPrix(produit.prix);
        setQuantite(produit.quantite);
        setCategorie(produit.categorie);
        setFournisseur(produit.fournisseur);
      } catch (error) {
        console.error(
          "Erreur lors du chargement du produit :",
          error
        );
      }

      try { 
        const responseCategories = await api.get("categories/");
        setCategories(responseCategories.data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des catégories :",
          error
        );
      }

      try {
        const responseFournisseurs =
          await api.get("fournisseurs/");

        setFournisseurs(responseFournisseurs.data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des fournisseurs :",
          error
        );
      }
    }

    chargerDonnees();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.put(`produits/${id}/`, {
        nom,
        description,
        prix,
        quantite,
        categorie,
        fournisseur,
      });

      alert("Produit modifié avec succès.");

      navigate("/produits");
    } catch (error) {
      console.error(
        "Erreur lors de la modification du produit :",
        error
      );

      alert("Impossible de modifier le produit.");
    }
  }

  return (
    <div>
      <h1>Modifier le produit</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <br />
          <input
            type="text"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Description :</label>
          <br />
          <textarea
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
          />
        </div>

        <br />

        <div>
          <label>Prix :</label>
          <br />
          <input
            type="number"
            step="0.01"
            value={prix}
            onChange={(event) => setPrix(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Quantité :</label>
          <br />
          <input
            type="number"
            value={quantite}
            onChange={(event) =>
              setQuantite(event.target.value)
            }
            required
          />
        </div>

        <br />

        <div>
          <label>Catégorie :</label>
          <br />
          <select
            value={categorie}
            onChange={(event) =>
              setCategorie(event.target.value)
            }
            required
          >
            <option value="">
              Sélectionner une catégorie
            </option>

            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nom}
              </option>
            ))}
          </select>
        </div>

        <br />

        <div>
          <label>Fournisseur :</label>
          <br />

          <select
            value={fournisseur}
            onChange={(event) =>
              setFournisseur(event.target.value)
            }
            required
          >
            <option value="">
              Sélectionner un fournisseur
            </option>

            {fournisseurs.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nom}
              </option>
            ))}
          </select>
        </div>

        <br />

        <button type="submit">
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
}

export default ModifierProduit;