# StockManager

Application de gestion de stock avec une API Django et une interface React.

## Prerequis

- Python
- Node.js et npm

## Demarrer l'API Django

Depuis le dossier `StockManager_Backend` :

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
python manage.py migrate
python manage.py runserver
```

L'API est alors accessible sur `http://127.0.0.1:8000`.

## Demarrer l'interface React

Dans un autre terminal, depuis le dossier `StockManager_Frontend` (a cote de `StockManager_Backend`) :

```powershell
npm install
npm run dev
```

Ouvrez l'adresse indiquee par Vite dans le terminal.

## Commandes utiles

- `python manage.py test` : lancer les tests Django.
- `npm run lint` : verifier le code de l'interface.
- `npm run build` : construire l'interface pour la production.
