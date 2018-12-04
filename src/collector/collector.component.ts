import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Collector, Export, IDefinition, ISnapshot, Instance, IObservableNode, Moment, NodeBlock } from 'tripetto-collector';

@Component({
  selector: 'tripetto-collector',
  templateUrl: './collector.html',
  styleUrls: ['./collector.css']
})
export class CollectorComponent implements OnInit {
  collector: Collector | undefined;
  resumeData: ISnapshot | undefined;

  constructor(private _http: HttpClient) {}

  get nodes(): IObservableNode[] {
    const nodes: IObservableNode[] = [];
    const storyline = this.collector && this.collector.storyline;

    if (storyline) {
      storyline.map((moment: Moment<NodeBlock>) => nodes.push(...moment.nodes));
    }

    return nodes;
  }

  ngOnInit() {
    this._http.get('/assets/demo.json').subscribe((data: IDefinition) => {
      this.collector = new Collector(data, 'paginated');

      this.collector.onFinish = (i: Instance) => {
        console.dir(Export.fields(i));
      };
    });
  }
}
