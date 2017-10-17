import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Tripetto from '@tripetto/forms-collector';

@Component({
  selector: 'app-collector',
  templateUrl: './collector.html',
  styleUrls: ['./collector.css']
})
export class CollectorComponent implements OnInit {
  private collector: Tripetto.Collector<{}>;

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this._http.get('/assets/form.json').subscribe((data: Tripetto.IMap) => {
      this.collector = new Tripetto.Collector<{}>(data);

      this.collector.Start();
    });
  }

  private clickPrevious(): void {
    if (this.collector.Observer) {
      this.collector.Observer.Cancel();
    }
  }

  private clickNext(): void {
    if (this.collector.Observer) {
      this.collector.Observer.Done();
    }
  }
}
