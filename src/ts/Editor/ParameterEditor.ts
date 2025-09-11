import { debugText } from '../ClassesAndFunctions/MiniFunctions'
import { EditorController } from './EditorController'
import { FrameComponent } from './FrameLogic/FrameComponent'
import { FrameType } from './FrameLogic/FrameType'
import ChangeElementName from '../Commands/Implementation/ChangeFrameName'
import ChangeFrameWidth from '../Commands/Implementation/ChangeFrameWidth'
import Actionable from '../Commands/Actionable'
import ChangeFrameHeight from '../Commands/Implementation/ChangeFrameHeight'
import ChangeFrameType from '../Commands/Implementation/ChangeFrameType'
import ChangeFrameParent from '../Commands/Implementation/ChangeFrameParent'
import ChangeFrameTooltip from '../Commands/Implementation/ChangeFrameTooltip'
import ChangeFrameX from '../Commands/Implementation/ChangeFrameX'
import ChangeFrameY from '../Commands/Implementation/ChangeFrameY'
import { ProjectTree } from './ProjectTree'
import CustomComplex from './FrameLogic/CustomComplex'
import { Tooltips } from '../ClassesAndFunctions/Tooltips'
import { Editor } from './Editor'
import ChangeTableXGap from '../Commands/Implementation/Arrays/ChangeTableXGap'
import ChangeTableYGap from '../Commands/Implementation/Arrays/ChangeTableYGap'
import ChangeTableRows from '../Commands/Implementation/Arrays/ChangeTableRows'
import ChangeTableCols from '../Commands/Implementation/Arrays/ChangeTableCols'
import TableArray from './FrameLogic/Arrays/TableArray'
import CircleArray from './FrameLogic/Arrays/CircleArray'
import ChangeCircleRadius from '../Commands/Implementation/Arrays/ChangeCircleRadius'
import ChangeCircleCount from '../Commands/Implementation/Arrays/ChangeCircleCount'
import RenameArray from '../Commands/Implementation/Arrays/RenameArray'
import CloneElementToArrayArray from '../Commands/Implementation/Arrays/CloneElementToArray'
import ChangeFrameDiskTexture from '../Commands/Implementation/ChangeFrameDiskTexture'
import ChangeFrameTextColor from '../Commands/Implementation/ChangeFrameTextColor'

export class ParameterEditor {
    private static instance: ParameterEditor
    /**gives the instance */
    static getInstance() {
        if (!ParameterEditor.instance) ParameterEditor.instance = new ParameterEditor()
        return ParameterEditor.instance
    }

    public readonly panelParameters = document.getElementById('panelParameters') as HTMLElement
    public readonly inputElementName = document.getElementById('elementName') as HTMLInputElement
    public readonly selectElementType = document.getElementById('elementType') as HTMLSelectElement
    public readonly selectElementParent = document.getElementById('elementParent') as HTMLSelectElement
    public readonly checkboxElementTooltip = document.getElementById('elementTooltip') as HTMLInputElement
    public readonly checkboxElementBorders = document.getElementById('CheckboxElementBorders') as HTMLInputElement
    public readonly checkboxElementRelative = document.getElementById('relativeCheckbox') as HTMLInputElement
    public readonly checkboxElementLinkToParent = document.getElementById('linkToParentCheckbox') as HTMLInputElement
    public readonly inputElementWidth = document.getElementById('elementWidth') as HTMLInputElement
    public readonly inputElementHeight = document.getElementById('elementHeight') as HTMLInputElement
    public readonly inputElementCoordinateX = document.getElementById('elementCoordinateX') as HTMLInputElement
    public readonly inputElementCoordinateY = document.getElementById('elementCoordinateY') as HTMLInputElement
    public readonly inputElementDiskTexture = document.getElementById('elementDiskTexture') as HTMLInputElement
    public readonly fileElementTextureBrowse = document.getElementById('buttonBrowseTexture') as HTMLInputElement
    public readonly inputElementWC3Texture = document.getElementById('elementWC3Texture') as HTMLInputElement
    public readonly inputElementBackDiskTexture = document.getElementById('elementBackDiskTexture') as HTMLInputElement
    public readonly fileElementBackTextureBrowse = document.getElementById('buttonBackBrowseTexture') as HTMLInputElement
    public readonly inputElementBackWC3Texture = document.getElementById('elementBackWC3Texture') as HTMLInputElement
    public readonly inputGeneralTexPrefix = document.getElementById('generalTexPrefix') as HTMLInputElement
    public readonly inputGeneralTexExt = document.getElementById('generalTexExt') as HTMLInputElement
    public readonly inputElementText = document.getElementById('elementText') as HTMLInputElement
    public readonly inputElementTrigVar = document.getElementById('elementTrigVar') as HTMLInputElement
    public readonly inputElementTextBig = document.getElementById('elementTextBig') as HTMLInputElement
    public readonly inputElementTextScale = document.getElementById('elementTextScale') as HTMLInputElement
    public readonly inputElementTextColor = document.getElementById('elementTextColor') as HTMLInputElement
    public readonly inputElementOnClickFunc = document.getElementById('elementOnClickFunc') as HTMLInputElement
    public readonly inputElementOnMouseEnterFunc = document.getElementById('elementOnMouseEnterFunc') as HTMLInputElement
    public readonly inputElementOnMouseLeaveFunc = document.getElementById('elementOnMouseLeaveFunc') as HTMLInputElement
    public readonly inputElementArrayName = document.getElementById('elementArrayName') as HTMLInputElement
    public readonly inputElementArrayRows = document.getElementById('elementArrayRows') as HTMLInputElement
    public readonly inputElementArrayCols = document.getElementById('elementArrayCols') as HTMLInputElement
    public readonly inputElementArrayXGap = document.getElementById('elementArrayXGap') as HTMLInputElement
    public readonly inputElementArrayYGap = document.getElementById('elementArrayYGap') as HTMLInputElement
    public readonly inputElementArrayRadius = document.getElementById('elementArrayRadius') as HTMLInputElement
    public readonly inputElementArrayCount = document.getElementById('elementArrayCount') as HTMLInputElement
    public readonly buttonElementTextureBrowse = document.getElementById('buttonBrowseTexture') as HTMLButtonElement
    public readonly buttonElementArrayClone = document.getElementById('buttonCloneArrayProps') as HTMLButtonElement
    public readonly inputLibraryName = document.getElementById('generalLibName') as HTMLInputElement
    public readonly checkboxGameUI = document.getElementById('generalGameUI') as HTMLInputElement
    public readonly checkboxHeroBar = document.getElementById('generalHeroBar') as HTMLInputElement
    public readonly checkboxMiniMap = document.getElementById('generalMiniMap') as HTMLInputElement
    public readonly checkboxResources = document.getElementById('generalResources') as HTMLInputElement
    public readonly checkboxButtonBar = document.getElementById('generalButtonBar') as HTMLInputElement
    public readonly checkboxPortrait = document.getElementById('generalPortrait') as HTMLInputElement
    public readonly checkboxChat = document.getElementById('generalChat') as HTMLInputElement
    public readonly checkboxPathFill = document.getElementById('generalPathFill') as HTMLInputElement
    public readonly selectElementHorAlign = document.getElementById('elementTextHorAlign') as HTMLSelectElement
    public readonly selectElementVerAlign = document.getElementById('elementTextVerAlign') as HTMLSelectElement

