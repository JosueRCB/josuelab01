import * as Tripetto from 'tripetto-collector';

@Tripetto.condition('tripetto-block-checkbox.checked')
export class CheckboxChecked extends Tripetto.ConditionBlock {
    public OnCondition(instance: Tripetto.Instance): boolean {
        const checked = this.DataAssert<boolean>(instance);

        return checked.Value === true;
    }
}

@Tripetto.condition('tripetto-block-checkbox.unchecked')
export class CheckboxUnchecked extends Tripetto.ConditionBlock {
    public OnCondition(instance: Tripetto.Instance): boolean {
        const checked = this.DataAssert<boolean>(instance);

        return checked.Value === false;
    }
}
