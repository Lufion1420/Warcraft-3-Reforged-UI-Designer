import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import { ProjectTree } from '../../Editor/ProjectTree'
import SimpleCommand from '../SimpleCommand'

export default class MoveFramesBatchX extends SimpleCommand {
    private frames: string[]
    private delta: number
    private oldX: Map<string, number> = new Map()

    public constructor(frames: FrameComponent[], delta: number) {
        super()
        this.frames = frames.map((f) => f.getName())
        this.delta = delta
    }

    private moveDescendantsX(parent: FrameComponent, dx: number) {
        for (const child of parent.getChildren()) {
            child.custom.setLeftX(child.custom.getLeftX() + dx)
            this.moveDescendantsX(child, dx)
        }
    }

    public pureAction(): void {
        const tree = ProjectTree.getInstance()
        // Capture old positions only once
        if (this.oldX.size === 0) {
            for (const name of this.frames) {
                const f = tree.findByName(name)
                if (f) this.oldX.set(name, f.custom.getLeftX())
            }
        }

        for (const name of this.frames) {
            const f = tree.findByName(name)
            if (!f) continue
            const base = this.oldX.get(name)
            if (typeof base === 'number') {
                f.custom.setLeftX(base + this.delta)
                if (f.custom.getLinkChildren()) this.moveDescendantsX(f, this.delta)
            }
        }
    }

    public undo(): void {
        const tree = ProjectTree.getInstance()
        for (const [name, x] of this.oldX.entries()) {
            const f = tree.findByName(name)
            if (!f) continue
            const dx = x - f.custom.getLeftX()
            f.custom.setLeftX(x)
            if (dx !== 0 && f.custom.getLinkChildren()) this.moveDescendantsX(f, dx)
        }
        super.undo()
        debugText('Undid batch move X')
    }

    public redo(): void {
        super.redo()
        debugText('Redid batch move X')
    }
}

