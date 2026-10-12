from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import (
    Categorie,
    Fournisseur,
    Produit,
    MouvementStock,
)

from .serializers import (
    CategorieSerializer,
    FournisseurSerializer,
    ProduitSerializer,
    MouvementStockSerializer,
)


# =========================
# CATEGORIES
# =========================

class CategorieList(APIView):

    def get(self, request):
        categories = Categorie.objects.all()
        serializer = CategorieSerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorieSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class CategorieDetail(APIView):

    def get_object(self, pk):
        try:
            return Categorie.objects.get(pk=pk)
        except Categorie.DoesNotExist:
            return None

    def get(self, request, pk):
        categorie = self.get_object(pk)

        if categorie is None:
            return Response(
                {"detail": "Catégorie introuvable."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = CategorieSerializer(categorie)
        return Response(serializer.data)

    def put(self, request, pk):
        categorie = self.get_object(pk)

        if categorie is None:
            return Response(
                {"detail": "Catégorie introuvable."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = CategorieSerializer(
            categorie,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):
        categorie = self.get_object(pk)

        if categorie is None:
            return Response(
                {"detail": "Catégorie introuvable."},
                status=status.HTTP_404_NOT_FOUND
            )

        categorie.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )


# =========================
# FOURNISSEURS
# =========================

class FournisseurList(APIView):

    def get(self, request):
        fournisseurs = Fournisseur.objects.all()
        serializer = FournisseurSerializer(
            fournisseurs,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):
        serializer = FournisseurSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class FournisseurDetail(APIView):

    def get_object(self, pk):
        try:
            return Fournisseur.objects.get(pk=pk)
        except Fournisseur.DoesNotExist:
            return None

    def get(self, request, pk):
        fournisseur = self.get_object(pk)

        if fournisseur is None:
            return Response(
                {"detail": "Fournisseur introuvable."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = FournisseurSerializer(fournisseur)

        return Response(serializer.data)

    def put(self, request, pk):
        fournisseur = self.get_object(pk)

        if fournisseur is None:
            return Response(
                {"detail": "Fournisseur introuvable."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = FournisseurSerializer(
            fournisseur,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):
        fournisseur = self.get_object(pk)

        if fournisseur is None:
            return Response(
                {"detail": "Fournisseur introuvable."},
                status=status.HTTP_404_NOT_FOUND
            )

        fournisseur.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )


# =========================
# PRODUITS
# =========================

class ProduitList(APIView):

    def get(self, request):
        produits = Produit.objects.all()
        serializer = ProduitSerializer(produits, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = ProduitSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class ProduitDetail(APIView):

    def get_object(self, pk):
        try:
            return Produit.objects.get(pk=pk)
        except Produit.DoesNotExist:
            return None

    def get(self, request, pk):
        produit = self.get_object(pk)

        if produit is None:
            return Response(
                {"detail": "Produit introuvable."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProduitSerializer(produit)

        return Response(serializer.data)

    def put(self, request, pk):
        produit = self.get_object(pk)

        if produit is None:
            return Response(
                {"detail": "Produit introuvable."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProduitSerializer(
            produit,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, pk):
        produit = self.get_object(pk)

        if produit is None:
            return Response(
                {"detail": "Produit introuvable."},
                status=status.HTTP_404_NOT_FOUND
            )

        produit.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )


# =========================
# MOUVEMENTS DE STOCK
# =========================

class MouvementStockList(APIView):

    def get(self, request):
        mouvements = MouvementStock.objects.all().order_by("-date")

        serializer = MouvementStockSerializer(
            mouvements,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):
        serializer = MouvementStockSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )