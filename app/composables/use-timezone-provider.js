export const useTimezoneProvider = () => {
  function getUserTimeZone() {
    const options = { timeZoneName: "long" };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const parts = formatter.formatToParts(new Date());
    const tzName = parts.find(p => p.type === "timeZoneName").value;

    const offsetMinutes = new Date().getTimezoneOffset();
    const offsetHours = -offsetMinutes / 60;
    const gmt = `GMT${offsetHours >= 0 ? "+" : ""}${offsetHours}`;

    return `${tzName} (${gmt})`;
  }

  return {
    getUserTimeZone,
  };
};
