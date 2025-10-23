export const useTimezoneProvider = () => {
  function getUserTimeZone() {
    const options = { timeZoneName: "long" };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(new Date());
    const tzName = parts.find(p => p.type === "timeZoneName").value;

    // Build GMT offset in hours and minutes to support non-hour offsets (e.g., +05:30)
    const offsetMinutes = new Date().getTimezoneOffset(); // minutes behind UTC, positive for locales behind UTC
    const totalMinutes = -offsetMinutes; // invert so positive means ahead of UTC
    const sign = totalMinutes >= 0 ? "+" : "-";
    const absMinutes = Math.abs(totalMinutes);
    const hoursPart = String(Math.trunc(absMinutes / 60)).padStart(2, "0");
    const minutesPart = String(absMinutes % 60).padStart(2, "0");
    const gmt = `GMT${sign}${hoursPart}:${minutesPart}`;

    return `${tzName} (${gmt})`;
  }

  return {
    getUserTimeZone,
  };
};
