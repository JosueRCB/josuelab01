import { Component, Input } from '@angular/core';
import { Storyline } from 'tripetto-collector';

@Component({
  selector: 'tripetto-collector-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent {
  @Input() storyline: Storyline;
}
