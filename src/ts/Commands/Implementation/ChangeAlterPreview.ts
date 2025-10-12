import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import { FrameAlterPreviewData, FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import { ProjectTree } from '../../Editor/ProjectTree'
import { ParameterEditor } from '../../Editor/ParameterEditor'
import SimpleCommand from '../SimpleCommand'

export default class ChangeAlterPreview extends SimpleCommand {
    private readonly frameName: string
    private readonly newData: FrameAlterPreviewData
    private oldData?: FrameAlterPreviewData
    private readonly actionMessage?: string
    private readonly undoMessage?: string

    constructor(
        frame: FrameComponent | string,
        newData: FrameAlterPreviewData,
        oldData?: FrameAlterPreviewData,
        actionMessage?: string,
        undoMessage?: string
    ) {
        super()
        this.frameName = typeof frame === 'string' ? frame : frame.getName()
        this.newData = { ...newData }
        this.oldData = oldData ? { ...oldData } : undefined
        this.actionMessage = actionMessage
        this.undoMessage = undoMessage
    }

    private apply(data: FrameAlterPreviewData): void {
        const frame = ProjectTree.getInstance().findByName(this.frameName)
        if (!frame) {
            debugText(`Preview update failed: frame "${this.frameName}" not found.`)
            return
        }
        frame.setAlterPreview({ ...data })
        ParameterEditor.getInstance().applyPreviewState(frame, true)
    }

    public pureAction(): void {
        if (!this.oldData) {
            const frame = ProjectTree.getInstance().findByName(this.frameName)
            if (frame) this.oldData = frame.getAlterPreview()
        }
        this.apply(this.newData)
        if (this.actionMessage) debugText(this.actionMessage)
    }

    public undo(): void {
        if (!this.oldData) {
            super.undo()
            return
        }
        this.apply(this.oldData)
        super.undo()
        if (this.undoMessage) debugText(this.undoMessage)
    }
}
