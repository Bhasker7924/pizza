import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

/**
 * Calendar MCP Server (Mock)
 * Correct for current MCP SDK + TypeScript
 */

const server = new Server(
  {
    name: "calendar-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      // 👇 Cast is REQUIRED due to SDK typing limitations
      tools: {
        create_event: {
          description: "Create a calendar event",
          inputSchema: {
            type: "object",
            properties: {
              title: { type: "string" },
              datetime: { type: "string", description: "ISO datetime string" },
              duration_minutes: { type: "number" }
            },
            required: ["title", "datetime"]
          },
          handler: async (args: {
            title: string;
            datetime: string;
            duration_minutes?: number;
          }) => {
            return {
              event_id: "EVT-" + Math.floor(Math.random() * 100000),
              title: args.title,
              datetime: args.datetime,
              duration_minutes: args.duration_minutes ?? 30,
              status: "created"
            };
          }
        },

        list_events: {
          description: "List calendar events",
          inputSchema: {
            type: "object",
            properties: {}
          },
          handler: async () => {
            return {
              events: [
                {
                  event_id: "EVT-12345",
                  title: "Pizza Delivery",
                  datetime: "2025-01-01T20:00:00",
                  duration_minutes: 30
                }
              ]
            };
          }
        }
      } as any
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
