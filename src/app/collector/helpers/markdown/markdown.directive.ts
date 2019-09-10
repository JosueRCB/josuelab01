import { Directive, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Context, markdownify, castToBoolean, castToString, MarkdownTypes, IVariable } from 'tripetto-collector';

@Directive({
  selector: '[markdown]'
})
export class MarkdownDirective implements OnInit, OnDestroy, OnChanges {
  private variables: IVariable[] = [];
  private enumeratorElement: HTMLSpanElement;
  private requiredElement: HTMLSpanElement;
  @Input() content: string;
  @Input() context: Context;
  @Input() lineBreaks: boolean;
  @Input() enumerator: string;
  @Input() required: boolean;
  @Output() changed = new EventEmitter();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const markdown = markdownify(this.content, this.context, {
      lineBreaks: castToBoolean(this.lineBreaks, true)
    });

    this.enumeratorElement = document.createElement('span');
    this.enumeratorElement.textContent = this.enumerator;
    this.enumeratorElement.style.display = this.enumerator ? 'inline' : 'none';
    this.element.nativeElement.appendChild(this.enumeratorElement);

    this.element.nativeElement.appendChild(
      markdown.reduce<HTMLElement>((type: MarkdownTypes | undefined, content: string | HTMLElement[], value?: IVariable | string) => {
        let el: HTMLElement;
        let inner: HTMLElement;

        switch (type) {
          case 'bold':
            el = document.createElement('b');
            break;
          case 'italic':
            el = document.createElement('i');
            break;
          case 'bold+italic':
            el = document.createElement('b');
            inner = document.createElement('i');

            el.appendChild(inner);
            break;
          case 'underline':
            el = document.createElement('u');
            break;
          case 'strikethrough':
            el = document.createElement('s');
            break;
          case 'break':
            return document.createElement('br');
          case 'hyperlink':
            const link = (el = document.createElement('a'));

            link.href = castToString(value);
            link.target = '_blank';

            break;
          case 'mention':
            const variable = value as IVariable | undefined;

            el = document.createElement('span');
            el.textContent = (variable && variable.string) || '...';

            if (variable) {
              // Variable values can change, so subscribe to receive changes!
              variable.subscribe(() => {
                el.textContent = variable.string || '...';
              });

              this.variables.push(variable);
            }

            return el;
          default:
            el = document.createElement('span');
            break;
        }

        if (typeof content === 'string') {
          (inner || el).textContent = content;
        } else {
          content.forEach((node: HTMLElement) => (inner || el).appendChild(node));
        }

        return el;
      })
    );

    this.requiredElement = document.createElement('span');

    this.requiredElement.className = 'text-danger';
    this.requiredElement.textContent = '*';
    this.requiredElement.style.display = this.required ? 'inline' : 'none';

    this.element.nativeElement.appendChild(this.requiredElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.enumeratorElement && changes.enumerator) {
      this.enumeratorElement.textContent = changes.enumerator.currentValue;
      this.enumeratorElement.style.display = changes.enumerator.currentValue ? 'inline' : 'none';
    }

    if (this.requiredElement && changes.required) {
      this.requiredElement.style.display = changes.required.currentValue ? 'inline' : 'none';
    }
  }

  ngOnDestroy() {
    this.variables.forEach((variable: IVariable) => variable.unsubscribe(this));
  }
}
