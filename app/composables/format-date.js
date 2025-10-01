export const useFormatDate = () => {
  const formatSelectedDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return {
    formatSelectedDate,
  };
};
