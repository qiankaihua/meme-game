import {ActionStatus, Result} from "./Constants"
import Config from "./Config";
import PreCondition from "./PreCondition";
import Node from "./Node";

export default class Action extends Node {
    private Status: ActionStatus = ActionStatus.Ready;

    constructor(name: string) {
        super(name);
    }
    public toString(): string {
        return "Action";
    }
    public Clear(): void {
        if (!this.Status !=== ActionStatus.Ready) {
            this.Exit();
            this.Status = ActionStatus.Ready;
        }
    }
    public Tick(): Result {
        let result: Result = Result.Ended;
        if (this.Status === ActionStatus.Ready) {
            this.Enter();
            this.Status = ActionStatus.Running;
        }
        if (this.Status === ActionStatus.Running) {
            result = this.Execute();
            if (result !== Result.Running) {
                this.Exit();
                this.Status = ActionStatus.Ready;
            }
        }
        return result;
    }
    public AddChild(Child: Node) {
        console.log("Action can not append child.");
    }
    public RemoveChild(Child: Node) {
        console.log("Action can not remove a child");
    }
    protected Enter(): void {
        if (Config.ENABLE_BTACTION_LOG === true) {
            console.log("Enter " + this.name + " [" + this.toString() + "]")
        }
    }
    protected Exit(): void {
        if (Config.ENABLE_BTACTION_LOG === true) {
            console.log("Exit " + this.name + " [" + this.toString() + "]")
        }
    }
    protected Execute(): Result {
        return Result.Running;
    }

}