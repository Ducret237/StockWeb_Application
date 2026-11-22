import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Categories() {
  const [categories, setCategories] = useState([]);

  const token = localStorage.getItem("access");

  useEffect(() => {
    async function chargerCategories() {
      try {
        const response = await api.get("categories/");
        setCategories(response.data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des catégories :",
          error
        );
      }
    }

    chargerCategories();
  }, []);

  async function handleDelete(id, nom) {
    const confirmation = window.confirm(
      `Voulez-vous vraiment supprimer la catégorie "${nom}" ?`
    );

    if (!confirmation) {
      return;
    }

    try {
      await api.delete(`categories/${id}/`);

      setCategories((categoriesActuelles) =>
        categoriesActuelles.filter(
          (categorie) => categorie.id !== id
        )
      );

      alert("Catégorie supprimée avec succès.");
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de la catégorie :",
        error
      );

      alert(
        "Impossible de supprimer cette catégorie."
      );
    }
  }

  return (
    <div>
      <h1>Catégories</h1>

      {token && (
        <p>
          <Link to="/categories/ajouter">
            Ajouter une catégorie
          </Link>
        </p>
      )}

      {categories.length === 0 ? (
        <p>Aucune catégorie disponible.</p>
      ) : (
        categories.map((categorie) => (
          <div key={categorie.id}>
            <h3>{categorie.nom}</h3>

            <p>
              Description : {categorie.description}
            </p>

            {token && (
              <div>
                <Link
                  to={`/categories/${categorie.id}/modifier`}
                >
                  Modifier
                </Link>

                {" | "}

                <button
                  onClick={() =>
                    handleDelete(
                      categorie.id,
                      categorie.nom
                    )
                  }
                >
                  Supprimer
                </button>
              </div>
            )}

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Categories;