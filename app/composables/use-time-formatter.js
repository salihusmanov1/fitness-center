export const useTimeFormatter = () => {
  const formatTime = (isoString) => {
    const dateObj = new Date(isoString);

    const date = dateObj.toISOString().split("T")[0];
    const utcHours = String(dateObj.getUTCHours()).padStart(2, "0");
    const utcMinutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
    const time = `${utcHours}:${utcMinutes}`;

    return { date, time };
  };

  return { formatTime };
};
