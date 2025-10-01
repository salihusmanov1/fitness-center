export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);

  return {
    name: "One on One Session",
    price: "$30",
    date: "September 26, 2025 at 11:00 pm",
    timezone: "San Francisco",
    staffMember: "Staff Member #1",
    duration: "1 hour",
  };
});
