import { Component, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewRef } from '@angular/core';
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
  isEditorOpen = false;

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
    this.editor.show((this.isEditorOpen = !this.isEditorOpen));

    this.changed();
  }
}
