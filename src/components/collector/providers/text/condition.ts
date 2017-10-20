import * as Tripetto from '@tripetto/forms-collector';
import { ITextMatch } from 'tripetto-forms-text';

@Tripetto.condition('tripetto-forms-text.match')
export class TextMatchCondition extends Tripetto.ConditionProvider<ITextMatch> {
  public OnCondition(instance: Tripetto.Instance): boolean {
    const value = this.Data<string>(instance);

    return value && value.String === this.Props.Match ? true : false;
  }
}