    public readonly fieldTexture = document.getElementById('FieldTexture') as HTMLDivElement
    public readonly fieldBackgroundTexture = document.getElementById('FieldBackgroundTexture') as HTMLDivElement
    public readonly fieldType = document.getElementById('FieldType') as HTMLDivElement
    public readonly FieldPropertiesFull = document.getElementById('FieldPropertiesFull') as HTMLDivElement
    public readonly fieldFunctionalityText = document.getElementById('FieldFunctionalityText') as HTMLDivElement
    public readonly fieldFunctionalityTextBig = document.getElementById('FieldFunctionalityTextBig') as HTMLDivElement
    public readonly fieldFunctionalityTextScale = document.getElementById('FieldFunctionalityScale') as HTMLDivElement
    public readonly fieldFunctionalityTextColor = document.getElementById('FieldFunctionalityColor') as HTMLDivElement
    public readonly fieldFunctionalityTextAlign = document.getElementById('FieldFunctionalityAlign') as HTMLDivElement
    public readonly fieldArrayTable = document.getElementById('FieldArrayTable') as HTMLDivElement
    public readonly fieldArrayCircle = document.getElementById('FieldArrayCircle') as HTMLDivElement
    public readonly fieldFunctionalityVar = document.getElementById('FieldFunctionalityVar') as HTMLDivElement
    public readonly fieldGeneral = document.getElementById('FieldGeneral') as HTMLDivElement
    public readonly fieldElement = document.getElementById('FieldElement') as HTMLDivElement
    public readonly fieldTooltip = document.getElementById('FieldTooltip') as HTMLDivElement
    public readonly fieldParent = document.getElementById('FieldParent') as HTMLDivElement
    public readonly fieldElementInfo = document.getElementById('ElementInfo') as HTMLDivElement
    public readonly fieldElementInfoTitle = document.getElementById('ElementInfoTitle') as HTMLElement
    public readonly fieldElementInfoDesc = document.getElementById('ElementInfoDesc') as HTMLSpanElement
    public readonly fieldPropertiesOutermost = document.getElementById('PropertiesOutermostLevel') as HTMLDivElement
    public readonly fieldFunctionalityOutermost = document.getElementById('FunctionalityOutermostLevel') as HTMLDivElement
    public readonly fieldArrayConfigOutermost = document.getElementById('ArrayConfigurationOutermost') as HTMLDivElement
    public readonly buttonNormalSelectorMode = document.getElementById('normalSelectorMode') as HTMLButtonElement
    public readonly buttonZoomSelectorMode = document.getElementById('zoomSelectorMode') as HTMLButtonElement
    public readonly buttonDragSelectorMode = document.getElementById('dragSelectorMode') as HTMLButtonElement


    private constructor() {

        this.inputElementWidth.onchange = ParameterEditor.InputWidth
        this.inputElementHeight.onchange = ParameterEditor.InputHeight
        this.inputElementName.oninput = ParameterEditor.InputName
        this.inputElementName.onchange = ParameterEditor.ChangeName
        this.selectElementType.onchange = ParameterEditor.ChangeType
        this.selectElementParent.onchange = ParameterEditor.ChangeParent
        this.checkboxElementTooltip.onchange = ParameterEditor.ChangeTooltip
        this.checkboxElementBorders.onchange = ParameterEditor.HideBorders
        this.checkboxElementRelative.onchange = ParameterEditor.InputIsRelative
        this.checkboxElementLinkToParent.onchange = ParameterEditor.InputLinkToParent
        this.inputElementCoordinateX.onchange = ParameterEditor.InputCoordinateX
        this.inputElementCoordinateY.onchange = ParameterEditor.InputCoordinateY
        this.inputElementDiskTexture.onchange = (ev) => ParameterEditor.TextInputDiskTexture(ev, 'normal')
        this.fileElementTextureBrowse.onchange = (ev) => ParameterEditor.ButtonInputDiskTexture(ev, 'normal')
        this.inputElementWC3Texture.oninput = (ev) => ParameterEditor.InputWC3Texture(ev, 'normal')
        this.inputElementBackDiskTexture.onchange = (ev) => ParameterEditor.TextInputDiskTexture(ev, 'back')
        this.fileElementBackTextureBrowse.onchange = (ev) => ParameterEditor.ButtonInputDiskTexture(ev, 'back')
        this.inputElementBackWC3Texture.oninput = (ev) => ParameterEditor.InputWC3Texture(ev, 'back')
        this.inputElementText.oninput = ParameterEditor.InputText
        this.inputElementTextBig.oninput = ParameterEditor.InputText
        this.inputElementTextScale.onchange = ParameterEditor.InputTextScale
        this.inputElementTextColor.onchange = ParameterEditor.InputTextColor
        this.inputElementTrigVar.oninput = ParameterEditor.InputTrigVar
        this.inputElementOnClickFunc.oninput = ParameterEditor.InputOnClickFunc
        this.inputElementOnMouseEnterFunc.oninput = ParameterEditor.InputOnMouseEnterFunc
        this.inputElementOnMouseLeaveFunc.oninput = ParameterEditor.InputOnMouseLeaveFunc
        this.inputElementArrayName.onchange = ParameterEditor.InputArrayName
        this.inputElementArrayXGap.onchange = ParameterEditor.InputArrayXGap
        this.inputElementArrayYGap.onchange = ParameterEditor.InputArrayYGap
        this.inputElementArrayRows.onchange = ParameterEditor.InputArrayRows
        this.inputElementArrayCols.onchange = ParameterEditor.InputArrayCols
        this.inputElementArrayRadius.onchange = ParameterEditor.InputArrayRadius
        this.inputElementArrayCount.onchange = ParameterEditor.InputArrayCount
        this.selectElementHorAlign.onchange = ParameterEditor.InputHorAlign
        this.selectElementVerAlign.onchange = ParameterEditor.InputVerAlign
        this.buttonNormalSelectorMode.onclick = () => ParameterEditor.ChangeSelectionMode('normal')
        this.buttonZoomSelectorMode.onclick = () => ParameterEditor.ChangeSelectionMode('zoom')
        this.buttonDragSelectorMode.onclick = () => ParameterEditor.ChangeSelectionMode('drag')
        this.buttonElementArrayClone.onclick = ParameterEditor.ButtonArrayClone

        // General options: texture prefix/ext override
        this.inputGeneralTexPrefix.oninput = () => (ProjectTree.TexturePrefix = this.inputGeneralTexPrefix.value)
        this.inputGeneralTexExt.oninput = () => (ProjectTree.TextureExtOverride = this.inputGeneralTexExt.value)

        const radios = document.querySelectorAll('input[type=radio][name="OriginMode"]')
        radios.forEach((radio) => ((radio as HTMLInputElement).onchange = () => ParameterEditor.OriginModeChanges((radio as HTMLInputElement).value)))

        this.fieldElement.style.display = 'none'
    }

    /** checks whether value is smaller than 0.0001. True if smaller. */
    private static CheckInputValue(value: number): boolean {
        const result = value < 0.0001
        if (result) {
            debugText('Minimum Value is 0.0001.')
        }

        return result
    }

