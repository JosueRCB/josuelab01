import './providers/';
import * as Tripetto from '@tripetto/forms-collector';

export let TEMPLATE = '';

TEMPLATE = Tripetto.NodeProviders.All
  .map((pProvider: Tripetto.TNodeProvider) => `<${pProvider.Type} *ngIf="type == '${pProvider.Type}'" [props]="props"></${pProvider.Type}>`)
  .join('\n');
