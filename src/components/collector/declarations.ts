import './providers/';
import * as Tripetto from '@tripetto/forms-collector';
import { CollectorComponent } from './collector';
import { WrapperComponent } from './wrapper';

export const DECLARATIONS = [
    CollectorComponent,
    WrapperComponent
];

// Add the providers to the list of declarations
Tripetto.NodeProviders.All.forEach((pProvider: Tripetto.TNodeProvider) => DECLARATIONS.push(pProvider.Component));

