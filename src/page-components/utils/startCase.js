export const startCase = (str = "") => {
  return str
    ?.split(/[_\s]/) // Split the string by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back together with spaces
};