    static InputWidth(ev: Event): void {
        const inputElement = ev.target as HTMLInputElement
        const selected = ProjectTree.getSelected()
        if (selected) {
            const selectedCustom = selected.custom
            const workspace = Editor.getInstance().workspaceImage
            const horizontalMargin = EditorController.getInnerMargin()
            const actualMargin = EditorController.getMargin()

            if (+inputElement.value > EditorController.getMarginLimits().max || +inputElement.value < EditorController.getMarginLimits().min) {
                debugText(
                    `Input refused. Width is limited to ${EditorController.getMarginLimits().min} and ${EditorController.getMarginLimits().max}.`
                )
                return
            }

            if (
                selectedCustom.getElement().getBoundingClientRect().left + (+inputElement.value / 0.8) * (workspace.width - 2 * horizontalMargin) >
                workspace.getBoundingClientRect().right - actualMargin
            ) {
                debugText(`Input refused. Image right edge will be out of screen.`)
                return
            }

            let command: Actionable

            if (ParameterEditor.CheckInputValue(+inputElement.value)) {
                command = new ChangeFrameWidth(selected, 0.01)
            } else {
                command = new ChangeFrameWidth(selected, +inputElement.value)
            }
            command.action()
        }
    }

    static InputHeight(ev: Event): void {
        try {
            const inputElement = ev.target as HTMLInputElement
            const selected = ProjectTree.getSelected()
            if (selected) {
                const selectedCustom = selected.custom
                const workspace = Editor.getInstance().workspaceImage

                if (+inputElement.value > 0.6 || +inputElement.value < 0) {
                    debugText(`Input refused. Height is limited to 0 and 0.6.`)
                    return
                }

                if (
                    selectedCustom.getElement().getBoundingClientRect().bottom - (+inputElement.value / 0.6) * workspace.height <
                    workspace.getBoundingClientRect().top
                ) {
                    debugText(`Input refused. Image top edge will be out of screen.`)
                    return
                }

                let command: Actionable
                if (ParameterEditor.CheckInputValue(+inputElement.value)) {
                    command = new ChangeFrameHeight(selected, 0.0001)
                } else {
                    command = new ChangeFrameHeight(selected, +inputElement.value)
                }
                command.action()
            }
        } catch (e) {
            alert(e)
        }
    }

