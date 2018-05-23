import './blocks/';
import * as Tripetto from 'tripetto-collector';
import { CollectorComponent } from './collector';
import { WrapperComponent } from './wrapper';

export const DECLARATIONS = [CollectorComponent, WrapperComponent];

// Add the blocks to the list of declarations
Tripetto.NodeBlocks.All.forEach((pBlock: Tripetto.TNodeBlock) => DECLARATIONS.push(pBlock.Component));
