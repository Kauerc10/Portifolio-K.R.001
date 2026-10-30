import bpy, addon_utils
addon_utils.enable('blender_mcp', default_set=False)
import blender_mcp
server=blender_mcp.BlenderMCPServer()
server.start()
bpy.types.blendermcp_server=server
