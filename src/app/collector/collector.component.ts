import { Component, ChangeDetectorRef, Input, Output, EventEmitter, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { Collector, IDefinition, Instance, IObservableNode, Moment, NodeBlock, TModes, ISnapshot, Storyline } from 'tripetto-collector';

@Component({
  selector: 'tripetto-collector',
  templateUrl: './collector.component.html',
  styleUrls: ['./collector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectorComponent {
  private collector?: Collector;

  @Input() set definition(definition: IDefinition) {
      // Leave the collector outside of Angular to avoid unnecessary and costly change detection.
      this.zone.runOutsideAngular(() => {
      if (this.collector) {
        this.collector.reload(definition);

        return;
      }

      this.collector = new Collector(this.definition, this.mode, this.snapshot || true, this.preview);

      this.collector.onChange = () => {
        this.changeDetector.detectChanges();
        this.changed.emit();
      };

      this.collector.onFinish = (instance: Instance) => {
        this.finished.emit(instance);
      };
    });
  }

  @Input() snapshot?: ISnapshot;
  @Input() mode: TModes = 'progressive';
  @Input() preview = false;
  @Input() numerators = false;
  @Input() pages = true;
  @Input() progressbar = false;
  @Input() buttons: 'inline' | 'sticky' = 'inline';
  @Output() changed = new EventEmitter();
  @Output() finished = new EventEmitter<Instance>();
  @Output() paused = new EventEmitter<ISnapshot>();

  constructor(private changeDetector: ChangeDetectorRef, private zone: NgZone) {}

  get status(): 'unloaded' | 'ready' | 'empty' | 'running' | 'paused' | 'stopped' | 'finished' {
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

    return 'unloaded';
  }

  get storyline(): Storyline | undefined {
    return this.collector && this.collector.storyline;
  }

  get nodes(): IObservableNode[] {
    const nodes: IObservableNode[] = [];
    const storyline = this.storyline;

    if (storyline) {
      storyline.map((moment: Moment<NodeBlock>) => nodes.push(...moment.nodes));
    }

    return nodes;
  }

  get isEmpty(): boolean {
    const storyline = this.storyline;

    return storyline && storyline.isEmpty || false;
  }

  get name(): string {
    return this.collector && this.collector.name || '';
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
      this.paused.emit(this.collector.pause());
    }
  }

  /** Stop the collector. */
  stop(): void {
    if (this.collector) {
      this.collector.stop();
    }
  }

  /** Change a setting. */
  set(setting: 'mode', value: TModes);
  set(setting: 'buttons', value: 'inline' | 'sticky');
  set(setting: 'preview' | 'numerators' | 'pages' | 'progressbar', value: boolean);
  set(setting: 'mode' | 'preview' | 'numerators' | 'pages' | 'progressbar' | 'buttons', value: any) {
    switch (setting) {
      case 'mode':
        this.mode = value;

        if (this.collector) {
          this.collector.mode = this.mode;
        }

        return;
      case 'preview':
        this.preview = value;

        if (this.collector) {
          this.collector.preview = this.preview;
        }

        return;
      case 'numerators':
        this.numerators = value;
        break;
      case 'pages':
        this.pages = value;
        break;
      case 'progressbar':
        this.progressbar = value;
        break;
      case 'buttons':
        this.buttons = value;
        break;
    }

    this.changeDetector.detectChanges();
    this.changed.emit();
  }
}
