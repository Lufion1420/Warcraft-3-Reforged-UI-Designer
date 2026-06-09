# Reforged UI Maker (RUID) — Fork

This is a personal fork of [nightknighto/Warcraft-3-Reforged-UI-Designer](https://github.com/nightknighto/Warcraft-3-Reforged-UI-Designer), a cross-platform desktop application for building Warcraft III UI designs and systems without code.

## Download

Grab the latest Windows build from the [**Releases**](https://github.com/Lufion1420/Warcraft-3-Reforged-UI-Designer/releases/latest) page:

- **Installer** — `Reforged UI Designer Setup <version>.exe`
- **Portable** — `Reforged UI Designer-<version>-win.zip` (unzip and run, no install)

> Builds are unsigned, so Windows SmartScreen may warn on first launch — click **More info → Run anyway**.

---

## Changes in this fork

Everything below was added on top of the original `v2.6.1` release.

### Multiselect
- Multiple frames can now be selected at once in the workspace and the hierarchy tree
- Multiselect supports **multi-movement** — moving the selection moves every selected frame together
- Various multiselect behavior refinements and fixes

### Element Linking
- Added a checkbox to **link** elements so that moving one moves the others along with it
- Reworked the linking logic so linked frames keep their relative offsets while being moved
- Fixed a movement bug introduced by linking

### Hierarchy Tree
- **Drag & drop** support — reorder and re-parent frames directly in the tree
- **Color differentiation** for tree entries to make the hierarchy easier to read
- The parent selector dropdown is now sorted **alphabetically**

### Frame Types
- Added **SimpleButton** to the frame type list

### Button Callbacks
- New input fields to set **callback functions** for buttons, which are included in the exported code

### Visibility / Hiding
- Added a **Hide checkbox** for elements, so a frame can be flagged hidden
- Added a second checkbox to **cascade visibility to children**, hiding a frame's children along with it

### Coordinate Output
- Added a **read-only field** that displays the coordinate output produced by the generated code
- Added an additional read-only field showing the output X/Y values of the frame

### Dummy Frame
- Added a new **Dummy Frame** tab. A dummy frame is placed on screen but does **not** appear in the tree and is **ignored on code export** — it's meant as a helper to determine new positions for move actions and similar work
- Moved the new **Coordinates – Alter** tab to sit below the original **Coordinates** tab

### Fake Frame Preview
- The fake/alter preview frame can now be:
  - Resized
  - Moved via the **arrow keys**
  - Undone
  - Saved and loaded with the project

### Textures
- Added **prefix and extension overwrite** for textures
- Added a button to **replace all frame texture paths at once** by selecting a local folder

### Undo Support
- Added **undo support** for several of the newly added features, including batch frame movement (X / Y / position) and frame reordering

### General QoL & Fixes
- Various small quality-of-life improvements
- Removed an unwanted coordinate clamp from an earlier change
- Assorted bug fixes

---

## Cutting a Release (maintainers)

Releases are built and published automatically by the [`release`](.github/workflows/release.yml) GitHub Actions workflow whenever a version tag is pushed:

```bash
# bump "version" in package.json first, commit it, then:
git tag v2.7.0
git push origin v2.7.0
```

The workflow runs on Windows, syncs the package version to the tag, packages the app with `electron-builder`, and publishes a GitHub Release with the installer and portable `.zip` attached. Auto-generated changelog notes are included; to add a curated feature description, edit the release on GitHub afterwards (or pass a `body` / `body_path` to the publish step in the workflow).

> The tag must point at a commit that contains `.github/workflows/release.yml`, otherwise no build is triggered.
</content>
</invoke>
