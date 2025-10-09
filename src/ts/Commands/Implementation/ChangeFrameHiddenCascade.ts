import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import SimpleCommand from '../SimpleCommand'
import { ProjectTree } from '../../Editor/ProjectTree'

export default class ChangeFrameHiddenCascade extends SimpleCommand {
    private frame: string
    private cascade = false
    private oldCascade?: boolean

    public constructor(frame: FrameComponent | string, enableCascade: boolean) {
        super()
        this.frame = typeof frame === 'string' ? frame : frame.getName()
        this.cascade = enableCascade
    }

    public pureAction(): void {
        const frame = ProjectTree.getInstance().findByName(this.frame)
        if (!frame) {
            debugText('Could not find frame.')
            return
        }

        this.oldCascade = frame.getHiddenCascade()
        frame.setHiddenCascade(this.cascade)
    }

    public undo(): void {
        const projectTree = ProjectTree.getInstance()
        const frame = projectTree.findByName(this.frame)
        if (!frame) {
            debugText('Could not find frame.')
            return
        }

        if (this.oldCascade !== undefined) frame.setHiddenCascade(this.oldCascade)

        super.undo()
        debugText('Undid frame cascade hide change.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid frame cascade hide change.')
    }
}
