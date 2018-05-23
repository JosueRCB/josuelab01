import * as Tripetto from 'tripetto-collector';
import { ITextMatch } from 'tripetto-block-text';

@Tripetto.condition('tripetto-block-text.match')
export class TextMatchCondition extends Tripetto.ConditionBlock<ITextMatch> {
  public OnCondition(instance: Tripetto.Instance): boolean {
    const value = this.DataAssert<string>(instance);

    return value.String === this.Props.Match ? true : false;
  }
}
