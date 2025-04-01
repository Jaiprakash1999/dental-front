export const firstLetterCapital = (str = "") => {
  return str
    ?.toLowerCase()
    .split(/[_\s]/) // Split the string by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back together with spaces
};

export const formatABHAnumber = (abhaNumber = "") => {
  // Slice the string into parts
  const part1 = abhaNumber.slice(0, 2);
  const part2 = abhaNumber.slice(2, 6);
  const part3 = abhaNumber.slice(6, 10);
  const part4 = abhaNumber.slice(10, 14);

  // Join the parts with hyphens
  const formattedABHA = `${part1}-${part2}-${part3}-${part4}`;

  return formattedABHA;
};
