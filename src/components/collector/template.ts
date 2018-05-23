import './blocks/';
import * as Tripetto from 'tripetto-collector';

export let TEMPLATE = '';

TEMPLATE = Tripetto.NodeBlocks.All.map(
  (pBlock: Tripetto.TNodeBlock) => `<${pBlock.Type} *ngIf="type == '${pBlock.Type}'" [props]="props"></${pBlock.Type}>`
).join('\n');
