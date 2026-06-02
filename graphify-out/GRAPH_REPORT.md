# Graph Report - Warcraft-3-Reforged-UI-Designer  (2026-06-02)

## Corpus Check
- 103 files · ~51,628 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 880 nodes · 1989 edges · 80 communities (29 shown, 51 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e5bd3118`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 79|Community 79]]

## God Nodes (most connected - your core abstractions)
1. `debugText()` - 184 edges
2. `FrameComponent` - 149 edges
3. `ParameterEditor` - 94 edges
4. `ProjectTree` - 74 edges
5. `FrameBuilder` - 37 edges
6. `ICallableDivInstance` - 36 edges
7. `CustomComplex` - 35 edges
8. `FrameType` - 20 edges
9. `Editor` - 18 edges
10. `TableArray` - 17 edges

## Surprising Connections (you probably didn't know these)
- `finalizeExport()` --calls--> `debugText()`  [EXTRACTED]
  src/ts/ClassesAndFunctions/Export.ts → src/ts/ClassesAndFunctions/MiniFunctions.ts
- `Export` --implements--> `ICallableDivInstance`  [EXTRACTED]
  src/ts/ClassesAndFunctions/Export.ts → src/ts/ClassesAndFunctions/ICallableDivInstance.ts
- `Redo` --implements--> `ICallableDivInstance`  [EXTRACTED]
  src/ts/Commands/Redo.ts → src/ts/ClassesAndFunctions/ICallableDivInstance.ts
- `Undo` --implements--> `ICallableDivInstance`  [EXTRACTED]
  src/ts/Commands/Undo.ts → src/ts/ClassesAndFunctions/ICallableDivInstance.ts
- `AppUIBlueColors` --implements--> `ICallableDivInstance`  [EXTRACTED]
  src/ts/Editor/Menus/AppInterface.ts → src/ts/ClassesAndFunctions/ICallableDivInstance.ts

## Import Cycles
- 3-file cycle: `src/ts/ClassesAndFunctions/MiniFunctions.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Commands/Implementation/ChangeFrameTextColor.ts -> src/ts/ClassesAndFunctions/MiniFunctions.ts`
- 3-file cycle: `src/ts/Commands/Implementation/ChangeFrameTextColor.ts -> src/ts/Editor/FrameLogic/FrameComponent.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Commands/Implementation/ChangeFrameTextColor.ts`
- 3-file cycle: `src/ts/ClassesAndFunctions/MiniFunctions.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Commands/Implementation/Arrays/CloneElementToArray.ts -> src/ts/ClassesAndFunctions/MiniFunctions.ts`
- 3-file cycle: `src/ts/Commands/Implementation/Arrays/CloneElementToArray.ts -> src/ts/Editor/FrameLogic/FrameComponent.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Commands/Implementation/Arrays/CloneElementToArray.ts`
- 3-file cycle: `src/ts/ClassesAndFunctions/MiniFunctions.ts -> src/ts/Editor/Editor.ts -> src/ts/Commands/Implementation/CreateFrameAtSelected.ts -> src/ts/ClassesAndFunctions/MiniFunctions.ts`
- 3-file cycle: `src/ts/ClassesAndFunctions/MiniFunctions.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Commands/Implementation/Arrays/ChangeTableXGap.ts -> src/ts/ClassesAndFunctions/MiniFunctions.ts`
- 3-file cycle: `src/ts/ClassesAndFunctions/MiniFunctions.ts -> src/ts/Editor/Editor.ts -> src/ts/Persistence/NewDocument.ts -> src/ts/ClassesAndFunctions/MiniFunctions.ts`
- 3-file cycle: `src/ts/ClassesAndFunctions/Export.ts -> src/ts/Editor/FrameLogic/CustomComplex.ts -> src/ts/Editor/Editor.ts -> src/ts/ClassesAndFunctions/Export.ts`
- 3-file cycle: `src/ts/Editor/Editor.ts -> src/ts/Editor/FrameLogic/FrameBuilder.ts -> src/ts/Editor/FrameLogic/CustomComplex.ts -> src/ts/Editor/Editor.ts`
- 3-file cycle: `src/ts/Commands/Implementation/ChangeFrameDiskTexture.ts -> src/ts/Editor/FrameLogic/CustomComplex.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Commands/Implementation/ChangeFrameDiskTexture.ts`
- 3-file cycle: `src/ts/ClassesAndFunctions/MiniFunctions.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Commands/Implementation/ChangeFrameType.ts -> src/ts/ClassesAndFunctions/MiniFunctions.ts`
- 3-file cycle: `src/ts/Commands/Implementation/ChangeFrameType.ts -> src/ts/Editor/FrameLogic/FrameComponent.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Commands/Implementation/ChangeFrameType.ts`
- 3-file cycle: `src/ts/ClassesAndFunctions/MiniFunctions.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Commands/Implementation/ChangeFrameX.ts -> src/ts/ClassesAndFunctions/MiniFunctions.ts`
- 3-file cycle: `src/ts/Commands/Implementation/ChangeFrameX.ts -> src/ts/Editor/FrameLogic/FrameComponent.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Commands/Implementation/ChangeFrameX.ts`
- 3-file cycle: `src/ts/Editor/Editor.ts -> src/ts/Editor/FrameLogic/FrameBuilder.ts -> src/ts/Editor/FrameLogic/FrameBaseContent.ts -> src/ts/Editor/Editor.ts`
- 3-file cycle: `src/ts/Editor/FrameLogic/Arrays/TableArray.ts -> src/ts/Editor/FrameLogic/FrameComponent.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Editor/FrameLogic/Arrays/TableArray.ts`
- 4-file cycle: `src/ts/ClassesAndFunctions/MiniFunctions.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Commands/Implementation/Arrays/CloneElementToArray.ts -> src/ts/Commands/Implementation/CreateFrame.ts -> src/ts/ClassesAndFunctions/MiniFunctions.ts`
- 4-file cycle: `src/ts/Commands/Implementation/Arrays/CloneElementToArray.ts -> src/ts/Commands/Implementation/CreateFrame.ts -> src/ts/Editor/FrameLogic/FrameComponent.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Commands/Implementation/Arrays/CloneElementToArray.ts`
- 4-file cycle: `src/ts/Commands/Implementation/Arrays/CloneElementToArray.ts -> src/ts/Editor/FrameLogic/Arrays/BaseArray.ts -> src/ts/Editor/FrameLogic/FrameComponent.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Commands/Implementation/Arrays/CloneElementToArray.ts`
- 4-file cycle: `src/ts/Commands/Implementation/Arrays/CloneElementToArray.ts -> src/ts/Editor/FrameLogic/FrameBuilder.ts -> src/ts/Editor/FrameLogic/CustomComplex.ts -> src/ts/Editor/ParameterEditor.ts -> src/ts/Commands/Implementation/Arrays/CloneElementToArray.ts`

## Communities (80 total, 51 thin omitted)

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (4): Editor, RibbonMenu, RibbonOption, TabsMenu

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (26): blp_to_png(), BlpImage, JpegError, JpegImage, dds_to_png(), DdsImage, getDdsMipmap(), decodeDxt1() (+18 more)

### Community 7 - "Community 7"
Cohesion: 0.10
Nodes (20): InputEdit(), inputElementsUpdate(), MouseFunctions(), Tooltips, Actionable, EditorController, AlterDragMode, AlterValueKey (+12 more)

### Community 10 - "Community 10"
Cohesion: 0.06
Nodes (31): BackdropMLT, BrowserButtonMLT, Button1MLT, Button2MLT, CheckListBoxMLT, EditBoxMLT, EscMenuBackdropMLT, HorizontalBarMLT (+23 more)

### Community 11 - "Community 11"
Cohesion: 0.06
Nodes (30): For --cluster-only, For git commit hook, For /graphify add, For /graphify explain, For /graphify path, For /graphify query, For native CLAUDE.md integration, For --update (incremental re-extraction) (+22 more)

### Community 15 - "Community 15"
Cohesion: 0.12
Nodes (7): ICallableDivInstance, RenameTextureFolder, CreateFrameAtSelected, CustomBackground, NewDocument, SaveASDocument, SaveDocument

### Community 18 - "Community 18"
Cohesion: 0.13
Nodes (3): AlterPreviewRuntime, FrameAlterPreviewData, ChangeAlterPreview

### Community 19 - "Community 19"
Cohesion: 0.11
Nodes (6): AppInterfaces, AppUIBlueColors, AppUIBrownColors, AppUIDarkColors, AppUIPurpleColors, AppUIWoodenTexture

### Community 21 - "Community 21"
Cohesion: 0.10
Nodes (20): dependencies, bootstrap, bootstrap-social, buffer-to-arraybuffer, custom-electron-titlebar, del, dotenv, electron-canvas-to-buffer-fixed (+12 more)

### Community 22 - "Community 22"
Cohesion: 0.18
Nodes (13): createTOCfile(), finalizeExport(), generalOptions(), getFDFsList(), JassGetTypeText(), LuaGetTypeText(), TemplateReplace(), TLanguage (+5 more)

### Community 26 - "Community 26"
Cohesion: 0.14
Nodes (4): ContextMenu, config, Main, WindowProps

### Community 29 - "Community 29"
Cohesion: 0.13
Nodes (14): compilerOptions, downlevelIteration, emitDecoratorMetadata, experimentalDecorators, module, moduleResolution, noImplicitAny, outDir (+6 more)

### Community 31 - "Community 31"
Cohesion: 0.14
Nodes (14): scripts, build, compile-ts, delete-app, delete-build, lint, pack, run (+6 more)

### Community 35 - "Community 35"
Cohesion: 0.17
Nodes (11): Clone & Install Project, Contributions, Expectations, Getting Started, If you already have the project built, you can just run it without re-building, Main Application Distribution Source [Hive Workshop](https://www.hiveworkshop.com/threads/warcraft-3-reforged-ui-designer-ruid.334868/)., Packing the Project, Prerequisites (+3 more)

### Community 37 - "Community 37"
Cohesion: 0.20
Nodes (10): devDependencies, concurrently, electron, electron-builder, eslint, @types/dotenv, typescript, @typescript-eslint/eslint-plugin (+2 more)

### Community 38 - "Community 38"
Cohesion: 0.14
Nodes (3): Export, CanvasMovement, KeyboardShortcuts

### Community 43 - "Community 43"
Cohesion: 0.29
Nodes (6): author, description, license, main, name, version

### Community 49 - "Community 49"
Cohesion: 0.33
Nodes (4): FrameMLText, IMLTextMulti, IMLTextSingle, Language

### Community 50 - "Community 50"
Cohesion: 0.40
Nodes (4): Key Files, Verification, Warcraft III Risk Checklist, WC3 Export Safety

### Community 70 - "Community 70"
Cohesion: 0.40
Nodes (5): build, appId, buildVersion, icon, productName

### Community 71 - "Community 71"
Cohesion: 0.40
Nodes (4): Project Shape, Verification, WC3 UI Designer, Working Rules

### Community 74 - "Community 74"
Cohesion: 0.20
Nodes (4): Redo, Redoable, Undo, Undoable

## Knowledge Gaps
- **166 isolated node(s):** `name`, `version`, `description`, `main`, `delete-app` (+161 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **51 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `debugText()` connect `Community 5` to `Community 0`, `Community 7`, `Community 8`, `Community 12`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 20`, `Community 22`, `Community 24`, `Community 25`, `Community 32`, `Community 36`, `Community 38`, `Community 40`, `Community 41`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Community 48`, `Community 51`, `Community 52`, `Community 53`, `Community 54`, `Community 55`, `Community 56`, `Community 57`, `Community 58`, `Community 59`, `Community 60`, `Community 61`, `Community 62`, `Community 63`, `Community 64`, `Community 65`, `Community 66`, `Community 67`, `Community 68`, `Community 69`, `Community 74`?**
  _High betweenness centrality (0.243) - this node is a cross-community bridge._
- **Why does `FrameComponent` connect `Community 4` to `Community 0`, `Community 1`, `Community 5`, `Community 7`, `Community 8`, `Community 9`, `Community 12`, `Community 13`, `Community 14`, `Community 16`, `Community 17`, `Community 18`, `Community 23`, `Community 24`, `Community 27`, `Community 28`, `Community 32`, `Community 33`, `Community 34`, `Community 36`, `Community 41`, `Community 44`, `Community 45`, `Community 46`, `Community 47`, `Community 55`, `Community 61`, `Community 62`, `Community 63`, `Community 64`, `Community 65`, `Community 66`, `Community 67`, `Community 68`, `Community 77`?**
  _High betweenness centrality (0.197) - this node is a cross-community bridge._
- **Why does `ParameterEditor` connect `Community 5` to `Community 0`, `Community 1`, `Community 34`, `Community 4`, `Community 38`, `Community 7`, `Community 18`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _166 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.1383399209486166 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.1168091168091168 - nodes in this community are weakly interconnected._
- **Should `Community 5` be split into smaller, more focused modules?**
  _Cohesion score 0.10804597701149425 - nodes in this community are weakly interconnected._