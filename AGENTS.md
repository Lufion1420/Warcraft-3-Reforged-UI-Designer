## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, invoke the `skill` tool with `skill: "graphify"` before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Project guidance

This is an Electron/TypeScript tool for designing Warcraft III Reforged UI frames and exporting them as JASS, Lua, or TypeScript code for use in maps.

Use the matching project skill before deeper work:
- `wc3-ui-designer` for editor state, frame movement, menus, persistence, save/load, and undo/redo work.
- `wc3-export-safety` for export templates, generated Warcraft III code, frame event triggers, TOC/FDF handling, and map-import behavior.

Keep changes clean, minimal, and aligned with the existing project structure. Do not over-engineer helper functions. Remove dead code during reworks.

Important local conventions:
- `src/ts/app.ts` starts Electron and `src/ts/main.ts` owns the main process window.
- `src/ts/renderer.ts` initializes renderer-side editor services.
- `ProjectTree`, `FrameComponent`, `CustomComplex`, and `FrameBuilder` are the core frame state model.
- `Commands/Implementation/` classes should be used for undoable frame mutations.
- `Export.ts`, `Templates.ts`, and `FrameMLText.ts` produce generated JASS/Lua/TypeScript.
- `app/`, `Build/`, and `dist/` are build outputs; avoid editing them unless explicitly requested.

When working on generated Warcraft III code, explicitly consider memory leaks, cleanup, async/timer behavior, trigger duplication, initialization order, and desync risks.

Verification:
- Run `npm run compile-ts` after TypeScript changes.
- Run `npm run lint` when touching broad TypeScript areas or style-sensitive code.
- `npm run start` requires the `src/ts/configMain.ts` file described in `README.md`.
