import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import { ProjectTree } from '../../Editor/ProjectTree'
import SimpleCommand from '../SimpleCommand'

export default class MoveFramesBatchY extends SimpleCommand {
    private frames: string[]
    private delta: number
    private oldY: Map<string, number> = new Map()

    public constructor(frames: FrameComponent[], delta: number) {
        super()
        this.frames = frames.map((f) => f.getName())
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

