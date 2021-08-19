import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { FrameBuilder } from "../../Editor/FrameLogic/FrameBuilder";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import SimpleCommand from "../SimpleCommand";
import RemoveFrame from "./RemoveFrame";

export default class CreateFrame extends SimpleCommand{
    private frameBuilder: FrameBuilder;
    private parent: string;
    private resultingFrame: FrameComponent;

    public constructor(parent: FrameComponent | string, frameBuilder: FrameBuilder) {

        super();

        if(typeof(parent) === "string"){
            this.parent = parent;
        }
        else{
            this.parent = parent.getName();
        }

        this.frameBuilder = frameBuilder;

        return this;

    }

    public pureAction(): void{

        const projectTree = Editor.GetDocumentEditor().projectTree;
        const frame = projectTree.findByName(this.parent);

        if(typeof(frame) === "undefined"){
            debugText("Could not find parent, abort.");
            return;
        }

        this.resultingFrame = frame.createAsChild(this.frameBuilder)
        projectTree.select(this.resultingFrame);

    }

    undo(): void {

        if (this.resultingFrame == undefined) {
            debugText("Could not undo, missing object.");
            return;
        }

        super.undo();

        const undoCommand = new RemoveFrame(this.resultingFrame);
        undoCommand.pureAction();
    }

}