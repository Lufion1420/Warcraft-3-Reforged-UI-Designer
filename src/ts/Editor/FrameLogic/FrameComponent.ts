/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
import { FrameBuilder } from './FrameBuilder'
import { FrameType } from './FrameType'
import Saveable from '../../Persistence/Saveable'
import SaveContainer from '../../Persistence/SaveContainer'
import CustomComplex from './CustomComplex'
import { ProjectTree } from '../ProjectTree'
import ChangeFrameParent from '../../Commands/Implementation/ChangeFrameParent'
import { ParameterEditor } from '../ParameterEditor'
import { FrameMap } from './ComponentMap'
import TableArray from './Arrays/TableArray'
import BaseArray from './Arrays/BaseArray'
import ChangeFrameOrder from '../../Commands/Implementation/ChangeFrameOrder'

export class FrameComponent implements Saveable {
    static readonly SAVE_KEY_NAME = 'name'
    static readonly SAVE_KEY_CHILDREN = 'children'
    static readonly SAVE_KEY_TYPE = 'type'
    static readonly SAVE_KEY_TOOLTIP = 'tooltip'
    static readonly SAVE_KEY_ARRAY = 'array'
    static readonly SAVE_KEY_WORLDFRAME = 'world_frame'

    private name: string
    private children: FrameComponent[]
    type: FrameType
    private tooltip = false
    public array?: BaseArray

    world_frame = false

    readonly custom: CustomComplex
    readonly treeElement: HTMLElement
    parentOption: HTMLOptionElement
    readonly layerDiv: HTMLDivElement
    private ellipsisElement?: HTMLLIElement
    // private orderInParent = 0;
    public treeColor?: string

    FieldsAllowed: ElementFieldsAllowed = JSON.parse(JSON.stringify(defaultFieldsAllowed))

    constructor(frameBuildOptions: FrameBuilder) {
        const ul: HTMLElement = document.createElement('ul')
        const li: HTMLElement = document.createElement('li')
        this.name = ''
        ul.append(li)

        this.treeElement = ul
        this.treeElement.setAttribute('style', 'cursor: pointer;')
        this.children = []
        this.parentOption = document.createElement('option')
        this.type = frameBuildOptions.type
        this.layerDiv = document.createElement('div')
        this.custom = new CustomComplex(
            this,
            frameBuildOptions.width,
            frameBuildOptions.height,
            frameBuildOptions.x,
            frameBuildOptions.y,
            frameBuildOptions.z,
            frameBuildOptions
        )

        this.setName(frameBuildOptions.name)
        // ;(ul as any).frameComponent = this
        FrameMap.getInstance().frameComponent.set(ul, this)

        // Toggle collapse when clicking near the left marker (dot)
        li.addEventListener('mousedown', (ev: MouseEvent) => {
            const target = ev.currentTarget as HTMLElement
            const rect = target.getBoundingClientRect()
            const offsetX = ev.clientX - rect.left
            // If clicked within the first 14px from the left edge, toggle fold
            if (offsetX <= 14) {
                if (this.children.length > 0) target.classList.toggle('tree-collapsed')
                ev.preventDefault()
                ev.stopPropagation()
            }
        })

        li.onclick = (ev) => {
            const additive = (ev as MouseEvent).shiftKey
            ProjectTree.getInstance().select(this, additive)
        }

        // Enable drag and drop on tree items
        try {
            li.draggable = true
            li.addEventListener('dragstart', (ev) => {
                ProjectTree.dragSource = this
                ev.dataTransfer?.setData('text/plain', this.getName())
                if (ev.dataTransfer) ev.dataTransfer.effectAllowed = 'move'
            })
            li.addEventListener('dragover', (ev) => {
                ev.preventDefault()
                if (!ProjectTree.dragSource) return
                const targetLi = ev.currentTarget as HTMLElement
                // Clear previous hover state
                if (ProjectTree.dragHover && ProjectTree.dragHover !== targetLi) {
                    ProjectTree.dragHover.classList.remove('tree-drop-before', 'tree-drop-after', 'tree-drop-into')
                }
                const rect = targetLi.getBoundingClientRect()
                const y = ev.clientY - rect.top
                const top = rect.height * 0.33
                const bottom = rect.height * 0.66
                targetLi.classList.remove('tree-drop-before', 'tree-drop-after', 'tree-drop-into')
                if (y < top) targetLi.classList.add('tree-drop-before')
                else if (y > bottom) targetLi.classList.add('tree-drop-after')
                else targetLi.classList.add('tree-drop-into')
                ProjectTree.dragHover = targetLi
            })
            li.addEventListener('dragleave', (ev) => {
                const targetLi = ev.currentTarget as HTMLElement
                targetLi.classList.remove('tree-drop-before', 'tree-drop-after', 'tree-drop-into')
                if (ProjectTree.dragHover === targetLi) ProjectTree.dragHover = null
            })
            li.addEventListener('drop', (ev) => {
                ev.preventDefault()
                const src = ProjectTree.dragSource
                ProjectTree.dragSource = null
                if (!src || src === this) return

                const rect = (ev.currentTarget as HTMLElement).getBoundingClientRect()
                const y = ev.clientY - rect.top
                const top = rect.height * 0.33
                const bottom = rect.height * 0.66

                if (y < top) {
                    new ChangeFrameOrder(src, this, 'before').action()
                } else if (y > bottom) {
                    new ChangeFrameOrder(src, this, 'after').action()
                } else {
                    new ChangeFrameParent(src, this).action()
                }
                // clear hover classes
                const targetLi = ev.currentTarget as HTMLElement
                targetLi.classList.remove('tree-drop-before', 'tree-drop-after', 'tree-drop-into')
                if (ProjectTree.dragHover === targetLi) ProjectTree.dragHover = null
                ProjectTree.getInstance().select(this)
            })
            li.addEventListener('dragend', () => {
                ProjectTree.dragSource = null
                if (ProjectTree.dragHover) {
                    ProjectTree.dragHover.classList.remove('tree-drop-before', 'tree-drop-after', 'tree-drop-into')
                    ProjectTree.dragHover = null
                }
            })
        } catch (e) {
            console.log('Tree drag setup error', e)
        }

        this.setupAllowedFields()

        if (!ProjectTree.ShowBorders) this.custom.getElement().style.outlineWidth = '0px'
    }

