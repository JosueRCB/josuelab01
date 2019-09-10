import { CollectorComponent } from './collector/collector.component';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { EditorComponent } from './editor/editor.component';
import { HttpClient } from '@angular/common/http';
import { IDefinition } from 'tripetto';
import { Export, ISnapshot, Instance } from 'tripetto-collector';

const DEFINITION = 'tripetto-example-angular-bootstrap-definition';
const SNAPSHOT = 'tripetto-example-angular-bootstrap-snapshot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('collector', { static: false }) collector: CollectorComponent;
  @ViewChild('editor', { static: false }) editor: EditorComponent;
  demoDefinition: IDefinition;

  constructor(private _http: HttpClient) {}

  ngAfterViewInit() {
    // For this demo we use the local store to save the definition and snapshot.
    // Here we try to retrieve that saved data.
    this.editor.definition = JSON.parse(localStorage.getItem(DEFINITION) || 'null') || undefined;
    this.collector.snapshot = JSON.parse(localStorage.getItem(SNAPSHOT) || 'null') || undefined;

    this._http.get('assets/demo.json').subscribe((demoDefinition: IDefinition) => {
      this.demoDefinition = demoDefinition;

      // If there was no definition found in the local store, use our demo definition.
      if (!this.editor.definition) {
        this.editor.definition = demoDefinition;
      }
    });
  }

  /** Resets the form definition to the demo definition. */
  reset() {
    localStorage.removeItem(DEFINITION);
    localStorage.removeItem(SNAPSHOT);

    this.editor.definition = this.demoDefinition;
    this.collector.reset();
  }

  /** A change was made in the editor, inform the collector and store the definition. */
  onEditorChanged(definition: IDefinition) {
    // Push the definition to the collector.
    this.collector.definition = definition;

    // Store the definition in the persistent local store
    localStorage.setItem(DEFINITION, JSON.stringify(definition));
  }

  /** The collector was paused, store the snapshot. */
  onCollectorPaused(snapshot: ISnapshot) {
    // Store the snapshot in the local store, so we can restore it on browser refresh.
    localStorage.setItem(SNAPSHOT, JSON.stringify(snapshot));
  }

  /** The collector was finished, output the collected data to the console. */
  onCollectorFinished(instance: Instance) {
    // Output the collected data to the console for demo purposes.
    console.dir(Export.fields(instance));

    // Output can also be exported as CSV for your convenience.
    console.dir(Export.CSV(instance));
  }
}
