import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import { ProjectTree } from '../../Editor/ProjectTree'
import SimpleCommand from '../SimpleCommand'

const HIDDEN_LOCK_MESSAGE = 'Hidden elements cannot be moved or resized.'

export default class MoveFramesBatchY extends SimpleCommand {
    private frames: string[]
    private delta: number
    private oldY: Map<string, number> = new Map()
    private hadHidden = false

    public constructor(frames: FrameComponent[], delta: number) {
        super()
        const movable: string[] = []
        for (const frame of frames) {
            if (frame.getHidden() || frame.getHiddenCascade()) {
                this.hadHidden = true
                continue
            }
            movable.push(frame.getName())
        }
        this.frames = movable
        this.delta = delta
    }

    private moveDescendantsY(parent: FrameComponent, dy: number) {
        for (const child of parent.getChildren()) {
            child.custom.setBotY(child.custom.getBotY() + dy)
            this.moveDescendantsY(child, dy)
        }
    }

    public pureAction(): void {
        const tree = ProjectTree.getInstance()
        if (this.frames.length === 0) {
            if (this.hadHidden) debugText(HIDDEN_LOCK_MESSAGE)
            return
        }
        // Capture old positions only once
        if (this.oldY.size === 0) {
            for (const name of this.frames) {
                const f = tree.findByName(name)
                if (f) this.oldY.set(name, f.custom.getBotY())
            }
        }

        for (const name of this.frames) {
            const f = tree.findByName(name)
            if (!f) continue
            const base = this.oldY.get(name)
            if (typeof base === 'number') {
                f.custom.setBotY(base + this.delta)
                if (f.custom.getLinkChildren()) this.moveDescendantsY(f, this.delta)
            }
        }
    }

    public undo(): void {
        const tree = ProjectTree.getInstance()
        for (const [name, y] of this.oldY.entries()) {
            const f = tree.findByName(name)
            if (!f) continue
            const dy = y - f.custom.getBotY()
            f.custom.setBotY(y)
            if (dy !== 0 && f.custom.getLinkChildren()) this.moveDescendantsY(f, dy)
        }
        super.undo()
        debugText('Undid batch move Y')
    }

    public redo(): void {
        super.redo()
        debugText('Redid batch move Y')
    }
}
