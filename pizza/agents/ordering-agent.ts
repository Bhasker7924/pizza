export async function orderingAgent(userInput: string) {
  console.log("🤖 User:", userInput);

  // Agent reasoning (simplified)
  console.log("🔍 Discovering MCP tools...");
  console.log("➡️ Using placeOrder tool");

  return {
    order_id: "ORD-1234",
    eta_minutes: 30
  };
}
