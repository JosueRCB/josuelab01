import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';
import { CollectorComponent } from '../collector/collector.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'tripetto-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() app: AppComponent;
  @Input() editor: EditorComponent;
  @Input() collector: CollectorComponent;

  constructor(private changeDetector: ChangeDetectorRef) {}

  /**
   * We need this function since this component is a sibling of the collector component.
   * When the collector component detects a change, its siblings are not changed.
   * So we invoke this function so the header can detect the change.
   */
  changed() {
    this.changeDetector.detectChanges();
  }

  /** Toggles the editor to show/hide. */
  toggleEditor() {
    const editor = document.getElementById('editor');
    const editor_button = document.getElementById('editor_button');

    if (editor && editor_button) {
        editor.classList.toggle('show');
        editor_button.classList.toggle('btn-success');
        editor_button.classList.toggle('btn-secondary');
        editor_button.title = editor_button.classList.contains('btn-success') ? 'Close the editor' : 'Open the editor';
    }
  }
}
