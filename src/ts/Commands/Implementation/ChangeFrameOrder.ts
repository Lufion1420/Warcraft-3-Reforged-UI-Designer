import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import { ProjectTree } from '../../Editor/ProjectTree'
import SimpleCommand from '../SimpleCommand'

type OrderPos = 'before' | 'after'

export default class ChangeFrameOrder extends SimpleCommand {
    private frame: string
    private target: string
    private pos: OrderPos
    private oldParentName?: string
    private oldIndex?: number

    public constructor(frame: FrameComponent | string, target: FrameComponent | string, pos: OrderPos) {
        super()
        this.frame = typeof frame === 'string' ? frame : frame.getName()
        this.target = typeof target === 'string' ? target : target.getName()
        this.pos = pos
    }

    public pureAction(): void {
        const tree = ProjectTree.getInstance()
        const frame = tree.findByName(this.frame)
        const target = tree.findByName(this.target)
        if (!frame || !target) {
            debugText('Could not find frame or target.')
            return
        }

        const parent = frame.getParent()
        if (!parent) {
            debugText('Source has no parent.')
            return
        }
        this.oldParentName = parent.getName()
        this.oldIndex = parent.getChildren().indexOf(frame)

        if (this.pos === 'before') frame.moveBeforeSibling(target)
        else frame.moveAfterSibling(target)

        try {
            ProjectTree.applyContainerColors()
        } catch {}
    }

    public undo(): void {
        if (this.oldParentName === undefined || this.oldIndex === undefined) return
        const tree = ProjectTree.getInstance()
        const frame = tree.findByName(this.frame)
        const oldParent = tree.findByName(this.oldParentName)
        if (!frame || !oldParent) return

        frame.moveToParentAtIndex(oldParent, this.oldIndex)

        super.undo()
        debugText('Undid change frame order.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid change frame order.')
    }
}