    setTooltip(on: boolean): FrameComponent {
        this.tooltip = on
        let color = ProjectTree.outlineUnSelected
        if (on) color = ProjectTree.outlineUnSelected_Tooltip

        if (ProjectTree.getSelected() != this) {
            this.custom.getElement().style.outlineColor = color
        }

        return this
    }

    getTooltip(): boolean {
        return this.tooltip
    }

    getName(): string {
        return this.name
    }

    setName(newName: string): void {
        if (/.*\[[0-9]\]/.test(newName)) {
            const name1 = newName.slice(0, newName.length - 2)
            let name2 = newName.slice(newName.length - 2)
            name2 = '0' + name2
            newName = name1 + name2
        }

        this.name = newName
        try {
            ;(this.treeElement.firstChild as HTMLElement).innerText = newName
        } catch (error) {
            console.log(error)
        }

        if (this.parentOption) this.parentOption.text = newName
    }

    save(container: SaveContainer): void {
        container.save(FrameComponent.SAVE_KEY_NAME, this.name)
        container.save(FrameComponent.SAVE_KEY_TYPE, this.type)
        container.save(FrameComponent.SAVE_KEY_TOOLTIP, this.tooltip)
        container.save(FrameComponent.SAVE_KEY_WORLDFRAME, this.world_frame)
        this.custom.save(container)

        const childrenSaveArray: SaveContainer[] = []

        for (const child of this.children) {
            const childSaveContainer = new SaveContainer(null)
            child.save(childSaveContainer)
            childrenSaveArray.push(childSaveContainer)
        }

        if (childrenSaveArray.length > 0) container.save(FrameComponent.SAVE_KEY_CHILDREN, childrenSaveArray)
    }

    private appendFrame(frame: FrameComponent): void {
        // if(!this.layerDiv) {
        //     this.layerDiv = document.createElement("div")
        //     this.getParent().layerDiv.appendChild(this.layerDiv)
        // }

        // this.layerDiv.appendChild(frame.custom.getElement())

        this.layerDiv.appendChild(frame.layerDiv)

        this.children.push(frame)
        // Ensure an ellipsis placeholder exists directly after this node label if it now has children
        try {
            if (this.children.length === 1 && !this.ellipsisElement) {
                const li = this.treeElement.firstChild as HTMLElement
                if (li) li.classList.add('tree-has-children')
                this.ellipsisElement = document.createElement('li')
                this.ellipsisElement.className = 'tree-ellipsis'
                this.ellipsisElement.innerText = '…'
                // Insert after the label (index 0)
                if (this.treeElement.children.length > 1) this.treeElement.insertBefore(this.ellipsisElement, this.treeElement.children[1])
                else this.treeElement.append(this.ellipsisElement)
            }
        } catch {}
        this.treeElement.append(frame.treeElement)

        // Re-evaluate color groups based on first branching level
        try {
            ProjectTree.applyContainerColors()
        } catch {}

        // Mark this node as having children to enable folding affordance
        try {
            ;(this.treeElement.firstChild as HTMLElement)?.classList.add('tree-has-children')
        } catch {}
    }

