export async function schedulingAgent(order: any) {
  console.log("📦 Received order from Ordering Agent:", order);

  console.log("📅 Calling Public Calendar MCP");
  return {
    calendar_event_id: "CAL-5678",
    scheduled_for: `${order.eta_minutes} minutes from now`
  };
}
