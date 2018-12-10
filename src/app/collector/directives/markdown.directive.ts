import { Directive, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Context, markdownify, castToBoolean, castToString, MarkdownTypes, Str, IVariable } from 'tripetto-collector';

@Directive({
  selector: '[markdown]'
})
export class MarkdownDirective implements OnInit, OnDestroy {
  private variables: IVariable[] = [];
  @Input() content: string;
  @Input() context: Context;
  @Input() lineBreaks: boolean;
  @Input() required: boolean;
  @Output() changed = new EventEmitter();

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const markdown = markdownify(this.content, this.context, {
      lineBreaks: castToBoolean(this.lineBreaks, true)
    });

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

    if (this.required) {
      const requiredElement = document.createElement('span');

      requiredElement.className = 'text-danger';
      requiredElement.textContent = '*';

      this.element.nativeElement.appendChild(requiredElement);
    }
  }

  ngOnDestroy() {
    this.variables.forEach((variable: IVariable) => variable.unsubscribe(this));
  }
}
