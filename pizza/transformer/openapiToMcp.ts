import SwaggerParser from "@apidevtools/swagger-parser";
import { z } from "zod";

export async function registerOpenApiAsMcpTools(
  server: any,
  openApiPath: string
) {
  const api: any = await SwaggerParser.parse(openApiPath);

  for (const path in api.paths) {
    for (const method in api.paths[path]) {
      const op = api.paths[path][method];
      if (!op.operationId) continue;

      const schema =
        op.requestBody?.content?.["application/json"]?.schema;

      const zodSchema: any = {};

      if (schema?.properties) {
        for (const key of Object.keys(schema.properties)) {
          zodSchema[key] = z.string();
        }
      }

      server.tool(
        op.operationId,
        op.summary || "",
        zodSchema,
        async () => {
          // mocked backend logic
          if (op.operationId === "listMenu") {
            return { pizzas: ["Margherita", "Farmhouse"] };
          }

          if (op.operationId === "placeOrder") {
            return {
              order_id: "ORD-" + Math.floor(Math.random() * 10000),
              eta_minutes: 30
            };
          }

          if (op.operationId === "getOrder") {
            return { status: "preparing" };
          }

          return { message: "ok" };
        }
      );
    }
  }
}
