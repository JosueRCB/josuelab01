import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  NgZone,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Collector, IDefinition, Instance, TModes, ISnapshot, TStatus, ICollectorChangeEvent, IStoryline } from 'tripetto-collector';

@Component({
  selector: 'tripetto-collector',
  templateUrl: './collector.component.html',
  styleUrls: ['./collector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectorComponent implements OnInit, OnDestroy {
  private collector: Collector | undefined;
  private storyline: IStoryline;

  /** Specifies the form definition to run. */
  @Input() set definition(definition: IDefinition) {
    // Leave the collector outside of Angular to avoid unnecessary and costly change detection.
    this.zone.runOutsideAngular(() => {
      if (this.collector) {
        this.collector.reload(definition);

        return;
      }

      this.collector = new Collector(definition, this.mode, this.snapshot || true, this.preview);

      this.collector.onChange = (ev: ICollectorChangeEvent) => {
        this.storyline = ev.storyline;

        this.changeDetector.detectChanges();
        this.changed.emit();
      };

      this.collector.onFinish = (instance: Instance) => {
        this.finished.emit(instance);
      };
    });
  }

  /** Specifies the form snapshot to restore. */
  @Input() snapshot?: ISnapshot;

  /** Specifies the run mode for the collector. */
  @Input() mode: TModes = 'paginated';

  /** Specifies if preview mode is enabled or not. */
  @Input() preview = false;

  /** Specifies if block enumerators should be shown (question numbers). */
  @Input() enumerators = false;

  /** Specifies if a page index should be shown (only works in paginated mode). */
  @Input() pages = false;

  /** Specifies if the progressbar should be displated. */
  @Input() progressbar = false;

  /** Specifies the location of the buttons. */
  @Input() buttons: 'inline' | 'sticky' = 'inline';

  /**
   * Invoked when a data change occurs.
   * @event
   */
  @Output() changed = new EventEmitter();

  /**
   * Invoked when the collector is finished.
   * @event
   */
  @Output() finished = new EventEmitter<Instance>();

  /**
   * Invoked when the collector is paused.
   * @event
   */
  @Output() paused = new EventEmitter<ISnapshot>();

  constructor(private changeDetector: ChangeDetectorRef, private zone: NgZone) {}

  /** Make sure we have a valid storyline, even if the collector is not started yet. */
  ngOnInit() {
    this.storyline = Collector.getInitialStoryline(this.mode);
  }

  /** Cleanup the collector. */
  ngOnDestroy() {
    if (this.collector) {
      this.collector.destroy();

      this.collector = undefined;
    }
  }

  /** Retrieve the status of the collector. */
  get status(): 'uninitialized' | TStatus {
    return (this.collector && this.collector.status) || 'uninitialized';
  }

  /** Retrieves if the collector is empty. */
  get isEmpty(): boolean {
    return this.collector && this.collector.isEmpty;
  }

  /** Retrieves if the collector is evaluating. */
  get isEvaluating(): boolean {
    return this.storyline.isEvaluating;
  }

  /** Retrieves the name of the definition. */
  get name(): string {
    return (this.collector && this.collector.name) || '';
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

  /** Reset the collector. */
  reset(): void {
    if (this.collector) {
      this.collector.restart(false);
    }
  }

  /** Change a setting. */
  set(setting: 'mode', value: TModes): void;
  set(setting: 'buttons', value: 'inline' | 'sticky'): void;
  set(setting: 'preview' | 'enumerators' | 'pages' | 'progressbar', value: boolean): void;
  set(setting: 'mode' | 'preview' | 'enumerators' | 'pages' | 'progressbar' | 'buttons', value: any): void {
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
      case 'enumerators':
        this.enumerators = value;
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
