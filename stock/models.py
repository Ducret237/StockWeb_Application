from django.db import models
from django.conf import settings



class Categorie(models.Model):
    nom = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.nom


class Fournisseur(models.Model):
    nom = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20, blank=False)
    courriel = models.EmailField(blank=True)
    

    def __str__(self):
        return self.nom


class Produit(models.Model):
    nom = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    prix = models.DecimalField(max_digits=10, decimal_places=2)
    quantite = models.PositiveIntegerField(default=0)

    categorie = models.ForeignKey(
        Categorie,
        on_delete=models.PROTECT,
        related_name="produits"
    )

    fournisseur = models.ForeignKey(
        Fournisseur,
        on_delete=models.PROTECT,
        related_name="produits"
    )

    def __str__(self):
        return self.nom


class MouvementStock(models.Model):
    TYPES_MOUVEMENT = [
        ("ENTREE", "Entrée"),
        ("SORTIE", "Sortie"),
    ]

    type_mouvement = models.CharField(
        max_length=10,
        choices=TYPES_MOUVEMENT
    )

    quantite = models.PositiveIntegerField()

    date = models.DateTimeField(auto_now_add=True)

    produit = models.ForeignKey(
        Produit,
        on_delete=models.CASCADE,
        related_name="mouvements"
    )

    utilisateur = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="mouvements_stock"
    )

    def __str__(self):
        return f"{self.type_mouvement} - {self.produit.nom}"