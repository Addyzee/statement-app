export const capitalizeFirstLetter = (val: string) => {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {day:"numeric", month: "long", year: "numeric" });
};
