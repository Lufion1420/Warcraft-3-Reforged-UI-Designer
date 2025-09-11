import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import { ProjectTree } from '../../Editor/ProjectTree'
import SimpleCommand from '../SimpleCommand'

interface PosItem {
    name: string
    oldX: number
    oldY: number
    newX: number
    newY: number
}

export default class MoveFramesBatchPos extends SimpleCommand {
    private items: PosItem[]

    public constructor(items: { name: string; oldX: number; oldY: number; newX: number; newY: number }[]) {
        super()
        this.items = items
    }

    private apply(items: PosItem[]) {
        const tree = ProjectTree.getInstance()
        for (const it of items) {
            const f = tree.findByName(it.name)
            if (!f) continue
            f.custom.setLeftX(it.newX)
            f.custom.setBotY(it.newY)
        }
    }

    public pureAction(): void {
        this.apply(this.items)
    }

    public undo(): void {
        const revert = this.items.map((it) => ({ ...it, newX: it.oldX, newY: it.oldY }))
        const tree = ProjectTree.getInstance()
        for (const it of revert) {
            const f = tree.findByName(it.name)
            if (!f) continue
            f.custom.setLeftX(it.newX)
            f.custom.setBotY(it.newY)
        }
        super.undo()
        debugText('Undid cascade move')
    }

    public redo(): void {
        super.redo()
        debugText('Redid cascade move')
    }
}

