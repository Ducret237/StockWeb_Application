from django.db import transaction
from rest_framework import serializers
from .models import Categorie, Fournisseur, Produit, MouvementStock

# creation d'un serializer pour chaque modèle afin de gérer la sérialisation et la désérialisation des données

class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = [
            "id",
            "nom",
            "description",
        ]


class FournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fournisseur
        fields = [
            "id",
            "nom",
            "courriel",
            "telephone",
        ]


class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = [
            "id",
            "nom",
            "description",
            "prix",
            "quantite",
            "categorie",
            "fournisseur",
        ]

    def validate_prix(self, value): # valide que le prix du produit est supérieur à 0
        if value <= 0:
            raise serializers.ValidationError(
                "Le prix doit être supérieur à 0."
            )
        return value

class MouvementStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = MouvementStock
        fields = [
            "id",
            "type_mouvement",
            "quantite",
            "date",
            "produit",
            "utilisateur",
        ]

        read_only_fields = [
            "date",
            "utilisateur",
        ]

    def validate_quantite(self, valeur):
        if valeur <= 0:
            raise serializers.ValidationError(
                "La quantité doit être supérieure à 0."
            )

        return valeur
    
# Garantit l'atomicité (tout ou rien) : si la mise à jour du stock ou la 
# création du mouvement échoue, aucun changement n'est appliqué en base de données

    @transaction.atomic
    def create(self, validated_data):
        produit = validated_data["produit"]
        type_mouvement = validated_data["type_mouvement"]
        quantite = validated_data["quantite"]

# Utilisation de select_for_update() pour verrouiller la ligne du produit pendant la transaction
        produit = Produit.objects.select_for_update().get(
            pk=produit.pk
        )

# Vérifie le type de mouvement et met à jour la quantité du produit en conséquence
        if type_mouvement == "ENTREE":
            produit.quantite += quantite

        elif type_mouvement == "SORTIE":
            if quantite > produit.quantite:
                raise serializers.ValidationError(
                    {
                        "quantite":
                        "Stock insuffisant pour effectuer cette sortie."
                    }
                )

            produit.quantite -= quantite

        produit.save()
        
# Crée un enregistrement de mouvement de stock avec les données validées
        mouvement = MouvementStock.objects.create(
            produit=produit,
            type_mouvement=type_mouvement,
            quantite=quantite,
            **{
                key: value
                for key, value in validated_data.items()
                if key not in [
                    "produit",
                    "type_mouvement",
                    "quantite",
                ]
            }
        )

        return mouvement