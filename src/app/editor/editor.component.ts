import { CollectorComponent } from '../collector/collector.component';
import { Component, Input, ElementRef, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { Editor, IEditorChangeEvent, IEditorReadyEvent } from 'tripetto';
import * as Superagent from 'superagent';
import { BehaviorSubject } from 'rxjs';

/** Import blocks. */
import 'tripetto-block-checkbox';
import 'tripetto-block-checkboxes';
import 'tripetto-block-dropdown';
import 'tripetto-block-email';
import 'tripetto-block-number';
import 'tripetto-block-password';
import 'tripetto-block-radiobuttons';
import 'tripetto-block-text';
import 'tripetto-block-textarea';
import 'tripetto-block-url';

@Component({
  selector: 'tripetto-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() collector: CollectorComponent;

  constructor(private el: ElementRef, private zone: NgZone) {}

  ngOnInit() {
    // Leave the editor outside of Angular to avoid unnecessary and costly change detection.
    this.zone.runOutsideAngular(() => {
      // For this demo we use the local store to save the definition and snapshot.
      // Here we try to retrieve that saved data.
      const definition = JSON.parse(localStorage.getItem('tripetto-example-definition') || 'null') || undefined;

      const editor = Editor.open(definition, {
        element: this.el.nativeElement.firstChild,
        disableSaveButton: true,
        disableRestoreButton: true,
        disableClearButton: false,
        disableCloseButton: true,
        disableOpenCloseAnimation: true,
        supportURL: false,
        showTutorial: false,
        zoom: 'fit-horizontal'
      });

      // Wait until the editor is ready!
      editor.hook('OnReady', 'synchronous', (editorEvent: IEditorReadyEvent) => {
        this.collector.reload(editorEvent.definition);

        editor.hook('OnChange', 'synchronous', (changeEvent: IEditorChangeEvent) => {
          // Store the definition in the persistent local store
          localStorage.setItem('tripetto-example-definition', JSON.stringify(changeEvent.definition));

          // Reload the collector with the new definition
          this.collector.reload(changeEvent.definition);
        });
      });

      // When the host window resizes, we should notify the editor component about that.
      // This is only necessary when you embed the editor in a custom element.
      window.addEventListener('resize', () => editor.resize());
      window.addEventListener('orientationchange', () => editor.resize());

      // If there was no definition found in the local store, fetch our demo definition.
      if (!definition) {
        Superagent.get('/assets/demo.json').end((error: {}, response: Superagent.Response) => {
          if (response.ok) {
            editor.load(JSON.parse(response.text));
          }
        });
      }
    });
  }
}
