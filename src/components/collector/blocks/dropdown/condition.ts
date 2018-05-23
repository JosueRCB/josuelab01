import * as Tripetto from 'tripetto-collector';
import { IDropdownCondition } from 'tripetto-block-dropdown';

@Tripetto.condition('tripetto-block-dropdown.is-option-selected')
export class DropdownCondition extends Tripetto.ConditionBlock<IDropdownCondition> {
  public OnCondition(instance: Tripetto.Instance): boolean {
    const option = this.DataAssert<string>(instance);

    return option.Reference === this.Props.Option ? true : false;
  }
}
