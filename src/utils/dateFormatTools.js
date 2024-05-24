export function inverseDateFormat(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

export function formatDateForResponsive(date) {
  const taskDate = new Date(date);
  const currentYear = new Date().getFullYear();
  if (taskDate.getFullYear() === currentYear) {
    return `${taskDate.getDate().toString().padStart(2, "0")}/${(
      taskDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${(taskDate.getMonth() + 1).toString().padStart(2, "0")}/${taskDate
      .getFullYear()
      .toString()
      .substr(-2)}`;
  }
}

export const formatDateArchived = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export async function frenchFormattedDate(isoDate) {
  const dateObj = new Date(isoDate);

  return dateObj.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
