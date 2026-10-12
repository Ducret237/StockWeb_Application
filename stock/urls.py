from django.urls import path

from .views import (
    CategorieList,
    CategorieDetail,
    FournisseurList,
    FournisseurDetail,
    ProduitList,
    ProduitDetail,
    MouvementStockList,
)


urlpatterns = [

    # Categories
    path(
        "categories/",
        CategorieList.as_view(),
        name="categorie-list"
    ),

    path(
        "categories/<int:pk>/",
        CategorieDetail.as_view(),
        name="categorie-detail"
    ),

    # Fournisseurs
    path(
        "fournisseurs/",
        FournisseurList.as_view(),
        name="fournisseur-list"
    ),

    path(
        "fournisseurs/<int:pk>/",
        FournisseurDetail.as_view(),
        name="fournisseur-detail"
    ),

    # Produits
    path(
        "produits/",
        ProduitList.as_view(),
        name="produit-list"
    ),

    path(
        "produits/<int:pk>/",
        ProduitDetail.as_view(),
        name="produit-detail"
    ),

    # Mouvements de stock
    path(
        "mouvements/",
        MouvementStockList.as_view(),
        name="mouvement-list"
    ),
]