    static InputName(ev: Event): void {
        const inputElement = ev.target as HTMLInputElement
        const text = inputElement.value

        //checks only the first character if it is number or not
        if (text.charAt(0) != '' && +text.charAt(0) >= 0 && +text.charAt(0) <= 9) {
            inputElement.value = ''
            debugText("Name can't start with a number")
        }

        //checks if the text contains special chars or not, if yes, deletes the last character (which will be the special char)
        if (/[`!@#$%^&*()_+\-={};':"\\|,.<>/?~]/.test(text)) {
            inputElement.value = text.slice(0, text.length - 1)
            debugText('Special Characters refused')
        }
    }

    static ChangeName(ev: Event): void {
        try {
            const inputElement = ev.target as HTMLInputElement
            let text = inputElement.value
            const projectTree = ProjectTree.getInstance()
            let nulIndexFound = false

            if (/.*\[[0-9]\]/.test(text)) {
                inputElement.value = text.slice(0, text.length - 2) + '0' + text.slice(text.length - 2)
                text = inputElement.value
                debugText('Modified index.')
            }

            const isArray = /^([a-z]|[A-Z])+([a-z]|[A-Z]|[0-9])*\[[0-9][0-9]+\]$/.test(text)
            if (!(isArray || /^([a-z]|[A-Z])+([a-z]|[A-Z]|[0-9])*$/.test(text))) {
                debugText('Invalid name')
                return
            }

            if (isArray) {
                const index = text.search(/\[/)
                const index2 = text.search(']')

                if (index >= 0) {
                    if (Number.parseInt(text.slice(index + 1, index2)) == 0) nulIndexFound = true
                }
            }

            const endingIndex = text.search(/\[/)

            for (const frame of projectTree.getIterator()) {
                if (frame == projectTree.getSelectedFrame()) {
                    continue
                }

                if (frame.getName().localeCompare(text) == 0) {
                    debugText('Name already taken.')
                    return
                }

                if (isArray && !nulIndexFound) {
                    const endingIndex2 = frame.getName().search(/\[/)

                    if (text.slice(0, endingIndex).localeCompare(frame.getName().slice(0, endingIndex2)) == 0) {
                        const index = frame.getName().search(/\[/)
                        const index2 = frame.getName().search(']')

                        if (index >= 0) {
                            if (Number.parseInt(frame.getName().slice(index + 1, index2)) == 0) nulIndexFound = true
                        }
                    }
                }
            }

            if (isArray && !nulIndexFound) {
                debugText('Cannot have a frame array without a 0 indexed frame')
                return
            }
            const selected = ProjectTree.getSelected()
            if (selected) {
                const command = new ChangeElementName(selected, text)
                command.action()
            }

            debugText('Name changed to "' + text + '"')
        } catch (e) {
            alert(e)
        }
    }

    static ChangeType(ev: Event): void {
        const selectElement = ev.target as HTMLSelectElement

        const selected = ProjectTree.getSelected()
        if (selected) {
            const command = new ChangeFrameType(selected, +selectElement.selectedOptions[0].value)
            command.action()

            let typeText = ''
            if (selected.type == FrameType.BACKDROP) typeText = 'Backdrop'
            if (selected.type == FrameType.BUTTON) typeText = 'Button'
            if (selected.type == FrameType.SIMPLE_BUTTON) typeText = 'Simple Button'
            debugText('Type changed to ' + typeText)

            ParameterEditor.getInstance().updateFields(selected)
        }
    }

    static ChangeParent(ev: Event): void {
        try {
            const selectElement = ev.target as HTMLSelectElement
            const selected = ProjectTree.getSelected()
            if (selected) {
                for (const el of ProjectTree.getInstance().getIterator()) {
                    if (!el.parentOption) continue

                    if (el.parentOption == selectElement.selectedOptions[0]) {
                        const command = new ChangeFrameParent(selected, el)
                        command.action()
                        break
                    }
                }
                debugText('Parent changed to ' + selected.getParent().getName())
            }
        } catch (e) {
            alert(e)
        }
    }

    static ChangeTooltip(ev: Event): void {
        const val = (ev.target as HTMLInputElement).checked
        const selected = ProjectTree.getSelected()
        if (selected) {
            const command = new ChangeFrameTooltip(selected, val)
            command.action()

            if (val) debugText('Is now a Tooltip')
            else debugText('No longer a Tooltip')
        }
    }

    static HideBorders(ev: Event): void {
        try {
            const val = (ev.target as HTMLInputElement).checked

            const typs = FrameType

            for (const fr of ProjectTree.getInstance().getIterator()) {
                if (fr.type !== typs.ORIGIN && fr.type !== typs.HOR_BAR_BACKGROUND && fr.type != typs.HOR_BAR_BACKGROUND_TEXT && fr.type != typs.HOR_BAR_TEXT) {
                    if (val) {
                        fr.custom.getElement().style.outlineWidth = '1px'
                        console.log(fr.custom.getElement().style.outlineWidth)
                    } else {
                        fr.custom.getElement().style.outlineWidth = '0px'
                    }
                }
            }
            ProjectTree.ShowBorders = val
            debugText(`All element borders have been ${val ? 'activated' : 'deactivated'}.`)
        } catch (e) {
            console.log('HideBorders: ' + e)
        }
    }

    static InputIsRelative(ev: Event): void {
        try {
            const val = (ev.target as HTMLInputElement).checked
            const selected = ProjectTree.getSelected()

            if (selected) {
                selected.custom.setIsRelative(val)
                debugText(`Relative Positioning has been ${val ? 'enabled' : 'disabled'} for this element.`)
            }
        } catch (e) {
            console.log('EnableRelativePosition: ' + e)
        }
    }

    static InputLinkToParent(ev: Event): void {
        try {
            const val = (ev.target as HTMLInputElement).checked
            const selected = ProjectTree.getSelected()

            if (selected) {
                selected.custom.setLinkChildren(val)
                debugText(`Link Children has been ${val ? 'enabled' : 'disabled'} for this element.`)
            }
        } catch (e) {
            console.log('LinkToParent toggle error: ' + e)
        }
    }

    static InputOnClickFunc(ev: Event): void {
        const input = ev.target as HTMLInputElement
        const selected = ProjectTree.getSelected()
        if (selected) {
            selected.custom.setOnClickFunc(input.value)
        }
    }

    static InputOnMouseEnterFunc(ev: Event): void {
        const input = ev.target as HTMLInputElement
        const selected = ProjectTree.getSelected()
        if (selected) {
            selected.custom.setOnMouseEnterFunc(input.value)
        }
    }

    static InputOnMouseLeaveFunc(ev: Event): void {
        const input = ev.target as HTMLInputElement
        const selected = ProjectTree.getSelected()
        if (selected) {
            selected.custom.setOnMouseLeaveFunc(input.value)
        }
    }

    static InputCoordinateX(ev: Event): void {
        const loc = (ev.target as HTMLInputElement).value
        const editor = Editor.getInstance()
        const rect = editor.workspaceImage.getBoundingClientRect()
        const selected = ProjectTree.getSelected()
        if (selected) {
            const image = selected.custom.getElement()

            const horizontalMargin = EditorController.getInnerMargin()

            if ((+loc + selected.custom.getWidth()) > EditorController.getMarginLimits().max || +loc < EditorController.getMarginLimits().min) {
                debugText(
                    `Input refused. X coordinate is limited to ${EditorController.getMarginLimits().min} and ${
                        EditorController.getMarginLimits().max
                    }`
                )
                return
            }
            // if (+loc + (image.getBoundingClientRect().width / (rect.width - 2 * horizontalMargin)) * 0.8 > EditorController.getActualMarginLimits().max) {
            //     debugText('Input refused. Image right edge will be out of screen.')
            //     return
            // }

            const command = new ChangeFrameX(selected, +loc)
            command.action()
        }
    }

    static InputCoordinateY(ev: Event): void {
        try {
            const loc = (ev.target as HTMLInputElement).value
            const editor = Editor.getInstance()
            const rect = editor.workspaceImage.getBoundingClientRect()
            const selected = ProjectTree.getSelected()
            if (selected) {
                const image = selected.custom.getElement()

                if (+loc > 0.6 || +loc < 0) {
                    debugText(`Input refused. Y coordinate is limited to 0 and 0.6.`)
                    return
                }
                if (+loc + (image.getBoundingClientRect().height / rect.height) * 0.6 > 0.6) {
                    debugText('Input refused. Image top edge will be out of screen.')
                    return
                }

                const command = new ChangeFrameY(selected, +loc)
                command.action()
            }
        } catch (e) {
            alert(e)
        }
    }

    static TextInputDiskTexture(ev: Event, which: 'normal' | 'back'): void {
        const inputElement = ev.target as HTMLInputElement

        const selected = ProjectTree.getSelected()
        if (selected) {
            // selected.custom.setDiskTexture(inputElement.value, which)
            new ChangeFrameDiskTexture(selected, inputElement.value, which).action()
        }
        debugText('Disk Texture changed.')
    }

    static async ButtonInputDiskTexture(ev: Event, which: 'normal' | 'back'): Promise<void> {
        try {
            const inputElement = ev.target as HTMLInputElement
            const file = inputElement.files ? inputElement.files[0] : undefined
            const selected = ProjectTree.getSelected()
            if (selected && file) {
                new ChangeFrameDiskTexture(selected, file, which).action()
            }

            inputElement.value = ''
            debugText('Disk Texture changed.')
        } catch (e) {
            console.log(e)
        }
    }

    static InputWC3Texture(ev: Event, which: 'normal' | 'back'): void {
        const inputElement = ev.target as HTMLInputElement
        let text = inputElement.value
        text = text.replace(/(?<!\\)\\(?!\\)/g, '\\\\')
        inputElement.value = text

        const selected = ProjectTree.getSelected()
        if (selected) {
            selected.custom.setWc3Texture(text, which)
        }
        debugText('WC3 Texture changed.')
    }

    static InputText(ev: Event): void {
        const inputElement = ev.target as HTMLInputElement
        const selected = ProjectTree.getSelected()
        if (selected) {
            const frameContent = selected.custom

            frameContent.setText(inputElement.value)
            debugText('Text changed.')
        }
    }

    static InputTrigVar(ev: Event): void {
        const inputElement = ev.target as HTMLInputElement

        const selected = ProjectTree.getSelected()
        if (selected) {
            const frameBaseContent = selected.custom

            let text = inputElement.value
            if (text.indexOf('udg_') != 0 && text.length > 0) {
                text = 'udg_' + text
                console.log(text)
            }

            if (frameBaseContent instanceof CustomComplex) {
                frameBaseContent.setTrigVar(text)
                debugText('Triggered Variable changed.')
            }
        }
    }

    static InputTextScale(ev: Event): void {
        const inputElement = ev.target as HTMLInputElement
        const selected = ProjectTree.getSelected()
        if (selected) {
            ;(selected.custom as CustomComplex).setScale(+inputElement.value)
        }
        debugText('Scale changed.')
    }

    static InputTextColor(ev: Event): void {
        const inputElement = ev.target as HTMLInputElement
        const selected = ProjectTree.getSelected()
        if (selected) {
            // ;(selected.custom as CustomComplex).setColor(inputElement.value)
            new ChangeFrameTextColor(selected, inputElement.value).action()
        }
    }

    static InputHorAlign(ev: Event): void {
        const el = ev.target as HTMLSelectElement
        const selected = ProjectTree.getSelected()
        if (selected) {
            if (el.value == 'left' || el.value == 'center' || el.value == 'right') selected.custom.setHorAlign(el.value)
        } else alert('Critical Error: InputHorAlign input type is wrong!')
    }

    static InputVerAlign(ev: Event): void {
        const el = ev.target as HTMLSelectElement
        const selected = ProjectTree.getSelected()
        if (selected) {
            if (el.value == 'start' || el.value == 'center' || el.value == 'flex-end') selected.custom.setVerAlign(el.value)
        } else alert('Critical Error: InputVerAlign input type is wrong!')
    }

    static InputArrayName(ev: Event): void {
        const inputElement = ev.target as HTMLInputElement
        const selected = ProjectTree.getSelected()
        if (selected && selected.array) {
            new RenameArray(selected.array, inputElement.value).action()
        }
        debugText('Array Name Changed.')
    }

    static InputArrayXGap(ev: Event): void {
        const inputElement = ev.target as HTMLInputElement
        const selected = ProjectTree.getSelected()
        if (selected && selected.array) {
            if(selected.array instanceof TableArray)
                new ChangeTableXGap(selected.array, +inputElement.value).action()
        }
        debugText('Array X-Gap changed.')
    }

    static InputArrayYGap(ev: Event): void {
        const inputElement = ev.target as HTMLInputElement
        const selected = ProjectTree.getSelected()
        if (selected && selected.array) {
            if(selected.array instanceof TableArray)
                new ChangeTableYGap(selected.array, +inputElement.value).action()
        }
        debugText('Array Y-Gap changed.')
    }

    static InputArrayRows(ev: Event): void {
        const inputElement = ev.target as HTMLInputElement
        const selected = ProjectTree.getSelected()
        if (selected && selected.array) {
            if(selected.array instanceof TableArray)
                new ChangeTableRows(selected.array, +inputElement.value).action()
        }
        debugText('Array Rows changed.')
    }

    static InputArrayCols(ev: Event): void {
        const inputElement = ev.target as HTMLInputElement
        const selected = ProjectTree.getSelected()
        if (selected && selected.array) {
            if(selected.array instanceof TableArray)
                new ChangeTableCols(selected.array, +inputElement.value).action()
        }
        debugText('Array Cols changed.')
    }

    static InputArrayRadius(ev: Event): void {
        const inputElement = ev.target as HTMLInputElement
        const selected = ProjectTree.getSelected()
        if (selected && selected.array) {
            if(selected.array instanceof CircleArray)
                new ChangeCircleRadius(selected.array, +inputElement.value).action()
        }
        debugText('Array Radius changed.')
    }

    static InputArrayCount(ev: Event): void {
        const inputElement = ev.target as HTMLInputElement
        const selected = ProjectTree.getSelected()
        if (selected && selected.array) {
            if(selected.array instanceof CircleArray)
                new ChangeCircleCount(selected.array, +inputElement.value).action()
        }
        debugText('Array Count changed.')
    }

    static ButtonArrayClone(ev: Event): void {
        const selected = ProjectTree.getSelected()
        if (selected && selected.array) {
            new CloneElementToArrayArray(selected.array, selected).action()
        }
        debugText('Element cloned to all other elements in the array.')
    }

    static ChangeSelectionMode(mode: 'normal' | 'zoom' | 'drag'): void {
        const editor = Editor.getInstance()
        editor.selectionMode = mode
        switch (mode) {
            case 'normal':
                document.body.style.cursor = 'default'
                break
            case 'zoom':
                document.body.style.cursor = 'zoom-in'
                break
            case 'drag':
                document.body.style.cursor = 'grab'
                break
        }
    }

    static OriginModeChanges(val: string): void {
        ProjectTree.OriginMode = val
    }

    public emptyFields(): void {
        this.inputElementWidth.value = ''
        this.inputElementHeight.value = ''
        this.inputElementName.value = ''
        this.selectElementType.value = ''
        this.selectElementParent.value = ''
        this.checkboxElementTooltip.checked = false
        this.checkboxElementRelative.checked = false
        this.checkboxElementLinkToParent.checked = false
        this.inputElementCoordinateX.value = ''
        this.inputElementCoordinateY.value = ''
        this.inputElementDiskTexture.value = ''
        this.inputElementWC3Texture.value = ''
        this.inputElementText.value = ''
        this.inputElementTextBig.value = ''
        this.inputElementTextScale.value = ''
        this.inputElementTextColor.value = '#FFFFFF'
        this.inputElementTrigVar.value = ''
    }

    public disableFields(disable: boolean): void {
        this.inputElementWidth.disabled = disable
        this.inputElementHeight.disabled = disable
        this.inputElementName.disabled = disable
        this.selectElementType.disabled = disable
        this.selectElementParent.disabled = disable
        this.checkboxElementTooltip.disabled = disable
        this.checkboxElementRelative.disabled = disable
        this.checkboxElementLinkToParent.disabled = disable
        this.inputElementCoordinateX.disabled = disable
        this.inputElementCoordinateY.disabled = disable
        this.inputElementDiskTexture.disabled = disable
        this.buttonElementTextureBrowse.disabled = disable
        this.inputElementWC3Texture.disabled = disable
        this.inputElementText.disabled = disable
        this.inputElementTrigVar.disabled = disable
    }

    public updateFields(frame: FrameComponent | null): void {
        try {
            // Disable panel while multi-select is active
            if (ProjectTree.getInstance().hasMultiSelection()) {
                this.disableFields(true)
            } else {
                this.disableFields(false)
            }
            // const editor = Editor.GetDocumentEditor() // Not used

            // const horizontalMargin = Editor.getInnerMargin() // Not used

            if (frame && frame != ProjectTree.getInstance().rootFrame) {
                // this.disableFields(false)

                // change title and desc info
                let txt = ''
                let dsc = ''
                let func = ''
                let requireExt = false

                /**In case another native needs to be inserted */
                const hideNativePart1 = `<strong>Hide/Show:</strong>
                <br><span class="bg-dark text-white">call BlzFrameSetVisible( ElementName, true/false )</span>`

                const hideNativePart2 = `<br> <b>"true"</b> to show it, <b>"false"</b> to hide it.
                <br> Shows or hides the frame. <b>Hiding a parent</b> will hide all its children as well.`

                const hideNativeFull = hideNativePart1 + hideNativePart2

                const disableNative = `<strong>Enable/Disable:</strong>
                <br><span class="bg-dark text-white">call BlzFrameSetEnable( ElementName, true/false )</span>
                <br> <b>"true"</b> to enable it, <b>"false"</b> to disable it.
                <br> Enables or disables the user interaction with the frame. Ex: For buttons, enables or disables the ability to click on them.`

                const ft = FrameType
                switch (frame.type) {
                    case ft.BROWSER_BUTTON:
                        txt = 'Browser Button'
                        dsc = "A clickable button with black color and may have text inside. Buttons can't be tooltips."
                        func =
                            `<strong>Change Text:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetText( ElementName, udg_StringVariable )</span> 
                        <br>Replace "StringVariable" with the name of a string variable.
                        <br> Changes the text inside the button.<hr>` +
                            disableNative +
                            `<hr>` +
                            hideNativeFull

                        break
                    case ft.SCRIPT_DIALOG_BUTTON:
                        txt = 'Script Dialog Button'
                        dsc = "A clickable button with blue color and may have text inside. Buttons can't be tooltips."
                        func =
                            `<strong>Change Text:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetText( ElementName, udg_StringVariable )</span> 
                        <br>Replace "StringVariable" with the name of a string variable.
                        <br>Changes the text inside the button.<hr>` +
                            disableNative +
                            `<hr>` +
                            hideNativeFull

                        break
                    case ft.BUTTON:
                        txt = 'Custom Button'
                        dsc = "A clickable button with custom texture. Buttons can't be tooltips."
                        func =
                            `Consists of 2 frames above each other. A ScriptDialog button, which controls clickability & a backdrop to show custom texture.
                        The ScriptDialog button has the same name assigned to the element, while the backdrop has the prefix <b>"Backdrop"</b> before the name.
                        <hr><strong>Change Texture:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetTexture( <b>Backdrop</b>ElementName, udg_StringVariable, 0, true)</span> 
                        <br>Replace "StringVariable" with the name of a string variable, which holds the path to the texture.
                        <br>Changes the texture of the button.<hr>` +
                            disableNative +
                            `<hr>` +
                            hideNativePart1 +
                            `<br><span class="bg-dark text-white">call BlzFrameSetVisible( <b>Backdrop</b>ElementName, true/false )</span>` +
                            hideNativePart2

                        break
                    case ft.CHECKBOX:
                        txt = 'Checkbox'
                        dsc = 'A checkbox that can be checked or unchecked by clicking on it.'
                        func = disableNative + `<hr>` + hideNativeFull

                        break
                    case ft.HORIZONTAL_BAR:
                        txt = 'Horizontal Bar'
                        dsc =
                            'A horizontal bar similar to loadings bars, that takes the whole texture and displays a percentage of it. The remaining part is transparent.'
                        func =
                            `<strong>Change Value:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetValue( ElementName, udg_IntegerVariable )</span> 
                        <br>Replace <b>"IntegerVariable"</b> with the name of an integer variable, which holds the desired value. <b>Default Value: 50</b>.
                        <br><b>Value</b> controls the percentage of the bar that is displayed. It is bounded between the Min & Max Values. If Value is equal to Min-Value, it is at 0%.
                        If equal to Max-Value, it is at 100%.
                        
                        <hr><strong>Change Min & Max Values:</strong>
                        <br><span class="bg-dark text-white">BlzFrameSetMinMaxValue( ElementName, minValue, maxValue )</span> 
                        <br>Replace <b>"minValue" & "maxValue"</b> with the names of integer variables, which holds the desired values. <b>Default Value: Min=0, Max=100.</b>.
                        <br><b>Min & Max Value</b> controls the boundaries of the bar's Value, which was explained above.
                        
                        <hr><strong>Change Texture:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetTexture( ElementName, udg_StringVariable, 0, true)</span> 
                        <br>Replace "StringVariable" with the name of a string variable, which holds the path to the texture.
                        <br>Changes the texture of the bar.<hr>` + hideNativeFull

                        break
                    case ft.HOR_BAR_BACKGROUND:
                        txt = 'Horizontal Bar with Background'
                        dsc =
                            "A horizontal bar combined with a backdrop. The backdrop acts as a background, and shows below the bar when the bar's display percentage isn't 100%. It exists by itself and can't be a child to other frames."
                        func =
                            `Consists of 2 frames above each other. A Horizontal Bar & a backdrop below it. The backdrop acts as a background for the bar. The backdrop has the prefix <b>"Back"</b> followed by the name.
                        <hr><strong>Change Value: Explained in Horizontal Bar</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetValue( ElementName, udg_IntegerVariable )</span> 
                        
                        <hr><strong>Change Min & Max Values: Explained in Horizontal Bar</strong>
                        <br><span class="bg-dark text-white">BlzFrameSetMinMaxValue( ElementName, minValue, maxValue )</span> 
                        
                        <hr><strong>Change Texture:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetTexture( ElementName, udg_StringVariable, 0, true)</span> 
                        <br><span class="bg-dark text-white">call BlzFrameSetTexture( <b>Back</b>ElementName, udg_StringVariable, 0, true)</span> 
                        <br>Replace "StringVariable" with the name of a string variable, which holds the path to the texture.
                        <br>Changes the texture of the bar.<hr>` +
                            hideNativePart1 +
                            `<br><span class="bg-dark text-white">call BlzFrameSetVisible( <b>Back</b>ElementName, true/false )</span>` +
                            hideNativePart2

                        break
                    case ft.HOR_BAR_BACKGROUND_TEXT:
                        txt = 'Horizontal Bar with Background & Text'
                        dsc =
                            "A horizontal bar combined with a backdrop (acts as a background) and a text frame above it. It exists by itself and can't be a child to other frames."
                        func =
                            `Consists of 3 frames above each other. A Horizontal Bar, a backdrop below it, & a text frame above it. The backdrop acts as a background for the bar. The backdrop has the prefix <b>"Back"</b> followed by the name.
                        The textframe has the prefix <b>"Text"</b> followed by the name.

                        <hr><strong>Change Value: Explained in Horizontal Bar</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetValue( ElementName, udg_IntegerVariable )</span> 
                        
                        <hr><strong>Change Min & Max Values: Explained in Horizontal Bar</strong>
                        <br><span class="bg-dark text-white">BlzFrameSetMinMaxValue( ElementName, minValue, maxValue )</span> 
                        
                        <hr><strong>Change Text:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetText( <b>Text</b>ElementName, udg_StringVariable )</span> 
                        <br>Replace "StringVariable" with the name of a string variable.
                        <br>Changes the text. Put color codes in the text for coloring. Any number formatting is done in the variable before using it here.

                        <hr><strong>Change Texture:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetTexture( ElementName, udg_StringVariable, 0, true)</span> 
                        <br><span class="bg-dark text-white">call BlzFrameSetTexture( <b>Back</b>ElementName, udg_StringVariable, 0, true)</span> 
                        <br>Replace "StringVariable" with the name of a string variable, which holds the path to the texture.
                        <br>Changes the texture of the bar.<hr>` +
                            hideNativePart1 +
                            `<br><span class="bg-dark text-white">call BlzFrameSetVisible( <b>Back</b>ElementName, true/false )</span>` +
                            `<br><span class="bg-dark text-white">call BlzFrameSetVisible( <b>Text</b>ElementName, true/false )</span>` +
                            hideNativePart2

                        break
                    case ft.HOR_BAR_TEXT:
                        txt = 'Horizontal Bar with Text'
                        dsc = "A horizontal bar combined with a text frame above it. It exists by itself and can't be a child to other frames."
                        func = `Consists of 2 frames above each other. A Horizontal Bar & a text frame above it. 
                        The textframe has the prefix <b>"Text"</b> followed by the name.

                        <hr><strong>Change Value: Explained in Horizontal Bar</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetValue( ElementName, udg_IntegerVariable )</span> 
                        
                        <hr><strong>Change Min & Max Values: Explained in Horizontal Bar</strong>
                        <br><span class="bg-dark text-white">BlzFrameSetMinMaxValue( ElementName, minValue, maxValue )</span> 
                        
                        <hr><strong>Change Text:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetText( <b>Text</b>ElementName, udg_StringVariable )</span> 
                        <br>Replace "StringVariable" with the name of a string variable.
                        <br>Changes the text. Put color codes in the text for coloring. Any number formatting is done in the variable before using it here.

                        <hr><strong>Change Texture:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetTexture( ElementName, udg_StringVariable, 0, true)</span> 
                        <br>Replace "StringVariable" with the name of a string variable, which holds the path to the texture.
                        <br>Changes the texture of the bar.<hr>

                        ${hideNativePart1}
                        <br><span class="bg-dark text-white">call BlzFrameSetVisible( <b>Text</b>ElementName, true/false )</span>
                        ${hideNativePart2}`

                        break
                    case ft.INVIS_BUTTON:
                        txt = 'Invisible Button'
                        dsc =
                            "A transparent but clickable button. Can be put over other elements like text frames or backdrops to simulate clicks over them. Buttons can't be tooltips."
                        func = disableNative + `<hr>` + hideNativeFull

                        break
                    case ft.TEXT_FRAME:
                        txt = 'Text Frame'
                        dsc = 'A piece of text that can be displayed anywhere on the screen.'
                        func =
                            `<strong>Change Text:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetText( ElementName, udg_StringVariable )</span> 
                        <br>Replace "StringVariable" with the name of a string variable.
                        <br>Changes the text. Put color codes in the text for coloring. Any number formatting is done in the variable before using it here.
                        <hr>` + hideNativeFull

                        break
                    case ft.BACKDROP:
                        txt = 'Custom Backdrop'
                        dsc = 'A static image with a custom texture and no interactions. Mostly used as background.'
                        func =
                            `<strong>Change Texture:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetTexture( ElementName, udg_StringVariable, 0, true)</span> 
                        <br>replace "StringVariable" with the name of a string variable, which holds the path to the texture.
                        <br>Changes the texture of the backdrop.<hr>` + hideNativeFull

                        break
                    case ft.TEXTAREA:
                        txt = 'Text Area'
                        dsc = 'An area for huge texts. Gets an automatic scrollbar in case of text being longer than its height.'
                        func =
                            `<strong>Change Text:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetText( ElementName, udg_StringVariable )</span> 
                        <br>Replace "StringVariable" with the name of a string variable.
                        <br>Changes the text. Put color codes in the text for coloring. Any number formatting is done in the variable before using it here.
                        <hr><strong>Add Text:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameAddText( ElementName, udg_StringVariable )</span> 
                        <br>Replace "StringVariable" with the name of a string variable.
                        <br>Adds to the text. This won't delete the text, just add to it. Because there are limitations on string size in JASS, big texts
                        are divided into several strings and put in the TextArea through 1 SetText and multiple AddText.
                        <hr>` + hideNativeFull
                        requireExt = true

                        break
                    case ft.EDITBOX:
                        txt = 'Edit Box'
                        dsc =
                            'A box in which the players can interact with the text inside, such as copying text and or edit/overwrite it. Useful for copying save codes and links.'
                        func =
                            `It consists of a box with only 1 line of text in the middle. Color codes do not work.
                        
                        <strong>Change Text:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetText( ElementName, udg_StringVariable )</span> 
                        <br>Replace "StringVariable" with the name of a string variable.
                        <br>Changes the text. Put color codes in the text for coloring. Any number formatting is done in the variable before using it here.
                        <hr><strong>Limit Input Text:</strong>
                        <br><span class="bg-dark text-white">call BlzFrameSetTextSizeLimit( ElementName, number )</span> 
                        <br>Replace "number" with the max number of characters allowed. Ex: Setting to 12 will allow players to only input 12 characters.
                        <br>Puts a limit to the number of characters a player can write inside the Edit Box.
                        <hr>` + hideNativeFull
                        requireExt = true

                        break
                    // case ft.BROWSER_BUTTON:

                    //     break;
                    // case ft.SCRIPT_DIALOG_BUTTON:

                    //     break
                    // case ft.BUTTON

                    // break;
                    // case ft.BROWSER_BUTTON:

                    //     break;
                    // case ft.SCRIPT_DIALOG_BUTTON:

                    //     break
                    // case ft.BUTTON

                    //     break;

                    default:
                        txt = 'Backdrop'
                        dsc = 'A static image with a pre-saved texture and no interactions. Mostly used as background.'
                        func = hideNativeFull
                        break
                }
                this.fieldElementInfoTitle.innerText = txt + ' '
                // this.fieldElementInfoDesc.innerHTML = ""
                // let el = this.fieldElementInfoDesc.appendChild(document.createElement('i'))
                // el.className = "fa fa-question-circle text-warning"
                // el.setAttribute('data-bs-toggle', 'tooltip')
                // this.fieldElementInfoDesc.setAttribute('title', dsc)
                Tooltips.TooltipDesc[0].setContent(dsc)
                Tooltips.TooltipFunc[0].setContent(func)
                document.getElementById('ElementInfoExtFile')!.style.display = requireExt ? 'initial' : 'none'

                this.setupLists(frame)
                this.inputElementName.value = frame.getName()
                this.inputElementWidth.value = frame.custom.getWidth().toFixed(5)
                this.inputElementHeight.value = frame.custom.getHeight().toFixed(5)

                this.inputElementDiskTexture.value = frame.custom.getDiskTexture('normal')
                this.inputElementWC3Texture.value = frame.custom.getWc3Texture('normal')
                this.inputElementBackDiskTexture.value = frame.custom.getDiskTexture('back')
                this.inputElementBackWC3Texture.value = frame.custom.getWc3Texture('back')
                this.inputElementTrigVar.value = frame.custom.getTrigVar()
                this.checkboxElementRelative.checked = frame.custom.getIsRelative()
                this.inputElementText.value = frame.custom.getText()

                this.inputElementTextScale.value = frame.custom.getScale() + ''
                this.inputElementTextColor.value = frame.custom.getColor()
                this.inputElementTextBig.value = frame.custom.getText()

                if(frame.array) {
                    let ar = frame.array
                    this.inputElementArrayName.value = ar.getArrayName()
                    if(ar instanceof TableArray) {
                        this.inputElementArrayRows.value = ar.getRows() + ''
                        this.inputElementArrayCols.value = ar.getCols() + ''
                        this.inputElementArrayXGap.value = ar.getXGap() + ''
                        this.inputElementArrayYGap.value = ar.getYGap() + ''
                    } else if(ar instanceof CircleArray) {
                        this.inputElementArrayRadius.value = ar.getRadius() + ''
                        this.inputElementArrayCount.value = ar.getCount() + ''
                    }
                }

                switch (frame.custom.getHorAlign()) {
                    case 'left':
                        this.selectElementHorAlign.selectedIndex = 0
                        break
                    case 'center':
                        this.selectElementHorAlign.selectedIndex = 1
                        break
                    case 'right':
                        this.selectElementHorAlign.selectedIndex = 2
                        break
                }
                switch (frame.custom.getVerAlign()) {
                    case 'start':
                        this.selectElementVerAlign.selectedIndex = 0
                        break
                    case 'center':
                        this.selectElementVerAlign.selectedIndex = 1
                        break
                    case 'flex-end':
                        this.selectElementVerAlign.selectedIndex = 2
                        break
                }

                this.inputElementCoordinateX.value = frame.custom.getLeftX().toFixed(5)
                this.inputElementCoordinateY.value = frame.custom.getBotY().toFixed(5)
                this.checkboxElementTooltip.checked = frame.getTooltip()
                this.checkboxElementLinkToParent.checked = frame.custom.getLinkChildren()
                const hasChildren = frame.getChildren().length > 0
                this.checkboxElementLinkToParent.disabled = !hasChildren

                this.fieldElement.style.display = 'initial'
                this.fieldGeneral.style.display = 'none'
                this.fieldType.style.display = 'none'
                this.fieldTooltip.style.display = 'none'
                this.fieldParent.style.display = 'none'
                this.fieldTexture.style.display = 'none'
                this.fieldBackgroundTexture.style.display = 'none'
                this.FieldPropertiesFull.style.display = 'none'
                this.fieldFunctionalityText.style.display = 'none'
                this.fieldFunctionalityTextBig.style.display = 'none'
                this.fieldFunctionalityTextScale.style.display = 'none'
                this.fieldFunctionalityTextColor.style.display = 'none'
                this.fieldFunctionalityTextAlign.style.display = 'none'
                this.fieldFunctionalityVar.style.display = 'none'
                this.fieldPropertiesOutermost.style.display = 'none'
                this.fieldFunctionalityOutermost.style.display = 'none'
                this.fieldArrayConfigOutermost.style.display = 'none'
                this.fieldArrayTable.style.display = 'none'
                this.fieldArrayCircle.style.display = 'none'
                // Hide custom function inputs by default
                const _el1 = document.getElementById('elementOnClickFunc') as HTMLInputElement
                const _el2 = document.getElementById('elementOnMouseEnterFunc') as HTMLInputElement
                const _el3 = document.getElementById('elementOnMouseLeaveFunc') as HTMLInputElement
                if (_el1) _el1.parentElement!.style.display = 'none'
                if (_el2) _el2.parentElement!.style.display = 'none'
                if (_el3) _el3.parentElement!.style.display = 'none'

                if (frame.FieldsAllowed.parent) this.fieldParent.style.display = 'initial'
                if (frame.FieldsAllowed.type) this.fieldType.style.display = 'initial'
                if (frame.FieldsAllowed.tooltip) this.fieldTooltip.style.display = 'initial'
                if (frame.FieldsAllowed.textures) this.fieldTexture.style.display = 'initial'
                if (frame.FieldsAllowed.backTextures) this.fieldBackgroundTexture.style.display = 'initial'
                if (frame.FieldsAllowed.trigVar) {
                    this.fieldFunctionalityVar.style.display = 'initial'
                    this.fieldFunctionalityOutermost.style.display = 'initial'
                }
                // Show function name inputs when triggers are allowed
                if (frame.FieldsAllowed.trigVar) {
                    const el1 = document.getElementById('elementOnClickFunc') as HTMLInputElement
                    const el2 = document.getElementById('elementOnMouseEnterFunc') as HTMLInputElement
                    const el3 = document.getElementById('elementOnMouseLeaveFunc') as HTMLInputElement
                    if (el1) el1.parentElement!.style.display = 'initial'
                    if (el2) el2.parentElement!.style.display = 'initial'
                    if (el3) el3.parentElement!.style.display = 'initial'
                }
                if (frame.FieldsAllowed.text) this.fieldFunctionalityText.style.display = 'initial'
                if (frame.FieldsAllowed.textBig) this.fieldFunctionalityTextBig.style.display = 'initial'
                if (frame.FieldsAllowed.scale) this.fieldFunctionalityTextScale.style.display = 'initial'
                if (frame.FieldsAllowed.color) this.fieldFunctionalityTextColor.style.display = 'initial'
                if (frame.FieldsAllowed.textAlign) this.fieldFunctionalityTextAlign.style.display = 'initial'

                const f = frame.FieldsAllowed
                if (f.text || f.textBig || f.scale || f.color || f.textAlign) {
                    this.FieldPropertiesFull.style.display = 'initial'
                }

                if (f.text || f.textBig || f.scale || f.color || f.textAlign || f.backTextures || f.textures) {
                    this.fieldPropertiesOutermost.style.display = 'initial'
                }

                this.checkboxElementTooltip.disabled = false

                if (frame.FieldsAllowed.type) {
                    this.selectElementType.value = String(frame.type)
                }

                if (frame.getParent() == ProjectTree.getInstance().rootFrame) {
                    this.checkboxElementTooltip.disabled = true
                    frame.setTooltip(false)
                }

                let parentHasTooltip = false
                for (const el of frame.getParent().getChildren()) {
                    if (el != frame && el.getTooltip()) {
                        parentHasTooltip = true
                        break
                    }
                }
                if (frame.getParent().getTooltip() || parentHasTooltip) {
                    this.checkboxElementTooltip.disabled = true
                    frame.setTooltip(false)
                }

                const options = this.selectElementParent.options

                while (options.length > 0) {
                    options.remove(0)
                }

                // Collect all possible parents except the current frame
                const parentCandidates: FrameComponent[] = []
                for (const el of ProjectTree.getInstance().getIterator()) {
                    if (el === frame) continue
                    parentCandidates.push(el)
                }

                // Sort alphabetically by element name (case-insensitive)
                parentCandidates.sort((a, b) => a.getName().localeCompare(b.getName(), undefined, { sensitivity: 'base' }))

                // Rebuild options in sorted order and select current parent
                let option: HTMLOptionElement | undefined
                for (const el of parentCandidates) {
                    options.add(el.parentOption)
                    el.parentOption.selected = false
                    if (frame.getParent() == el) option = el.parentOption
                }
                if (option) option.selected = true

                if(frame.array) {
                    this.fieldArrayConfigOutermost.style.display = 'initial'
                    if(frame.array instanceof TableArray) {
                        this.fieldArrayTable.style.display = 'initial'
                    } else {
                        this.fieldArrayCircle.style.display = 'initial'
                    }
                }

                // Populate function fields
                this.inputElementOnClickFunc.value = frame.custom.getOnClickFunc ? frame.custom.getOnClickFunc() : ''
                this.inputElementOnMouseEnterFunc.value = frame.custom.getOnMouseEnterFunc ? frame.custom.getOnMouseEnterFunc() : ''
                this.inputElementOnMouseLeaveFunc.value = frame.custom.getOnMouseLeaveFunc ? frame.custom.getOnMouseLeaveFunc() : ''

            } else {
                // this.disableFields(true)
                this.emptyFields()

                this.fieldElement.style.display = 'none'
                this.fieldGeneral.style.display = 'initial'
            }
        } catch (e) {
            alert(e)
        }
    }

    private readonly list = ['Red', 'Blue', 'Teal', 'Purple', 'Yellow', 'Orange', 'Green', 'Pink', 'Gray', 'LightBlue', 'DArkGreen', 'Brown']

    setupLists(frame: FrameComponent) {
        const listEl = document.getElementById('WC3TextureList')
        if (listEl) listEl.innerHTML = ''

        if (
            frame.type == FrameType.HORIZONTAL_BAR ||
            frame.type == FrameType.HOR_BAR_TEXT ||
            frame.type == FrameType.HOR_BAR_BACKGROUND ||
            frame.type == FrameType.HOR_BAR_BACKGROUND_TEXT
        ) {
            for (let i = 0; i < this.list.length; i++) {
                const op = document.createElement('option')
                op.value = 'Replaceabletextures\\Teamcolor\\Teamcolor' + (i < 10 ? '0' + i : i) + '.blp'
                op.innerText = this.list[i]
                if (listEl) listEl.append(op)
            }
        }
    }
}
