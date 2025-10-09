import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import SimpleCommand from '../SimpleCommand'
import { ProjectTree } from '../../Editor/ProjectTree'

export default class ChangeFrameHidden extends SimpleCommand {
    private frame: string
    private hidden: boolean
    private oldHidden?: boolean

    public constructor(frame: FrameComponent | string, newHidden: boolean) {
        super()

        this.frame = typeof frame === 'string' ? frame : frame.getName()
        this.hidden = newHidden
    }

    public pureAction(): void {
        const frame = ProjectTree.getInstance().findByName(this.frame)

        if (!frame) {
            debugText('Could not find frame.')
            return
        }

        this.oldHidden = frame.getHidden()
        frame.setHidden(this.hidden)
    }

    public undo(): void {
        const projectTree = ProjectTree.getInstance()
        const frame = projectTree.findByName(this.frame)

        if (!frame) {
            debugText('Could not find frame.')
            return
        }

        if (this.oldHidden !== undefined) frame.setHidden(this.oldHidden)

        super.undo()
        debugText('Undid frame hidden change.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid frame hidden change.')
    }
}
