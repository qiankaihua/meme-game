import {} from "./lib/Constants";
import Tree from "./lib/Tree";
import PrioritySelector from "./lib/PrioritySelector";

export default class Run extends Tree {

    protected Init() {
        super.Init();
        this.root = new PrioritySelector
    }
}