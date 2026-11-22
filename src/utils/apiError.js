export function getApiErrorMessage(error) {
  if (!error.response) {
    return "Impossible de communiquer avec le serveur.";
  }

  const data = error.response.data;

  if (typeof data === "string") {
    return "Une erreur est survenue.";
  }

  if (data.detail) {
    return data.detail;
  }

  const premierChamp = Object.keys(data)[0];

  if (premierChamp) {
    const message = data[premierChamp];

    if (Array.isArray(message)) {
      return message[0];
    }

    return message;
  }

  return "Une erreur est survenue.";
}