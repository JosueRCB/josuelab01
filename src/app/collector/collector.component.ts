import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Collector, Export, IDefinition, Instance, IObservableNode, Moment, NodeBlock, TModes } from 'tripetto-collector';

@Component({
  selector: 'tripetto-collector',
  templateUrl: './collector.component.html',
  styleUrls: ['./collector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectorComponent {
  collector: Collector;

  constructor(private changeDetector: ChangeDetectorRef) {
    changeDetector.detach();
  }

  get nodes(): IObservableNode[] {
    const nodes: IObservableNode[] = [];
    const storyline = this.collector && this.collector.storyline;
    console.log('GET NODES');
    if (storyline) {
      storyline.map((moment: Moment<NodeBlock>) => nodes.push(...moment.nodes));
    }

    return nodes;
  }

  get state(): 'loading' | 'ready' | 'empty' | 'running' | 'paused' | 'stopped' | 'finished' {
    if (this.collector) {
      if (this.collector.isEmpty) {
        return 'empty';
      }

      if (this.collector.isFinished) {
        return 'finished';
      }

      if (this.collector.isStopped) {
        return 'stopped';
      }

      if (this.collector.isPaused) {
        return 'paused';
      }

      if (this.collector.isRunning) {
        return 'running';
      }

      return 'ready';
    }

    return 'loading';
  }

  get mode(): TModes {
    return (this.collector && this.collector.mode) || 'paginated';
  }

  set mode(mode: TModes) {
    if (this.collector) {
      this.collector.mode = mode;
    }
  }

  get preview(): boolean {
    return (this.collector && this.collector.preview) || false;
  }

  set preview(preview: boolean) {
    if (this.collector) {
      this.collector.preview = preview;
    }
  }

  /** Start the collector. */
  start(): void {
    if (this.collector) {
      this.collector.start();
    }
  }

  /** Pause the collector. */
  pause(): void {
    if (this.collector) {
      this.collector.pause();
    }
  }

  /** Stop the collector. */
  stop(): void {
    if (this.collector) {
      this.collector.stop();
    }
  }

  /** Reloads with a new definition. */
  reload(definition: IDefinition): void {
    if (!this.collector) {
      this.collector = new Collector(definition, 'paginated');

      this.collector.onChange = () => {
        this.changeDetector.detectChanges();
      };

      this.collector.onFinish = (i: Instance) => {
        console.dir(Export.fields(i));
      };
    }

    this.collector.reload(definition);
  }
}
