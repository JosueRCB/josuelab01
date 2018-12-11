import { Component, Input, ChangeDetectorRef  } from '@angular/core';
import { EditorComponent } from '../editor/editor.component';
import { CollectorComponent } from '../collector/collector.component';

@Component({
  selector: 'tripetto-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() editor: EditorComponent;
  @Input() collector: CollectorComponent;

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  /**
   * We need this function since this component is a sibling of the collector component.
   * When the collector component detects a change, its siblings are not changed.
   */
  changed() {
    this.changeDetector.detectChanges();
  }
}
