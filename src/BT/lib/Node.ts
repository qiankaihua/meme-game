import {Result} from "./Constants";
import PreCondition from "./PreCondition";

export default abstract class Node {
    public name: string;
    // protected blackBoard: {[key: string]: any};
    protected preCondition: PreCondition;
    protected activated: boolean;
    protected lastTimeEvaluate: number;
    protected coolDown: number;
    protected children: Node[];

    constructor(name: string) {
        this.name = name;
        // this.blackBoard = {};
        this.preCondition = null;
        this.activated = false;
        this.lastTimeEvaluate = 0;
        this.coolDown = 0;
        this.children = [];
    }
    public Activate(): void {
    // public Activate(blackBoard: {[key: string]: any}) {
        if (this.activated === true) {
            return;
        }
        // this.blackBoard = blackBoard;
        if (this.preCondition !== null) {
            this.preCondition.Activate();
            // this.preCondition.Activate(blackBoard);
        }
        if (this.children.length > 0) {
            for (const child of this.children) {
                child.Activate();
                // child.Activate(blackBoard);
            }
        }
        this.activated = true;
        this.lastTimeEvaluate = (new Date()).valueOf();
    }
    public CheckCanEvaluate() {
        // console.log(this.name);
        const CD: boolean = this.isCoolDown();
        return this.activated
            && CD
            && (this.preCondition === null || this.preCondition.check())
            && this.SelfCheckCanEvaluate();
    }
    public Tick(): Result {
        return Result.Ended;
    }
    public Clear() {
        // nothing to do
    }
    public AddChild(Child: Node) {
        this.children.push(Child);
    }
    public RemoveChild(Child: Node) {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].name === Child.name) {
                this.RemoveChildById(i);
            }
        }
    }
    public RemoveChildById(childId: number) {
        if (this.children.length > childId) {
            this.children.splice(childId, 1);
        }
    }

    public get getChildren(): Node[] {
        return this.children;
    }
    // public set setBlackBoard(blackBoard: {[key: string]: any}) {
    //     this.blackBoard = blackBoard;
    // }
    public set PreCondition(preCondition: PreCondition) {
        this.preCondition = preCondition;
    }
    protected SelfCheckCanEvaluate(): boolean {
        return true;
    }
    private isCoolDown(): boolean {
        const timestamp = (new Date()).valueOf();
        return timestamp > this.coolDown + this.lastTimeEvaluate;
    }
}