    moveBeforeSibling(target: FrameComponent): boolean {
        const targetParent = target.getParent()
        if (!targetParent) return false

        if (this.getParent() !== targetParent) {
            new ChangeFrameParent(this, targetParent).pureAction()
        }
        const arr = targetParent.children
        const idxTarget = arr.indexOf(target)
        const idxSelf = arr.indexOf(this)
        if (idxTarget === -1 || idxSelf === -1) return false
        if (idxSelf < idxTarget) {
            arr.splice(idxTarget, 0, this)
            arr.splice(idxSelf, 1)
        } else {
            arr.splice(idxSelf, 1)
            arr.splice(idxTarget, 0, this)
        }
        // DOM order in tree and layer
        targetParent.treeElement.insertBefore(this.treeElement, target.treeElement)
        targetParent.layerDiv.insertBefore(this.layerDiv, target.layerDiv)
        try { ProjectTree.applyContainerColors() } catch {}
        return true
    }

    moveAfterSibling(target: FrameComponent): boolean {
        const targetParent = target.getParent()
        if (!targetParent) return false
        if (this.getParent() !== targetParent) {
            new ChangeFrameParent(this, targetParent).pureAction()
        }
        const arr = targetParent.children
        const idxTarget = arr.indexOf(target)
        const idxSelf = arr.indexOf(this)
        if (idxTarget === -1 || idxSelf === -1) return false
        // Insert after means at indexTarget+1 after removal
        arr.splice(idxSelf, 1)
        const newIndex = idxTarget + 1 <= arr.length ? idxTarget + 1 : arr.length
        arr.splice(newIndex, 0, this)
        // DOM order
        const next = target.treeElement.nextSibling
        targetParent.treeElement.insertBefore(this.treeElement, next)
        const nextLayer = target.layerDiv.nextSibling
        targetParent.layerDiv.insertBefore(this.layerDiv, nextLayer)
        try { ProjectTree.applyContainerColors() } catch {}
        return true
    }

    private removeFrame(whatFrame: FrameComponent): boolean {
        const childIndex = this.children.indexOf(whatFrame)

        if (childIndex == -1) return false

        this.children.splice(childIndex, 1)

        // If no children remain, remove ellipsis and child marker
        try {
            if (this.children.length === 0) {
                const li = this.treeElement.firstChild as HTMLElement
                if (li) {
                    li.classList.remove('tree-has-children')
                    li.classList.remove('tree-collapsed')
                }
                if (this.ellipsisElement) {
                    this.ellipsisElement.remove()
                    this.ellipsisElement = undefined
                }
            }
        } catch {}

        return true
    }

    createAsChild(newFrame: FrameBuilder): FrameComponent {
        const newChild = new FrameComponent(newFrame)

        this.appendFrame(newChild)
        if (!newChild.FieldsAllowed.parent) {
            new ChangeFrameParent(newChild, ProjectTree.getInstance().rootFrame).pureAction()
        }

        ProjectTree.refreshElements()
        return newChild
    }

    destroy() {
        const parent = this.getParent()
        if (!parent) return
        parent.removeFrame(this)

        for (const child of this.children) {
            parent.appendFrame(child)
        }

        this.treeElement.remove()
        if (this.custom != null) this.custom.delete()
        if (this.parentOption != null) this.parentOption.remove()

        ParameterEditor.getInstance().updateFields(null)
    }

    /**
     * Removes this frame and its entire subtree from the project tree (no reparenting).
     * Used for full resets (e.g., before loading a different project).
     */
    destroyDeep() {
        // Make a copy because child.destroyDeep mutates this.children
        const childrenCopy = [...this.children]
        for (const child of childrenCopy) {
            child.destroyDeep()
        }

        const parent = this.getParent()
        if (parent) parent.removeFrame(this)

        try { this.treeElement.remove() } catch {}
        try { this.layerDiv.remove() } catch {}
        try { if (this.custom != null) this.custom.delete() } catch {}
        try { if (this.parentOption != null) this.parentOption.remove() } catch {}
    }

    /** Move this frame under a given parent at a specific index (undo-friendly helper) */
    moveToParentAtIndex(newParent: FrameComponent, index: number): boolean {
        if (newParent === this) return false
        // Ensure correct parent
        newParent.makeAsParentTo(this)

        const arr = newParent.getChildren()
        const idxSelf = arr.indexOf(this)
        if (idxSelf === -1) return false

        // Remove current position
        arr.splice(idxSelf, 1)

        // Clamp index
        if (index < 0) index = 0
        if (index > arr.length) index = arr.length

        // Insert at index in model
        arr.splice(index, 0, this)

        // DOM order: find sibling at index and insert before it
        const siblingAtIndex = newParent.treeElement.children[index + 1] // +1 because first child is label LI
        if (siblingAtIndex) newParent.treeElement.insertBefore(this.treeElement, siblingAtIndex)
        else newParent.treeElement.appendChild(this.treeElement)

        const layerSibling = newParent.layerDiv.children[index]
        if (layerSibling) newParent.layerDiv.insertBefore(this.layerDiv, layerSibling)
        else newParent.layerDiv.appendChild(this.layerDiv)

        try { ProjectTree.applyContainerColors() } catch {}
        return true
    }

