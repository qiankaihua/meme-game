import {Result} from "./Constants";
import PreCondition from "./PreCondition";

export default abstract class Node {
    protected name: string;
    protected blackBoard: {[key: string]: any};
    protected preCondition: PreCondition;
    protected activated: boolean;
    protected lastTimeEvaluate: number;
    protected coolDown: number;
    protected children: Node[];

    constructor(name: string) {
        this.name = name;
        this.blackBoard = {};
        this.preCondition = null;
        this.activated = false;
        this.lastTimeEvaluate = 0;
        this.coolDown = 0;
        this.children = Node[];
    }
    public function Activate(blackBoard: {[key: string]: any}) {
        if (this.activated === true) return;
        this.blackBoard = blackBoard;
        if (this.preCondition !== null) {
            this.preCondition.Activate(blackBoard);
        }
        if (this.children.length > 0) {
            for(const child of this.children) {
                child.Activate(blackBoard);
            }
        }
        this.activated = true;
        this.lastTimeEvaluate = (new Date()).valueOf();
    }
    public function CheckCanEvaluate() {
        let CD: boolean = this.isCoolDown;
        return this.activated
            && CD
            && (this.preCondition === null || this.preCondition.check())
            && this.SelfCheckCanEvaluate();
    }
    protected function SelfCheckCanEvaluate(): boolean {
        return true;
    };
    public function Tick(): Result {
        return Result.Ended;
    }
    public function Clear() {
        // nothing to do
    }
    public function AddChild(Child: Node) {
        this.children.append(Child);
    }
    public function RemoveChild(Child: Node) {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].name === Child.name) {
                this.RemoveChildById(i);
            }
        }
    }
    public function RemoveChildById(childId: number) {
        if (this.children.length > childId) {
            this.children.splice(childId, 1);
        }
    }
    
    public get children(): Node[] {
        return this.children;
    }
    public set blackBoard(blackBoard: {[key: string]: any}) {
        this.blackBoard = blackBoard;
    }
    public set preCondition(preCondition: PreCondition) {
        this.preCondition = preCondition;
    }
    private function isCoolDown(): boolean {
        const timestamp = (new Date()).valueOf();
        return timestamp > this.coolDown + this.lastTimeEvaluate;
    }
}