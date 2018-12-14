import { Component, Input, Output, ElementRef, NgZone, EventEmitter, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Editor, IEditorChangeEvent, IEditorReadyEvent, IDefinition } from 'tripetto';
import './blocks';

@Component({
  selector: 'tripetto-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit, OnDestroy {
  private editor: Editor;
  private initialDefinition: IDefinition | undefined;

  @Input() set definition(definition: IDefinition | undefined) {
    if (this.editor) {
      this.zone.runOutsideAngular(() => {
        this.editor.definition = definition;
      });

      return;
    }

    this.initialDefinition = definition;
  }

  get definition(): IDefinition | undefined {
    return (this.editor && this.editor.definition) || this.initialDefinition;
  }

  @Output() changed = new EventEmitter<IDefinition>();

  constructor(private element: ElementRef, private zone: NgZone) {}

  ngOnInit() {
    // Leave the editor outside of Angular to avoid unnecessary and costly change detection.
    this.zone.runOutsideAngular(() => {
      this.editor = Editor.open(this.definition, {
        element: this.element.nativeElement,
        disableSaveButton: true,
        disableRestoreButton: true,
        disableClearButton: false,
        disableCloseButton: true,
        supportURL: false,
        disableOpenCloseAnimation: true,
        showTutorial: true,
        zoom: 'fit-horizontal'
      });

      // Wait until the editor is ready!
      this.editor.hook('OnReady', 'synchronous', (editorEvent: IEditorReadyEvent) => {
        this.changed.emit(editorEvent.definition);

        this.editor.hook('OnChange', 'synchronous', (changeEvent: IEditorChangeEvent) => {
          // Reload the collector with the new definition
          this.changed.emit(changeEvent.definition);
        });
      });

      // When the host window resizes, we should notify the editor component about that.
      window.addEventListener('resize', () => this.editor && this.editor.resize());
      window.addEventListener('orientationchange', () => this.editor && this.editor.resize());
    });
  }

  ngOnDestroy() {
    this.editor.destroy();
    this.editor = undefined;
  }

  rename() {
    if (this.editor) {
      this.editor.edit();
    }
  }
}
