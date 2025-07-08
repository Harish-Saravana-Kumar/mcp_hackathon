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
            "--token", "patzcFy4xbWDmfCUP.40fa99f37fbda27b2765743e44b0c5bc2c11e174411814e66503eea46b7d8da4",
            "--base", "appToc26GLbyyEF1e",
            "--dev"
        ]
    }
]