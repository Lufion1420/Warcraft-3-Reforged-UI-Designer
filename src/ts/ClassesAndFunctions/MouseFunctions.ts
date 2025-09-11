/** @format */

import { debugText, InputEdit } from './MiniFunctions'
import { EditorController } from '../Editor/EditorController'
import MoveFrame from '../Commands/Implementation/MoveFrame'
import { GUIEvents } from './GUIEvents'
import CustomComplex from '../Editor/FrameLogic/CustomComplex'
import { ProjectTree } from '../Editor/ProjectTree'
import { ParameterEditor } from '../Editor/ParameterEditor'
import { Editor } from '../Editor/Editor'
import MoveFramesBatchPos from '../Commands/Implementation/MoveFramesBatchPos'

export function MouseFunctions(div: CustomComplex): void {
    const workspaceImage = Editor.getInstance().workspaceImage

    div.getElement().onmousedown = function (e) {
        if (e.altKey || Editor.getInstance().selectionMode != 'normal') return

        // const horizontalMargin = Editor.getInnerMargin()  // Value Never used.  Commented it out because it doesn't seem necessary
        const actualMargin = EditorController.getMargin()
        const projectTree = ProjectTree.getInstance()
        const frame = div.getFrameComponent()

        const startingX = div.getLeftX()
        const startingY = div.getBotY()
        const startingWidth = div.getWidth()
        const startingHeight = div.getHeight()

        projectTree.select(div, e.shiftKey)

        // Capture initial positions for multi-select batch undo
        const selectionAtStart = projectTree.getSelectedFrames ? projectTree.getSelectedFrames() : []
        const multiStartPositions = new Map<string, { x: number; y: number; w: number; h: number }>()
        if (Array.isArray(selectionAtStart) && selectionAtStart.length > 1) {
            for (const sel of selectionAtStart) {
                multiStartPositions.set(sel.getName(), {
                    x: sel.custom.getLeftX(),
                    y: sel.custom.getBotY(),
                    w: sel.custom.getWidth(),
                    h: sel.custom.getHeight(),
                })
            }
        }

        let posX1 = e.clientX
        let posY1 = e.clientY
        let posX2 = 0
        let posY2 = 0

        GUIEvents.isInteracting = true

        if (
            e.clientX - div.getElement().getBoundingClientRect().x > 5 &&
            e.clientX - div.getElement().getBoundingClientRect().x < div.getElement().offsetWidth - 5 &&
            e.clientY - div.getElement().getBoundingClientRect().y > 5 &&
            e.clientY - div.getElement().getBoundingClientRect().y < div.getElement().offsetHeight - 5
        ) {
            //not at edge, so drag
            document.body.style.cursor = 'grabbing'
        }

        //debug((e.clientY - div.getElement().getBoundingClientRect().y))
        //check whether it is drag or resize
        if (
            e.clientX - div.getElement().getBoundingClientRect().x > 5 &&
            e.clientX - div.getElement().getBoundingClientRect().x < div.getElement().offsetWidth - 5 &&
            e.clientY - div.getElement().getBoundingClientRect().y > 5 &&
            e.clientY - div.getElement().getBoundingClientRect().y < div.getElement().offsetHeight - 5
        ) {
            //not at edge, so drag
            window.onmousemove = function (e) {
                posX2 = posX1 - e.clientX
                posY2 = posY1 - e.clientY
                posX1 = e.clientX
                posY1 = e.clientY

                debugText('drag')
                let movedX = false
                let movedY = false
                if (
                    ((div.getElement().offsetLeft - posX2 - (workspaceImage.getBoundingClientRect().x + actualMargin)) / workspaceImage.offsetWidth) * 800 >=
                        0 &&
                    ((div.getElement().offsetLeft - posX2 + div.getElement().offsetWidth - (workspaceImage.getBoundingClientRect().x - actualMargin)) /
                        workspaceImage.offsetWidth) *
                        800 <=
                        800
                ) {
                    div.getElement().style.left = `${div.getElement().offsetLeft - posX2}px`
                    movedX = true
                }

                if (
                    workspaceImage.getBoundingClientRect().bottom - (div.getElement().getBoundingClientRect().bottom - posY2) >= 0 &&
                    workspaceImage.getBoundingClientRect().top - (div.getElement().getBoundingClientRect().top - posY2) <= 0
                ) {
                    div.getElement().style.top = `${div.getElement().offsetTop - posY2}px`
                    movedY = true
                }
                inputElementsUpdate(div, { x: true, y: true })

                // Multi-select: move all selected frames by same delta (ignore hierarchy linking)
                const selection = ProjectTree.getInstance().getSelectedFrames ? ProjectTree.getInstance().getSelectedFrames() : []
                const multi = Array.isArray(selection) && selection.length > 1
                if ((movedX || movedY) && multi) {
                    const dxPx = movedX ? -posX2 : 0
                    const dyPx = movedY ? -posY2 : 0
                    const rect = Editor.getInstance().workspaceImage.getBoundingClientRect()
                    const horizontalMarginInner = EditorController.getInnerMargin()
                    const innerWidth = rect.width - 2 * horizontalMarginInner
                    const dxCoord = (dxPx / innerWidth) * 0.8
                    const dyCoord = (-dyPx / rect.height) * 0.6

                    for (const sel of selection) {
                        if (sel === frame) continue
                        const el = sel.custom.getElement()
                        if (movedX) el.style.left = `${el.offsetLeft + dxPx}px`
                        if (movedY) el.style.top = `${el.offsetTop + dyPx}px`
                        if (movedX) sel.custom.setLeftX(sel.custom.getLeftX() + dxCoord, true)
                        if (movedY) sel.custom.setBotY(sel.custom.getBotY() + dyCoord, true)
                    }
                }
                // Move linked descendants with the same delta when parent is linked
                if ((movedX || movedY) && frame && frame.custom.getLinkChildren() && !multi) {
                    const dxPx = movedX ? -posX2 : 0
                    const dyPx = movedY ? -posY2 : 0
                    const rect = Editor.getInstance().workspaceImage.getBoundingClientRect()
                    const horizontalMarginInner = EditorController.getInnerMargin()
                    const innerWidth = rect.width - 2 * horizontalMarginInner
                    const dxCoord = (dxPx / innerWidth) * 0.8
                    const dyCoord = (-dyPx / rect.height) * 0.6

                    const moveDescendants = (parent: any) => {
                        const children = parent.getChildren()
                        for (const child of children) {
                            const el = child.custom.getElement()
                            if (movedX) el.style.left = `${el.offsetLeft + dxPx}px`
                            if (movedY) el.style.top = `${el.offsetTop + dyPx}px`
                            if (movedX) child.custom.setLeftX(child.custom.getLeftX() + dxCoord, true)
                            if (movedY) child.custom.setBotY(child.custom.getBotY() + dyCoord, true)
                            moveDescendants(child)
                        }
                    }
                    moveDescendants(frame)
                }
                document.body.style.cursor = 'grabbing'
            }
        } else {
            //at edge, so resize
            //now determine which edges
            if (
                e.clientX - div.getElement().getBoundingClientRect().x > div.getElement().offsetWidth - 5 ||
                e.clientY - div.getElement().getBoundingClientRect().y > div.getElement().offsetHeight - 5
            ) {
                //right and bottom edge: just resize
                if (e.clientX - div.getElement().getBoundingClientRect().x > div.getElement().offsetWidth - 5) {
                    window.onmousemove = function (e) {
                        posX2 = posX1 - e.clientX
                        posX1 = e.clientX

                        debugText('resize right')
                        if (((div.getElement().offsetWidth - posX2) * 0.8) / workspaceImage.width <= 0.01) {
                            div.getElement().style.width = (0.01 * workspaceImage.width) / 0.8 + 'px'
                        } else if (
                            workspaceImage.getBoundingClientRect().right - actualMargin <
                            div.getElement().offsetLeft + (div.getElement().offsetWidth - posX2)
                        ) {
                            null
                        } else {
                            div.getElement().style.width = div.getElement().offsetWidth - posX2 + 'px'
                        }

                        inputElementsUpdate(div, { width: true })
                        document.body.style.cursor = 'e-resize'
                    }
                }

                if (e.clientY - div.getElement().getBoundingClientRect().y > div.getElement().offsetHeight - 5) {
                    window.onmousemove = function (e) {
                        posY2 = posY1 - e.clientY
                        posY1 = e.clientY
                        debugText('resize bot')

                        if (((div.getElement().offsetHeight - posY2) * 600) / workspaceImage.height <= 10) {
                            div.getElement().style.height = `${(10 * workspaceImage.height) / 600}px`
                        } else if (
                            workspaceImage.getBoundingClientRect().bottom <
                            div.getElement().getBoundingClientRect().top + (div.getElement().offsetHeight - posY2)
                        ) {
                            null
                        } else {
                            div.getElement().style.height = `${div.getElement().offsetHeight - posY2}px`
                        }
                        inputElementsUpdate(div, { height: true, y: true })
                        document.body.style.cursor = 'n-resize'
                    }
                }

                //corner
                if (
                    e.clientX - div.getElement().getBoundingClientRect().x > div.getElement().offsetWidth - 5 &&
                    e.clientY - div.getElement().getBoundingClientRect().y > div.getElement().offsetHeight - 5
                ) {
                    window.onmousemove = function (e) {
                        posX2 = posX1 - e.clientX
                        posY2 = posY1 - e.clientY
                        posX1 = e.clientX
                        posY1 = e.clientY

                        debugText('Bottom Right Corner')
                        if (((div.getElement().offsetWidth - posX2) * 800) / workspaceImage.width <= 10) {
                            div.getElement().style.width = (10 * workspaceImage.width) / 800 + 'px'
                        } else if (
                            workspaceImage.getBoundingClientRect().right - actualMargin <
                            div.getElement().offsetLeft + (div.getElement().offsetWidth - posX2)
                        ) {
                            null
                        } else {
                            div.getElement().style.width = div.getElement().offsetWidth - posX2 + 'px'
                        }

                        if (((div.getElement().offsetHeight - posY2) * 600) / workspaceImage.height <= 10) {
                            div.getElement().style.height = `${(10 * workspaceImage.height) / 600}px`
                        } else if (
                            workspaceImage.getBoundingClientRect().bottom <
                            div.getElement().getBoundingClientRect().top + (div.getElement().offsetHeight - posY2)
                        ) {
                            null
                        } else {
                            div.getElement().style.height = `${div.getElement().offsetHeight - posY2}px`
                        }
                        inputElementsUpdate(div, { y: true, width: true, height: true })
                        document.body.style.cursor = 'nw-resize'
                    }
                }

                //corner top-right NEW
                if (
                    e.clientX - div.getElement().getBoundingClientRect().x > div.getElement().offsetWidth - 5 &&
                    e.clientY - div.getElement().getBoundingClientRect().y < 5
                ) {
                    window.onmousemove = function (e) {
                        posX2 = posX1 - e.clientX
                        posY2 = posY1 - e.clientY
                        posX1 = e.clientX
                        posY1 = e.clientY

                        debugText('Top Right Corner')
                        if (((div.getElement().offsetWidth - posX2) * 0.8) / workspaceImage.width <= 0.01) {
                            div.getElement().style.width = (0.01 * workspaceImage.width) / 0.8 + 'px'
                        } else if (
                            workspaceImage.getBoundingClientRect().right - actualMargin <
                            div.getElement().offsetLeft + (div.getElement().offsetWidth - posX2)
                        ) {
                            null
                        } else {
                            div.getElement().style.width = div.getElement().offsetWidth - posX2 + 'px'
                        }

                        if (((div.getElement().offsetHeight + posY2) * 0.6) / workspaceImage.height <= 0.01) {
                            div.getElement().style.height = `${(0.01 * workspaceImage.height) / 0.6}`
                        } else if (workspaceImage.getBoundingClientRect().top - (div.getElement().getBoundingClientRect().top - posY2) > 0) {
                            null
                            debugText('resize top MAX')
                        } else {
                            div.getElement().style.height = `${div.getElement().offsetHeight + posY2}px`
                            div.getElement().style.top = `${div.getElement().offsetTop - posY2}px`
                        }
                        // div.getElement().style.height = div.getElement().offsetHeight + posY2
                        // div.getElement().offsetWidth = div.getElement().offsetWidth + posX2
                        inputElementsUpdate(div, { height: true, width: true })
                        document.body.style.cursor = 'ne-resize'
                    }
                }

                //corner bottom-left NEW
                if (
                    e.clientX - div.getElement().getBoundingClientRect().x < 5 &&
                    e.clientY - div.getElement().getBoundingClientRect().y > div.getElement().offsetHeight - 5
                ) {
                    window.onmousemove = function (e) {
                        posX2 = posX1 - e.clientX
                        posY2 = posY1 - e.clientY
                        posX1 = e.clientX
                        posY1 = e.clientY

                        debugText('Bottom Left Corner')
                        if (((div.getElement().offsetWidth + posX2) * 0.8) / workspaceImage.width <= 0.01) {
                            div.getElement().style.width = (0.01 * workspaceImage.width) / 0.8 + 'px'
                        } else if (workspaceImage.getBoundingClientRect().x + actualMargin > div.getElement().offsetLeft - posX2) {
                            null
                        } else {
                            div.getElement().style.width = div.getElement().offsetWidth + posX2 + 'px'
                            div.getElement().style.left = `${div.getElement().offsetLeft - posX2}px`
                        }

                        if (((div.getElement().offsetHeight - posY2) * 600) / workspaceImage.height <= 10) {
                            div.getElement().style.height = `${(10 * workspaceImage.height) / 600}px`
                        } else if (
                            workspaceImage.getBoundingClientRect().bottom <
                            div.getElement().getBoundingClientRect().top + (div.getElement().offsetHeight - posY2)
                        ) {
                            null
                        } else {
                            div.getElement().style.height = `${div.getElement().offsetHeight - posY2}px`
                        }
                        inputElementsUpdate(div, { x: true, y: true, width: true, height: true })
                        document.body.style.cursor = 'ne-resize'
                    }
                }
            } else if (e.clientX - div.getElement().getBoundingClientRect().x < 5 || e.clientY - div.getElement().getBoundingClientRect().y < 5) {
                //top and left edge: resize and drag

                if (e.clientX - div.getElement().getBoundingClientRect().x < 5) {
                    window.onmousemove = function (e) {
                        posX2 = posX1 - e.clientX
                        posX1 = e.clientX
                        debugText('resize left')

                        if (((div.getElement().offsetWidth + posX2) * 0.8) / workspaceImage.width <= 0.01) {
                            div.getElement().style.width = (0.01 * workspaceImage.width) / 0.8 + 'px'
                        } else if (workspaceImage.getBoundingClientRect().x + actualMargin > div.getElement().offsetLeft - posX2) {
                            null
                        } else {
                            div.getElement().style.width = div.getElement().offsetWidth + posX2 + 'px'
                            div.getElement().style.left = `${div.getElement().offsetLeft - posX2}px`
                        }

                        // div.getElement().offsetHeight = div.getElement().offsetHeight + posY2
                        // div.getElement().style.width = div.getElement().offsetWidth + posX2
                        inputElementsUpdate(div, { x: true, width: true })
                        document.body.style.cursor = 'e-resize'
                    }
                }

                if (e.clientY - div.getElement().getBoundingClientRect().y < 5) {
                    window.onmousemove = function (e) {
                        posY2 = posY1 - e.clientY
                        posY1 = e.clientY
                        debugText('resize top')

                        if (((div.getElement().offsetHeight + posY2) * 0.6) / workspaceImage.height <= 0.01) {
                            div.getElement().style.height = `${(0.01 * workspaceImage.height) / 0.6}`
                        } else if (workspaceImage.getBoundingClientRect().top - (div.getElement().getBoundingClientRect().top - posY2) > 0) {
                            null
                            debugText('resize top MAX')
                        } else {
                            div.getElement().style.height = `${div.getElement().offsetHeight + posY2}px`
                            div.getElement().style.top = `${div.getElement().offsetTop - posY2}px`
                        }
                        // div.getElement().style.height = div.getElement().offsetHeight + posY2
                        // div.getElement().style.width = div.getElement().offsetWidth + posX2
                        inputElementsUpdate(div, { height: true })
                        document.body.style.cursor = 'n-resize'
                    }
                }

                //corner
                if (e.clientX - div.getElement().getBoundingClientRect().x < 5 && e.clientY - div.getElement().getBoundingClientRect().y < 5) {
                    window.onmousemove = function (e) {
                        posX2 = posX1 - e.clientX
                        posY2 = posY1 - e.clientY
                        posX1 = e.clientX
                        posY1 = e.clientY

                        debugText('Top Left Corner')
                        if (((div.getElement().offsetWidth + posX2) * 800) / workspaceImage.width <= 10) {
                            div.getElement().style.width = (10 * workspaceImage.width) / 800 + 'px'
                        } else if (workspaceImage.getBoundingClientRect().x + actualMargin > div.getElement().offsetLeft - posX2) {
                            null
                        } else {
                            div.getElement().style.width = div.getElement().offsetWidth + posX2 + 'px'
                            div.getElement().style.left = `${div.getElement().offsetLeft - posX2}px`
                        }

                        if (((div.getElement().offsetHeight + posY2) * 0.6) / workspaceImage.height <= 0.01) {
                            div.getElement().style.height = `${(0.01 * workspaceImage.height) / 0.6}`
                        } else if (workspaceImage.getBoundingClientRect().top - (div.getElement().getBoundingClientRect().top - posY2) > 0) {
                            null
                        } else {
                            div.getElement().style.height = `${div.getElement().offsetHeight + posY2}px`
                            div.getElement().style.top = `${div.getElement().offsetTop - posY2}px`
                        }
                        // div.getElement().style.height = div.getElement().offsetHeight + posY2
                        // div.getElement().style.width = div.getElement().offsetWidth + posX2
                        inputElementsUpdate(div, { x: true, width: true, height: true })
                        document.body.style.cursor = 'nw-resize'
                    }
                }
            }
        }

        window.onmouseup = function () {
            window.onmousemove = null
            window.onmouseup = null
            GUIEvents.isInteracting = false
            document.body.style.cursor = 'default'

            const selection = ProjectTree.getInstance().getSelectedFrames ? ProjectTree.getInstance().getSelectedFrames() : []
            const multi = Array.isArray(selection) && selection.length > 1

            if (!multi) {
                if (
                    startingX == div.getLeftX() &&
                    startingY == div.getBotY() &&
                    startingHeight == div.getHeight() &&
                    startingWidth == div.getWidth()
                ) {
                    return
                }

                // If linked children move is enabled, capture a batch so undo restores children too
                if (frame.custom.getLinkChildren()) {
                    const dx = div.getLeftX() - startingX
                    const dy = div.getBotY() - startingY
                    const items: { name: string; oldX: number; oldY: number; newX: number; newY: number }[] = []
                    // Parent
                    items.push({ name: frame.getName(), oldX: startingX, oldY: startingY, newX: div.getLeftX(), newY: div.getBotY() })
                    // Descendants
                    const addDesc = (parent: any) => {
                        for (const child of parent.getChildren()) {
                            const cx = child.custom.getLeftX()
                            const cy = child.custom.getBotY()
                            items.push({ name: child.getName(), oldX: cx - dx, oldY: cy - dy, newX: cx, newY: cy })
                            addDesc(child)
                        }
                    }
                    addDesc(frame)
                    new (require('../Commands/Implementation/MoveFramesBatchPos').default)(items).action()
                } else {
                    const command = new MoveFrame(frame, div.getLeftX(), div.getBotY(), div.getWidth(), div.getHeight(), {
                        oldX: startingX,
                        oldY: startingY,
                        oldWidth: startingWidth,
                        oldHeight: startingHeight,
                    })
                    command.action(true)
                }
            } else {
                // Group multiselect move into one undo entry using batch positions
                const items: { name: string; oldX: number; oldY: number; newX: number; newY: number }[] = []
                for (const sel of selection) {
                    const start = multiStartPositions.get(sel.getName())
                    if (!start) continue
                    items.push({
                        name: sel.getName(),
                        oldX: start.x,
                        oldY: start.y,
                        newX: sel.custom.getLeftX(),
                        newY: sel.custom.getBotY(),
                    })
                }
                if (items.length > 0) new MoveFramesBatchPos(items).action()
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    div.getElement().onmouseenter = function (e) {
        div.getElement().onmousemove = function (e) {
            if (GUIEvents.isInteracting || Editor.getInstance().selectionMode != 'normal') return
            if (e.altKey) return // If Canvas is being resized, don't move anything else
            // if(ProjectTree.getSelected() != div.getFrameComponent()) return

            if (
                e.clientX - div.getElement().getBoundingClientRect().x > 5 &&
                e.clientX - div.getElement().getBoundingClientRect().x < div.getElement().offsetWidth - 5 &&
                e.clientY - div.getElement().getBoundingClientRect().y > 5 &&
                e.clientY - div.getElement().getBoundingClientRect().y < div.getElement().offsetHeight - 5
            ) {
                //not at edge, so drag
                document.body.style.cursor = 'grab'
            } else {
                //at edge, so resize
                //now determine which edges
                if (
                    e.clientX - div.getElement().getBoundingClientRect().x > div.getElement().offsetWidth - 5 ||
                    e.clientY - div.getElement().getBoundingClientRect().y > div.getElement().offsetHeight - 5
                ) {
                    //right and bottom edge: just resize
                    if (e.clientX - div.getElement().getBoundingClientRect().x > div.getElement().offsetWidth - 5) {
                        //right
                        document.body.style.cursor = 'e-resize'
                    }

                    if (e.clientY - div.getElement().getBoundingClientRect().y > div.getElement().offsetHeight - 5) {
                        //bottom
                        document.body.style.cursor = 'n-resize'
                    }

                    //corner
                    if (
                        e.clientX - div.getElement().getBoundingClientRect().x > div.getElement().offsetWidth - 5 &&
                        e.clientY - div.getElement().getBoundingClientRect().y > div.getElement().offsetHeight - 5
                    ) {
                        document.body.style.cursor = 'nw-resize'
                    }

                    //corner top-right NEW
                    if (
                        e.clientX - div.getElement().getBoundingClientRect().x > div.getElement().offsetWidth - 5 &&
                        e.clientY - div.getElement().getBoundingClientRect().y < 5
                    ) {
                        document.body.style.cursor = 'ne-resize'
                    }

                    //corner bottom-left NEW
                    if (
                        e.clientX - div.getElement().getBoundingClientRect().x < 5 &&
                        e.clientY - div.getElement().getBoundingClientRect().y > div.getElement().offsetHeight - 5
                    ) {
                        document.body.style.cursor = 'ne-resize'
                    }
                } else if (e.clientX - div.getElement().getBoundingClientRect().x < 5 || e.clientY - div.getElement().getBoundingClientRect().y < 5) {
                    //top and left edge: resize and drag

                    if (e.clientX - div.getElement().getBoundingClientRect().x < 5) {
                        document.body.style.cursor = 'e-resize'
                    }

                    if (e.clientY - div.getElement().getBoundingClientRect().y < 5) {
                        document.body.style.cursor = 'n-resize'
                    }

                    //corner
                    if (e.clientX - div.getElement().getBoundingClientRect().x < 5 && e.clientY - div.getElement().getBoundingClientRect().y < 5) {
                        document.body.style.cursor = 'nw-resize'
                    }
                }
            }
        }

        div.getElement().onmouseleave = () => {
            div.getElement().onmousemove = null
            div.getElement().onmouseleave = null
            document.body.style.cursor = 'default'
        }
    }
}

function inputElementsUpdate(div: CustomComplex, updateOnly?: { x?: boolean; y?: boolean; width?: boolean; height?: boolean }) {
    const editor = Editor.getInstance()
    const workspaceImage = editor.workspaceImage
    const parameterEditor = ParameterEditor.getInstance()
    const horizontalMargin = EditorController.getInnerMargin()

    if (!updateOnly || updateOnly.width) {
        parameterEditor.inputElementWidth.value = InputEdit((div.getElement().offsetWidth * 800) / (workspaceImage.width - 2 * horizontalMargin))
        div.setWidth(+parameterEditor.inputElementWidth.value, true)
    }
    if (!updateOnly || updateOnly.height) {
        parameterEditor.inputElementHeight.value = InputEdit((div.getElement().offsetHeight * 600) / workspaceImage.height)
        div.setHeight(+parameterEditor.inputElementHeight.value, true)
    }
    if (!updateOnly || updateOnly.x) {
        parameterEditor.inputElementCoordinateX.value = `${InputEdit(
            ((div.getElement().offsetLeft - (workspaceImage.getBoundingClientRect().x + horizontalMargin)) / (workspaceImage.width - 2 * horizontalMargin)) *
                800
        )}`
        div.setLeftX(+parameterEditor.inputElementCoordinateX.value, true)
    }
    if (!updateOnly || updateOnly.y) {
        parameterEditor.inputElementCoordinateY.value = `${InputEdit(
            ((workspaceImage.getBoundingClientRect().bottom - div.getElement().getBoundingClientRect().bottom) / workspaceImage.height) * 600
        )}`
        div.setBotY(+parameterEditor.inputElementCoordinateY.value, true)
    }
}
