import { ipcRenderer } from 'electron'
import Saveable from '../../Persistence/Saveable'
import SaveContainer from '../../Persistence/SaveContainer'
import { EditorController } from '../EditorController'
import { FrameComponent } from './FrameComponent'
import { ProjectTree } from '../ProjectTree'
import { Editor } from '../Editor'

export default abstract class FrameBaseContent implements Saveable {
    static readonly SAVE_KEY_HEIGHT = 'height'
    static readonly SAVE_KEY_WIDTH = 'width'
    static readonly SAVE_KEY_LEFTX = 'leftX'
    static readonly SAVE_KEY_BOTY = 'botY'

    protected readonly frameComponent: FrameComponent
    protected readonly element: HTMLElement

    protected width = 0
    protected height = 0
    protected botY = 0
    protected leftX = 0
    protected zIndex = 0

    protected constructor(frameComponent: FrameComponent, element: HTMLElement, width: number, height: number, x: number, y: number, z: number) {
        this.frameComponent = frameComponent
        this.element = element
        frameComponent.layerDiv.appendChild(this.element)

        this.setWidth(width)
        this.setHeight(height)
        this.setLeftX(x)
        this.setBotY(y)

        this.element.draggable = false
        this.element.style.position = 'absolute'
        this.element.style.outlineStyle = 'dashed'
        this.element.style.outlineColor = ProjectTree.outlineUnSelected
        this.element.style.outlineOffset = '-1px'
        this.element.style.outlineWidth = '1px'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(element as any).frameBaseContent = this

        //step 1: event sent to main.ts to display the menu.
        this.element.oncontextmenu = (ev: Event) => {
            ProjectTree.getInstance().select(ev.target as HTMLElement)

            ipcRenderer.send('show-context-menu')
        }
    }

    abstract delete(): void

    getElement(): HTMLElement {
        return this.element
    }

    getFrameComponent(): FrameComponent {
        return this.frameComponent
    }

    getZIndex(): number {
        return this.zIndex
    }

    getWidth(): number {
        return this.width
    }

    setWidth(newWidth: number, noChange?: boolean): void {
        const horizontalMargin = EditorController.getInnerMargin()

        if (!noChange) this.element.style.width = (newWidth / 0.8) * (Editor.getInstance().workspaceImage.width - 2 * horizontalMargin) + 'px'
        this.width = newWidth
    }

    getHeight(): number {
        return this.height
    }

    setHeight(newHeight: number, noChange?: boolean): void {
        const workspace = Editor.getInstance().workspaceImage
        const rect = workspace.getBoundingClientRect()
        if (!noChange) {
            this.element.style.top = `${this.element.offsetTop + (this.element.offsetHeight - (newHeight * rect.height) / 0.6)}px`
            this.element.style.height = `${(newHeight / 0.6) * workspace.getBoundingClientRect().height}px`
        }
        this.height = newHeight
    }

    getLeftX(): number {
        return this.leftX
    }

    setLeftX(newX: number, noChange?: boolean): void {
        const editor = Editor.getInstance()
        const rect = editor.workspaceImage.getBoundingClientRect()
        const horizontalMargin = EditorController.getInnerMargin()
        // Clamp within allowed X limits so elements cannot go off-screen
        const limits = EditorController.getMarginLimits()
        const maxX = limits.max - this.getWidth()
        if (maxX >= limits.min) {
            newX = Math.max(limits.min, Math.min(newX, maxX))
        }
        this.leftX = newX
        if (!noChange) this.element.style.left = `${(+newX * (rect.width - 2 * horizontalMargin)) / 0.8 + rect.left + horizontalMargin}px`
    }

    getBotY(): number {
        return this.botY
    }

    setBotY(newY: number, noChange?: boolean): void {
        const rect = Editor.getInstance().workspaceImage.getBoundingClientRect()
        // Clamp within [0, 0.6 - height] so bottom Y stays visible
        const maxY = 0.6 - this.getHeight()
        if (maxY >= 0) {
            newY = Math.max(0, Math.min(newY, maxY))
        }
        this.botY = newY
        if (!noChange) this.element.style.top = `${rect.bottom - (newY * rect.height) / 0.6 - this.element.offsetHeight - 120}px`
    }

    save(container: SaveContainer): void {
        container.save(FrameBaseContent.SAVE_KEY_HEIGHT, this.height)
        container.save(FrameBaseContent.SAVE_KEY_WIDTH, this.width)
        container.save(FrameBaseContent.SAVE_KEY_LEFTX, this.leftX)
        container.save(FrameBaseContent.SAVE_KEY_BOTY, this.botY)
    }

    static GetFrameBaseContentFromHTMLImageElement(htmlElement: HTMLImageElement): FrameBaseContent {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (htmlElement as any).frameBaseContent
    }
}
