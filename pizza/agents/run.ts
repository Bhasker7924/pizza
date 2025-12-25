import { orderingAgent } from "./ordering-agent.ts";
import { schedulingAgent } from "./scheduling-agent.ts";

async function run() {
  const order = await orderingAgent(
    "I want to order a large Margherita"
  );

  console.log("🍕 Order confirmed:", order);

  const schedule = await schedulingAgent(order);

  console.log("✅ Delivery scheduled:", schedule);
}

run();
