import { debugText } from "../../Classes & Functions/Mini-Functions";
import { Editor } from "../../Editor/Editor";
import { CustomImage } from "../../Editor/FrameLogic/CustomImage";
import { FrameComponent } from "../../Editor/FrameLogic/FrameComponent";
import SimpleCommand from "../SimpleCommand";

export default class ChangeFrameWc3Texture extends SimpleCommand{

    private frame: string;
    private oldTexture: string;
    private newTexture: string;

    public constructor(frame: FrameComponent| string, texture: string){
        super();

        if(typeof(frame) === "string"){
            this.frame = frame;
        }
        else{
            this.frame = frame.getName();
        }

        this.newTexture = texture;

    }

    public pureAction(): void {
        
        const frame = Editor.GetDocumentEditor().projectTree.findByName(this.frame);

        if(typeof(frame) === "undefined"){
            debugText("Could not find frame.");
            return;
        }

        if(!(frame.custom instanceof CustomImage)){
            debugText("Frame not CustomImage");
            return;
        }

        this.oldTexture = frame.custom.getDiskTexture();
        frame.custom.setDiskTexture(this.newTexture);

    }

    public undo(): void{

        const command = new ChangeFrameWc3Texture(this.frame, this.oldTexture);
        command.pureAction();

        super.undo();
        debugText("Undid change frame wc3 texture");

    }

    public redo(): void{

        super.redo();
        debugText("Redid change frame wc3 texture");

    }

}