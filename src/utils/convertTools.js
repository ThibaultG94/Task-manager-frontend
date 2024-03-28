export async function convertStatus(status) {
  switch (status) {
    case "Pending":
      return "À faire";
    case "In Progress":
      return "En cours";
    case "Completed":
      return "Terminé";
    case "Archived":
      return "Archivé";

    default:
      return status;
  }
}

export async function convertPriority(priority) {
  switch (priority) {
    case "Low":
      return "Faible";
    case "Medium":
      return "Moyenne";
    case "High":
      return "Haute";
    case "Urgent":
      return "Urgent";

    default:
      return priority;
  }
}

export function convertStatusCount(status, count) {
  let statusFrench;
  let taskWord = count > 1 ? "tâches" : "tâche";

  switch (status) {
    case "Pending":
      statusFrench = "à faire";
      break;
    case "In Progress":
      statusFrench = "en cours";
      break;
    case "Completed":
      statusFrench = count > 1 ? "terminées" : "terminée";
      break;
    case "Archived":
      statusFrench = count > 1 ? "archivées" : "archivée";
      break;
    default:
      return `${count} ${status}`;
  }

  return `${count} ${taskWord} ${statusFrench}`;
}
