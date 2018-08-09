import {} from "./lib/Constants";
import Tree from "./lib/Tree";
import PrioritySelector from "./lib/PrioritySelector";
import Selector from "./lib/Selector";
import PreCondition from "./lib/PreCondition";
import { CheckAttack, CheckDefense } from "./CheckFunction";
import DoDefense from "./Action/DoDefense";
import DoAttack from "./Action/DoAttack";

export default class Run extends Tree {

    protected Init() {
        super.Init();
        this.root = new PrioritySelector("root");
        // this.root = new Selector("root");

        const PreConditionAttack = new PreCondition("ShouldAttack");
        PreConditionAttack.checkfunction = CheckAttack;
        const PreConditionDefense = new PreCondition("ShouldDefense");
        PreConditionDefense.checkfunction = CheckDefense;

        const doAttack = new DoAttack("Attack");
        doAttack.PreCondition = PreConditionAttack;
        const doDefense = new DoDefense("Defense");
        doDefense.PreCondition = PreConditionDefense;

        this.root.AddChild(doDefense);
        this.root.AddChild(doAttack);
    }
}
