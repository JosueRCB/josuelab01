import { Component, Input } from '@angular/core';
import { CollectorComponent } from '../collector/collector.component';

@Component({
  selector: 'tripetto-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() collector: CollectorComponent;
}
