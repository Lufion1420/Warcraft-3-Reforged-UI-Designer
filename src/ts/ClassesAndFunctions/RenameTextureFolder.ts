import { remote } from 'electron'
import { debugText } from './MiniFunctions'
import { ICallableDivInstance } from './ICallableDivInstance'
import ChangeAllFrameDiskTextureFolders from '../Commands/Implementation/ChangeAllFrameDiskTextureFolders'

export default class RenameTextureFolder implements ICallableDivInstance {
    public run(): void {
        remote.dialog
            .showOpenDialog({
                properties: ['openDirectory'],
            })
            .then((openData) => {
                if (openData.canceled || openData.filePaths.length === 0) return

                new ChangeAllFrameDiskTextureFolders(openData.filePaths[0]).action()
                debugText(`Texture folder changed to ${openData.filePaths[0]}`)
            })
    }
}

