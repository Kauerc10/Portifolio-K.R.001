from pathlib import Path
import bpy
root=Path(__file__).parent
bpy.context.scene.render.filepath=str(root/'portal-proof.png')
bpy.ops.render.render(write_still=True)
