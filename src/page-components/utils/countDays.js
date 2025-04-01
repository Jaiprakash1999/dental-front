export const calculateDaysDifference = (date) => {
  const today = new Date();
  const selectedDate = new Date(date);

  // Calculate the difference in time
  const differenceInTime = selectedDate - today;

  // Convert time difference from milliseconds to days
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
};
