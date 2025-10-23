export const useTimeFormatter = () => {
  const formatTime = (isoString) => {
    // Guard against invalid inputs and dates
    if (typeof isoString !== "string" || isoString.length === 0) {
      return { date: "", time: "00:00" };
    }

    const dateObj = new Date(isoString);
    if (isNaN(dateObj.getTime())) {
      return { date: "", time: "00:00" };
    }

    // Always use UTC to keep consistency across environments
    const date = dateObj.toISOString().split("T")[0];
    const utcHours = String(dateObj.getUTCHours()).padStart(2, "0");
    const utcMinutes = String(dateObj.getUTCMinutes()).padStart(2, "0");
    const time = `${utcHours}:${utcMinutes}`;

    return { date, time };
  };

  return { formatTime };
};
