import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as Tripetto from 'tripetto-collector';

@Component({
  selector: 'app-collector',
  templateUrl: './collector.html',
  styleUrls: ['./collector.css']
})
export class CollectorComponent implements OnInit {
  collector: Tripetto.Collector<{}>;
  resumeData: Tripetto.ISnapshot | undefined;

  constructor(private _http: HttpClient) {}

  ngOnInit() {
    this._http.get('/assets/demo.json').subscribe((data: Tripetto.IDefinition) => {
      this.collector = new Tripetto.Collector<{}>(data, false, undefined, this.end.bind(this));

      this.collector.Start();
    });
  }

  private end(instance: Tripetto.Instance, type: 'ended' | 'stopped' | 'paused'): void {
    if (type === 'ended') {
      // Output the collected data to the console
      console.dir(instance.Values);
    }
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

  private clickStart(): void {
    this.collector.Start();
  }

  private clickPause(): void {
    this.resumeData = this.collector.Pause();

    // Output the resume data to the console
    console.dir(this.resumeData);
  }

  private clickResume(): void {
    if (this.resumeData) {
      this.collector.Resume(this.resumeData);
    }
  }

  private clickStop(): void {
    this.collector.Stop();
  }
}
