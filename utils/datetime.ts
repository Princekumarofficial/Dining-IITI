export const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toLocaleString();
};
