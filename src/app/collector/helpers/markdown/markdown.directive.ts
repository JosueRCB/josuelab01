import { Directive, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Context, markdownify, castToBoolean, castToString, MarkdownTypes, Str, IVariable } from 'tripetto-collector';

@Directive({
  selector: '[markdown]'
})
export class MarkdownDirective implements OnInit, OnDestroy, OnChanges {
  private variables: IVariable[] = [];
  private numeratorElement: HTMLSpanElement;
  private requiredElement: HTMLSpanElement;
  @Input() content: string;
  @Input() context: Context;
  @Input() lineBreaks: boolean;
  @Input() numerator: string;
  @Input() required: boolean;
  @Output() changed = new EventEmitter();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const markdown = markdownify(this.content, this.context, {
      lineBreaks: castToBoolean(this.lineBreaks, true)
    });

    this.numeratorElement = document.createElement('span');
    this.numeratorElement.textContent = this.numerator;
    this.numeratorElement.style.display = this.numerator ? 'inline' : 'none';
    this.element.nativeElement.appendChild(this.numeratorElement);

    this.element.nativeElement.appendChild(
      markdown.reduce<HTMLElement>((type: MarkdownTypes | undefined, content: string | HTMLElement[], value?: IVariable | string) => {
        let el: HTMLElement;

        switch (type) {
          case 'bold':
            el = document.createElement('b');
            break;
          case 'italic':
            el = document.createElement('i');
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
              variable.subscribe((v: IVariable) => {
                el.textContent = v.string || '...';
              });
            }

            return el;
          default:
            el = document.createElement('span');
            break;
        }

        if (typeof content === 'string') {
          el.textContent = content;
        } else {
          content.forEach((node: HTMLElement) => el.appendChild(node));
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
    if (this.numeratorElement && changes.numerator) {
      this.numeratorElement.textContent = changes.numerator.currentValue;
      this.numeratorElement.style.display = changes.numerator.currentValue ? 'inline' : 'none';
    }

    if (this.requiredElement && changes.required) {
      this.requiredElement.style.display = changes.required.currentValue ? 'inline' : 'none';
    }
  }

  ngOnDestroy() {
    this.variables.forEach((variable: IVariable) => variable.unsubscribe(this));
  }
}
