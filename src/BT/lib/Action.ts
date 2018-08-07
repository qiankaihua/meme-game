import {ActionStatus, Result} from "./Constants"
import Config from "./Config";
import PreCondition from "./PreCondition";
import Node from "./Node";

export default class Action extends Node {
    private Status: ActionStatus = ActionStatus.Ready;

    constructor(name: string) {
        super(name);
    }
    public function toString(): string {
        return "Action";
    }
    public function Clear(): void {
        if (!this.Status !=== ActionStatus.Ready) {
            this.Exit();
            this.Status = ActionStatus.Ready;
        }
    }
    public function Tick(): Result {
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
    public function AddChild(Child: Node) {
        console.log("Action can not append child.");
    }
    public function RemoveChild(Child: Node) {
        console.log("Action can not remove a child");
    }
    protected function Enter(): void {
        if (Config.ENABLE_BTACTION_LOG === true) {
            console.log("Enter " + this.name + " [" + this.toString() + "]")
        }
    }
    protected function Exit(): void {
        if (Config.ENABLE_BTACTION_LOG === true) {
            console.log("Exit " + this.name + " [" + this.toString() + "]")
        }
    }
    protected function Execute(): Result {
        return Result.Running;
    }

}