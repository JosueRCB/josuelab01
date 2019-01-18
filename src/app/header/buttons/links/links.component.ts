import { Component, Input } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'tripetto-buttons-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent {
  @Input() app: AppComponent;
  @Input() mode: 'inline' | 'embedded';

  get isEmbedded(): boolean {
    return this.mode === 'embedded';
  }
}
