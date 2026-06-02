import { basename, join } from 'path'
import { debugText } from '../../ClassesAndFunctions/MiniFunctions'
import CustomComplex from '../../Editor/FrameLogic/CustomComplex'
import { FrameComponent } from '../../Editor/FrameLogic/FrameComponent'
import { ParameterEditor } from '../../Editor/ParameterEditor'
import { ProjectTree } from '../../Editor/ProjectTree'
import SimpleCommand from '../SimpleCommand'

type TextureSlot = 'normal' | 'back'

interface TexturePathChange {
    frame: FrameComponent
    which: TextureSlot
    oldPath: string
    newPath: string
}

export default class ChangeAllFrameDiskTextureFolders extends SimpleCommand {
    private changes: TexturePathChange[] = []
    private newFolder: string

    public constructor(newFolder: string, changes?: TexturePathChange[]) {
        super()
        this.newFolder = newFolder
        if (changes) this.changes = changes
    }

    public pureAction(): void {
        if (this.changes.length === 0) {
            this.changes = this.collectChanges()
        }

        this.applyChanges(this.changes)
        debugText(`Updated ${this.changes.length} texture path${this.changes.length === 1 ? '' : 's'}.`)
    }

    public undo(): void {
        super.undo()
        this.applyChanges(
            this.changes.map((change) => ({
                frame: change.frame,
                which: change.which,
                oldPath: change.newPath,
                newPath: change.oldPath,
            }))
        )
        debugText('Undid texture folder rename.')
    }

    public redo(): void {
        super.redo()
        debugText('Redid texture folder rename.')
    }

    private collectChanges(): TexturePathChange[] {
        const changes: TexturePathChange[] = []

        for (const frame of ProjectTree.getInstance().getIterator()) {
            if (!(frame.custom instanceof CustomComplex)) continue

            this.addChange(changes, frame, 'normal')
            this.addChange(changes, frame, 'back')
        }

        return changes
    }

    private addChange(changes: TexturePathChange[], frame: FrameComponent, which: TextureSlot): void {
        const oldPath = frame.custom.getDiskTexture(which)
        if (!oldPath) return

        const filename = basename(oldPath)
        if (!filename) return

        const newPath = join(this.newFolder, filename)
        if (newPath === oldPath) return

        changes.push({
            frame,
            which,
            oldPath,
            newPath,
        })
    }

    private applyChanges(changes: TexturePathChange[]): void {
        for (const change of changes) {
            const frame = change.frame
            if (!(frame.custom instanceof CustomComplex)) continue

            frame.custom.setDiskTexture(change.newPath, change.which, false)
        }

        ParameterEditor.getInstance().updateFields(ProjectTree.getSelected())
    }
}