    makeAsParentTo(newChild: FrameComponent) {
        if (newChild == this) return false

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let traverseNode: FrameComponent | undefined = this
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let previousNode: FrameComponent = this

        do {
            if (traverseNode == newChild) {
                newChild.removeFrame(previousNode)
                newChild.getParent()?.appendFrame(previousNode)

                break
            }

            previousNode = traverseNode
            traverseNode = traverseNode.getParent()
        } while (traverseNode)

        newChild.getParent()?.removeFrame(newChild)
        this.appendFrame(newChild)

        return true
    }

    static GetFrameComponent(projectTreeElement: HTMLElement) {
        return FrameMap.getInstance().frameComponent.get(projectTreeElement)
    }

    getChildren(): FrameComponent[] {
        return this.children
    }

    getParent() {
        return this.treeElement?.parentElement ? FrameComponent.GetFrameComponent(this.treeElement.parentElement) : undefined
    }

    changeOrigin(world_frame: boolean): FrameComponent {
        let parent: FrameComponent = this

        let foundOrigin = false
        while (foundOrigin == false) {
            if (!parent.getParent()) foundOrigin = true

            if (parent.getParent()?.type == FrameType.ORIGIN) {
                if (world_frame) {
                    parent.world_frame = true
                } else {
                    parent.world_frame = false
                }
                console.log('world_frame: ' + parent.world_frame)
                foundOrigin = true
                break
            }
            parent = parent.getParent() ?? parent
        }

        return this
    }

    setupAllowedFields() {
        const i = this.type
        const ft = FrameType
        const f = this.FieldsAllowed

        //reset to default
        Object.assign(this.FieldsAllowed, defaultFieldsAllowed)

        const allowText = () => {
            f.text = true
            f.color = true
            f.scale = true
        }

        switch (i) {
            case ft.BROWSER_BUTTON:
                allowText()
                f.trigVar = true
                f.tooltip = false
                break
            case ft.BUTTON:
                f.trigVar = true
                f.tooltip = false
                f.textures = true
                f.type = true

                break
            case ft.SIMPLE_BUTTON:
                f.trigVar = true
                f.tooltip = false
                f.textures = false
                f.backTextures = false
                f.type = true

                break
            case ft.SCRIPT_DIALOG_BUTTON:
                allowText()
                f.trigVar = true
                f.tooltip = false

                break
            case ft.INVIS_BUTTON:
                f.trigVar = true
                f.tooltip = false

                break
            case ft.BACKDROP:
                f.textures = true
                f.type = true

                break
            case ft.CHECKBOX:
                f.trigVar = true
                break
            case ft.TEXT_FRAME:
                allowText()
                f.text = false
                f.textBig = true
                f.textAlign = true
                break
            case ft.HORIZONTAL_BAR:
                f.textures = true
                f.tooltip = false
                break
            case ft.HOR_BAR_BACKGROUND:
                f.textures = true
                f.backTextures = true
                f.tooltip = false
                f.parent = false
                break
            case ft.HOR_BAR_TEXT:
                f.textures = true
                allowText()
                f.textAlign = true
                f.tooltip = false
                f.parent = false
                break
            case ft.HOR_BAR_BACKGROUND_TEXT:
                f.textures = true
                f.backTextures = true
                allowText()
                f.textAlign = true
                f.tooltip = false
                f.parent = false
                break
            case ft.TEXTAREA:
                f.color = true
                f.textBig = true
                break
            case ft.EDITBOX:
                f.text = true
                break
            // case ft.CHECKBOX:
            //     f.trigVar = true;
            //     break;
            // case ft.CHECKBOX:
            //     f.trigVar = true;
            //     break;
            // case ft.CHECKBOX:
            //     f.trigVar = true;
            //     break;

            default:
                break
        }
    }
}

interface ElementFieldsAllowed {
    text: boolean
    textBig: boolean
    type: boolean
    color: boolean
    scale: boolean
    textAlign: boolean
    textures: boolean
    backTextures: boolean
    trigVar: boolean
    /**Default is true */
    parent: boolean
    /**Default is true */
    tooltip: boolean
}

const defaultFieldsAllowed: ElementFieldsAllowed = {
    parent: true,
    tooltip: true,

    color: false,
    scale: false,
    text: false,
    textBig: false,
    textAlign: false,
    textures: false,
    backTextures: false,
    trigVar: false,
    type: false,
}
