import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerOpenApiAsMcpTools } from "../transformer/openapiToMcp.ts";

const server = new McpServer({
  name: "Pizza MCP Server",
  version: "1.0.0"
});

await registerOpenApiAsMcpTools(server, "openapi/pizza.yaml");

const transport = new StdioServerTransport();
await server.connect(transport);
