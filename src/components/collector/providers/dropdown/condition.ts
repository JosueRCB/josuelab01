import * as Tripetto from '@tripetto/forms-collector';
import { IDropdownCondition } from 'tripetto-forms-dropdown';

@Tripetto.condition('tripetto-forms-dropdown.is-option-selected')
export class DropdownCondition extends Tripetto.ConditionProvider<IDropdownCondition> {
  public OnCondition(instance: Tripetto.Instance): boolean {
    const option = this.DataAssert<string>(instance);

    return option.Reference === this.Props.Option ? true : false;
  }
}
