import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { ServersConfig, ClientsConfig } from "./client_and_server_config.js";


export var MCPServers: { [key: string]: Client } = {};

export async function initializeAlllMCP() {
    try {
        const title = "MCP Servers and Available Tools";
        const header = "Server Name      │      Available Tools";
        const boxWidth = Math.max(title.length + 8, header.length + 4);
        
        const createLine = (char: string) => char + "─".repeat(boxWidth - 2) + char;
        const createTextLine = (text: string) => "│" + text.padEnd(boxWidth - 2) + "│";

        console.log("\n" + createLine("┌") + "┐");
        console.log(createTextLine("     " + title + "     "));
        console.log(createLine("├") + "┤");
        console.log(createTextLine(" " + header + " "));
        console.log(createLine("├") + "┤");

        for (var server of ServersConfig) {
            try {
                const newClient = new Client({
                    name: `${server.server_name}_CLIENT`,
                    version: "1.0.0"
                });
                
                // Prepare environment variables for the server
                const env: Record<string, string> = {};
                
                // Copy all environment variables that are strings
                for (const [key, value] of Object.entries(process.env)) {
                    if (value !== undefined) {
                        env[key] = value;
                    }
                }
                
                // Add AIRTABLE_API_KEY for AIRTABLE-MCP server
                if (server.server_name === "AIRTABLE-MCP") {
                    env.AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || "patzcFy4xbWDmfCUP.40fa99f37fbda27b2765743e44b0c5bc2c11e174411814e66503eea46b7d8da4";
                }
                
                const transport = new StdioClientTransport({
                    command: "node",
                    args: [`${process.cwd()}/../servers/${server.server_name}/${server.path}`],
                    env: env
                });

                await newClient.connect(transport).then(() => {
                    MCPServers[server.server_name] = newClient;
                }).catch((err) => {
                    const errorMsg = ` ${server.server_name.padEnd(15)}│ Connection Error: ${err}`;
                    console.log(createTextLine(errorMsg));
                });

                const resources = await newClient.listTools();
                const tools_arr = resources.tools.map(resource => resource.name);
                const statusMsg = ` ${server.server_name.padEnd(15)}│ ${`${tools_arr.length} tools`.padEnd(20)}`;
                console.log(createTextLine(statusMsg));

            } catch (err) {
                const errorMsg = ` ${server.server_name.padEnd(15)}│ Init Error: ${err}`;
                console.log(createTextLine(errorMsg));
                continue;
            }
        }
        console.log(createLine("└") + "┘\n");
    } catch (err) {
        const boxWidth = `${err}`.length + 35;
        console.log("┌" + "─".repeat(boxWidth - 2) + "┐");
        console.log("│ Error initializing MCP server:".padEnd(boxWidth - 1) + "│");
        console.log("│ " + `${err}`.padEnd(boxWidth - 3) + "│");
        console.log("└" + "─".repeat(boxWidth - 2) + "┘");
        return false;
    }
}