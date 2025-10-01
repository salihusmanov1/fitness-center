export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const query = getQuery(event);
  const selectedDate = query.date;

  // Check if selected date is a weekend
  if (selectedDate) {
    const date = new Date(selectedDate);
    const dayOfWeek = date.getDay();

    // If it's Saturday (6) or Sunday (0), return no available times
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        availableTimes: [],
        isWeekend: true,
        message: "No sessions available on weekends",
      };
    }
  }

  // Generate dummy available times for weekdays (Monday-Friday)
  const generateAvailableTimes = () => {
    const times = [];
    const startHour = 6; // 6 AM
    const endHour = 20; // 8 PM

    for (let hour = startHour; hour < endHour; hour++) {
      // Add hourly slots
      times.push({
        id: `time-${hour}-00`,
        time: `${hour.toString().padStart(2, "0")}:00`,
        available: Math.random() > 0.3, // 70% chance of being available
        sessionType: "standard",
      });

      // Add half-hour slots (except for lunch break 12:30-13:30)
      if (hour !== 12) {
        times.push({
          id: `time-${hour}-30`,
          time: `${hour.toString().padStart(2, "0")}:30`,
          available: Math.random() > 0.4, // 60% chance of being available
          sessionType: "standard",
        });
      }
    }

    return times.filter(time => time.available);
  };

  // Return available times
  return {
    availableTimes: generateAvailableTimes(),
    isWeekend: false,
    message: "Available times loaded successfully",
  };
});
