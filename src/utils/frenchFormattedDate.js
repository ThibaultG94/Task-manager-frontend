export async function frenchFormattedDate(isoDate) {
  const dateObj = new Date(isoDate);

  return dateObj.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
