import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Context, markdownify, castToBoolean, castToString, MarkdownTypes, Str, IVariable } from 'tripetto-collector';

@Directive({
  selector: '[markdown]'
})
export class MarkdownDirective implements OnInit {
  @Input() content: string;
  @Input() context: Context;
  @Input() lineBreaks: boolean;
  @Input() required: boolean;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const markdown = markdownify(this.content, this.context, {
      lineBreaks: castToBoolean(this.lineBreaks, true)
    });

    this.el.nativeElement.innerHTML = markdown.reduce(
      (type: MarkdownTypes | undefined, content: string | string[], value?: IVariable | string) => {
        let tag = 'span';
        let attributes = '';

        switch (type) {
          case 'bold':
            tag = 'b';
            break;
          case 'italic':
            tag = 'i';
            break;
          case 'underline':
            tag = 'u';
            break;
          case 'strikethrough':
            tag = 's';
            break;
          case 'break':
            tag = 'br';
            break;
          case 'hyperlink':
            tag = 'a';
            attributes = ` href="${Str.replace(castToString(value), '"', '')}" target="_blank"`;
            break;
          case 'mention':
            return `<span>${(value && (value as IVariable).string) || '...'}</span>`;
        }

        if (typeof content === 'string') {
          return `<${tag}${attributes}>${Str.makeHTMLSafe(content)}</${tag}>`;
        }

        let r = type && `<${tag}${attributes}>` || '';

        content.forEach((s: string) => {
          r += s;
        });

        return r + (type && `</${tag}>` || '');
      }
    ) + (this.required && `<span class="text-danger">*</span>` || '');
  }
}
