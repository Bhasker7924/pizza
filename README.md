### 🍕 Pizza MCP – Making Pizza AI-Ready
### Overview

This project demonstrates how a traditional pizza ordering API can be transformed into an AI-native interface using the Model Context Protocol (MCP).

The goal is to make pizza services discoverable and usable by AI agents (ChatGPT, Copilot, Gemini, etc.) without manually rewriting each API for agent consumption.

### The system:

Automatically converts OpenAPI specifications → MCP servers

Exposes pizza ordering capabilities as MCP tools

Uses cooperating AI agents to complete a real-world workflow:

Pizza ordering

Delivery scheduling via an external MCP server

### Problem Statement (In My Own Words)

AI agents are becoming the new interface layer.
Instead of humans clicking buttons, agents now decide what to do and which tools to call.

Traditional REST APIs are not agent-friendly by default.

This project solves that by:

Translating OpenAPI specs into MCP-compatible servers

Allowing agents to discover tools, invoke them, and coordinate with other agents

Demonstrating a complete end-to-end workflow with minimal backend complexity

### High-Level Architecture
User (Natural Language)
        |
        v
Ordering Agent
        |
        v
Pizza MCP Server (generated from OpenAPI)
        |
        v
Order Confirmation (order_id, ETA)
        |
        v
Scheduling Agent (A2A)
        |
        v
Calendar MCP Server (external/public)
        |
        v
Delivery Scheduled

### Project Structure
pizza/
├── agents/
│   ├── ordering-agent.ts
│   └── run.ts
│
├── mcp-server/
│   ├── pizza-mcp.ts
│   └── calendar-mcp.ts
│
├── transformer/
│   └── openapiToMcp.ts
│
├── pizza-openapi.yaml
├── package.json
├── tsconfig.json
└── README.md

### Key Components
1. OpenAPI → MCP Transformer

Reads an OpenAPI specification

Extracts endpoints, schemas, and operations

Automatically generates MCP-compatible tool definitions

Avoids manual, error-prone MCP authoring

File: transformer/openapiToMcp.ts

2. Pizza MCP Server

Exposes pizza operations as MCP tools:

list_menu

place_order

track_order

Uses mock data (as allowed by the problem statement)

Fully compliant with the MCP SDK

File: mcp-server/pizza-mcp.ts

3. Ordering Agent

Accepts user intent in natural language

Discovers available MCP tools

Selects and invokes the correct tool

Extracts structured outputs (order_id, ETA)

File: agents/ordering-agent.ts

4. Scheduling Agent (A2A)

Receives order details from the Ordering Agent

Communicates via Agent-to-Agent (A2A) flow

Uses an external Calendar MCP server

Schedules delivery and reports back

File: mcp-server/calendar-mcp.ts

### How Agent-to-Agent Communication Works

Ordering Agent completes pizza order

Order details are passed to Scheduling Agent

Scheduling Agent calls Calendar MCP tools

Delivery time is scheduled

User is informed of final status

This demonstrates autonomous delegation, not hardcoded workflows.

### How to Run the Project
1️⃣ Install dependencies
npm install

2️⃣ Start Pizza MCP Server
npx ts-node mcp-server/pizza-mcp.ts

3️⃣ Start Calendar MCP Server (new terminal)
npx ts-node mcp-server/calendar-mcp.ts

4️⃣ Run the Agents (new terminal)
npx ts-node agents/run.ts

### Example Output
User: I want to order a large Margherita
Discovering MCP tools...
Using placeOrder tool
Order confirmed: { order_id: 'ORD-1234', eta_minutes: 30 }
Calling Calendar MCP
Delivery scheduled

### Design Assumptions & Decisions

Mock backend was used to focus on MCP translation, not REST complexity

ES Modules (NodeNext) were chosen to align with the MCP SDK

Type casting (as any) was used where MCP SDK typing is intentionally generic

Simplicity and clarity were prioritized over over-engineering

### Handling Ambiguities

Delivery time logic was simplified to focus on agent coordination

Calendar MCP server is mocked but follows real MCP interaction patterns

OpenAPI coverage focuses on relevant endpoints only

### Why This Approach

Scales to any OpenAPI-based system

Avoids rewriting APIs per agent

Aligns with emerging AI interface standards

Demonstrates real agent autonomy and cooperation

### Future Enhancements (Optional)

Persistent storage for orders

Real calendar integration (Google Calendar MCP)

Multi-restaurant support

Payment orchestration via MCP

### Demo & Walkthrough

A video walkthrough accompanies this submission and covers:

.Problem understanding
.Architecture decisions
.Live end-to-end demo
.Design tradeoffs and assumptions

(All narration and documentation are human-written as requested.)

### Final Notes

This project focuses on practical MCP adoption, not theoretical demos.

It shows how existing systems can be made AI-ready today.