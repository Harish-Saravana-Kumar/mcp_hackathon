ClientsConfig =[
    "MCP_CLIENT_AZURE_AI",
    "MCP_CLIENT_OPENAI",
	"MCP_CLIENT_GEMINI"
]
ServersConfig = [
	# {
	# 	"server_name": "MCP-GSUITE",
	# 	"command":"uv",
	# 	"args": [
	# 		"--directory",
	# 		"../servers/MCP-GSUITE/mcp-gsuite",
	# 		"run",p
	# 		"mcp-gsuite"
	# 	]
	# },
	 {
        "server_name": "AIRTABLE",
        "command": "python",
        "args": [
            "../../../../../servers/AIRTABLE/airtable_mcp/src/server.py",
            "--token", "your_api_key_here",
            "--base", "appToc26GLbyyEF1e",
            "--dev"
        ]
    }
]