import { CollectorComponent } from './collector/collector.component';
import { Component, ViewChild, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  @ViewChild('collector') collector: CollectorComponent;
  @ViewChild('editor') editor: EditorComponent;

  constructor(private _http: HttpClient) {}

  ngOnInit() {
      // For this demo we use the local store to save the definition and snapshot.
      // Here we try to retrieve that saved data.
      this.editor.definition = JSON.parse(localStorage.getItem(DEFINITION) || 'null') || undefined;
      this.collector.snapshot = JSON.parse(localStorage.getItem(SNAPSHOT) || 'null') || undefined;

      // If there was no definition found in the local store, fetch our demo definition.
      if (!this.editor.definition) {
        this._http.get('/assets/demo.json').subscribe((definitionFromRemote: IDefinition) => {
          this.editor.definition = definitionFromRemote;
        });
     }
  }

  // A change was made in the editor, inform the collector and store the definition.
  onEditorChanged(definition: IDefinition) {
    // Push the definition to the collector.
    this.collector.definition = definition;

    // Store the definition in the persistent local store
    localStorage.setItem(DEFINITION, JSON.stringify(definition));
  }

  // The collector was paused, store the snapshot.
  onCollectorPaused(snapshot: ISnapshot) {
    // Store the snapshot in the local store, so we can restore it on browser refresh.
    localStorage.setItem(SNAPSHOT, JSON.stringify(snapshot));
  }

  // The collector was finished, output the collected data to the console.
  onCollectorFinished(instance: Instance) {
    // Output the collected data to the console for demo purposes.
    console.dir(Export.fields(instance));

    // Output can also be exported as CSV for your convenience.
    console.dir(Export.CSV(instance));
  }
}
